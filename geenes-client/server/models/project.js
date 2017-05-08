// The Project model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

// var Specimen =  require('specimen');

var projectSchema = new Schema({
    _id: ObjectId,
    name: { type: String, required: true },
    mutationRate: {type: Number, default:0.05, required: true},
    numberOfGenerations: {type: Number, default:1},
    generations:[ { specimens: //[Specimen]
                        [{
                        _id: ObjectId,
                        fitness: Number,
                        dna: { genes: Array  }, 
                          
                        }]
    }]
           
});

module.exports = mongoose.model('Project', projectSchema);