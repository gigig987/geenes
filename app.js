const express = require('express');
const app = express();
// database
const MongoClient = require('mongodb').MongoClient

const bodyParser = require('body-parser');
//modules to REFACTOR
const geenes = require('./libraries/libraries.js');
const designDocument = require('./design-document.js');
const specimens = require('./specimens.js');
const dna = require('./dna.js');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

MongoClient.connect('mongodb://gigig:zxas12@ds035059.mlab.com:35059/geenes', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(port, () => {
        console.log('listening on 3000')
    })
})

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});




app.get('/', function (req, res) {
    res.send(dd);
});

router.route('/dd')
    .get(function (req, res) {
        var s;
        s = new specimens.Specimens(.5, 5);
        var dd = s.create();
        res.json(dd[0]);

         db.collection('genes').save(dd[0].genes, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
        })
    })


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);


