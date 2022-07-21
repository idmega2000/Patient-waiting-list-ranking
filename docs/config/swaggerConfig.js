const dotenv = require('dotenv');
const swaggerJSDoc = require('swagger-jsdoc');
const EnvData = require('../../src/configs/EnvData');

dotenv.config();
const { PORT } = EnvData;
const swaggerDefinition = {
  info: {
    title: 'Project title',
    version: '1.0.0',
    description: 'description',
    contact: {
      name: '',
      url: ''
    }
  },
  host: `localhost:${PORT}`,
  basePath: '/api/v1',
  consumes: 'application/json',
  produces: 'application/json',
  schemes: { HTTP: 'HTTP', HTTPS: 'HTTPS' },
};

const options = { swaggerDefinition, apis: ['./docs/**/*.yaml'] };
const swaggerConfig = swaggerJSDoc(options);

module.exports = swaggerConfig;
