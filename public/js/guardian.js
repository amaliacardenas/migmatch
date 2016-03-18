$(function() {
  displayIndex();
  loadMoreButton();

})

function displayIndex() {
  $.get('https://content.guardianapis.com/search?section=world&order-by=newest&show-fields=thumbnail&q=%22migration%20crisis%22&api-key=2609a777-0ca5-4710-a36c-5230a629b169').done(function(data){

   var objects = data.response.results;

   $.each(objects, function(i, object) {
    $('.guardian-news').append(
      "<li class='tile'>" +
        "<img id='newsImage' src=" + object.fields.thumbnail + ">" +
        "<br>" +
        "<a href=" + object.webUrl + " target='_blank' class='news-caption'>" + object.webTitle + "</a>" +
      "</li>"
    )
   })
 });
}

function loadMoreButton() {
  $("#guardian-button").click(function () {
    $.get('http://content.guardianapis.com/search?section=world&show-fields=thumbnail&page=3&q=%22migrant%20crisis%22&api-key=2609a777-0ca5-4710-a36c-5230a629b169').done(function(data){
      var objects = data.response.results;
      $.each(objects, function(i, object) {
        $('.guardian-news').prepend(
          "<li><a href=" + object.webUrl + " target='_blank'>" + object.webTitle + "</a></li>" +
          "<li><img src=" + object.fields.thumbnail + "></li>"
        )
      });

      scroller();
    });
  });
}


