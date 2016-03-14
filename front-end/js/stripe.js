jQuery(function($) {
  console.log("its working")
  $('#payment-form').submit(function(event) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });


  $.get('http://content.guardianapis.com/search?show-elements=all&q=%22migrant%20crisis%22&api-key=2609a777-0ca5-4710-a36c-5230a629b169').then(function(res){ console.log(res) });
});


