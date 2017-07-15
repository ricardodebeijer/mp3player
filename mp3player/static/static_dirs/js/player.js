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
    localStorage.setItem("user_volume", value);
    $('#audioplayer').prop('volume', volume);
    $('#volume-amount').text(value);
}

function setuservolume() {
    var volume = localStorage.getItem("user_volume");
    volume = parseInt(volume);
    if (!volume) {
        volume = 50;
    }

    $('#vol-control').val(volume);
    setvolume(volume);
}

function checkreloaded() {
    if (sessionStorage.getItem("is_reloaded") == 1) {
        play_song();
        sessionStorage.setItem("is_reloaded", 0);
    }
}

function alterTime(val) {
    var player = document.getElementById('audioplayer');
    console.log('Current ' + player.currentTime);
    console.log('new proposed val ' + val);
    player.currentTime = val;
    console.log('After ' + player.currentTime);
}

function setcookieandreload() {
    sessionStorage.setItem("is_reloaded", 1);
    location.reload();
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
            setcookieandreload();
        }
    });
}

function next_song() {
    $.ajax({
        type: "GET",
        url: "/player/next",
        success: function (succes) {
            setcookieandreload();
        }
    });
}

function previous_song() {
    $.ajax({
        type: "GET",
        url: "/player/previous",
        success: function (succes) {
            setcookieandreload();
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

    $('#seek')
        .on('input', function (event) {
            alterTime(this.value);
        })
        .on('change', function (event) {
            alterTime(this.value);
        });

    $('#audioplayer')
        .on('timeupdate', function () {
            $('#current-time').text(tominutes(this.currentTime));
            var percentage = this.currentTime / (this.duration / 100);
            $("#bar").width(percentage + '%');

            $("#seek").attr("max", this.duration);
            $('#seek').val(this.currentTime);
        })
        .on('durationchange', function () {
            $('#duration-time').text(tominutes(this.duration));
        })
        .on('ended', function () {
            next_song();
        });

    checkreloaded();
    setuservolume();
});