///<reference path="script/jquery-2.0.3-vsdoc.js" />

/*global vars*/
var rootURL = 'http://dev.fastwebcheckin.com/check/submission';

$.ajaxSetup({
    cache:false
})

function getStatus(url){
    $.ajax({
        url: rootURL + url,
        dataType: "text/html",
        success: renderResponse
    });
}

function renderResponse(data){
    alert('data: ' + data);
    //var resp = data == null ? alert("no response") :  alert(data);
}

//$(document).on('pagebeforeshow', '#patientDetails', function () {
//    if ($('#container').find('Off-line') == -1) {
//        if ($('#container').find('High') == -1) {
//            alert('Clinic is off-line (high v)');
//            hi = true;
//        }
//        else { 
//            alert('Clinic is off-line (after h)');
//        }
//        //alert('Clinic is off-line');
//        //$('#details').hide();
//        //$.mobile.changePage('#offline', { transition: 'fade', changeHash: false });
//    }
//    else {
//        $('#container').remove();
//    }
//});

//$(document).on('pagebeforeshow', '#offline', function () {
//    if(hi == true){
//        $('#messageHighVolume').show();
//    }
//    else{
//        $('#messageAfterHours').show();
//    }
//});