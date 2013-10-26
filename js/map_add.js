function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}
function initialize() {

  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(-34.397, 150.644), 
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  

 var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var srcLat = new Array();
    srcLat[0] = new google.maps.LatLng(-25.363882,131.044922);
    srcLat[1] = new google.maps.LatLng(-25.393882,131.044922);
    srcLat[2] = new google.maps.LatLng(-25.433882,131.044922);

    var dstLat = new Array();
    dstLat[0] = new google.maps.LatLng(-25.363882,131.049922);
    dstLat[1] = new google.maps.LatLng(-25.393882,131.054922);
    dstLat[2] = new google.maps.LatLng(-25.433882,131.065922);
    
  var UserEntry = makeStruct("name number src_location dst_location")    
  var AddrMarker = makeStruct("name number location");

  var userEntries = new Array();
  userEntries[0] = new UserEntry("Rahul","545",srcLat[0],dstLat[0]);
  userEntries[1] = new UserEntry("Udi","765",srcLat[1],dstLat[1]);
  userEntries[2] = new UserEntry("Harvey","987",srcLat[2],dstLat[2]);
    
    //limits are used to auto zoom
    var limits = new google.maps.LatLngBounds();
    for (var i = 0; i < userEntries.length; i++) {
      var src_marker = new AddrMarker(userEntries[i].name, userEntries[i].number, userEntries[i].src_location);
      var dst_marker = new AddrMarker(userEntries[i].name, userEntries[i].number, userEntries[i].dst_location);
        createMarker(map,src_marker);
        createMarker(map,dst_marker);
        limits.extend(src_marker.location);
        limits.extend(dst_marker.location);

    }
    map.fitBounds(limits);


}

function createMarker(map,addMarker) {
   var marker = new google.maps.Marker({
      position: addMarker.location,
      map: map
  });
    
  var infowindow = new google.maps.InfoWindow();
    
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(addMarker.name + "<br />" + addMarker.number+ "<br />" + addMarker.location);
    infowindow.open(map, this);
  });
    
}

google.maps.event.addDomListener(window, 'load', initialize);

//document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);

intel.xdk.device.hideSplashScreen();
