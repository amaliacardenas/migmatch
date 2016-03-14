$(init);
console.log("jquery")
function init(){
  displayRefugee();
}

function displayRefugee() {
  //display charites refugees
  //display news
  //displays map

  var $refugeeForm = $('#refugee');
  var $map = $('#refugee-map');
  var $markers = [];


  var $refugeeForm = $('#refugee');
  var $map = $('#refugee-map');
  var $markers = [];

  var map = new google.maps.Map($map[0], {
    center: {lat:51.5117, lng: -0.1275},
    zoom: 1,
    styles: [{"stylers":[{"hue":"#2c3e50"},{"saturation":250}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":50},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]}]
  });


  // get refugeeData using ajax
  $.get('/api/refugees').then(function(data){
    var refugees = data
    console.log(data)
    refugees.forEach(function(refugee){
      var marker = new google.maps.Marker({
        // parseFloat convert a string into a number
        position: { lat: parseFloat(refugee.lat), lng: parseFloat(refugee.lng) },
        map: map,
        animation: google.maps.Animation.DROP,
      });
    });
  });



  if($refugeeForm.length){

    var gcoder = new google.maps.Geocoder();
    var $fields = $refugeeForm.find('input');


  if($refugeeForm.length){
    var gcoder = new google.maps.Geocoder();
    var $fields = $refugeeForm.find('input');

    $fields.on('blur', function(){
      var formData = $refugeeForm.serializeArray();
      var address = formData.map(function(dataObj){
        return dataObj.value;
      }).filter(function(value) {
        return!!value;
      }).join(', ');
      gcoder.geocode({ address: address}, function(results, status){
        if (status === "OK"){
          var location = results[0].geometry.location;
          console.log(location.lat(),location.lat(), $fields);
          $fields.filter('[name="refugee[lat]"]').val(location.lat());
          $fields.filter('[name="refugee[lng]"]').val(location.lng());
        };
      });
    });
  };
};


  


};
