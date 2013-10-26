var myLocation = {
    lat: 0,
    lng: 0
};

function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{
      alert("Geolocation is not supported by this browser.");
  }
  }
function showPosition(position)
  {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
  alert("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude);	
  }