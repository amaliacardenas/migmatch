var mongoose = require('mongoose');

var refugeeSchema = mongoose.Schema({
  name: String,
  avatar: String,
  story: String,
  lat: String,
  lng: String,
  city: String,
  language: String,
  amountRaised: { type: Number, default: 0 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
  //potential_hosts: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  //when charity chooses host, 
  //host: { type: mongoose.Schema.ObjectId, ref: 'User' } 
  
});

refugeeSchema.pre('save', function(next){
  if(!this.user) next();

  this.model('User').findByIdAndUpdate(this.user, {$push: {refugees:this._id}}, function(err, user) {
    console.log(err, user);
    next(err);
  });
});


refugeeSchema.pre('remove', function(next){
  console.log("is it working");
  console.log(this._id);
  this.model('User').update({ refugees: this._id }, { $pull: {refugees:this._id }}, { multi:true }, next);
});

module.exports = mongoose.model("Refugee", refugeeSchema);

//name
//where from
//charity user_id
//user_id

//our story - only avialable once a match is made