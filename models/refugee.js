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
  host: { type: mongoose.Schema.ObjectId, ref: 'User' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  potential_hosts: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  connection: Boolean
  //patch potential hosts 
  //when charity chooses host, 
  //host: { type: mongoose.Schema.ObjectId, ref: 'User' } 
  //when charity picks host that refugee id is pushed into refugees row
  //and if refugees user.length = 2 status on refugee changes to connected
  
});

//when host click interest that id pushed in to potential hosts
//when charity approves, refugee id pushed into refugees


refugeeSchema.pre('save', function(next){
  if(!this.user) next();
  this.model('User').findByIdAndUpdate(this.user, { $push: { refugees:this._id } }, { new: true }, function(err, user) {
    next(err);
  });
});





refugeeSchema.pre('remove', function(next){
  this.model('User').update({ refugees: this._id }, { $pull: {refugees:this._id }}, { multi:true }, next);
});

module.exports = mongoose.model("Refugee", refugeeSchema);

//name
//where from
//charity user_id
//user_id

//our story - only avialable once a match is made