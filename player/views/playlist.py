from django.http import HttpResponse
from player.models import Song
from player.utils import set_session_and_return, get_next_song_hash, get_previous_song_hash


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
