///<reference path="jquery-2.0.3-vsdoc.js" />
///<reference path="modernizr-2.7.1-custom.js" />
///<reference path="moment.min.js" />

/*global vars*/
var rootURL = "http://fastwebcheckin.com";
var showAlerts = false;
var showHTML5Features = false;
var showAppVersion = false;
var showVersion = false;
var appVersionInfo = "App version 1.3";

/*global overrides*/
String.prototype.contains = function (it) { return this.indexOf(it) != -1; };

function checkinNumberExists() {
    var cno = new String(localStorage["checkinNumber"]);
    var attendTime = new String(localStorage["attendTime"]);
    if(cno != 'undefined' && cno.length > 1 && attendTime != "Not today"){
        //alert("--- checkinNumber EXISTS --- \n local storage: " + localStorage["checkinNumber"] + " \n string checkinNumber var: " + cno + " \n string attendTime var: " + attendTime);
        return true;
    }
    else{
        //alert("checkinNumber NOT Exists");
        return false;
    }
}

function clinicIsClosed(attendTime){
    //alert("clinicIsClosed parameter: " + attendTime);
    if(attendTime == 'Not today'){
        return true;
    }
    else{
        return false;
    }
    return false;
}

function getPreviousCheckin(){
    var sdate = localStorage["submittedDate"];
    if(showAlerts){
       //alert("submittedDate: " + sdate);
    }

    var loc = localStorage["location"];
    var terms = localStorage["terms"];

    if (checkinNumberExists()) {
        var checkinDate = new Date(parseInt(sdate) * 1000);
        var today = new Date();
        var now = moment();
        var endOfDay = moment(checkinDate).endOf('day').subtract('hours', 7).fromNow();

        if (Date.daysBetween(today, checkinDate) < 0.3) {
            if (showAlerts) {
                //alert(" Checkin time: " + checkinDate
                //+ ". \n Today: " + now.toLocaleString() + "\n Days between: "
                //+ Date.daysBetween(today, checkinDate)
                //+ "\n Hours (since checkin) until end of day: "
                //+ endOfDay);
            }

            fillConfirmationMessage();
        }
        else {
            localStorage["checkinNumber"] = "";
        }
        return true;
    }
    else {
        return false;
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
    if (pCode !== null) {
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
    $("#attendInstructions").html(localStorage["confirmMessage"]);

    $("#firstNameConfirmation").html(localStorage["firstName"]);
    $("#lastNameConfirmation").html(localStorage["lastName"]);
    $("#locationConfirmation").html(localStorage["locationFriendlyName"]);

    $("#submittedDateConfirmation").html(localStorage["submitDateFormatted"]);
    $("#submittedTimeConfirmation").html(localStorage["submitTimeFormatted"]);

    $("#emailConfirmation").html(localStorage["emailAddress"]);
    $("#postalCodeConfirmation").html(localStorage["postalCode"]);

    if (localStorage["location"] == "pcnforterie") {
        localStorage["clinicAddress"] = "660 Garrison Road Unit 11, Fort Erie ON L2A 6E2";
        localStorage["clinicMapLinkHref"] = "https://www.google.com/maps/place/660+Garrison+Rd+%2311,+Fort+Erie,+ON+L2A+1N6/@42.9059758,-78.941964,17z/data=!3m1!4b1!4m5!3m4!1s0x89d3147cc7f511c5:0x290c4efad57961e7!8m2!3d42.9059719!4d-78.9397753"
        localStorage["locationFriendlyName"] = "PCN Fort Erie";
    } else if (localStorage["location"] == "pcnwelland") {
        localStorage["clinicAddress"] = "800 Niagara Street North Unit G1 Welland ON L3C 5Z4";
        localStorage["clinicMapLinkHref"] = "http://maps.google.ca/maps?f=q&source=s_q&hl=en&geocode=&q=800+Niagara+Street,+North,+Suite+G1.+welland,+Ontario&sll=43.088688,-79.052612&sspn=0.011941,0.01442&g=800+Niagara+Street,+North,+Suite+G1&ie=UTF8&ll=43.016509,-79.249792&spn=0.04782,0.057678&z=14";
        localStorage["locationFriendlyName"] = "PCN Welland";
    }
    $("#clinicAddress").html(localStorage["clinicAddress"]);
    $("#clinicMapLinkHref").attr("href", localStorage["clinicMapLinkHref"]);

    //$("#footerImage").hide();
}

function clearLocalStorage() {
    //alert("clearLocalStorage() called");
    localStorage.removeItem("checkinNumber");
    localStorage.removeItem("attendTime");
    localStorage.removeItem("submittedDate");
    //localStorage["checkinNumber"] = "";
    //localStorage["attendTime"] = "";
    //localStorage["submittedDate"] = "";
    localStorage["emailPermission"] = "NO";
    localStorage["readInstructions"] = "NO";
    localStorage["terms"] = "NO";
}
