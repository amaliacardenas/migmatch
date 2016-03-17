jQuery(function($) {
  console.log("its working")
  $('#payment-form').submit(function(event) {
    event.preventDefault();
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });

  function stripeResponseHandler(status, response) {
    var $form = $('#payment-form');

    if (response.error) {
      // Show the errors on the form
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      var data = $form.serialize();

      $.ajax({
        url: '/api/charge',
        data: data,
        method: "POST"
      }).done(function(res) {
        var $sections = $('section').hide();
        $('#crossroads').show();
        getRefugees();
      }).fail(function(err) {
        console.error(err);
      });
    }
  };
});


