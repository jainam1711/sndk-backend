import { Service } from 'typedi';
import * as jwt from "jsonwebtoken";
import { Config } from '../config';
import { AuthService } from '../../modules/auth/auth.service';

@Service()
export class JwtService {

  constructor(
    private authService: AuthService,
    private readonly config: Config
  ) { }

  verify(token: string) {
    return jwt.verify(token, this.config.get('JWT_ACCESS_TOKEN_SECRET_KEY'));
  }

  async validate(email: string) {
    const user = await this.authService.checkUser('email', email);
    if (!user) throw this.config.MESSAGES.UNAUTHORIZED;
    return user;
  }

}
