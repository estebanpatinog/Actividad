const mongoose = require('mongoose')
const superheroSchema = mongoose.Schema({
  superhero_name: {
    type : String,
    require : true
  },
  realname : {
    type : String,
    require : true
  },

  superpower : {
    type : Array,
    require : true
  },
  universe : {
    type : String,
    require : true
  },
  enemies : [{
    type : Object,
    require : true,
    enemy_name : {
      type : String,
      require : true
    },
    enemy_universe : {
      type : String,
      require : true
    }
  }]
});

const superheroCollection = mongoose.model('superheroCollection', superheroSchema)

module.exports = superheroCollection;