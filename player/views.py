from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from player import infogather, store
from player.models import Artist, Song
from player.utils import set_session_and_return, set_playlist_hashes, get_next_song_hash, \
    get_previous_song_hash, set_cover_art


@login_required
def index(request, message=None):
    if 'current_song_json' not in request.session:
        song = None
    else:
        song = request.session['current_song_json']

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


def play_song(request, song_hash=None):
    if song_hash is not None:
        song = Song.objects.get(hash=song_hash)
        return set_session_and_return(request, song)
    else:
        print('No song selected: end of playlist')
        request.session['current_song_json'] = None
        return HttpResponse('')


def next_song(request):
    next_song_hash = get_next_song_hash(request)
    return play_song(request, next_song_hash)


def previous_song(request):
    previous_song_hash = get_previous_song_hash(request)
    return play_song(request, previous_song_hash)


@csrf_exempt
def extension_request(request):
    url = request.POST.get('url')
    artist = request.POST.get('artist')
    title = request.POST.get('title')
    print('Request from extension: ' + artist + ' - ' + title + ' (' + url + ')')
    store.add_item(url, artist, title)
    return HttpResponse('')


def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')
        else:
            context = {
                'message': 'invalid login'
            }
        return render(request, 'login.html', context)
    else:
        return render(request, 'login.html')


def logout_user(request):
    logout(request)
    return render(request, 'login.html')
