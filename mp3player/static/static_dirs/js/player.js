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

function setplaylistheight() {
    var height = $('#cover-art').height();
    $('#playlist-scroll').height(height);
}

function seekinsong(difference) {
    var newtime;
    var current = document.getElementById('audioplayer').currentTime;

    if (difference > 0) {
        newtime = current + difference / 100;
    } else {
        newtime = current - difference / 100;
    }

    alterTime(newtime);

    $('#seek').val(newtime * 100);
}

function setplaylistscroll() {
    var passes = sessionStorage.getItem("is_resized");
    if (passes == 1) {
        var ulitem = $('.active-song-item');
        if (ulitem) {
            try {
                var position = ulitem.position().top;
                var playlist = $('.playlist_child');
                var offset = playlist.height();
                var top = offset / 5;
                var newpos = position - top;
                playlist.scrollTop(newpos);
                sessionStorage.setItem("is_resized", passes++);
            }
            catch(err) {
                console.log('error: no active song item');
            }
        }
    } else {
        console.log('pass: ' + passes);
    }
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

function callurlandrefresh(url) {
    $.ajax({
        type: "GET",
        url: /player/ + url,
        success: function (succes) {
            setcookieandreload();
        }
    });
}
function select_song(hash) {
    callurlandrefresh("play/" + hash)
}

function next_song() {
    callurlandrefresh("next");
}

function previous_song() {
    callurlandrefresh("previous");
}

$(document).ready(function () {

    $('#btnRight').click(function (e) {
        console.log('Clicked Btn right');
        var selectedOpts = $('#playlistItems option:selected');
        if (selectedOpts.length == 0) {
            alert("Nothing to move.");
            e.preventDefault();
        }
        $('#allItems').append($(selectedOpts).clone());
        $(selectedOpts).remove();
        e.preventDefault();
    });

    $('#btnLeft').click(function (e) {
        console.log('Clicked Btn right');
        var selectedOpts = $('#allItems option:selected');
        if (selectedOpts.length == 0) {
            alert("Nothing to move.");
            e.preventDefault();
        }
        $('#playlistItems').append($(selectedOpts).clone());
        $(selectedOpts).remove();
        e.preventDefault();
    });

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

    $('#btn10sb').click(function (event) {
        seekinsong(-10)
    });

    $('#btn10sf').click(function (event) {
        seekinsong(10)
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

    $(window).on("resize", function () {
        if ($(window).width() >= 1000) {
            $("#partial-playlist").insertBefore($("#partial-player"));
        } else {
            $("#partial-player").insertBefore($("#partial-playlist"));
        }
        sessionStorage.setItem("is_resized", 1)
        setplaylistheight();
        setplaylistscroll();
    }).resize();



    checkreloaded();
    setuservolume();
});

