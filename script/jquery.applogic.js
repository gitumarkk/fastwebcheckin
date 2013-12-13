///<reference path="jquery-2.0.3-vsdoc.js" />
///<reference path="moment.min.js" />

/*global vars*/
var rootURL = "http://dev.fastwebcheckin.com/check/submission";

var restData = { 
    'submission[data][1][values][0]': $('#firstName').val(),
    'submission[data][2][values][0]': $('#lastName').val(),
    'submission[data][11][values][0]': $('#emailAddress').val(),
    'submission[data][14][values][0]': '0',
    'submission[data][16][values][0]': $('#postalCode').val(),
    'submission[data][23][values][0]': $("#selectedClinic").val(),//localStorage["location"],
    'submission[data][26][values][0]': $('#priorityCode').val(),
    'submission[data][12][values][0]': localStorage["terms"],
    'submission[data][19][values][0]': localStorage["readInstructions"],
    'submission[data][25][values][0]': localStorage["emailPermission"],
    'submission[data][15][values][0]': '',
    'submission[data][17][values][0]': '',
    'submission[data][18][values][0]': '',
    'submission[data][21][values][0]': '',
    'submission[data][22][values][0]': '',
    'submission[data][24][values][0]': '',
    'webform': '6779d205-8175-4e71-aadd-49809c3479c6'
};

function checkinNumberExists(){
    var cno = new String(localStorage["checkinNumber"]);
    if(cno !== 'undefined' && cno.length > 0 && cno !== "Not today"){
        //alert("--- checkinNumberExists --- \n local storage: " + localStorage["checkinNumber"] + " \n string var: " + cno);
        return true;
    } 
    else{
        //alert("checkinNumber NOT Exists");
        return false;
    }
}

function getPreviousCheckin(){
    var sdate = localStorage["submittedDate"];
    var loc = localStorage["location"];
    var terms = localStorage["terms"];

    if (checkinNumberExists()) {
        restoreUserDetails();

        var checkinDate = new Date(parseInt(sdate) * 1000);
        var today = new Date();
        var now = moment();
        var endOfDay = moment(checkinDate).endOf('day').subtract('hours', 7).fromNow();

        if (Date.daysBetween(today, checkinDate) < 0.3) {
            //alert(" Checkin time: " + checkinDate
            //+ ". \n Today: " + now.toLocaleString() + "\n Days between: "
            //+ Date.daysBetween(today, checkinDate)
            //+ "\n Hours (since checkin) until end of day: "
            //+ endOfDay);

            fillConfirmationMessage();
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

function fillConfirmationMessage() {    
    $("#checkinNumber").html(localStorage["checkinNumber"]);
    $("#attendTimeConfirmation").html(localStorage["attendTime"]);
    $("#attendInstructions").html(localStorage["confirmMessage"]);

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
    localStorage["checkinNumber"] = "";
    localStorage["attendTime"] = "";
    localStorage["submittedDate"] = "";
    localStorage["emailPermission"] = "NO";
    localStorage["readInstructions"] = "NO";
    localStorage["terms"] = "NO";
}

