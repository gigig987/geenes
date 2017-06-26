// The User model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var userSchema = new Schema({

                        _id: ObjectId,
                        username: String,
                        email: String,
                        hash: String,
                        firstName: String,  
                        lastName: String,
                        password: String,
                        projects: Array
                                
});

module.exports = mongoose.model('User', userSchema);