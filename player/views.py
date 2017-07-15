from django.http import HttpResponse
from django.shortcuts import render

from player import infogather, store
from player.models import Artist, Song
from player.utils import set_sources, set_session_and_return, set_playlist_hashes, get_next_song_hash, \
    get_previous_song_hash


def index(request, message=None):
    song = request.session['current_song_json']
    songs = store.get_songs()
    set_playlist_hashes(request, songs)
    context = {
        'songs': songs,
        'current_song': song,
        'message': message,
    }
    return render(request, 'index.html', context)


def add_song(request, url=None, artist=None, title=None):
    context = {
        'submitinfo': url is not None,
        'enterurl': url is None,
        'url': url,
        'artist': artist,
        'title': title,
    }
    return render(request, 'addsong.html', context)


def input_url(request, value=None):
    url, artist, title = '', '', ''
    if request.method == 'POST':
        url = request.POST.get('url')
        info = infogather.get_info(url)
        artist = info[0]
        title = info[1]
    return add_song(request, url, artist, title)


def submit_info(request, value=None):
    if request.method == 'POST':
        url = request.POST.get('url')
        artist = request.POST.get('artist')
        song_title = request.POST.get('title')
        store.add_item(url, artist, song_title)
    return index(request, 'Download in progess')


def artist(request, value=None):
    artist = Artist.objects.get(hash=value)
    context = {
        'artist': artist,
        'songs': artist.songs.all()
    }
    return render(request, 'artist.html', context)


def play_song(request, song_hash=None):
    song = Song.objects.get(hash=song_hash)
    song = set_sources(song)
    return set_session_and_return(request, song)


def next_song(request):
    next_song_hash = get_next_song_hash(request)
    return play_song(request, next_song_hash)


def previous_song(request):
    previous_song_hash = get_previous_song_hash(request)
    return play_song(request, previous_song_hash)
