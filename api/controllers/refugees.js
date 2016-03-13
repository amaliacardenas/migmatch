var Refugee = require('../models/refugee');


//refugeesIndex
function refugeesIndex(req, res) {
  Refugee.find(function(err, refugees){
    if(err) return res.status(500).json({message: err});
      return res.status(200).json(refugees);
  });
}

//refugeesCreate
function refugeesCreate(req, res) {
  Refugee.create(req.body, function(err, refugee) {
    if(err) return res.status(500).json({ message: err });
    console.log(refugee);
    return res.status(200).json(refugee);
  });
}

//refugeesUpdate

//refugeesDelete



module.exports ={
  index: refugeesIndex,
  create: refugeesCreate
}