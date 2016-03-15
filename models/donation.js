
var donationSchema = mongoose.Schema({
  refugee: { type: mongoose.Schema.ObjectId, ref: 'User' },
  amount: Number
});




donationSchema.pre('save', function(next) {
  var self = this;
  this.model('Refugee').findById(this.refugee, function(err, refugee) {
    
    if(err) return next(err);

    refugee.amountRaised += self.amount;
    refugee.save(function(err) {
      next(err);
    });
  });
});


module.exports = mongoose.model("Donation", donationSchema);
