// The Template model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var templateSchema = new Schema({
    _id: ObjectId,
    name: { type: String, required: true },
    content: {type: String,required: true},   
});

module.exports = mongoose.model('Template', templateSchema);