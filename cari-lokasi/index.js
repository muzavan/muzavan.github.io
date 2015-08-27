var jData;
var newMarker;
var infowindow;
function initialize() {
        var posLat = -6.891167 ;
        var posLng = 107.610611 ;         
        var myCenter = new google.maps.LatLng(posLat, posLng);
        var mapProp = {
            center:myCenter,
            zoom:16,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);        
        var newMarker = new google.maps.Marker({position : myCenter});
        newMarker.setMap(map);
        var infowindow = new google.maps.InfoWindow({});
        infowindow.setContent("<b>Lat : </b> "+ newMarker.position.k + "<br/><b>Lng : </b> "+ newMarker.position.D);
        infowindow.open(map, newMarker);
        google.maps.event.addListener(map,'click',function(e) {
            var pos= new google.maps.LatLng(e.latLng.k,e.latLng.D);
            newMarker.setPosition(pos);
        });
}
google.maps.event.addDomListener(window, 'load', initialize);
