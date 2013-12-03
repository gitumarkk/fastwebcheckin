///<reference path="script/jquery-2.0.3-vsdoc.js" />

/*global vars*/
var rootURL = "http://dev.fastwebcheckin.com/check/submission";

$.ajaxSetup({
    cache:false
})

function getPreviousCheckin(){
    var jsonDate = localStorage["submittedDate"];
    if (jsonDate != null && jsonDate.length > 0){
        //alert('previous submit');
        var checkinDate = new Date(parseInt(jsonDate) * 1000);
        //var twoDaysAgo = new Date(2013, 11, 1);
        //checkinDate = twoDaysAgo; 
        var today = new Date();
        if (Date.daysBetween(checkinDate, today) < 1){
            var checkinStored = localStorage["checkinNumber"];
            var locationStored = localStorage["locationName"]; 
             
            var message = "Clinic: " + locationStored + ".  Click the button below if you would like to submit a new check in.";
            $("#checkinNo").val(checkinStored);
            $("#attendTime").val(localStorage["attendTime"]);
            $("#storedCheckinMessage").html(message);
            $.mobile.changePage("#clearStorageDialog", { role: "page" });        
        }
    }

    //alert("today: " + today + " Checkin time: " + checkinDate + " Days between: " + Date.daysBetween(checkinDate, today));
};

Date.daysBetween = function (date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 12;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - (date1_ms + (one_day * 4));

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
};


