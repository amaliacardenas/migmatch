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