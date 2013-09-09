
/*global vars*/
//var hi = false;

$(document).on('pagebeforeshow', '#patientDetails', function () {
    if ($('#container').find('cappy') == -1) {
        if ($('#container').find('slappy') == -1) {
            alert('Clinic is off-line (high v)');
            //hi = true;
        }
        else { 
            alert('Clinic is off-line (after h)');
        }
        //alert('Clinic is off-line');
        //$('#details').hide();
        //$.mobile.changePage('#offline', { transition: 'fade', changeHash: false });
    }
    else {
        $('#container').remove();
    }
});

$(document).on('pagebeforeshow', '#offline', function () {
    if(hi == true){
        $('#messageHighVolume').show();
    }
    else{
        $('#messageAfterHours').show();
    }
});