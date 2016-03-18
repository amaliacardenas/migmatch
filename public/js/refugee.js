
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
  var $show = $('#show');
  $show.empty();
  data.forEach(function(data) {
    $li = $("<div class='col-sm-6 col-md-4' id=" + data._id + "><div class='thumbnail'>" +
            "<div class='overlay'><p>"+ data.name +"</p></div>"  +
        
          "<img src='"+ data.avatar + "' class='refugee-avatar' >" +
          "<div class='caption'>" +
            "<p class='text' id='refugee-story-text'>"+ data.story + "</p><p><a href='#' class='more' id="+ data._id + "> read more </a></p></div>" +
            "<button class='more btn-block button btn btn-default'> £" + data.amountRaised + "</button></div></div>");

    $show.append($li);
  });

  $('.more').on('click', getOneRefugee);
}

//get refugee
function getOneRefugee() {
  var id = $(this).attr('id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, displayOneRefugee);
}

 //display one
function displayOneRefugee(data) {
  console.log(data);
  $('section').hide();

  // $('.refugee').empty();//seemst to delete another div
  $('#refugeeShow').show();
  $('.refugeeShow').empty();
  $('.avatar').empty().append("<div class='thumbnail showRefugee'><img src='"+ data.avatar + "' class='refugee-avatar-showpage img-thumbnail' ><h1>" + data.name + "</h1>"+"<p class='new'>"+ data.story + "</p></div>");
 
  // $('.info').empty().append("<p>"+ data.story + "</p>")

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
  var id = $(this).data('id').toString();
  return ajaxRequest('DELETE', '/api/refugees/'+ id, null, getCharity);
}

