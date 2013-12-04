///<reference path="jquery-2.0.3-vsdoc.js" />
///<reference path="moment.min.js" />

/*global vars*/
var rootURL = "http://dev.fastwebcheckin.com/check/submission";

$.ajaxSetup({
    cache:false
})

function getPreviousCheckin(){
    var sdate = localStorage["submittedDate"];
    var loc = localStorage["location"]; 

    if (localStorage["terms"] == "YES"){
        //alert("getPreviousCheckin(): terms = YES");
        restoreUserDetails();
   
        var checkinDate = new Date(parseInt(sdate) * 1000);
        var today = new Date();
        var now = moment();
        var endOfDay = moment(checkinDate).endOf('day').subtract('hours', 7).fromNow();

        if (Date.daysBetween(today, checkinDate) < 0.3){
            alert(" Checkin time: " + checkinDate
            + ". \n Today: " + now.toLocaleString() + "\n Days between: "
            + Date.daysBetween(today, checkinDate)
            + "\n Hours (since checkin) until end of day: "
            + endOfDay);

            fillConfirmationMessage();
            //$.mobile.changePage("#offline", { role: "page" }); 
            $.mobile.changePage("#patientDetails", { role: "page" });      
        }
    }
};

Date.daysBetween = function (date1, date2) {
    var oneDay = 1000 * 60 * 60 * 24;

    var date1MS = date1.getTime();
    var date2MS = date2.getTime();

    var differenceMS = date1MS - date2MS;
    return differenceMS / oneDay;
};

function storeUserDetails() { 
    localStorage["priorityCode"] = $('#priorityCode').val();
    localStorage["firstName"] = $('#firstName').val();
    localStorage["lastName"] = $('#lastName').val();
    localStorage["emailAddress"] = $('#emailAddress').val();
    localStorage["postalCode"] = $('#postalCode').val();
}

function restoreUserDetails(){
    var pCode = localStorage["priorityCode"];
    if (pCode != null) {
        $('#priorityCode').val(localStorage["priorityCode"]);
    }

    $('#firstName').val(localStorage["firstName"]);
    $('#lastName').val(localStorage["lastName"]);
    $('#emailAddress').val(localStorage["emailAddress"]);
    $('#postalCode').val(localStorage["postalCode"]);
}

function fillConfirmationMessage() { 
    $("#checkinNumber").html(localStorage["checkinNumber"]);
    $("#attendTimeConfirmation").html(localStorage["attendTime"]);

    var dayofWeek = moment().format('D');
    //alert("day of week: " + dayofWeek);
    var timeend;
    if (dayofWeek == 1) {
        $.mobile.changePage("#offline", { role: "page" });
    }
    if (dayofWeek == 2) {
        timeend = "4:15pm";
    }
    if (dayofWeek == 3) {
        timeend = "7:15pm";
    }
    if (dayofWeek == 4) {
        timeend = "7:15pm";
    }
    if (dayofWeek == 5) {
        timeend = "4:15pm";
    }
    if (dayofWeek == 6) {
        timeend = "4:15pm";
    }
    if (dayofWeek == 7) {
        $.mobile.changePage("#offline", { role: "page" });
    }
    //alert("closing time today: " + timeend);

    $("#attendTimeEnd1").html(timeend);
    $("#attendTimeEnd2").html(timeend);
    $("#attendTimeEnd3").html(timeend);

    $("#locationConfirmation").html(localStorage["locationFriendlyName"]);
    $("#firstNameConfirmation").html(localStorage["firstName"]);
    $("#lastNameConfirmation").html(localStorage["lastName"]);

    $("#submittedDateConfirmation").html(localStorage["submitDateFormatted"]);
    $("#submittedTimeConfirmation").html(localStorage["submitTimeFormatted"]);

    $("#emailConfirmation").html(localStorage["emailAddress"]);
    $("#postalCodeConfirmation").html(localStorage["postalCode"]);

    if (localStorage["location"] == "pcnniagara") {
        localStorage["clinicAddress"] = "6150 Valley Way Suite 104 Niagara Falls ON L2E 1Y3";
        localStorage["clinicMapLinkHref"] = "http://maps.google.ca/maps?hl=en&q=6150+Valley+Way,+Niagara+Falls,+Niagara+Regional+Municipality,+Ontario&safe=active&ie=UTF8&cd=1&geocode=FcGekQIdCBRJ-w&split=0&sll=49.891235,-97.15369&sspn=16.71875,56.536561&ll=43.097793,-79.096824&spn=0.023878,0.028839&z=15"
    }
    else {
        localStorage["clinicAddress"] = "800 Niagara Street North Unit G1 Welland ON L3C 5Z4";
        localStorage["clinicMapLinkHref"] = "http://maps.google.ca/maps?f=q&source=s_q&hl=en&geocode=&q=800+Niagara+Street,+North,+Suite+G1.+welland,+Ontario&sll=43.088688,-79.052612&sspn=0.011941,0.01442&g=800+Niagara+Street,+North,+Suite+G1&ie=UTF8&ll=43.016509,-79.249792&spn=0.04782,0.057678&z=14";
    }
    $("#clinicAddress").html(localStorage["clinicAddress"]);
    $("#clinicMapLinkHref").attr("href", localStorage["clinicMapLinkHref"]);

    $("#footerImage").hide();
}

function clearLocalStorage() {
    //alert("cleared local storage");
    localStorage["checkinNumber"] = "";
    localStorage["attendTime"] = "";
    localStorage["submittedDate"] = "";
    localStorage["emailPermission"] = "NO";
    localStorage["readInstructions"] = "NO";
    localStorage["terms"] = "NO";
}


