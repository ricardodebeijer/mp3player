from django.shortcuts import render, redirect
from player import infogather, store
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from player.views.pages import index


def add_song(request, url=None, artist=None, title=None):
    context = {
        'submitinfo': url is not None,
        'enterurl': url is None,
        'url': url,
        'artist': artist,
        'title': title,
    }
    return render(request, 'addsong.html', context)


def search_item(request):
    if request.method == "POST":
        criteria = request.POST['search-input']
        print('search for: ' + criteria)
    return redirect('index')


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


@csrf_exempt
def extension_request(request):
    url = request.POST.get('url')
    artist = request.POST.get('artist')
    title = request.POST.get('title')
    print('Request from extension: ' + artist + ' - ' + title + ' (' + url + ')')
    store.add_item(url, artist, title)
    return HttpResponse('')
