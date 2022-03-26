const express = require('express');
const superheroRoute = express.Router();
const superheroSchema = require('../models/superhero.model');
const SuperheroService = require('../services/superhero.service');

// Crear una instancia de la clase superheroService
const service = new SuperheroService();

/* Endpoint: http://localhost:5000/api/v1/superheroes/superhero */
superheroRoute.post('/superhero', async (req, res) => {
  const superheroBody = superheroSchema(req.body);
  await service
    .createSuperhero(superheroBody)
    .then((superheroBody) => res.status(201).json({ message: superheroBody }))
    .catch((err) => res.status(404).json({ message: err }));
});

superheroRoute.get('/', async (req, res) => {
  const superheroBody = await service
    .findAllSuperheroes()
    .then((superheroBody) => res.status(201).json({ message: superheroBody }))
    .catch((err) => res.status(404).json({ message: err }));
});

/* Endpoint: http://localhost:5000/api/v1/superheroes/superheroId */
superheroRoute.get('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  const superheroBody = await service
    .findOneSuperhero(superheroId)
    .then((superheroBody) => res.status(201).json(superheroBody))
    .catch((err) => res.status(404).json({ message: err }));
});

/* Endpoint: http://localhost:5000/api/v1/superheroes/superheroId */
superheroRoute.put('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  const { superhero_name, realname, superpower, universe, enemies } = req.body;
  await service
    .updateSuperhero(
      superheroId,
      superhero_name,
      realname,
      superpower,
      universe,
      enemies
    )
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

/* Endpoint: http://localhost:5000/api/v1/superheroes/superheroId */
superheroRoute.delete('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  await service.deleteSuperhero(superheroId)
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(404).json({ message: err }));
});

module.exports = superheroRoute;
