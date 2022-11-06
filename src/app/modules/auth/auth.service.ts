import { Service } from 'typedi';
import * as jwt from "jsonwebtoken";
import { StatusCodes } from 'http-status-codes';

// sequilize instance
import { sequelize } from '../../core/db/sequilize';

// Models
import { User } from '../../models/user/user.model';

// Services
import { Config } from '../../core/config';
import { CommonService } from '../../core/services/common.service';

// Utils
import { logger } from '../../core/logger';
import { Registration, Login } from './helpers/auth.interface';
import { sendSuccessResponse, throwAnError } from '../../core/helper/response-handler';

@Service()
export class AuthService {

  userModel = sequelize.models.User;

  constructor(
    private readonly config: Config,
    private readonly commonService: CommonService,
  ) { }

  /**
   * @author Jainam Shah
   * @description check if user exists or not
   */
  async checkUser(fieldName: string, value: string) {
    try {
      const user = await this.userModel.findOne({
        attributes: ['id', 'name', 'email', 'password'], where: { [fieldName]: value }
      });
      return user;
    } catch (error) {
      logger.error('checkUser Catch: ', error);
      throw throwAnError(error);
    }
  }

  /**
   * @author Jainam Shah
   * @description Register user into the system
   */
  async registration(data: Registration) {
    try {
      const user: User = await this.checkUser('email', data.email);
      if (user) throw this.config.MESSAGES.EMAIL_EXISTS_ALREADY;

      data.password = await this.commonService.hashPassword(data.password);
      await this.userModel.create(data);
      const { message, status } = this.config.MESSAGES.USER_REGISTERED;
      return sendSuccessResponse(status, true, message);
    } catch (error) {
      logger.error('registration Catch: ', error);
      throw throwAnError(error);
    }
  }

  /**
   * @author Jainam Shah
   * @description Create JWT token
   */
  async createToken(user: any) {
    return jwt.sign(user, this.config.get('JWT_ACCESS_TOKEN_SECRET_KEY'), {
      expiresIn: this.config.getNumber('JWT_ACCESS_TOKEN_EXPIRE_TIME')
    });
  }

  /**
   * @author Jainam Shah
   * @description Login user into the system
   */
  async login(data: Login) {
    try {
      const loginUser: User = await this.checkUser('email', data.email.toLowerCase());
      if (!loginUser) throw this.config.MESSAGES.USER_NOT_EXIST;

      const isPwdCorrect = await this.commonService.validateHash(
        data.password, loginUser.password
      );
      if (!isPwdCorrect) throw this.config.MESSAGES.WRONG_PASSWORD;

      const payload = {
        name: loginUser.name,
        user_id: loginUser.id,
        email: loginUser.email
      }
      const token = await this.createToken(payload);
      return sendSuccessResponse(StatusCodes.OK, true, { token });
    } catch (error) {
      logger.error('login Catch: ', error);
      throw throwAnError(error);
    }
  }

}