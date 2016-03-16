function submitRegister() {
  event.preventDefault() 
  var method = $(this).attr("method");
  var url    = $(this).attr("action");
  var data   = new FormData(this);
  // clear the form
  this.reset(); 
  return ajaxRequestRefugee(method, url, data, authenticationSuccessful);
  getCharity();
}



 