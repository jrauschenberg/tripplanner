var days = [{}];

$('#top-panel').on("click", ".btn", function() {
  var selected = $(this).siblings("select").val();
  var type = $(this).siblings("h4").text();
  var $ul = $('#' + type);
  var i = Number($(".current-day").text()) - 1;
  if (checkDuplicates(selected, i, type)) return;
  if (type === "Hotels") {
    if ($ul.children().length > 0) {
      $ul.children().remove();
      days[i][type] = [];
    }
    addToDay(type, selected);
  } else if (type === "Restaurants" && $ul.children().length > 2) {
      alert("Please remove one restaurant from your list before adding another. You can have a maximum of three restaurants.");
  } else {
    addToDay(type, selected);
  }
  removeItinerary();
  toggleMarkers(i);
});

$('#bottom-panel').on("click", ".itinerary-item", function() {
  var i = Number($(".current-day").text()) - 1;
  var type = $(this).parent().attr('id');
  var name  = $(this).children("span").text();
  days[i][type].forEach(function(item, index) {
    if (item.name == name) {
      days[i][type] = days[i][type].slice(0, index).concat(days[i][type].slice(index+1));
      removeMarker(name);
    }
  });
  $(this).remove();
  

});

$('#add-day').on("click", function() {
  var j = $(this).siblings().length + 1;
  $('.current-day').removeClass('current-day');
  $('<button class="btn btn-circle day-btn current-day actual-day">' + j +'</button>').insertBefore(this);
  $('#day-title').children('span').text("Day " + j);
  if (!days[j-1]) days[j-1] = {};
  removeItinerary();
  toggleMarkers(j - 1);
});

$('.day-buttons').on("click", ".actual-day", function() {
  $('.current-day').removeClass('current-day');
  $(this).addClass('current-day');
  var i = Number($(this).text()) - 1;
  removeItinerary();
  toggleMarkers(i);
  $('#day-title').children('span').text("Day " + (i+1));

});

$('#remove-day').on("click", function() {

  var i = Number($(this).siblings().text().split(" ")[1])-1;
  removeItinerary();
  if (i === days.length-1) {
    days = days.slice(0, i);
    if (i !== 0) {
      var $prevEl = $('.current-day').prev();
      $('.current-day').remove();
      $prevEl.addClass('current-day');
      toggleMarkers(i-1);
      $('#day-title').children('span').text("Day " + (i));
    }
    else {
      days[i] = {};
      toggleMarkers(i);
    }
  } else {

  days = days.slice(0, i).concat(days.slice(i+1));
  var $nextEl = $('.current-day').next();
  $('.current-day').remove();
  $nextEl.addClass('current-day');
  for (var k = 0; k < $('.day-buttons').children().length-1; k++) {
    $('.day-buttons').children()[k].innerHTML = k+1;
  }
  toggleMarkers(i);
  $('#day-title').children('span').text("Day " + (i+1));
  }
});

function removeItinerary () {
  $(".itinerary-item").remove();
}

function toggleMarkers(i) {
  // var htmlcode = '<div class="itinerary-item"><span class="title">' + name + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>'; 
  var nameArr = [];
  if (days[i].Hotels) {
    days[i].Hotels.forEach(function(hotel) {
      nameArr.push(hotel.name);
      $('#Hotels').append('<div class="itinerary-item"><span class="title">' + hotel.name + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
    });
  }
  if (days[i].Activities) {
    days[i].Activities.forEach(function(activity) {
      nameArr.push(activity.name);
      $('#Activities').append('<div class="itinerary-item"><span class="title">' + activity.name + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
    });
  }
  if (days[i].Restaurants) {
    days[i].Restaurants.forEach(function(restaurant) {
      nameArr.push(restaurant.name);
      $('#Restaurants').append('<div class="itinerary-item"><span class="title">' + restaurant.name + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
    });
  }
  showMarkers(nameArr);
}

function addToDay (type, selected) {
    var locationArr;
    var arr;
    if (type === "Hotels") arr = hotels;
    else if (type === "Restaurants") arr = restaurants;
    else arr = activities;
    
    arr.forEach(function (item) {
      if (item.name == selected) {
        locationArr = item.place[0].location;
      }
    });
    //what day is selected
    //push to the specific day with .hotel, restaurant or activities
    //store object with name and location in the above
    var i = Number($(".current-day").text()) - 1;
    if (!days[i]) days[i] = {};
    if (!days[i][type]) days[i][type] = [];
    days[i][type].push({ name: selected,
      location: locationArr });
    makeMarker(locationArr, type, selected);
}

function checkDuplicates(selected, i, type ) {
  var dupes = false;
  if (days[i][type]) {
    days[i][type].forEach(function(item) {
      if (item.name == selected) {
        dupes = true;
        alert("You've already included that item in your itinerary!");
      }
    });
  }
  return dupes;

}

