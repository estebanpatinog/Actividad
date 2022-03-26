const superheroModel = require('../models/superhero.model');
class SuperheroService {
  async createSuperhero(superheroBody) {
    superheroBody.save();
    return superheroBody;
  }

  async findAllSuperheroes() {
    return superheroModel.find();
  }

  async findOneSuperhero(superheroId) {
    return superheroModel.findOne({ _id: superheroId });
  }

  async updateSuperhero(
    superheroId,
    superhero_name,
    realname,
    superpower,
    universe,
    enemies
  ) {
    return superheroModel.findById({ _id: superheroId }).then((superheroe) => {
      if (!superheroe) throw Error('No se encontro el superhero');
      return superheroModel.updateOne(
        { superheroId },
        { superhero_name, realname, superpower, universe, enemies }
      );
    });
  }

  async deleteSuperhero(superheroId) {
    const superhero = superheroModel.findById({ _id: superheroId })
    return superheroModel.deleteOne(superhero);
  }
}

module.exports = SuperheroService;
