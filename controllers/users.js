var User = require('../models/user');
var jwt    = require('jsonwebtoken');
var secret = require('../config/tokens').secret;


function usersIndex(req, res) {
  User.find().populate('refugees').exec(function(err, users) {
    if(err) return res.status(500).json({ message: err });
    console.log(users);
    return res.status(200).json(users);
  });
}


//usersUpdate

function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, user) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(user);
  });
}

//user show

function usersShow(req, res) {
  User.findById(req.params.id).populate('refugees').exec(function(err, user) {
    if(err) return res.status(500).json({ message: err });
    if(!user) return res.status(404).send();
    return res.status(200).json(user);
  });
}

function acceptRefugee(req, res) {
  User.findByIdAndUpdate(req.params.id, {$set: {refugees: req.body.refugeeId}}, { new: true }, function(err, user) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(user);
  });
}

module.exports = {
  index: usersIndex,
  update: usersUpdate,
  show: usersShow,
  accept: acceptRefugee
}


