//iphone 3,4:
enquire.register('screen and (max-width:320px)', {

    deferSetup: true,
    setup: function () {
        //load big screen content
    },
    match: function () {
        //hide big screen content/apply styling
        $('#adFooter').css({ 'display': 'none' });
    },
    unmatch: function () {
        //show big screen content/apply styling
        $('#adFooter').css({ 'display': 'block' });
    }
}, true);