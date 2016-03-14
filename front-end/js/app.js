$(init);

function init(){
  $('form').on('submit', submitForm);
  $('.register-link').on('click', showPage);
  $('.logout-link').on('click', logout);
 //create event handler for logout
 

 //create event handler for resgiter to show
 //create event handler for about section
 //create event handler for barnd name - home
 //create event handler for charity nav bar (charity homepage, add refugee, profile)
 //create event handler for host nav bar (host homepage, all refugees, profile)
// checkLoginState();

}
function checkLoginState(){
  // check for a token
  // if there is one, call loggedInState
  // otherwise, call loggedOutState
  //add if else loggedInStateHost

var token = getToken();
  if(token) {
    console.log(token);
    return loggedInState();
  }
  else {
    loggedOutState();
  }

}

function submitForm(){
  // get the data from the forms and make an ajaxRequest
  // call authenticationSuccessful
  event.preventDefault();
  var form = this;
  console.log(form);
  // Get method from form
  var method = $(this).attr('method');
  var url = "http://localhost:3000" + $(this).attr('action');
  // NOT JSON
  var data = $(this).serialize();
  console.log("dat:" + data);
  form.reset();
  ajaxRequest(method, url, data, authenticationSuccessful);
  
}

function getRefugees() {
// get the user data from the API and call displayUsers
  event.preventDefault();

  return ajaxRequest('GET', 'http://localhost:3000/refugees', null, function(data){
    displayRefugees(data);
    console.log(data);
  });    
}

// function displayRefugees(data) {
//     // take the user data and display all the users as <li>s in the <ul>, eg:
//     // <li class="list-group-item">mickyginger (mike.hayden@ga.co)</li>
//   //   $('.bottles').empty();
//   // console.log("its working");
//   //     data.forEach(function(data) {
//   //         $('.bottles').append("<li class='list-group-item'>"+data.name + "</li>")
//   //       }); 
// }

// function getCharities() {
//   //ajax request
//   //displayCharities
// }

// function displayCharities() {
//   //display charites refugees
//   //display news
//   //displays map
// }

function authenticationSuccessful(data) {
  // set the token and call checkLoginState
  if(data.token) setToken(data.token);
  checkLoginState();
}



function getToken() {
  // get the token from localStorage
  return localStorage.getItem('token');
}

function setToken(token) {
  // set the token into localStorage
  return localStorage.setItem('token', token);
}

function logout(){
  // remove the token
  // call loggedOutState
  removeToken();
  loggedOutState();
}

function removeToken() {
  localStorage.clear();
}

function loggedInState(){
  //show links with logged-in class
  //hide links with logged-out class
  //show bottles page
  $('.logged-out').hide();
    $('.logged-in').show();
    showPage();
    $('#charityHome').show();
    getRefugees();
  console.log("logged in !")
}

function loggedOutState(){
  //hide links with logged-in class
  //show links with logged-out class
  //show login page
  $('.logged-out').show();
  $('.logged-in').hide();
  showPage();
  $('#login').show();
  console.log("logged out!")
    
}

// function displayErrors(){
  
// }

// function hideErrors(){

// }

function showPage(){
  //hide everything except the section you want to show 
  var $sections = $('section').hide();
  // hideErrors();
  var $id = $(this).attr('name');
  console.log($id);
  $('#'+ $id).show();
}


//ajax request function

function ajaxRequest(method, url, data, callback) {
 
  console.log(data);

  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: function(jqXHR, settings){
      var token = getToken();
      if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer '+ token);
    }
  }).done(callback)
  .fail(function(err) {
    console.log(err);
  });
}