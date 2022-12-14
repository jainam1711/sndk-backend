import * as dotenv from 'dotenv';
import { Service } from 'typedi';
import { SequelizeOptions } from 'sequelize-typescript';
import { tables } from '../../models';
import { messages } from '../constants';

@Service()
export class Config {
    public readonly MESSAGES = messages;

    constructor() {
        const { nodeEnv } = this;
        dotenv.config({
            path: `.env.${nodeEnv}`,
        });
        // Replace \\n with \n to support multiline strings in AWS
        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName]!.replace(/\\n/g, '\n');
        }
    }

    public get(key: string): string {
        return process.env[key] || '';
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'dev';
    }

    get sequelizeConfig(): SequelizeOptions {
        return {
            dialect: 'mysql',
            host: this.get('DB_HOST'),
            port: this.getNumber('DB_PORT'),
            username: this.get('DB_USERNAME'),
            password: this.get('DB_PASSWORD'),
            database: this.get('DB_DATABASE'),
            logging: this.get('DB_LOGGING') === 'true' ? console.log : false,
            sync: { alter: this.get('DB_SYNCHRONIZE') === 'true' },
            models: [...tables]
        };
    }

}
