from django.shortcuts import render
from player import downloader, infogather, store
import threading


def index(request, value=None):
    context = {
        'songs': store.getsongs(),
        'message': value
    }
    return render(request, 'index.html', context)


def addsong(request, url=None, artist=None, title=None):
    context = {
        'submitinfo': url is not None,
        'enterurl': url is None,
        'url': url,
        'artist': artist,
        'title': title,
    }
    return render(request, 'addsong.html', context)


def inputurl(request, value=None):
    url, artist, title = '', '', ''
    if request.method == 'POST':
        url = request.POST.get('url')
        # print('url: ' + url)
        info = infogather.get_info(url)
        artist = info[0]
        title = info[1]
    return addsong(request, url, artist, title)


def submitinfo(request, value=None):
    if request.method == 'POST':
        url = request.POST.get('url')
        artist = request.POST.get('artist')
        title = request.POST.get('title')
        # print('Info: ' + artist + ' - ' + title)
        thread = threading.Thread(target=downloader.download, args=[url, artist, title])
        thread.start()
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
