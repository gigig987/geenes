// The Specimen model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var specimenSchema = new Schema({

                        _id: ObjectId,
                        fitness: Number,
                        dna: { genes: Array  }, 
                        design: Object                
                                
});

module.exports = mongoose.model('Specimen', specimenSchema);