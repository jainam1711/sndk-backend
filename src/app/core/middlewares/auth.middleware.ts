import { omit } from "lodash";
import { NextFunction } from "express";
import { Middleware } from "routing-controllers";
import { Config } from "../config";
import { JwtService } from "../services/jwt.service";
import { throwAnError } from "../helper/response-handler";

@Middleware({ type: 'before' })
export class AuthMiddleware {
    constructor(
        private readonly config: Config,
        private readonly jwtService: JwtService,
    ) { }

    async use(req: any, res: any, next: NextFunction) {
        try {
            let token;
            const authHeaders = req.headers.authorization;
            if (authHeaders) token = (authHeaders as string).split(' ')[1];
            if (token) {
                const verified: any = this.jwtService.verify(token);
                const user = await this.jwtService.validate(verified.email);
                if (verified) {
                    req.user = omit(user.dataValues, 'password');
                }
                next();
            } else {
                throw this.config.MESSAGES.UNAUTHORIZED;
            }
        } catch (error) {
            if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
                throw throwAnError(this.config.MESSAGES.UNAUTHORIZED);
            }
            throw throwAnError(error);
        }
    }

}