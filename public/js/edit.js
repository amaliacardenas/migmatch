$(init);

function init(){


}

function scroller() {
  var elem = $('#news-scroller');
  // console.log($('#news-scroller').height());



  elem.animate({ scrollTop: $('.guardian-news').height() || "1100px" }, 12000);
}