from django.shortcuts import render
from player import infogather, store


def index(request, value=None):
    context = {
        'songs': store.get_songs(),
        'message': value
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


def songs(request, value=None):
    context = {
        'songs': 'multiple songs'
    }
    return render(request, 'songs.html', context)


def song(request, value=None):
    context = {
        'song': '1 song'
    }
    return render(request, 'song.html', context)
