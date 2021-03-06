// var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('../services/users.service');
 
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/check/:username', checkUsername);
router.get('/check/email/:email', checkEmail);
router.put('/:_id', update);
router.delete('/:_id', _delete);
 
module.exports = router;
 
function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then( (user) => {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch( (err) =>{
            res.status(400).send(err);
        });
}
 
function register(req, res) {
    userService.create(req.body)
        .then( () => {
            res.sendStatus(200);
        })
        .catch( (err) => {
            res.status(400).send(err);
        });
}
 
function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then( (user) =>{
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch( (err) => {
            res.status(400).send(err);
        });
}

function checkUsername(req, res) {
    userService.checkUsername(req.params.username)
         .then((data) => {
            res.send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function checkEmail(req, res) {
    userService.checkEmail(req.params.email)
         .then((data) => {
            res.send(data);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then( () =>{
            res.sendStatus(200);
        })
        .catch( (err) =>{
            res.status(400).send(err);
        });
}
 
function _delete(req, res) {
    userService.delete(req.params._id)
        .then( () =>{
            res.sendStatus(200);
        })
        .catch( (err) => {
            res.status(400).send(err);
        });
}