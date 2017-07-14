import hashlib
import re

from django.conf import settings
from django.http import HttpResponse


def create_hash(name):
    name = str.lower(name)
    name = re.sub('[^0-9a-zA-Z]+', '', name)
    hashed = hashlib.md5(str(name).encode('utf-8')).hexdigest()
    return hashed


def set_sources(song):
    # sources of mp3 and jpg
    path = '/' + settings.MEDIA_URL + song.artist.hash + '/' + song.hash
    song.source_mp3 = path + '.mp3'
    song.source_jpg = path + '.jpg'
    return song


def set_session_and_return(request, song):
    print('Selected song: ' + song.title)
    request.session['current_song_json'] = {
        'hash': song.hash,
        'title': song.title,
        'artist_name': song.artist.name,
        'artist_hash': song.artist.hash,
        'source_mp3': song.source_mp3,
        'source_jpg': song.source_jpg
    }
    return HttpResponse('')
