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
service.checkUsername = checkUsername;
service.checkEmail = checkEmail;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    User.findOne({ username: username }, (err, user) => {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, process.env.SECRET, { expiresIn: '24h' })
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function checkUsername(username) {
    var deferred = Q.defer();
    if (!username) {
        deferred.reject('input a username to check');
    } else {
        User.findOne(
            { username: username },
            (err, user) => {
                if (err) deferred.reject(err.name + ': ' + err.message);

                if (user) {
                    // username already exists
                    deferred.resolve({ success: false, message: 'Username "' + username + '" is already taken' });
                } else {
                    deferred.resolve({ success: true, message: 'Username available' });
                }
            });
    }
    return deferred.promise;
}

function checkEmail(email) {
    var deferred = Q.defer();
    if (!email) {
        deferred.reject('input an email address to check');
    } else {
        User.findOne(
            { email: email },
            (err, user) => {
                if (err) deferred.reject(err.name + ': ' + err.message);

                if (user) {
                    // email already exists
                    deferred.resolve({ success: false, message: 'Email "' + email + '" is already taken' });
                } else {
                    deferred.resolve({ success: true, message: 'Email available' });
                }
            });
    }
    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    User.find({}, (err, users) => {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, (user) => {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });



    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    User.findById(_id, (err, user) => {
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
    if (!userParam.username) {
        deferred.reject({ success: false, message: 'You must provide a username' }); // Return error
    } else {
        if (!userParam.email) {
            deferred.reject({ success: false, message: 'You must provide an email' }); // Return error
        } else {
            if (!userParam.password) {
                deferred.reject({ success: false, message: 'You must provide a password' }); // Return error
            } else {

                // validation
                User.findOne(
                    { username: userParam.username },
                    (err, user) => {
                        if (err) deferred.reject(err.name + ': ' + err.message);

                        if (user) {
                            // Username already exists
                            deferred.reject('Username "' + userParam.username + '" is already taken');
                        } else {
                            User.findOne(
                                { email: userParam.email },
                                (err, user) => {
                                    if (err) deferred.reject(err.name + ': ' + err.message);

                                    if (user) {
                                        // Email already exists
                                        deferred.reject('Email "' + userParam.email + '" is already taken');
                                    } else {
                                        // password length validation
                                        if(!passwordLengthChecker(userParam.password)){
                                             deferred.reject('Password must be at least 8 characters but no more than 35');
                                        }else{
                                        // finally create user
                                        createUser();
                                        }
                                    }
                                });
                        }
                    });
            }
        }
    }
    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);
        user._id = new mongoose.Types.ObjectId();
        new User(user).save((err, doc) => {
            if (err) {
                if (err.errors) {
                    if (err.errors.email) {
                        deferred.reject(err.errors.email.message);
                    } else {
                        if (err.errors.username) {
                            deferred.reject(err.errors.username.message);
                        } else {
                            if (err.errors.hash) {
                                deferred.reject(err.errors.hash.message);
                            }
                        }
                    }
                }
            }

            deferred.resolve();
        })
    }

    // Validate Function to check password length
function passwordLengthChecker(password) {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 35) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};


    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    User.findById(_id, (err, user) => {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken                
            User.findOne(
                { username: userParam.username },
                (err, user) => {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + userParam.username + '" is already taken')
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
