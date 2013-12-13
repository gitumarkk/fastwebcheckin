///<reference path="script/jquery-2.0.3-vsdoc.js" />
function runEnquire(){
//iphone 3,4:
enquire.register('screen and (max-width:320px)', {
    deferSetup: true,
    setup: function () {
        //load big screen content
    },
    match: function () {
        //hide big screen content/apply styling
        //$('#footerDetails').css({ 'display': 'none' });
        //alert("iPhone 4");
        $('#adImage').height(121);
        $('#adImage').width(320);
    },
    unmatch: function () {
        //show big screen content/apply styling
        $('#adFooter').css({ 'display': 'block' });
    }
}, true)
.register('screen and (orientation:portrait) and (max-width:720px) and (resolution: 316dpi)', {
    match: function () {
        //alert('Galaxy Nexus portrait');
    }
})
.register('screen and (orientation:landscape) and (max-width:720px) and (resolution: 316dpi)', {
    match: function () {
        //alert('Galaxy Nexus landscape');
    }
});

//.register('screen and (min-width:18.75em)', {
//    match: function () {
//        alert('300px breakpoint');
//    }
//})
//.register('screen and (min-width:25em)', {
//    match: function () {
//        alert('400px breakpoint');
//    }
//})
//.register('screen and (min-width:37.5em)', {
//    match: function () {
//        alert('600px breakpoint');
//    }
//})
//.register('screen and (min-width:41em)', {
//    match: function () {
//        alert('tablet');
//    }
//});


}


