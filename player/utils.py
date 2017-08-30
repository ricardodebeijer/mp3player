import hashlib
import re
from django.http import HttpResponse


def create_hash(name):
    name = str.lower(name)
    name = re.sub('[^0-9a-zA-Z]+', '', name)
    hashed = hashlib.md5(str(name).encode('utf-8')).hexdigest()
    return hashed


def set_session_and_return(request, song):
    print('Selected song: ' + str(song))
    request.session['current_song_json'] = {
        'hash': song.hash,
        'title': song.title,
        'artist_name': song.artist.name,
        'artist_hash': song.artist.hash,
        'source_mp3': song.source_mp3,
        'source_jpg': song.source_jpg
    }
    return HttpResponse('')


def set_playlist_hashes(request, playlist):
    hashes = []
    for song in playlist:
        hashes.append(song.hash)
    # print('playlist hashes:')
    # print(hashes)
    request.session['playlist'] = hashes
    return hashes


def get_index_current_song(request):
    current_song_hash = request.session['current_song_json']['hash']
    playlist_hashes = request.session['playlist']
    current_index = playlist_hashes.index(current_song_hash)
    return current_index


def get_hash_from_index(request, index, current_index):
    playlist_hashes = request.session['playlist']
    try:
        next_song_hash = playlist_hashes[index]
    except IndexError:
        print('index out of range')
        # next_song_hash = playlist_hashes[current_index]
        next_song_hash = None
    return next_song_hash


def get_next_song_hash(request):
    current_index = get_index_current_song(request)
    next_index = current_index + 1  # check end bound...
    next_song_hash = get_hash_from_index(request, next_index, current_index)

    # if next_song_hash is not None:
    # print('next song will be: ' + next_song_hash)
    return next_song_hash


def get_previous_song_hash(request):
    current_index = get_index_current_song(request)
    previous_index = current_index - 1  # check start bound...
    previous_index_song_hash = get_hash_from_index(request, previous_index, current_index)
    # if previous_index_song_hash is not None:
    # print('previous song was: ' + previous_index_song_hash)
    return previous_index_song_hash


def set_cover_art(song):
    if song is None:
        return '/static/icons/favicon.png'
    else:
        return song['source_jpg']
