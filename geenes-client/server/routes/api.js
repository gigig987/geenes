const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

//core
var project = require('../core/project.js');
const gen = require('../core/test.js');

// database
// const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
require('mongoose').Promise = global.Promise;
var Project = require('../models/project.js');

mongoose.connect('mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@ds035059.mlab.com:35059/geenes');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
        router.get('/', (req, res) => {
                res.send('api works');
        });
});

// Get all projects
router.get('/projects', (req, res) => {
        Project.find({}, '_id name numberOfGenerations', (err, results) => {
                if (err)
                res.status(500).send(error);
                res.status(200).json(results);
        })
});

// Get single project
router.get('/projects/:id', (req, res) => {
        Project.find({'_id': req.params.id}, (err, results) => {
                if (err)
                res.status(500).send(error);
                res.status(200).json(results);
        })
});

// create a new project;
// This will have ONE(1) generation, FIVE(5) specimens,
//  containing a design document, and an array of TWENTY(20) genes
router.post('/projects', (req, res) => {

//  FOR NOW LET'S  LEAVE THIS CODE IN THE API, THEN MOVE TO APP

        var specimens = []; // array containing all the specimens
        var design = {}; // object containing all the design rules for the specific specimen
        var genes = []; //array containing the genes for the specific specimen
        var numberOfGenerations = 1; // initialising number of generations  
// 
//      generate all the data for a single specimen
// 
        for (var i = 0; i < 5; i++) { // !HARDCODED(5) number of specimen per project for now
                genes[i] = gen.createGenes(20); // !HARDCODED(20) number of genes
                design = gen.createDesign(genes[i]); 

                specimens[i] = {
                        _id: mongoose.Types.ObjectId(),
                        fitness: 1,
                        dna: { genes: genes[i] },
                        design
                }
        }
//      
//      putting together all the data generated before.
//      models/project.js contains the Schema for this object
        var obj = {
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                mutationRate: req.body.mRate,
                numberOfGenerations: numberOfGenerations,
                generations: [{
                        specimens: specimens
                }]
        }
// ACTUAL CODE TO SAVE THE NEW CREATED PROJECT INTO DB
        new Project(obj).save(err => {
                if (err) {
                     res.status(500).send(err);
                } else {
                     res.status(200).json('projects saved to database');   
                
                }
        });


});

module.exports = router;