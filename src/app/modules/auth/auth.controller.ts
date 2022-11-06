import { Response } from "express";
import { Controller, Post, Body, Res } from "routing-controllers";

// Validations
import { LOGIN, REGISTRATION } from "./helpers/auth.validator";

// services
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {

  constructor(
    private readonly _service: AuthService,
  ) { }

  /**
   * @author Jainam Shah
   * @description User registration API
   */
  @Post('/registration')
  async registration(@Body() body: REGISTRATION, @Res() res: Response) {
    const data = await this._service.registration(body);
    return res.send(data);
  }

  /**
   * @author Jainam Shah
   * @description User login API
   */
  @Post('/login')
  async login(@Body() body: LOGIN, @Res() res: Response) {
    const data = await this._service.login(body);
    return res.send(data);
  }

}