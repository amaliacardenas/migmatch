$(init);
function init(){
  var $sections = $('section').hide();
  $('#crossroads').show();
  getRefugees();
  $('#login, #refugeeEditForm, #charity-edit').on('submit', submitForm);
  $('.register-link, .register-charity, .register-host, .login-link, .donate-link, .addRefugee-link, .about-link, .home-link, #addRefugeeButton').on('click', showPage);
  $('.logout-link').on('click', logout);
  $('.profile-link').on('click', showProfile);
  $('.refugee-link').on('click', getRefugees);
  $('.homePage-link').on('click', getCharity);
  $('#refugee').on('submit', submitRefugee);
  $('#registerCharity, #registerHost').on('submit', submitRegister);
  checkLoginState();
  displayMap();

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
  var url = $(this).attr('action');
  // NOT JSON
  var data   = $(this).serialize();
  console.log("dat:" + data);
  form.reset();
  ajaxRequest(method, url, data, authenticationSuccessful);
  getCharity();
  
}



function loggedInState(){
  //show links with logged-in class
  //hide links with logged-out class
  //show bottles page
  $('.logged-out').hide();
    $('.logged-in').show();
    showPage();
    $('#charityHome').show();
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
    $('.logged-in').hide();
    showPage();
    $('#crossroads').show();
  console.log("logged out!")
    
}

function displayErrors(data){
  console.log("errors are displaying");
  console.log('.alert'); 
  $('.alert').removeClass("hidden");
  $('.alert').append(data.statusText);
}

function hideErrors(){
  console.log("errors are hidden");
  // remove the errors from the alert and hide it
  $('.alert').addClass("hidden");
  // empty removes all of the html. 
  $('.alert').empty();
}

function showPage(){
  //hide everything except the section you want to show 
  var $sections = $('section').hide();
  hideErrors();
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
    displayErrors(err);
  });
}