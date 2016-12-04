// Current Location Scripts
(function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            // The getData function, will send lat&long
            getData(lat, long);
        });
    }
// Get the data from the wunderground API
// My code: 32af0ba83703c0f8
function getData(lat, long) {
    $("#searchResults").html("");
    $('#query').val("");
    $.ajax({
        url: "https://api.wunderground.com/api/32af0ba83703c0f8/geolookup/conditions/forecast/q/" + lat + "," + long + ".json"
        , dataType: "jsonp"
        , success: function (data) {
            useData(data);
        }
    });
}

//Function that will display "data"
function useData(data) {
    console.log(data);
    $("#city-name").html(data['location']['city'] + ", " + data['location']['state']);
    document.title = data['location']['city'] + ", " + data['location']['state'] + " | " + document.title;
    $("#temperature").html(Math.round(data['current_observation']['temp_f']));
    $("#conditions").attr('src', "https://icons-ak.wxug.com/i/c/k/" + data['current_observation']['icon'] + ".gif");
    $("#windSpeed").html(data['current_observation']["wind_mph"]);
    $("#windDirection").html(data['current_observation']["wind_dir"]);
}

// A function for changing a string to TitleCase
function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
