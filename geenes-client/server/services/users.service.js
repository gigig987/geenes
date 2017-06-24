// var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Q = require('q');
var User = require('../models/user.js');
var mongoose = require('mongoose');
require('mongoose').Promise = global.Promise;

var service = {};
 
service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
 
module.exports = service;
 
function authenticate(username, password) {
    var deferred = Q.defer();
 
    User.findOne({ username: username },  (err, user) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, process.env.SECRET,{ expiresIn: '24h' })
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}
 
function getAll() {
    var deferred = Q.defer();
 
    User.find({}, (err, users) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        // return users (without hashed passwords)
        users = _.map(users,  (user) => {
            return _.omit(user, 'hash');
        });
 
        deferred.resolve(users);
    });

    
 
    return deferred.promise;
}
 
function getById(_id) {
    var deferred = Q.defer();
 
    User.findById(_id,  (err, user) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}
 
function create(userParam) {
    var deferred = Q.defer();
 
    // validation
    User.findOne(
        { username: userParam.username },
         (err, user) => {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });
 
    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');
 
        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
        user._id = new mongoose.Types.ObjectId();
        new User(user).save((err, doc) =>{
             if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
        })
    }
 
    return deferred.promise;
}
 
function update(_id, userParam) {
    var deferred = Q.defer();
 
    // validation
    User.findById(_id,  (err, user) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            User.findOne(
                { username: userParam.username },
                 (err, user) =>{
                    if (err) deferred.reject(err.name + ': ' + err.message);
 
                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });
 
    function updateUser() {
        // fields to update
        var set = {
            firstName: userParam.firstName,
            lastName: userParam.lastName,
            username: userParam.username,
        };
 
        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }
 
        User.update(
            { _id: mongoose.Types.ObjectId(_id) },
            set,
             (err, doc) => {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}
 
function _delete(_id) {
    var deferred = Q.defer();
 
    User.remove(
        { _id: mongoose.Types.ObjectId(_id) },
         (err) => {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            deferred.resolve();
        });
 
    return deferred.promise;
}
