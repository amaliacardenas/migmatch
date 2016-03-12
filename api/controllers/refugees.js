var Refugee = require('../models/refugee');


//refugeesIndex
function refugeesIndex(req, res) {
  Refugee.find(function(err, refugees){
    if(err) return res.status(500).json({message: err});
      return res.status(200).json(refugees);
  });
}

//refugeesCreate

//refugeesUpdate

//refugeesDelete



module.exports ={
  index: refugeesIndex
}