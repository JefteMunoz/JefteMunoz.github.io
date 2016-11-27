// Current Location Scripts
$(function () {
    var status = $('#status');



    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                // Call the getData function, send the lat and long
                getData(lat, long);
            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }
    })();

    // Get the data from the wunderground API
    function getData(lat, long) {
        $.ajax({
            url: "https://api.wunderground.com/api/32af0ba83703c0f8/geolookup/conditions/q/"+ lat + "," + long + ".json",
            dataType: "jsonp",
            success: function(data) { useData(data); }
        });

    }

    //A function to display data
    function useData(data){
        $("#cityDisplay").html(data['location']['city'] + "," + data['location']['state']);
        document.title = data['location']['city'] + "," + data['location']['state'] + " | "+ document.title;
        $("#currentTemp").html(Math.round(data['current_observation']['temp_f']) + "&deg;F");
        $("#summary").html(toTitleCase(data['current_observation']['weather']));
        $("#add1").html(data['current_observation']['relative_humidity'] + " Humidity");
        $("#add2").html(Math.round(data['current_observation']['wind_mph']) + "mph Winds");
        $("#add3").html("Wind " + data['current_observation']['wind_dir']);
        $("#cover").fadeOut(250);
    }


    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
});
