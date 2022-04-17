const http = require('http');

require('dotenv').config();

const logger = require('./services/logger');

const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}...`);
  });
}

startServer();

process.on('unhandledRejection', (err) => {
  logger.warn('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.info(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  logger.warn('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
