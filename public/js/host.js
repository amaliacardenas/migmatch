function getHostRefugees() {
  // get the user data from the API and call displayUsers
  event.preventDefault();
  // console.log("getRefugees is working");
  return ajaxRequestRefugee('GET', '/api/refugees', null, displayHostRefugees);  
 }

//display all refugees
function displayHostRefugees(data) {
    // take the user data and display all the users as <li>s in the <ul>, eg:
    // <li class="list-group-item">mickyginger (mike.hayden@ga.co)</li>
  // $('section').hide();
  // if (!data.avatar) data.avatar = '../public/images/default-avatar.png';
  // $('#crossroadsHome').show()
  $('section').hide();
  
  $('#hostHome').show();
  console.log("displayRefugees");
  var $show = $('#home');
  $show.empty();
  console.log("its working");
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
    $('.more').on('click', getOneHostRefugee);
    $show.append($li);
  });
}

function getOneHostRefugee() {
  console.log("I've been clicked!");
  var id = $(this).attr('id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, displayOneHostRefugee);
  console.log(id);
}

//display one
function displayOneHostRefugee(data) {
  console.log(data);
  $('section').hide();
  
  $('#refugeeShow').show();

  $('.refugee').append("<li>" + data.name + "<button class='interested' id="+data._id +">interested</button>"+"</li>");
  

  $('.interested').on('click', function(data){
    event.preventDefault();

    // Get the id of the clicked refugee
    var id = $(this).attr('id').toString();
    console.log(id);
    $('.interested').chos
    
    // Get the id of the current logged user (host)
    var userId = getUser();
    console.log(userId);

    // Make request to /api/refugees/:id with data of potential_host: user_id
    var info = {
      potential_hosts: userId
    }
    return ajaxRequest('put', '/api/refugees/'+ id, info, function(data){
      console.log(data);
    });  
    
  }); 
}

function interested() {
  console.log("i'm interested");

}