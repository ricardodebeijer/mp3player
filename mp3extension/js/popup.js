document.addEventListener('DOMContentLoaded', function () {
    $('#btnback').click(function (event) {
        postdata();
    });

    chrome.tabs.getSelected(null, function (tab) {
        filldata(tab);
    });

}, false);


function filldata(tab) {
    console.log(tab);
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
    $("#songform").ajaxSubmit({
        success: function () {
            console.log('form submitted.');
            $('#labelsuccess').show();
        }
    });
}