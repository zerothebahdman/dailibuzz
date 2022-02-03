import dotenv from 'dotenv';
import app from './src/index';
import log from './src/utils/logger';

dotenv.config();

process.on('uncaughtException', (err) => {
  log.info(`Unhandled Exception💣! Shutdown In Progress...`);
  log.info(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 5050;

const server = app.listen(port, async () => {
  log.info(`Server 🚀 listening on port ${port}`);
});

process.on('unhandledRejection', (err: any) => {
  log.info(`Unhandled Rejection!!💣 Shutdown In Progress`);
  log.info(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
