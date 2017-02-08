const express = require('express');
const app = express();
// database
const MongoClient = require('mongodb').MongoClient

const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
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

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

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




app.get('/projects', function (req, res) {
    db.collection('genes').find().toArray(function(err, results) {
     res.render('projects.html', {project: results});

    })
});


app.get('/projects/:id'), function(req,res) {
    var name = req.params.id;
    res.render(name);
    console.log(name);
    res.end();
};

router.route('/projects')
    .post(function (req, res) {
        var s;
        s = new specimens.Specimens(req.body.name, .5, 5);
        var dd = s.create();
            console.log(s);     

         db.collection('genes').save( s, (err, result) => {
            if (err) return console.log(err)

            console.log('saved to database')
            res.redirect('/projects')
                })
    })

router.route('/projects')
    .get(function (req, res) {
        db.collection('genes').find({},{'projectName':1, _id: 0}).toArray(function(err, results){ 
           if(err) res.send(err);
            res.jsonp(results);
            
        });
    })    
    



// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);


