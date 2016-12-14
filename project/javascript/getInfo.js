function getData(getInfo) {
    $.ajax({
        url: "schedule.json",
        success: function (data) {
            console.log(data);
            $("conference").html(data[getInfo]['conferenceName']);
            $("").html(data[getInfo]['shoes']['shoe']);
            $("").html(data[getInfo]['skirt']);
            $("").html(data[getInfo]['shirt']);
            $("").html(data[getInfo]['coat']);
            $("").html(data[getInfo]['accessories']);
        }
    })
};
