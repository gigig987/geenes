const express = require('express');
const router = express.Router();


//core
const gen = require('../core/generation.js');
const stylist = require('../core/stylist.js');

// database
// const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
require('mongoose').Promise = global.Promise;
var Project = require('../models/project.js');
var Specimen = require('../models/specimen.js');
var Template = require('../models/templates.js');

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
        Project.find({}, '_id name numberOfGenerations generations._id mutationRate', (err, results) => {
                if (err)
                        res.status(500).send(err);
                res.status(200).json(results);
        })
});

// Get single project
router.get('/projects/:id', (req, res) => {
        Project.find({ '_id': req.params.id }, (err, results) => {
                if (err)
                        res.status(500).send(err);
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
                // design = gen.createDesign(genes[i]); 

                specimens[i] = {
                        _id: mongoose.Types.ObjectId(),
                        fitness: 1, //TODO adjust to default value
                        dna: { genes: genes[i] }
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

// Get all the generations for a specific project
router.get('/projects/:id/generations', (req, res) => {
        Project.find({ '_id': req.params.id }, 'generations._id',
                (err, results) => {
                        if (err)
                                res.status(500).send(err);
                        res.status(200).json(results);
                }
        )
});

// Get all the contents for a specific generation
router.get('/generation/:id', (req, res) => {
        Project.findOne({ 'generations._id': req.params.id },
                'generations._id generations.specimens.dna.genes generations.specimens._id generations.specimens.fitness',
                (err, results) => {
                        if (err)
                                res.status(500).send(err);
                        res.status(200).json(results.generations.id(req.params.id));
                }
        )

});
// create new generation
router.post('/generation/:id', (req, res) => {
        Project.findOne({ 'generations._id': req.params.id },
                'generations._id generations.specimens.dna.genes generations.specimens._id generations.specimens.fitness',
                (err, results) => {
                        if (err)
                                res.status(500).send(err);

                        let generation = results.generations.id(req.params.id);
                        gen.setSpecimens(generation.specimens);
                        gen.selection();
                        let obj = gen.reproduction();
                        let newspecimens = [];
                        for (let i = 0; i < obj.length; i++) {
                                newspecimens[i] = {
                                        _id: mongoose.Types.ObjectId(),
                                        fitness: 1, //TODO adjust to default value
                                        dna: { genes: obj[i] }
                                }
                        }


                        results.generations.push({ specimens: newspecimens });
                        results.save((err, updatedProject) => {
                                if (err)
                                        res.status(500).send(err);

                                res.status(200).json(
                                        {'message':" succesfully saved",
                                        'newGenerationID':updatedProject.generations[updatedProject.generations.length-1]._id
                                                                        });
                        });
                }
        )

});

// get all info about a specimen
router.get('/specimen/:id', (req, res) => {
        var id = req.params.id;
        Project.aggregate([
                { $unwind: '$generations' },
                {
                        $match:
                        { "generations.specimens._id": new mongoose.Types.ObjectId(id) }
                },
                { $unwind: '$generations.specimens' },
                {
                        "$group": {
                                "_id": {
                                        "_id": "$_id",
                                },

                                "specimens": { "$push": "$generations.specimens" }
                        }
                },

        ],
                (err, results) => {
                        console.log(results);
                        if (!results || results.length == 0) {
                                return res.status(404).json({
                                        message: 'specimens with id ' + id + ' can not be found.'
                                });
                        }
                        if (err)
                                res.status(500).send(err);

                        res.status(200).json(results[0].specimens.filter(e => { return e._id == id }));
                }
        )
});
// save fitness into specimen FIXME this works but it's kinda hacky
router.put('/specimen/:id/fitness', (req, res) => {
        var id = req.params.id;
        Project.aggregate([
                { $unwind: '$generations' },
                {
                        $match:
                        { "generations.specimens._id": new mongoose.Types.ObjectId(id) }
                },
                { $unwind: '$generations.specimens' },
                {
                        "$group": {
                                "_id": {
                                        "_id": "$_id",
                                },

                                "specimens": { "$push": "$generations.specimens" }
                        }
                },

        ],
                (err, results) => {
                        console.log(results);
                        if (!results || results.length == 0) {
                                return res.status(404).json({
                                        message: 'specimens with id ' + id + ' can not be found.'
                                });
                        }
                        if (err)
                                res.status(500).send(err);

                        var sID = 'generations.0.specimens.' + results[0].specimens.findIndex(e => { return e._id == id }) + '.fitness';
                        var setter = {};
                        setter[sID] = req.body.fitness;
                        Project.update({ 'generations.specimens._id': id }, { "$set": setter },
                                (err, updatedProject) => {
                                        if (err)
                                                res.status(500).send(err);

                                        res.status(200).json("succesfully saved " + updatedProject);
                                });
                }
        )
});


router.post('/templates', (req, res) => {
        var name = req.body.name;
        var content = req.body.content;
        new Template({ _id: mongoose.Types.ObjectId(), name: name, content: content }).save(err => {
                if (err)
                        res.status(500).send(err);
        }).then(res.status(200).json('template saved'));
})

router.get('/templates', (req, res) => {
        Template.find({}, (err, results) => {
                if (err)
                        res.status(500).send(err);
                res.status(200).json(results);
        })
})

router.post('/stylist', (req, res) => {
        var template = req.body.template;
        var genesArray = req.body.genesArray;
        //        console.log("Received data: " + JSON.stringify(req.body))
        res.json(stylist.styleFromTemplateStringToHtml(template, genesArray));
})


module.exports = router;