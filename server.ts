import app from './src/app';
import dotenv from 'dotenv';
dotenv.config();

import { Error } from './src/middleware/ErrorHandler';
import log from './src/utils/logger';

process.on('uncaughtException', (err: Error) => {
  log.error(`Uncaught Exception💣! Shutdown In Progress...`);
  log.error(err.name, err.message);
  process.exit(1);
});

const port: number | string = process.env.PORT || 3030;

const server = app.listen(port, () => {
  log.info(`Server 🚀 is running on port ${port}`);
});

process.on('unhandledRejection', (err: Error) => {
  log.info(`Unhandled Rejection!!💣 Shutdown In Progress`);
  log.info(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
