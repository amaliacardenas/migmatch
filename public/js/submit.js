//used by login and charity-edit 
function getFormData(form) {
  var formData = form.enctype === 'multipart/form-data' ? new FormData(form) : $(form).serialize();
  var data = {
    method: $(form).attr('method'),
    url: $(form).attr('action'),
    data: formData
  };
  console.log(data.data);
  form.reset();
  return data;
}

function submitForm(){
  event.preventDefault();
  
  data = getFormData(this);
  ajaxRequest(data.method, data.url, data.data, function(res) {authenticationSuccessful(res);
    var role = getRole();
    if(role==='charity'){
      $('body').css("background-color","#f1eff2");
      getCharity();

    }
    else{
      $('body').css("background-color","#d0dcf4");
      getHost();
    }
  });
}




//used by host edit 
function submitHostForm(){
  event.preventDefault();
  data = getFormData(this);
  ajaxRequest(data.method, data.url, data.data, authenticationSuccessful);
  // redirect to the host profile
  getHostProfile();
}

//used by refugeeEditForm
function submitForCharity() {
  event.preventDefault();
  data = getFormData(this);
  ajaxRequest(data.method, data.url, data.data, getCharity);
  //using getCHarity as call back so adds new refugee
}

//used by add refugee form 
function submitRefugee() {
  event.preventDefault()
  data = getFormData(this); 
  $('#refugee').hide();
  //charity home
  $('#charityHome').show();
  return ajaxRequest(data.method, data.url, data.data, function(res) {
    getCharity(res);
    getRefugees(res);
  }, true);
}

//on register of charity
function submitRegister() {
  console.log(this);
  event.preventDefault() 
  data = getFormData(this); 
  ajaxRequest(data.method, data.url, data.data, authenticationSuccessful, true);
  getCharity();
}

//on register of host
function submitRegisterHost() {
  console.log(this);
  event.preventDefault() 
  data = getFormData(this);  
  ajaxRequest(data.method, data.url, data.data, authenticationSuccessful, true);
  getHost();
}
