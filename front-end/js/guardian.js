$(function() {
  console.log("its working")
  displayIndex();
})

function displayIndex() {
  $.get('http://content.guardianapis.com/search?show-fields=thumbnail&q=%22migration%20crisis%22&api-key=2609a777-0ca5-4710-a36c-5230a629b169').done(function(data){

   var objects = data.response.results;
   // console.log(objects)

   $.each(objects, function(i, object) {
    $('.guardian-news').prepend(
    
      "<li><a href=" + object.webUrl + " target='_blank'>" + object.webTitle + "</a></li>" +
      "<li><img src=" + object.fields.thumbnail + "></li>"
    )
   })
 });
}


