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



//usersIndex


//usersCreate


//usersUpdate

module.exports = {
  index: usersIndex
}


