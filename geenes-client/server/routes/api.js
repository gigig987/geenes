const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

//core
var project = require('../core/project.js');
const gen = require('../core/test.js');

// database
// const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Project = require('../models/project.js');

mongoose.connect('mongodb://'+process.env.MONGO_USER+':'+process.env.MONGO_PASSWORD+'@ds035059.mlab.com:35059/geenes');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   router.get('/', (req, res) => {
    res.send('api works');
    });
});

// Get all projects
router.get('/projects', (req, res) => {
//       db.collection('genes').find({},{'projectName':1, _id: 0})
//         .toArray((err,results) => {
//                 if(err)            
//                 res.status(500).send(error);
//                 res.status(200).json(results);
//         })
        Project.find({},'projectName _id',(err,results) => {
                if(err)            
                res.status(500).send(error);
                res.status(200).json(results);})
});

// Get single project
router.get('/projects/:id', (req, res) => {
      db.collection('genes').find({projectName: req.params.id})
        .toArray((err,results) => {
                if(err)            
                res.status(500).send(error);
                res.status(200).json(results);
        })


});

//create new project
router.post('/projects', (req, res) => {
        var obj = {
    _id:  mongoose.Types.ObjectId(),            
    name: 'cscc',//req.body.name,
    mutationRate: req.body.mRate,
    generations: [{specimens:[{
                        _id: mongoose.Types.ObjectId(),
                        fitness: 1,
                        dna: { genes: gen.createGenes(20)  }, 
                        design: {}                
                        }]}]
}

console.log(obj.generations[0].specimens[0].dna.genes);
        new Project(obj).save(err=>{
                  if (err) {
                        console.log(err);
                        } else {
                        console.log('meow');
                        }
        });
              
                
 });

module.exports = router;