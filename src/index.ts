import * as http from 'http';
import { Container } from 'typedi';
import { App } from './app/app';

import { Config } from './app/core/config';
import { logger } from "./app/core/logger";

const config = Container.get(Config);

function normalizePort(val: number | string): number {
  const DEFAULT_PORT = 3000;
  const portNumber: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (!portNumber) return DEFAULT_PORT;
  return portNumber;
}

const app: App = new App();
const port = normalizePort(config.getNumber('APP_PORT'));
app.setPort(port);

const server = http.createServer(app.app);
server.listen(port);

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      break;
    default:
      throw error;
  }
}
server.on('error', onError);

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr && addr.port}`;
  logger.info(`App started and listening on ${bind}`);
}
server.on('listening', onListening);

process.on('SIGTERM', () => {
  logger.error('Received SIGTERM, app closing...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.error('Received SIGINT, app closing...');
  process.exit(0);
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled promise rejection thrown: `);
  logger.error(reason);
  process.exit(1);
});
