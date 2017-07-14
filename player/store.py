import threading
import os
from os import listdir
from django.conf import settings

from player import downloader
from player.models import Artist, Song
from player.utils import create_hash


def get_songs():
    global artists
    path = settings.MEDIA_URL
    try:
        artists = listdir(path)
    except FileNotFoundError:
        os.mkdir(path)
        artists = listdir(path)

    store = []
    for a in artists:
        artist = Artist()
        artist.hash = a
        artist.name = Artist.objects.get(hash=a).name
        songs = listdir(path + a + '/')
        for s in songs:
            if s.endswith('.mp3'):
                song = Song()
                hashwithoutmp3 = s.split('.mp3')[0]
                song.hash = hashwithoutmp3
                song.artist = artist
                song.title = Song.objects.get(hash=hashwithoutmp3)
                song.source = a + '/' + s

                store.append(song)
    return store


# When adding a new item, check the artist and song, if they do not already exist
def add_item(url, artist_name, song_title):
    artist = Artist.objects.isartistsaved(artist_name)
    if artist is None:
        print('Adding Artist to store: ' + artist_name)
        item = Artist()
        item.name = artist_name
        item.hash = create_hash(artist_name)
        artist = Artist.objects.add_artist(item)
    else:
        print('Artist already in store: ' + artist_name)

    song = Song.objects.issongsaved(song_title)
    if song is None:
        print('Adding Song to store: ' + song_title)
        item = Song()
        item.title = song_title
        item.hash = create_hash(song_title)
        song = Song.objects.add_song(item, artist)
        thread = threading.Thread(target=downloader.download, args=[url, artist.hash, song.hash])
        thread.start()
    else:
        print('Song already in store: ' + song_title + ' from: ' + artist_name)
