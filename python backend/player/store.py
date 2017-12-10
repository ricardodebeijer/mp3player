import os

from django.conf import settings

from player.models import Song, Playlist
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


def create_playlist(playlist_name, request):
    print('Creating playlist: ' + playlist_name)
    playlist = Playlist()
    playlist.owner = request.user
    playlist.hash = create_hash(playlist.owner.username + playlist_name)
    playlist.title = playlist_name
    createdplaylist = Playlist.objects.add(playlist)


def save_playlist(playlist_hash, songs):
    print('Saving playlist ' + playlist_hash)

    playlist = Playlist.objects.get(hash=playlist_hash)
    playlist.songs = Song.objects.filter(hash__in=songs)
    playlist.save()

