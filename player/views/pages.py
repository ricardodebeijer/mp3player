from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render
from player import store
from player.models import Artist, Song
from player.utils import set_playlist_hashes, set_cover_art


@login_required
def index(request, message=None):
    song = get_current_song(request)
    songs = store.get_songs()
    set_playlist_hashes(request, songs)
    cover_art_jpg = set_cover_art(song)
    context = {
        'songs': songs,
        'current_song': song,
        'cover_art_jpg': cover_art_jpg,
        'message': message,
    }
    return render(request, 'index.html', context)


def get_current_song(request):
    song = None
    if 'current_song_json' in request.session:
        song = request.session['current_song_json']

    try:
        Song.objects.get(hash=song['hash'])
    except Song.DoesNotExist:
        song = None

    return song


def artist(request, value=None):
    artist_item = Artist.objects.get(hash=value)
    context = {
        'artist': artist_item,
        'songs': artist_item.songs.all()
    }
    return render(request, 'artist.html', context)


def user(request, value=None):
    user_item = User.objects.get(username=value)
    context = {
        'user': user_item,
    }
    return render(request, 'user.html', context)
