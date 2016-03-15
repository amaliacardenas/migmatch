var stripe = require('stripe')('sk_test_0yjcpg1SRMCkmpmfSlvL22fx');
var Donation = require('../models/donation');

function stripesCreate (req, res) {
  var stripeToken = req.body.stripeToken;
  var amount = parseInt(req.body.amount,10) * 100;

  var charge = stripe.charges.create({
    card: stripeToken,
    currency: 'usd',
    amount: amount
  },
  function(err, charge) {
    if (err) {
      return res.send(500, err);
    } else {
      var donation = req.body;
      donation.amount = amount;
      console.log(donation);
      console.log(typeof donation.amount);
     
      Donation.create(donation, function(err, donation) {
        if(err) return res.status(500).json({ message: err });
        return res.status(200).json(donation);
      });
    }
  });
} 

module.exports = {
  create: stripesCreate
}