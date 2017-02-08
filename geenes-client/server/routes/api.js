const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

// database
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://gigig:zxas12@ds035059.mlab.com:35059/geenes', (err, database) => {
    if (err) return console.log(err)
    db = database
    /* GET api listing. */
    router.get('/', (req, res) => {
    res.send('api works');
    });
})

// Get all projects
router.get('/projects', (req, res) => {
      db.collection('genes').find({},{'projectName':1, _id: 0})
        .toArray((err,results) => {
                if(err)            
                res.status(500).send(error);
                res.status(200).json(results);
        })
});




module.exports = router;