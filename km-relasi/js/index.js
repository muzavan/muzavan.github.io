var arrayData;
function initialize() {
  retrieveData();
  /*
    var marker=new google.maps.Marker({
      position:myCenter,
      title:'Nama Komunitas : Reza Irvanda \nKontak : 085762378535'
    });
    var infowindow = new google.maps.InfoWindow({
    content:"Hello World!"
    });
  	marker.setMap(map);
  	google.maps.event.addListener(marker,'click',function() {
  		map.setZoom(18);
  		map.setCenter(marker.getPosition());
  		infowindow.open(map,marker);
  	});
  */
}
google.maps.event.addDomListener(window, 'load', initialize);

function retrieveData(){
  var ref = new Firebase("https://km-relasi.firebaseio.com");
  ref.child('data').once("value", function(snap) {
    arrayData = snap.val();
    console.log('mau masuk si doi');
    visualizeData();
  });
  
}

function visualizeData(){ 
  console.log("lewat sini?");
  var mapProp = {
    center:new google.maps.LatLng(-6.891167, 107.610611),
    zoom:16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var markerManager = new MarkerManager(map);
  var myCenter=new google.maps.LatLng(-6.891167, 107.610611);
  var oMarker = new google.maps.Marker({
    position : myCenter,
    icon : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    map : map,
  });

  /*
  for(var i in arrayData){
    console.log(arrayData[i].nama);
    console.log(arrayData[i].nama_narahubung);
    console.log(arrayData[i].kontak_narahubung);
    console.log(arrayData[i].latitude);
    console.log(arrayData[i].longitude);
    console.log(arrayData[i].keterangan);
  }
  */

  
  google.maps.event.addListener(markerManager, "loaded", function() {
    for(var i in arrayData){
      var iconURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";;
      if(arrayData[i].jenis=="1"){
        iconURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      }
      else if(arrayData[i].jenis=="2"){
        iconURL = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      }
      else if(arrayData[i].jenis=="3"){
        iconURL = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      }

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(arrayData[i].latitude,arrayData[i].longitude),
        icon: iconURL,
        title : arrayData[i].nama+"\nNarahubung : "+arrayData[i].kontak_narahubung+" ("+arrayData[i].nama_narahubung+")\n"+arrayData[i].keterangan,
      });
      markerManager.addMarker(marker,0);
    }
    markerManager.refresh();
  });
}