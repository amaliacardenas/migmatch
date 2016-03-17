  //submit add refugee form 
function submitRefugee() {
  event.preventDefault() 
  var method = $(this).attr("method");
  var url    = $(this).attr("action");
  var data   = new FormData(this);
  // clear the form
  this.reset(); 
  $('#refugee').hide();
  //charity home
  $('#charityHome').show();
  return ajaxRequestRefugee(method, url, data, getCharity);
}

//get all refugees
function getRefugees() {
  // get the user data from the API and call displayUsers
  event.preventDefault();
  console.log("getRefugees");
  return ajaxRequestRefugee('GET', '/api/refugees', null, displayRefugees);  
}

//display all refugees on homepage
function displayRefugees(data) {
  if (!data.avatar) data.avatar = '../public/images/default-avatar.png';
  console.log("displayRefugees");
  var $show = $('#show');
  $show.empty();
  // console.log("its working");
  data.forEach(function(data) {
    $li = $("<div class='col-sm-6 col-md-4' id=" + data._id + ">" +
        "<div class='thumbnail'>" +
          "<img src='"+ data.avatar + "' class='refugee-avatar' >" +
          "<div class='caption'>" +
            "<div class='overlay'><h3>"+ data.name +"</h3>" +
            "<h4>"+ data.city +"</h4></div>" +
            "<p class='text' id='refugee-story-text'>"+ data.story + "</p>" +
            "<p class='text' id='refugee-story-text'>" +'Amount raised :  '+ + data.amountRaised + "</p>" +
            "<p><button class='more button btn btn-default' id="+ data._id + "> read more" + "</button></p></div></div></div>");

    $show.append($li);
  });

  $('.more').on('click', getOneRefugee);
}

//get refugee
function getOneRefugee() {
  // console.log("I've been clicked!");
  var id = $(this).attr('id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, displayOneRefugee);
  // console.log(id);
}

//display one
function displayOneRefugee(data) {
  console.log(data);
  $('section').hide();

  // $('.refugee').empty();//seemst to delete another div
  $('#refugeeShow').show();
  $('.refugeeShow').empty();
  $('.avatar').empty().append("<img src='"+ data.avatar + "' class='refugee-avatar-showpage img-thumbnail' ><h1>" + data.name + "</h1>");
  $('.actions').append("<p>Amount raised: "+ data.amountRaised + "</p>");
  $('.info').empty().append("<p>"+ data.story + "</p>")

  var input = $("#refugeeId");
  input.val( input.val() + data._id );


  // $('.refugeeInfo').empty().append(
  //   "<img src='"+ data.avatar + "' class='refugee-avatar-showpage img-thumbnail' ><h1>" + data.name + "</h1><div class='container' id='refugee-story-text-showpage'><p>"+ data.story + "</p></div>" + "<div class='container' id='refugee-story-text-showpage'><p>"+ 'Amount raised: '+ data.amountRaised + "</p></div>");


 

  // $('.donate').on('click', function() {
  //   $(this).html('cancel');
  //   $('.payment-form').slideDown();
  // });
  
}



//populate
function populate(frm, data) {
  $.each(data, function(key, value){
    $('[name='+key+']', frm).val(value);
  });
} 

//delete
function deleteOneRefugee() {
  console.log("I've been clicked!");
  var id = $(this).attr('id').toString();
  return ajaxRequest('DELETE', '/api/refugees/'+ id, null, getCharity);
  console.log(id);
}

function ajaxRequestRefugee(method, url, data, callback) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    contentType: false, // allow ajax to send file data
    processData: false, // allow ajax to send file data
    beforeSend: function(jqXHR, settings){
      var token = getToken();
      if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer '+ token);
    }
  }).done(callback)
  .fail(function(err) {
    displayErrors(err);
  });
}