function getHost() {
  $('section').hide();
  $('#hostHome').show()
};

//ajax request function
function ajaxRequest(method, url, data, callback, isUploader) {
  var options = {
    method: method,
    url: url,
    data: data,
    beforeSend: function(jqXHR, settings){
      var token = getToken();
      if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer '+ token);
    }
  };

  if(isUploader) {
    options.contentType = false;
    options.processData = false;
  }

  return $.ajax(options).done(callback)
  .fail(function(err) {
    displayErrors(err);
  });
}


// function ajaxRequestRefugee(method, url, data, callback) {
//   return $.ajax({
//     method: method,
//     url: url,
//     data: data,
//     contentType: false, // allow ajax to send file data
//     processData: false, // allow ajax to send file data
//     beforeSend: function(jqXHR, settings){
//       var token = getToken();
//       if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer '+ token);
//     }
//   }).done(callback)
//   .fail(function(err) {
//     displayErrors(err);
//   });
// }
 