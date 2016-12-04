/* *********************************************
    API Key : 32af0ba83703c0f8
        * Who Did You Collaborate With On This Assessment?
            * 1. Jefte Munoz
            * 2. Kristina Darroch
            * 3.
            * 4.
            * 5.
            * ******************************************** */
var returned;


// Get weather data from wunderground.com
function getData(input) {
    // Get the data from the wunderground API
    console.log(input);
    $.ajax({
        url: "https://api.wunderground.com/api/32af0ba83703c0f8/geolookup/conditions/forecast/q/"
        + input + ".json"
        , dataType: "jsonp"
        , success: function (data) {
            console.log(data);
            var location = data.location.city + ', ' + data.location.state;
            var tempF = data.current_observation.temp_f;
            var high = Math.round(data.forecast.simpleforecast.forecastday[0].high.fahrenheit);
            var low = Math.round(data.forecast.simpleforecast.forecastday[0].low.fahrenheit);
            var summary = data.current_observation.weather;
            console.log("Location: " + location);
            console.log("Temperature: " + temp_f);
            $("#city").text(location);
            $("#title").html(location + " | Search");
            $("#temphigh").text("High: " + high + "°F");
            $("#templow").text("Low: " + low + "°F");
            $("#currenttemp").html(Math.round(tempF) + '°');
            $("#summary").text(toTitleCase(data.current_observation.icon));
            $("#cover").fadeOut(250);
        }
    });
}

// Search bar search
$('#query').keyup(function() {
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");
    $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
        console.log(data); // test for JSON received
        // Begin building output

        returned = data;
        var output = '<ol>';
        $.each(data.RESULTS, function(key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="https://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
            }
        }); // end each


        output += '</ol>';
        $("#searchResults").html(output); // send results to the page
    }); // end getJSON

}); // end onke



// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
    evt.preventDefault();
    $()
    // With the text value get the needed value from the weather.json file
    var jsonCity = $(this).text(); // Franklin, etc...
    console.log(jsonCity);
    index = $(this).index("a");

    getData(returned.RESULTS[index].zmw) //probably made a mistake here

    document.getElementById("searchResults").style.display="none";

});

// A function for changing a string to TitleCase
function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
