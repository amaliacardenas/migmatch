 var map;
var markers = [];

function displayRefugee() {
  //display charites refugees
  //display news
  //displays map

  var $refugeeForm = $('#refugee');
  var $map = $('#refugee-map');

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  setMapOnAll(null);
  markers = [];

  map = map || new google.maps.Map($map[0], {
    center: {lat:51.5117, lng: -0.1275},
    zoom: 3,
    styles: [{"stylers":[{"hue":"#2c3e50"},{"saturation":250}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":50},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]}],
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    mapTypeId: google.maps.MapTypeId.SATELLITE,

    // draggable: false,
  });

  var currentInfoWindow;


  // get refugeeData using ajax
  $.get('/api/refugees').then(function(data){

    var refugees = data;

    refugees.forEach(function(refugee, idx){

      var marker = new google.maps.Marker({

        // parseFloat convert a string into a number
        position: { lat: parseFloat(refugee.lat), lng: parseFloat(refugee.lng) },
        map: map,
        animation: google.maps.Animation.DROP,
      });
      var infoWindow = new google.maps.InfoWindow({
        position: { lat: parseFloat(refugee.lat), lng: parseFloat(refugee.lng) },
        content: "<p><img id='infoWindowImage' src='"+ refugee.avatar + "' class='refugee-avatar' >"+"</p><p>"+ refugee.name+"</p>"
     
      });
      marker.addListener('click', function(){
        if(currentInfoWindow) currentInfoWindow.close();
        currentInfoWindow = infoWindow;
        infoWindow.open(map);
        console.log(currentInfoWindow)

      });
      markers.push(marker);
    });
  });


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
          $fields.filter('[name="lat"]').val(location.lat());
          $fields.filter('[name="lng"]').val(location.lng());
        }
      });
    });
  }
};