function getHostRefugees() {
  // get the user data from the API and call displayUsers
  event.preventDefault();
  // console.log("getRefugees is working");
  return ajaxRequest('GET', '/api/refugees', null, displayHostRefugees);  
 }

//display all refugees
function displayHostRefugees(data) {
  $('section').hide();
  
  $('#hostHome').fadeIn();
  var $show = $('#home');
  $show.empty();
  data.forEach(function(data) {
    $li = $("<div class='col-sm-6 col-md-4' id=" + data._id + "><div class='thumbnail'>" +
            "<div class='overlay'><p>"+ data.name +"</p></div>"  +
        
          "<img src='"+ data.avatar + "' class='refugee-avatar' >" +
          "<div class='caption'>" +
            "<p class='text' id='refugee-story-text'>"+ data.story + "</p><p><a href='#' class='moreHost' id="+ data._id + "> read more </a></p></div>" +
            "<button class='btn-block button btn btn-default'> £" + data.amountRaised + "</button></div></div>");
    $show.append($li);
  });
}

function getOneHostRefugee() {
  var id = $(this).attr('id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, displayOneHostRefugee);
}

//display one
function displayOneHostRefugee(data) {
  var user = getUser();
  $('section').hide();
  
  $('#refugeeShowHost').fadeIn();

  $li = $("<div class='col-sm-6 col-md-4 host' id=" + data._id + "><div class='thumbnail'>" +
            "<div class='overlay'><p>"+ data.name +"</p></div>"  +
        
          "<img src='"+ data.avatar + "' class='refugee-avatar' >" +
          "<div class='caption'>" +
            "<p class='text' id='refugee-story-text'>"+ data.story + "</p><p><a href='#' class='more' id="+ data._id + "> read more </a></p></div>" +
            "<button class='more btn-block button btn btn-default'> £" + data.amountRaised + "</button></div></div>");
  $('.refugeeShowHost').html($li);

  if(data.host !== user) {
    $interested = $('<button class="interested change btn-block button btn btn-default" data-id="' + data._id + '">connect</button>');
    
    $li.prepend($interested);    

    $interested.on('click', function(data){
      event.preventDefault();

      // Get the id of the clicked refugee
      var id = $(this).data('id').toString();
      
      
      // Get the id of the current logged user (host)
      var userId = getUser();
      console.log(userId);

      // Make request to /api/refugees/:id with data of potential_host: user_id
      var info = {
        potential_hosts: userId
      }
      return ajaxRequest('put', '/api/refugees/'+ id, info, getHostRefugees);  
      
    });
  } else {
    // say accepted...
    $accepted = $('<button class="interested change button btn btn-default" data-id="' + data._id + '">you have been accepted by the charity please await contact</button>');
    
    $li.prepend($accepted); 
  }
}

function getHostProfile() {
// get the user data from the API and call displayUsers
  event.preventDefault();
  var userId = getUser();
  // console.log("getRefugees is working");
  return ajaxRequest('GET', '/api/charities/'+ userId, null, displayHostProfile);  
}

function displayHostProfile(data) {
  $('section').hide();
  $('#hostProfile').fadeIn();

  //tiles for host to see
  $('#hostProfile').html("<div class='col-sm-6 col-md-4 host' id=" + data._id + ">" + "<div class='thumbnail'><div class='overlay'><p>"+ data.username + "," + data.city  +"</p></div>" + "<img src='"+ data.avatar + "' class='host-avatar' >" + "<div  class='caption'>" +
    "<p class='text' id='refugee-story-text'>"+data.description+"</p></div><button type='button' class='btn btn-block button btn btn-default editHost' name='hostEdit' data-id="+ data._id +">Edit</button><div>");

 
  // Edit the host profile
    $('.editHost').on('click', function(){
      $('section').hide();
      populate($('#host-edit'), data)
      $('#hostEdit').fadeIn();
      var id = $(this).data('id').toString();
      $('#host-edit').get(0).setAttribute('action', '/api/charities/' + id); 
    });
  }




