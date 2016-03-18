$(init);
function init(){
  var $sections = $('section').hide();
  $('#crossroads').show();
  getRefugees();
  //submit events
  $('#login, #charity-edit').on('submit', submitForm);
  $('#refugeeEditForm').on('submit', submitForCharity);
  $('#host-edit').on('submit', submitHostForm);
  $('#refugee').on('submit', submitRefugee);
  $('#registerCharityForm').on('submit', submitRegister);
  $('#registerHostForm').on('submit', submitRegisterHost);
  $('#hostHome').on('click', '.moreHost', getOneHostRefugee);
  
  //showpage events
  $('.register-link, .register-charity, .register-host, .login-link, .donate-link, .addRefugee-link, .about-link, .home-link, #addRefugeeButton, .profileHost-link').on('click', showPage);

  //on click get events
  $('.homePageHost-link').on('click', getHostRefugees);
  $('.refugee-link').on('click', getRefugees);
  $('.homePage-link').on('click', getCharity);
  $('.profileHost-link').on('click', getHostProfile);
  
  $('.profile-link').on('click', showProfile);
  $('.logout-link').on('click', logout);
  checkLoginState();
  displayMap();

}


function checkLoginState(){
  // check for a token
  // if there is one, call loggedInState
  // otherwise, call loggedOutState
  //add if else loggedInStateHost
  var token = getToken();
  var role = getRole();
    if(token) {
      loggedInState(role);
    }

    else {
      loggedOutState();
    }
}


function loggedInState(role){
  //show links with logged-in class
  //hide links with logged-out class
  //show bottles page
  $('.logged-out').hide();
  $('.logged-in-charity, .logged-in-host').hide();
  $('.logged-in-' + role).show();
  $('.logout-link').show();
  showPage();
  $('#charityShow,#hostShow').hide();
  $('#' + role + 'Show').show();
  console.log("logged in as", role)
}

function loggedOutState(){
  //hide links with logged-in class
  //show links with logged-out class
  //show login page
  $('.logged-out').show();
  $('.logged-in-charity').hide();
  $('.logged-in-host').hide();
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
  var id = $(this).attr('name');
  $('#'+ id).show();

  if(id === 'about') displayRefugee();
}

