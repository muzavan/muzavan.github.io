    var tmp;
    function initialize() {
    var mapProp = {
    center:new google.maps.LatLng(-6.891167, 107.610611),
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("map"),mapProp);
    var myCenter=new google.maps.LatLng(-6.891167, 107.610611);
    var marker=new google.maps.Marker({
    position:myCenter,
    });
    marker.setMap(map);
    google.maps.event.addListener(map,'click',function(e) {
      $('#latitude').value = e.latLng.A;
      $('#longitude').value = e.latLng.F;
    });
    }
    google.maps.event.addDomListener(window, 'load', initialize);