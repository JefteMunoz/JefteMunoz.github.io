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
                    var info = '<ol>';
                    $.each(data.RESULTS, function(key, val) {
                        if (val.name.search(rExp) != -1) {
                            info += '<li>';
                            info += '<a href="#" onclick="getData(' + val.lat + ','+val.lon+')" title="See results for ' + val.name + '">' + val.name + '</a>';
                            info += '</li>';
                        }
                    }); // end each
                    info += '</ol>';
                    $("#searchResults").html(output); // send results to the page

                }); // end getJSON
            } // end if there are characters in a query

        }); // end onkeyup

    }); // end getJSON

}); // end keyup
