import Container from 'typedi';
import { createLogger, format, transports } from "winston";
import { Config } from '../config';

const config = Container.get(Config);
const { combine, timestamp, label, printf } = format;

// eslint-disable-next-line no-shadow
const myFormat = printf(({ level, message, label, stack, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}  ${stack ? `\n${stack}` : ''}`;
});

const date = new Date();
const dateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: config.get('APP_NAME') }),
        timestamp(),
        myFormat
    ),
    defaultMeta: { serverInfo: config.get('SERVER_ID') },
    transports: [
        new transports.File({
            filename: `logs/${dateFormat}-error.log`,
            level: 'error',
            maxsize: 10000000 // 10 MB
        }),
        new transports.File({
            filename: `logs/${dateFormat}-all.log`,
            level: 'debug',
            maxsize: 10000000 // 10 MB
        })
    ]
});

// Log to console
logger.add(new transports.Console());
