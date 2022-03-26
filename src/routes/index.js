const express = require('express');
const departamentsRouter = require('./departaments.router')
const superheroRouter = require('./superhero.router')

function routerApi(my_app){
  const router = express.Router();
  /* Endpoint estático: http://localhost:4000/api/v1 */
  my_app.use('/api/v1', router);
  /* Endpoint estático: http://localhost:4000/api/v1/superheroes */
  router.use('/departaments', departamentsRouter);
  router.use('/superheroes', superheroRouter);
}
module.exports = routerApi