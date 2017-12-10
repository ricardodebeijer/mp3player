import hashlib
import re
from player.models import CurrentSong


def create_current_song(song):
    item = CurrentSong()
    item.artist = song.artist
    item.song = song
    return item


def create_hash(name):
    name = str.lower(name)
    name = re.sub('[^0-9a-zA-Z]+', '', name)
    hashed = hashlib.md5(str(name).encode('utf-8')).hexdigest()
    return hashed
