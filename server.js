const dotenv = require('dotenv');
const app = require('./src/index');
const { sequelize } = require('./models');

process.on('uncaughtException', (err) => {
  console.log(`Unhandled Exception💣! Shutdown In Progress...`);
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config();
const port = process.env.PORT;
const server = app.listen(port, async () => {
  console.log(`🚀 is running on port ${port}`);
  await sequelize.authenticate();
  console.log('Database connected successfully');
});

process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Rejection!!💣 Shutdown In Progress`);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
