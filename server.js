const dotenv = require('dotenv');
const app = require('./src/index');
const { sequelize } = require('./models');
const logger = require('./src/utils/logger');

process.on('uncaughtException', (err) => {
  logger.info(`Unhandled Exception💣! Shutdown In Progress...`);
  logger.info(err.name, err.message);
  process.exit(1);
});
dotenv.config();
const port = process.env.PORT;
const server = app.listen(port, async () => {
  logger.info(`App 🚀 is running on port ${port}`);
  await sequelize.authenticate();
  logger.info('Database connected successfully');
});

process.on('unhandledRejection', (err) => {
  logger.info(`Unhandled Rejection!!💣 Shutdown In Progress`);
  logger.info(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
