from django.utils import timezone

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models


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

    @property
    def playlist_art(self):
        return self.songs.all()[0].source_jpg

    def __str__(self):
        return self.title


class CurrentSong(models.Model):
    user = models.ForeignKey(User, related_name='players')
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


class AddSong(models.Model):
    added_on = models.DateTimeField(default=timezone.now, blank=True)
    is_processed = models.BooleanField(default=False)
    song = models.ForeignKey(Song, related_name='download')
    youtube_url = models.CharField(max_length=100)

    def __str__(self):
        return self.youtube_url + ' is ' + str(self.is_processed) + ', ' + str(self.added_on)


class FetchInfo(models.Model):
    youtube_url = models.CharField(max_length=100)
    song_title = models.CharField(max_length=255)
    artist_name = models.CharField(max_length=255)

    def __str__(self):
        return self.youtube_url + ': ' + self.artist_name + ' - ' + self.artist_name
