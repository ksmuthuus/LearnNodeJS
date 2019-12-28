const express = require('express')
const router = express.Router()
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
// Good Read Ref: https://itnext.io/setting-up-swagger-in-a-node-js-application-d3c4d7aa56d4

const swaggerDefinition = {
  info: {    // API informations (required)
    title: 'Task Manager', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A task management API service', // Description (optional)
  },
  host: 'localhost:3001', // Host (optional)
  basePath: '/', // Base path (optional)
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/routers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options)
router.use('/',swaggerUi.serve)
router.get('/',swaggerUi.setup(swaggerSpec,{explorer:true}))


module.exports = router
