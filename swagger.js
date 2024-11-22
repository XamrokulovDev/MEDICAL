const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Medical Center',
    version: '1.0.0',
    description: 'Node.js bilan yaratilgan tibbiyot API',
  },
  servers: [
    {
      url: 'http://localhost:5152',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;