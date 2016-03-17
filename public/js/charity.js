function getCharity() {
// get the user data from the API and call displayUsers
  event.preventDefault();
  var userId = getUser();
  console.log(userId);
  // console.log("getRefugees is working");
  return ajaxRequest('GET', '/api/charities/'+ userId, null, displayCharity);  
}

function displayCharity(data) {
//   //display charites refugees
//   //display news
//   //displays map
  console.log(data);
  $('section').hide();
  $('#charityHome').show()
  $('#showRefugees').empty();
  console.log(data.refugees);
  //tiles for charity to see
  data.refugees.forEach(function(refugee) {
    $('#showRefugees').append("<div class='col-sm-6 col-md-4' id=" + refugee._id + ">" + "<div class='thumbnail'>" + "<img src='"+ refugee.avatar + "' class='refugee-avatar' >" + "<div class='caption'>" +
      "<div class='overlay'><h3>"+ refugee.name +"</h3>" + "<h4>"+ refugee.city +"</h4></div>" + "<p class='text' id='refugee-story-text'>"+ refugee.story + "</p>" + "<p class='text' id='refugee-story-text'>" +'Amount raised :  '+ + refugee.amountRaised + "</p>" +
        "<p><button class='manage button btn btn-default' id="+ refugee._id + "> manage " + "</button></p></div></div></div>");



    });

    $('.manage').on('click', getRefugeeManage);
  
}

function getRefugeeManage() {
  // console.log("I've been clicked!");
  var id = $(this).attr('id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, manageRefugee);
  // console.log(id);
}

//appends edit, delete and potnetial hosts button
function manageRefugee(data) {
  console.log(data);
  $('section').hide();
  $('#refugeeShowManage').show();
  $('.refugeeManage').append("<li>" +"<img src='"+ data.avatar + "' class='refugee-avatar' >" + data.name + " " + data.story + "  <button class='delete' id="+data._id +">Delete</button>"+ "<button name='potential' class='potential' id="+data._id +">potential hosts</button>"+ "<button name='refugeeEdit' class='edit' id="+data._id +">Edit</button>"+"</li>");
  //puts regugee id into form
  var input = $("#refugeeId");
  input.val( input.val() + data._id );
  $('.delete').on('click', deleteOneRefugee)
  //edit function
  $('.edit').on('click', function(){
    $('section').hide();
    populate($('#refugeeEditForm'), data)
    $('#refugeeEdit').show();
    var id = $(this).attr('id').toString();
    $('#refugeeEditForm').get(0).setAttribute('action', '/api/refugees/' + id); 
  });
  $('.potential').on('click', getPotentialHosts) 
}

function getPotentialHosts(){
  var id = $(this).attr('id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, displayPotentialHosts);
}

function displayPotentialHosts(data) {
  $('section').hide();
  $('#charityAccept').show();
  var refugeeID = data._id;
 console.log(data.potential_hosts[0].username);
 data.potential_hosts.forEach(function(host){
  $('.accept').html("<div class='col-sm-6 col-md-4' id=" + host._id + ">" + "<div class='thumbnail'>" + "<img src='"+ host.avatar + "' class='refugee-avatar' >" + "<div class='caption'>" +
      "<div class='overlay'><h3>"+ host.username +"</h3>" + "<h4>"+ host.city +"</h4></div>" + "<p class='text' id='refugee-story-text'>"+ host.description + "</p>" +
        "<p><form id='acceptForm' action='/api/hosts/" + host._id + "/accept' method='put'><input type='hidden' name='refugees' value=" + refugeeID + "><button class='accept button btn btn-default' type='submit'> accept " + "</button></form></p></div></div></div>")
  console.log(refugeeID);
 })
  // <form action="hosts/:id/accept" method="put">
  $('#acceptForm').on('submit', acceptHost);
  // <input type="hidden" name="refugeeId" value=//as>
  // </form>
}

function acceptHost() {
  event.preventDefault();
  var form = this;
  console.log(form);
  // Get method from form
  var method = $(this).attr('method');
  var url = $(this).attr('action');
  // NOT JSON
  var data   = $(this).serialize();
  console.log("dat:" + data);
  ajaxRequest(method, url, data, getCharity);
}


//profile page
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
  $('#charityShow').show()
  $('#showCharity').html("<li class='list-group-item'>"+ data.username + "<img id='charityimage'src="+ data.avatar  +">"+ data.description + data.website + "<button name='charityEdit' class='editCharity' id="+data._id +">Edit</button>"+ "</li>");
  $('.editCharity').on('click', function(){
    $('section').hide();
    populate($('#charity-edit'), data)
    $('#charityEdit').show()
    var id = $(this).attr('id').toString();
    $('#charity-edit').get(0).setAttribute('action', '/api/charities/' + id); 
  });
}
