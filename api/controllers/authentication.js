var User = require('../models/user');
var jwt  = require('jsonwebtoken');
var secret = require('../config/tokens').secret;

function register(req, res) {
  User.create(req.body, function(err, user) {
    // tidy up mongoose's awful error messages
    if(err) {
      if(err.code && (err.code === 11000 || err.code === 11001)) {
        var attribute = err.message.match(/\$([a-z]+)_/)[1];
        err = "An account with that " + attribute + " already exists";
      }
      return res.status(400).json({ message: err.toString() });
    }

    var token = jwt.sign(user, secret, "24h");
    return res.status(200).json({ message: "Thanks for registering", user: user, token: token });
  });
}


module.exports = {
  register: register
};