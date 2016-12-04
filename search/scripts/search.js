/* *********************************************
    API Key : 32af0ba83703c0f8
        * Who Did You Collaborate With On This Assessment?
            * 1. Jefte Munoz
            * 2. Kristina Darroch
            * 3.
            * 4.
            * 5.
            * ******************************************** */
var info;

$('#query').keyup(function(){
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");

    $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data);
        $('#query').keyup(function() {
            var value = $('#query').val();
            var rExp = new RegExp(value, "i");
            if(value == ""){
                $("#searchResults").html("");
            } else{
                $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
                    console.log(data); // test for JSON received
                    // Code to show info from search
                    info = data;
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
            } // end if there are characters in a query

        }); // end onkeyup

    }); // end getJSON

}); // end keyup
