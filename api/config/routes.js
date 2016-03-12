var router = require('express').Router();
var jwt = require('jsonwebtoken');
var usersController = require('../controllers/users');
var authenticationController = require('../controllers/authentication');
var secret = require('../config/tokens').secret;
var refugeesController = require('../controllers/refugees');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, user) {
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);


router.route('/refugees')
  .get(refugeesController.index);





module.exports = router;


