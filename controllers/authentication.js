var User = require('../models/user');
var jwt  = require('jsonwebtoken');
var secret = require('../config/tokens').secret;
var s3Config = require('../config/s3');

function register(req, res) {

  if(req.file) {
    // add filename to user object before create
    req.body.avatar = s3Config.endpoint + s3Config.bucket + '/' + req.file.key;
  }

  console.log("REGISTER BODY",req.body);

  User.create(req.body, function(err, user) {
    // tidy up mongoose's awful error messages
    if(err) {
      console.log(err);
      if(err.code && (err.code === 11000 || err.code === 11001)) {
        var attribute = err.message.match(/\$?([a-z]+)_[0-9]/)[1];
        err = "An account with that " + attribute + " already exists";
      }
      return res.status(400).json({ message: err.toString() });
    }
    var payload = { _id: user._id, username: user.username, email: user.email, role: user.role };
    var token = jwt.sign(payload, secret, "24h");
    return res.status(200).json({ message: "Thanks for registering", user: user, token: token });
  });
}

function login(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if(err) return res.send(500).json({ message: err });
    if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: "Unauthorized" });

    var payload = { _id: user._id, username: user.username, email: user.email, role: user.role };
    var token = jwt.sign(payload, secret, "24h");
    return res.status(200).json({ message: "Login successful", user: user, token: token });
  });
}


module.exports = {
  register: register,
  login: login
};