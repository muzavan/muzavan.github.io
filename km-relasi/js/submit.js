   function initialize() {
        var myCenter = new google.maps.LatLng(-6.891167, 107.610611);
        var mapProp = {
            center:myCenter,
            zoom:16,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("map"),mapProp);        
        var newMarker = new google.maps.Marker({position : myCenter});
        newMarker.setMap(map);
        google.maps.event.addListener(map,'click',function(e) {
        var pos= new google.maps.LatLng(e.latLng.A,e.latLng.F);
            newMarker.setPosition(pos);
            $('#latitude').val(e.latLng.A);
            $('#longitude').val(e.latLng.F);
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    