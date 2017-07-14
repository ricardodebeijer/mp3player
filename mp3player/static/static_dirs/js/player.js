function tominutes(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds
}

function setvolume(value) {
    var volume = value / 100;
    $('#audioplayer').prop('volume', volume);
    $('#volume-amount').text(value);
}

function checkreloaded() {
    if (window.performance) {
        if (performance.navigation.type == 1) {
            console.info("This page is reloaded");
            play_song();
        } else {
            console.info("This page is not reloaded");
        }
    } else {
        console.info("window.performance does NOT work on this browser");
    }

}

function play_song() {
    $('#audioplayer').trigger("play");
    $("#btnplay").hide();
    $("#btnpause").show();
}

function pause_song() {
    $('#audioplayer').trigger("pause");
    $("#btnplay").show();
    $("#btnpause").hide();
}

function select_song(hash) {
    $.ajax({
        type: "GET",
        url: "/player/play/" + hash,
        success: function (succes) {
            location.reload();
        }
    });
}

function next_song() {
    $.ajax({
        type: "GET",
        url: "/player/next",
        success: function (succes) {
            location.reload();
        }
    });
}

function previous_song() {
    $.ajax({
        type: "GET",
        url: "/player/previous",
        success: function (succes) {
            location.reload();
        }
    });
}

$(document).ready(function () {

    $('.songitem').click(function (event) {
        var hash = this.id.substr(3);
        select_song(hash);
        $('.songitem').removeClass('glyphicon-expand active-song').addClass('glyphicon-unchecked');
        $('#' + this.id).toggleClass('glyphicon-unchecked').toggleClass('glyphicon-expand').addClass('active-song');
    });

    $('#btnback').click(function (event) {
        previous_song();
    });

    $('#btnplay').click(function (event) {
        play_song();
    });

    $('#btnpause').click(function (event) {
        pause_song();
    });

    $('#btnforward').click(function (event) {
        next_song();
    });

    $('#vol-control')
        .on('input', function (event) {
            setvolume(this.value);
        })
        .on('change', function (event) {
            setvolume(this.value);
        });

    $('#audioplayer')
        .on('timeupdate', function () {
            $('#current-time').text(tominutes(this.currentTime));
            var percentage = this.currentTime / (this.duration / 100);
            $("#bar").width(percentage + '%');
        })
        .on('durationchange', function () {
            $('#duration-time').text(tominutes(this.duration));
        })
        .on('ended', function () {
            next_song();
        });

    checkreloaded()
});