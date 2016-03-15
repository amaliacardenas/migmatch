var Refugee = require('../models/refugee');
var jwt    = require('jsonwebtoken');
var secret = require('../config/tokens').secret;
var s3Config = require('../config/s3');



//refugeesIndex
function refugeesIndex(req, res) {
  Refugee.find(function(err, refugees){
    if(err) return res.status(500).json({message: err});
      return res.status(200).json(refugees);
  });
}

//refugeesCreate
function refugeesCreate(req, res) {
  // add filename to user object before create
  var refugee = req.body;
  console.log("USER", req.user);
  if(req.file){
    refugee.avatar = s3Config.endpoint + s3Config.bucket + '/' + req.file.key;
  } else {
    refugee.avatar = "default image url"
  }
  
  refugee.user = req.user._id;
  Refugee.create(refugee, function(err, refugee) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(refugee);
  });
}

//refugeesShow
function refugeesShow(req, res) {
  Refugee.findById(req.params.id, function(err, refugee) {
    if(err) return res.status(500).json({ message: err });
    if(!refugee) return res.status(404).send();
    return res.status(200).json(refugee);
  });
}

//refugeesUpdate
function refugeesUpdate(req, res) {
  Refugee.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, refugee) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json(refugee);
  });
}

//refugeeUpdate PATCH
function refugeesUpdateOne(req, res) {
  Refugee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function(err, refugee) {
    console.log(refugee);
    if(err) return res.status(500).json({message: err});
    return res.status(200).json(refugee);
  });
}

//refugeesDelete
function refugeesDelete(req, res) {
  Refugee.findByIdAndRemove(req.params.id, function(err, refugee) {
    if(err) return res.status(500).json({ message: err });
    return res.status(204).send();
  });
}



module.exports ={
  index: refugeesIndex,
  create: refugeesCreate,
  show: refugeesShow,
  update: refugeesUpdate,
  updateOne: refugeesUpdateOne,
  delete: refugeesDelete
}