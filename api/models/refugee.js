var mongoose = require('mongoose');

var refugeeSchema = mongoose.Schema({
  name: String,
  avatar: String,
  images: String,
  story: String,
  lat: String,
  lng: String,
  location: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
  
});


module.exports = mongoose.model("Refugee", refugeeSchema);

//name
//where from
//charity user_id
//user_id

//our story - only avialable once a match is made