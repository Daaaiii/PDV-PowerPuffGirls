const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./rotas.js']; 

swaggerAutogen(outputFile, endpointsFiles);