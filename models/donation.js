var mongoose = require('mongoose');

var donationSchema = mongoose.Schema({
  refugee: { type: mongoose.Schema.ObjectId, ref: 'Refugee' },
  amount: { type: Number, default: 0 }
});




donationSchema.pre('save', function(next) {
  var self = this;
  this.model('Refugee').findById(this.refugee, function(err, refugee) {
    console.log(refugee);
    if(err) return next(err);
    console.log(typeof refugee.amountRaised);
    refugee.amountRaised += self.amount;
    refugee.save(function(err) {
      next(err);
    });
  });
});


module.exports = mongoose.model("Donation", donationSchema);
