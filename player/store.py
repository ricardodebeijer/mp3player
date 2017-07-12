import random
from os import listdir
import hashlib
from player.models import Artist, Song


def getsongs():
    path = 'music/'
    artists = listdir(path)
    store = []
    for a in artists:
        artist = Artist()
        artist.name = a
        songs = listdir(path + '/' + a + '/')
        for s in songs:
            if s.endswith('.mp3'):
                song = Song()
                song.artist = artist
                song.title = s.split('.mp3')[0]
                #song.location = path + '/' + a + '/' + s
                song.audio_file = a + '/' + s
                song.hash = hashlib.md5(str(artist.name + s).encode('utf-8')).hexdigest()
                store.append(song)
    #print(store)
    return store
