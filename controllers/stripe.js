var stripe = require('stripe')('sk_test_0yjcpg1SRMCkmpmfSlvL22fx');

function stripesCreate (req, res) {
  var stripeToken = req.body.stripeToken;
  var amount = parseInt(req.body.amount,10) * 100;

  var charge = stripe.charges.create({
    card: stripeToken,
    currency: 'usd',
    amount: amount
    //refugee
  },
  function(err, charge) {
    if (err) {
      res.send(500, err);
    } else {
      // create the donation
      // on callback
      // if err res.status(500)
        res.send(204);
    }
  });
} 

module.exports = {
  create: stripesCreate
}