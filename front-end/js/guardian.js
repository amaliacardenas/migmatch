jQuery(function($) {
  console.log("its working")
  $.get('http://content.guardianapis.com/search?show-elements=all&q=%22migrant%20crisis%22&api-key=2609a777-0ca5-4710-a36c-5230a629b169').then(function(res){ console.log(res) });
});