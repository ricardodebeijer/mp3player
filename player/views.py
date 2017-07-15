from django.http import HttpResponse
from django.shortcuts import render

from player import infogather, store
from player.models import Artist, Song
from player.utils import set_sources, set_session_and_return


def index(request, message=None):
    song = request.session['current_song_json']
    context = {
        'songs': store.get_songs(),
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
    song = request.session['current_song_json']
    song_hash = song['hash']
    print('next song requested, will be: ' + song_hash)
    return play_song(request, song_hash)


def previous_song(request):
    song = request.session['current_song_json']
    song_hash = song['hash']
    print('previous song requested, was: ' + song_hash)
    return play_song(request, song_hash)
