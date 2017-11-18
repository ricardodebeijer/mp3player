from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from player.exceptions import InvalidModelInstanceException
from player.utils import create_hash


###
#  Models
###
class Artist(models.Model):
    hash = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Song(models.Model):
    hash = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, related_name='songs')

    @property
    def source_jpg(self):
        return 'http://localhost:8000/' + settings.MEDIA_URL + self.artist.hash + '/' + self.hash + '.jpg'

    @property
    def source_mp3(self):
        return 'http://localhost:8000/' + settings.MEDIA_URL + self.artist.hash + '/' + self.hash + '.mp3'

    def __str__(self):
        return self.artist.name + ' - ' + self.title


class Playlist(models.Model):
    hash = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(User, related_name='playlists')
    songs = models.ManyToManyField(Song, blank=True)

    def __str__(self):
        return self.title


class CurrentSong(models.Model):
    user = models.ForeignKey(User)
    playlist = models.ForeignKey(Playlist)
    song = models.ForeignKey(Song)
    last_time = models.IntegerField()

    @property
    def artist_name(self):
        return self.song.artist.name

    @property
    def song_title(self):
        return self.song.title

    @property
    def song_jpg(self):
        return self.song.source_jpg

    @property
    def song_mp3(self):
        return self.song.source_mp3

    def __str__(self):
        return self.artist_name + ' ' + self.song_title
