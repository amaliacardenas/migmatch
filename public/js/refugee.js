
//get all refugees
function getRefugees() {
  // get the user data from the API and call displayUsers
  event.preventDefault();
  console.log("getRefugees");
  return ajaxRequest('GET', '/api/refugees', null, displayRefugees, true);  
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
            "<p><button class='shadow more button btn btn-default' id="+ data._id + "> read more </button><button class='shadow btn-block button btn btn-default'> £" + data.amountRaised + "</button></p></div></div></div>");

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
  var id = $(this).data('id').toString();
  return ajaxRequest('DELETE', '/api/refugees/'+ id, null, getCharity);
  console.log(id);
}

