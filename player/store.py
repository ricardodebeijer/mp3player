import threading
import os
from operator import attrgetter
from os import listdir
from django.conf import settings
from django.contrib.auth.models import User

from player import downloader
from player.models import Artist, Song, Playlist, Account
from player.utils import create_hash


def get_songs():
    path = settings.MEDIA_URL
    if not os.path.exists(path) or not os.path.isdir(path):
        os.mkdir(path)

    store = Song.objects.all().order_by('artist__name')
    return store


def get_songs_from_playlist(playlist_hash):
    playlist = Playlist.objects.get(hash=playlist_hash)
    store = playlist.songs.all()
    return store


def get_playlists():
    store = Playlist.objects.all()
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


def create_playlist(playlist_name):
    print('Creating playlist: ' + playlist_name)
    #get current user and create a playlist object.
    playlist = Playlist()
    # TODO replace with actual logged in user
    playlist.owner = User.objects.get(username='nekkyou')
    playlist.hash = create_hash(playlist.owner.username + playlist_name)
    playlist.title = playlist_name

    createdplaylist = Playlist.objects.add(playlist)

