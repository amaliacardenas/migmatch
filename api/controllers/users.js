var User = require('../models/user');
var jwt    = require('jsonwebtoken');
var secret = require('../config/tokens').secret;


function usersIndex(req, res) {
  User.find(function(err, users) {
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

module.exports = {
  index: usersIndex,
  update: usersUpdate
}


