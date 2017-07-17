document.addEventListener('DOMContentLoaded', function () {
    $('#btnpost').click(function (event) {
        postdata();
    });

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        console.log(activeTab);
        filldata(activeTab);
    });

}, false);


function filldata(tab) {

    var tabtitle = tab.title;
    var sepindex = tabtitle.indexOf('-');

    var u = document.getElementById('url');
    u.value = tab.url;

    var a = document.getElementById('artist');
    var artist = tabtitle.substr(0, sepindex);
    artist = artist.trim();
    a.value = artist;

    var t = document.getElementById('title');
    var title = tabtitle.substr(sepindex + 1);
    title = title.substr(0, title.indexOf('- YouTube'));
    title = title.trim();

    t.value = title;

}

function postdata() {
    console.log('submitting');
    var url = "http://localhost:8000/player/extension/";
    $.ajax({
        type: "POST",
        url: url,
        data: $("#songform").serialize(), // serializes the form's elements.
        success: function (data) {
            console.log('form submitted.');
            $('#labelsuccess').show();
        }
    });
}