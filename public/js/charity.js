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
  data.refugees.forEach(function(refugee) {
    $('#showRefugees').append("<li class='list-group-item'>"+ refugee.name + "</li>");
  });
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
  $('#showCharity').append("<li class='list-group-item'>"+ data.name + "<button name='charityEdit' class='editCharity' id="+data._id +">Edit</button>"+ "</li>");
  $('.editCharity').on('click', function(){
    $('section').hide();
    populate($('#charity-edit'), data)
    $('#charityEdit').show()
    var id = $(this).attr('id').toString();
    $('#charity-edit').get(0).setAttribute('action', '/api/charities/' + id); 
  });
}
