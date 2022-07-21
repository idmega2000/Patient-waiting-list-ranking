const dotenv = require('dotenv');

dotenv.config();

const EnvData = {
  PORT: process.env.PORT || 5001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
};

module.exports = EnvData;
