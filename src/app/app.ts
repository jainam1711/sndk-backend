import * as cors from 'cors';
import * as helmet from 'helmet';
import * as express from 'express';
import { Container } from "typedi";
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { Express } from 'express-serve-static-core';
import { useExpressServer, useContainer } from "routing-controllers";

// Database Initialize
import { initializeDb } from './core/db/sequilize';

// Middelware
import { ErrorHandler } from './core/middlewares/error-handler.middleware';

// Controllers
import { AuthController } from './modules/auth/auth.controller';
import { ProjectController } from './modules/project/project.controller';

export class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
  }

  public async config() {
    this.app.use(express.static('public'))
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());

    await initializeDb();
    useContainer(Container);
    useExpressServer(this.app, {
      routePrefix: "/api",
      defaultErrorHandler: false,
      controllers: [
        AuthController,
        ProjectController
      ],
      middlewares: [
        ErrorHandler
      ],
      validation: {
        whitelist: true,
        forbidNonWhitelisted: true
      }
    });
  }

  public setPort(port: number): void {
    this.app.set('port', port);
  }

}
