function getCharity() {
// get the user data from the API and call displayUsers
  event.preventDefault();
  var userId = getUser();
  console.log("getCharity Called");
  return ajaxRequest('GET', '/api/charities/'+ userId, null, displayCharity);  
}

function displayCharity(data) {
//display charites refugees
  $('section').hide();
  $('#charityHome').fadeIn()
  $('#showRefugees').empty();
  console.log(data.refugees);
  //tiles for charity to see
  data.refugees.forEach(function(refugee) {
    $('#showRefugees').append("<div class='col-sm-6 col-md-4' id=" + refugee._id + "><div class='thumbnail'><div class='overlay'><p>"+ refugee.name +"</p></div>"  +"<img src='"+ refugee.avatar + "' class='refugee-avatar' ><div class='caption'><p class='text' id='refugee-story-text'>" + refugee.story + "</p><p><a href='#' class='manage' id="+ refugee._id + "> manage </a></p></div>" + "<button class='btn-block button btn btn-default'> £" + refugee.amountRaised + "</button></div></div>");
  });
    $('.manage').on('click', getRefugeeManage);
}

//charity manage refugee
function getRefugeeManage() {
  var id = $(this).attr('id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, manageRefugee);
  
}

//appends edit, delete and potnetial hosts button
function manageRefugee(data) {
  console.log(data);
  $('section').hide();
  $('#refugeeShowManage').fadeIn();
  $('.refugeeManage').empty();
//need to add quotations
  $delete = $('<button class="delete button btn btn-default change" data-id="'+data._id +'">Delete</button>');
  $potential = $('<button name="potential" class="potential button btn btn-default change" data-id='+data._id +">potential hosts</button>");
  $edit = $('<button name="refugeeEdit" class="edit button btn btn-default change" data-id="' + data._id +'">Edit</button>');
  $li = $("<div class='col-sm-6 col-md-4 host' id=" + data._id + ">" + "<div class='thumbnail'><div class='overlay'><p>"+ data.name + "," + data.city  +"</p></div>" + "<img src='"+ data.avatar + "' class='host-avatar' >" + "<div  class='caption'><p class='text' id='refugee-story-text'>"+data.story+"</p></div>");
  $li.prepend($edit);
  $li.prepend($delete);
  $li.prepend($potential);

  $('.refugeeManage').append($li);
  //puts regugee id into form
  var input = $("#refugeeId");
  input.val( input.val() + data._id );
  $delete.on('click', deleteOneRefugee)
  //edit function
  $edit.on('click', function(){
    $('section').hide();
    populate($('#refugeeEditForm'), data);
    $('#refugeeEdit').fadeIn();
    var id = $(this).attr('data-id').toString();
    $('#refugeeEditForm').get(0).setAttribute('action', '/api/refugees/' + id); 
  });
  $potential.on('click', getPotentialHosts) 
}

function getPotentialHosts(){
  var id = $(this).attr('data-id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, displayPotentialHosts);
}

function displayPotentialHosts(data) {
  $('section').hide();
  $('#charityAccept').fadeIn();
  var refugeeID = data._id;
 console.log(data.potential_hosts[0].username);
 data.potential_hosts.forEach(function(host){
  $('.accept').html("<div class='col-sm-6 col-md-4 host' id=" + host._id + ">" +"<div class='thumbnail'><div class='overlay'><p>"+ host.username + "</div><img src='"+ host.avatar + "' class='refugee-avatar' >" + "<div class='caption'>" +
       "<p class='text' id='refugee-story-text'>"+ host.description + "</p>" + "<p></div><form id='acceptForm' action='/api/hosts/" + host._id + "/accept' method='put'><input type='hidden' name='refugees' value=" + refugeeID + "><button class='btn-block button btn btn-default accept' type='submit'> accept " + "</button></form></p></div></div>");
    });
  $('#acceptForm').on('submit', submitForCharity);
}


function showProfile() {
// get the user data from the API and call displayUsers
  event.preventDefault();
  var userId = getUser();
  console.log(userId);
  // console.log("getRefugees is working");
  return ajaxRequest('GET', '/api/charities/'+ userId, null, displayProfile);  
}


function displayProfile(data) {
  $('section').hide();
  $('#charityShow').fadeIn();
  $('#showCharity').html("<div class='col-sm-6 col-md-4 host' id=" + data._id + ">" + "<div class='thumbnail'><div class='overlay'><p>"+ data.username + "," + data.city  +"</p></div>" + "<img src='"+ data.avatar + "' class='host-avatar' >" + "<div  class='caption'>" +
      "<p class='text' id='refugee-story-text'>"+data.description+"</p></div><button name='charityEdit' class='editCharity btn-block btn-default button btn change' id="+data._id +">edit</button><div>");

  
  $('.editCharity').on('click', function(){
    $('section').hide();
    populate($('#charity-edit'), data)
    $('#charityEdit').show()
    var id = $(this).attr('id').toString();
    $('#charity-edit').get(0).setAttribute('action', '/api/charities/' + id); 
  });
}
