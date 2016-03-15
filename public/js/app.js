$(init);
function init(){
  var $sections = $('section').hide();
  $('#crossroads').show();
  getRefugees();
  $('#register, #login, #refugeeEditForm').on('submit', submitForm);
  $('.register-link, .login-link, .donate-link, .addRefugee-link, .about-link, .home-link').on('click', showPage);
  $('.logout-link').on('click', logout);
  $('.refugee-link').on('click', getRefugees);
  $('.homePage-link').on('click', getCharity);
  $('#refugee').on('submit', submitRefugee);
  checkLoginState();

  scroller();

  displayMap();

}

function scroller() {
  var elem = $('#news-scroller');
  elem.animate({ scrollTop: $('.guardian-news').height() || "1100px" }, 12000);
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
  var data = $(this).serialize();
  console.log("dat:" + data);
  form.reset();
  ajaxRequest(method, url, data, authenticationSuccessful);
  getCharity();
  
}
function submitRefugee() {
  event.preventDefault() 
  var method = $(this).attr("method");
  var url    = $(this).attr("action");
  var data   = new FormData(this);
  // clear the form
  this.reset() 
  return ajaxRequestRefugee(method, url, data, getRefugees);
}
function getRefugees() {
  // get the user data from the API and call displayUsers
  event.preventDefault();
  // console.log("getRefugees is working");
  return ajaxRequestRefugee('GET', '/api/refugees', null, displayRefugees);  
 }
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
          "<div class='caption'>" +
            "<h3>"+ data.name +"</h3>" +
            "<p>Text</p>" +
            "<h4>"+ data.location +"</h4>" +
            "<p><a href='#' class='btn btn-default' role='button'>Read More</a></p></div></div></div>");
    $li.append($button);
    $show.append($li);
  });
}
function getOneRefugee() {
  console.log("I've been clicked!");
  var id = $(this).attr('id').toString();
  return ajaxRequest('GET', '/api/refugees/'+ id, null, displayOneRefugee);
  console.log(id);
}
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
    $('#refugeeEditForm').get(0).setAttribute('action', '/aprefugees/' + id); 
  }); 
}
function populate(frm, data) {
  $.each(data, function(key, value){
    $('[name='+key+']', frm).val(value);
  });
}
function deleteOneRefugee() {
  console.log("I've been clicked!");
  var id = $(this).attr('id').toString();
  return ajaxRequest('DELETE', '/api/refugees/'+ id, null, displayOneRefugee);
  console.log(id);
}
function showProfile() {
// get the user data from the API and call displayUsers
  event.preventDefault();
  var userId = getUser();
  console.log(userId);
  // console.log("getRefugees is working");
  return ajaxRequest('GET', '/api/charities/'+ userId, null, displayProfile);  
}
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
function authenticationSuccessful(data) {
  // set the token and call checkLoginState
  if(data.token) setToken(data.token);
  if(data.user) setUser(data.user._id);
  console.log(data.user._id);
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
function setUser(userId) {
  // set the user into localStorage
  return localStorage.setItem('user', userId);
}
function getUser() {
  // get the token from localStorage
  return localStorage.getItem('user');
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