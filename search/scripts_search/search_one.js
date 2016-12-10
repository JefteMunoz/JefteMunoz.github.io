// Current Location Scripts

//var status = $('#status');



(function getGeoLocation() {
    //status.text('Getting Location...');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            // Call the getData function, send the lat and long
            getData(lat, long);
        });
    } else {
        //status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }
})();

// Get the data from the wunderground API
function getData(lat, long) {
    $("#searchResults").html("");
    $('#query').val("");
    $.ajax({
        url: "https://api.wunderground.com/api/64ffccdad5d42b2b/geolookup/conditions/forecast/q/" + lat + "," + long + ".json",
        dataType: "jsonp",
        success: function (data) { useData(data); }
    });
 }

//A function to display source data
function useData(data) {
    console.log(data);
    $("#rainInch").html(Math.round(data['current_observation']["precip_today_in"]));
    $("#templow").html(data['current_observation']["wind_mph"]);
    $("#windDirection").html(data['current_observation']["wind_dir"]);
    $("#celsius").html(data['current_observation']["temp_c"]);
    $("#summaryDescription").html(toTitleCase(data['current_observation']['weather']))
    $("#currentCity").html(data['location']['city'] + ", " + data['location']['state']);
    document.title = data['location']['city'] + ", " + data['location']['state'] + " | " + document.title;
    $("#currentTemp").html(Math.round(data['current_observation']['temp_f']) + "&deg;");
    console.log("https://icons-ak.wxug.com/i/c/k/" + data['current_observation']['icon'] + ".gif");
    $("#currentSummary").attr('src', "https://icons-ak.wxug.com/i/c/k/" + data['current_observation']['icon'] + ".gif");
    $("#temphigh").html("High " + data['forecast']['simpleforecast']['forecastday']['0']['high']['fahrenheit'] + "&deg;<br>Low " + data['forecast']['simpleforecast']['forecastday']['0']['low']['fahrenheit'] + "&deg;");
}


// A function for changing a string to TitleCase
function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
