var ads = ['valleyway.gif', 'npa.jpg'
];

var imagePrefix = 'images/';
var minimum = 0;
var maximum = 1;
var rand = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

$(document).ready(function () {
    var topAd = $('#adContainer > a > img');

    var newAdImage = imagePrefix + ads[rand];
    $(topAd).attr('src', newAdImage);
});
