//submit add refugee form 
function submitRefugee() {
  event.preventDefault() 
  var method = $(this).attr("method");
  var url    = $(this).attr("action");
  var data   = new FormData(this);
  // clear the form
  this.reset() 
  return ajaxRequestRefugee(method, url, data, getRefugees);
}

//get all refugees
function getRefugees() {
  // get the user data from the API and call displayUsers
  event.preventDefault();
  // console.log("getRefugees is working");
  return ajaxRequestRefugee('GET', '/api/refugees', null, displayRefugees);  
 }

//display all refugees
function displayRefugees(data) {
    // take the user data and display all the users as <li>s in the <ul>, eg:
    // <li class="list-group-item">mickyginger (mike.hayden@ga.co)</li>
  var $show = $('#show');
  $show.empty();
  console.log("its working");
  data.forEach(function(data) {
    $button = $("<button class='button btn btn-default' id="+ data._id + "> read more" + "</button>");
    $button.on('click', getOneRefugee);
    $li = $("<div class='col-sm-6 col-md-4'>"+
        "<div class='thumbnail'>" +
          "<img src="+ data.avatar + "class='refugee-avatar' >" +
          "<div class='caption overlay'>" +
            "<h3>"+ data.name +"</h3>" +
            // "<h4>"+ data.location +"</h4>" +
            "<p class='text'>" + data.story +"</p>" +
            "</div></div></div>");
    $li.append($button);
    $show.append($li);
  });
}

//get refugee
function getOneRefugee() {
  console.log("I've been clicked!");
  var id = $(this).attr('id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, displayOneRefugee);
  console.log(id);
}

//display one
function displayOneRefugee(data) {
  console.log(data);
  $('section').hide();
  
  $('#refugeeShow').show()
  $('.refugee').append("<li>" + data.name + "<button class='delete' id="+data._id +">Delete</button>"+ "<button name='refugeeEdit' class='edit' id="+data._id +">Edit</button>"+"</li>");
  var input = $("#refugeeId");
  input.val( input.val() + data._id );
  $('.delete').on('click', deleteOneRefugee)
  $('.edit').on('click', function(){
    $('section').hide();
    populate($('#refugeeEditForm'), data)
    $('#refugeeEdit').show()
    var id = $(this).attr('id').toString();
    $('#refugeeEditForm').get(0).setAttribute('action', '/api/refugees/' + id); 
  }); 
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
  return ajaxRequest('DELETE', '/api/refugees/'+ id, null, displayOneRefugee);
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