var router = require('express').Router();
var jwt = require('jsonwebtoken');
var usersController = require('../controllers/users');
var authenticationController = require('../controllers/authentication');
var secret = require('../config/tokens').secret;
var refugeesController = require('../controllers/refugees');
var stripesController = require('../controllers/stripe');

//IMAGE UPLOADING VARIABLE
var multer = require('multer');
var s3 = require('multer-s3');
var uuid = require('uuid');
var s3Config = require('./s3');



function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, user) {
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// IMAGE UPLOADING 
var upload = multer({
  storage: s3({
    // the folder within the bucket
    dirname: s3Config.dirname,
    // set this to your bucket name
    bucket: s3Config.bucket,
    // your AWS keys
    secretAccessKey: s3Config.secretAccessKey,
    accessKeyId: s3Config.accessKeyId,
    // the region of your bucket
    region: s3Config.region,
    // IMPORTANT: set the mime type to that of the file
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    // IMPORTANT: set the file's filename here
    // ALWAYS CHANGE THE FILENAME TO SOMETHING RANDOM AND UNIQUE
    // I'm using uuid (https://github.com/defunctzombie/node-uuid)
    filename: function(req, file, next) {
      // Get the file extension from the original filename
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      // create a random unique string and add the file extension
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});


// ROUTES
router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);


router.route('/refugees')
  .get(refugeesController.index)
  .post(secureRoute, upload.single('avatar'), refugeesController.create);

router.route('/refugees/:id')
  .get(refugeesController.show)
  .put(secureRoute, refugeesController.update)
  .patch(refugeesController.updateOne)
  .delete(refugeesController.delete);


router.route('/charities')
  .get(usersController.index);

router.route('/charities/:id')
  .get(usersController.show)
  .put(usersController.update);

router.post('/charge', stripesController.create);  






module.exports = router;


