$(init);

function init(){
  scroller()

}

function scroller() {
  var elem = $('#news-scroller');
  elem.animate({ scrollTop: $('.guardian-news').height() || "1100px" }, 12000);
}