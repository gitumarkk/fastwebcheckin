///<reference path="script/jquery-2.0.3-vsdoc.js" />
function runEnquire(){
//iphone 3,4:
    enquire.register('screen and (max-width:320px)', {
        deferSetup: true,
        setup: function () {
        },
        match: function () {
            if (showAlerts) {
                alert("iPhone 4 match (max-width:320px)");
            }
            $('.logo').css({ 'width': '300' });
            $('#adImage').height(121);
            $('#adImage').width(320);
        },
        unmatch: function () {
            if (showAlerts) {
                alert("iPhone 4 unmatch (max-width:320px)");
            }
            //$('.logo').css({ 'width': '200' });
            $('#adFooter').css({ 'display': 'block' });
        }
    }, true)
.register('screen and (max-width:300px)', {
    match: function(){
       $('.logo').css({ 'width': '200' }); 
    } 
})
.register('screen and (orientation:portrait)', { //and (resolution: 316dpi) - Galaxy nexus
    match: function () {
        if (showAlerts) {
            alert('Device in portrait');
        }
        $('.logo').css({ 'width': '300' });
        $('#adFooter').css({ 'display': 'block' });
    }
})
.register('screen and (orientation:landscape)', {
    match: function () {
        if (showAlerts) {
            alert('Device in landscape');
        }
        $('.logo').css({ 'width': '320' });
        $('#adFooter').css({ 'display': 'none' });
    }
}).register('screen and (min-width:41em)', {
    match: function () {
        if (showAlerts) {
            alert('tablet (41em)');
        }
        $('.logo').css({ 'width': '400' });
        $('#adFooter').css({ 'display': 'block' });
    }
});

//.register('screen and (min-width:18.75em)', {//basic screen width detection
//    match: function () {
//        alert('300px breakpoint');
//    }
//})
//.register('screen and (min-width:25em)', {
//    match: function () {
//        alert('400px breakpoint');
//        $('#adFooter').css({ 'display': 'none' });
//    },
//    unmatch: function () {
//        $('#adFooter').css({ 'display': 'normal' });
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

//$(window).on("orientationchange", function (event) {
//});


