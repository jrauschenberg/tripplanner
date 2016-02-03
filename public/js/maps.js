var map;
var markerArray = [];

function initialize_gmaps() {

  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705189, -74.009209);

  // set the map options hash
  var mapOptions = {
    center: myLatlng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    // styles: styleArr
  };

  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById('map-canvas');

  // initialize a new Google Map with the options
  map = new google.maps.Map(map_canvas_obj, mapOptions);
  
}

function removeMarker(name) {
  markerArray.forEach(function(pin, index) {
    if (pin.name == name) {
      pin.marker.setMap(null);
      markerArray = markerArray.slice(0, index).concat(markerArray.slice(index+1));
    }
  });
}

function showMarkers (nameArr) {
  markerArray.forEach(function(pin) {
    pin.marker.setMap(null);
  });
  nameArr.forEach(function(name) {
    markerArray.forEach(function(pin) {
      if (pin.name == name) pin.marker.setMap(map);
    });
  });
  if (nameArr.length>0) {
    var bounds = new google.maps.LatLngBounds();
    markerArray.forEach(function(pin, index) {
      if (pin.marker.setMap) {
        bounds.extend(pin.marker.position);
      }
    });
    map.fitBounds(bounds);
  } else {
    initialize_gmaps();
  }
}

function makeMarker(locationArr, type, name) {

  // // add the marker to the map
  // var marker = new google.maps.Marker({
  //   position: myLatlng,
  //   title: 'Hello World!'
  // });

  // draw some locations on the map
  function drawLocation(locationArr, opts) {
    if (typeof opts !== 'object') {
      opts = {};
    }
    opts.position = new google.maps.LatLng(locationArr[0], locationArr[1]);
    opts.map = map;
    var marker = new google.maps.Marker(opts);
    markerArray.push({marker: marker, name:name});
  }

  if (type === 'Hotels') {
    var hotelLocation = locationArr;
    drawLocation(hotelLocation, {
      icon: '/images/lodging_0star.png'
    });
  } else if (type === "Restaurants") {
    var restaurantLocation = locationArr;
    drawLocation(restaurantLocation, {
      icon: '/images/restaurant.png'
    });
    // restaurantLocations.forEach(function(loc) {
    //   drawLocation(loc, {
    //     icon: '/images/restaurant.png'
    //   });
    // });
  } else {
    var activityLocation = locationArr;
drawLocation(activityLocation, {
      icon: '/images/star-3.png'
    });
  }
  // var activityLocations = [
  //       // [40.716291, -73.995315],
  //       // [40.707119, -74.003602]
  //     ];


 
  // activityLocations.forEach(function(loc) {
  //   drawLocation(loc, {
  //     icon: '/images/star-3.png'
  //   });
  // });
}

$(document).ready(function() {
  initialize_gmaps();
});

// var styleArr = [{
//   featureType: 'landscape',
//   stylers: [{ saturation: -100 }, { lightness: 60 }]
// }, {
//   featureType: 'road.local',
//   stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
// }, {
//   featureType: 'transit',
//   stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
// }, {
//   featureType: 'administrative.province',
//   stylers: [{ visibility: 'off' }]
// }, {
//   featureType: 'water',
//   stylers: [{ visibility: 'on' }, { lightness: 30 }]
// }, {
//   featureType: 'road.highway',
//   elementType: 'geometry.fill',
//   stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
// }, {
//   featureType: 'road.highway',
//   elementType: 'geometry.stroke',
//   stylers: [{ visibility: 'off' }]
// }, {
//   featureType: 'poi.park',
//   elementType: 'geometry.fill',
//   stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
// }];
