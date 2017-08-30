from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from player import store
from player.models import Song
from player.utils import set_session_and_return, set_playlist_hashes, get_next_song_hash, \
    get_previous_song_hash, set_cover_art


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


def create_playlist(request, Value=None):
    if request.method == 'POST':
        #Process data
        name = request.POST.get('name')
        store.create_playlist(name, request)
        return HttpResponseRedirect('/player/')


def playlists(request, message=None):
    songs = store.get_songs()
    playlist = store.get_playlists()
    context = {
        'playlists': playlist,
        'songs': songs,
        'message': message,
    }
    return render(request, 'playlists.html', context)


def play_playlists(request, Value=None, message=None):
    if 'current_song_json' not in request.session:
        song = None
    else:
        song = request.session['current_song_json']

    songs = store.get_songs_from_playlist(Value)
    set_playlist_hashes(request, songs)
    cover_art_jpg = set_cover_art(song)

    context = {
        'songs': songs,
        'current_song': song,
        'cover_art_jpg': cover_art_jpg,
        'message': message,
    }
    return render(request, 'index.html', context)


def manage_playlists(request, Value=None, message=None):
    if request.method == 'GET':
        print(Value)
        playlistsongs = store.get_songs_from_playlist(Value)
        songs = store.get_songs()
        songs = songs.exclude(id__in=playlistsongs)

        context = {
            'playlistsongs': playlistsongs,
            'songs': songs,
            'message': message,
        }
        return render(request, 'manageplaylist.html', context)
    else:
        print(Value)
        newsongs = request.POST.getlist('pitems')
        print(newsongs)

        store.save_playlist(Value, newsongs)

        return HttpResponseRedirect('/player/playlists/')


def save_playlist(request, Value=None):
    print(Value)