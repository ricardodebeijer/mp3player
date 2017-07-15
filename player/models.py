from django.conf import settings
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from player.exceptions import InvalidModelInstanceException
from player.utils import create_hash


###
#  Managers
###
class ArtistManager(models.Manager):
    def add_artist(self, artist):
        if not isinstance(artist, Artist):
            print(artist)
            raise InvalidModelInstanceException('artist is not a instance of Artist')

        artist.save()
        return artist

    def isartistsaved(self, artistname):
        genhash = create_hash(artistname)
        try:
            artist = Artist.objects.get(hash=genhash)
            return artist
        except ObjectDoesNotExist:
            return None


class SongManager(models.Manager):
    def add_song(self, song, artist):
        if not isinstance(song, Song):
            print(song)
            raise InvalidModelInstanceException('song is not a instance of Song')

        if not isinstance(artist, Artist):
            print(artist)
            raise InvalidModelInstanceException('artist is not a instance of Artist')

        print('Adding Song to Artist: ' + song.title + ' -> ' + artist.name)
        song.artist = artist
        song.save()

        return song

    def issongsaved(self, song_title):
        genhash = create_hash(song_title)
        try:
            song = Song.objects.get(hash=genhash)
            return song
        except ObjectDoesNotExist:
            return None


class AccountManager(models.Manager):
    def add(self, account):
        account = self.create(account)

        return account


class PlaylistManager(models.Manager):
    def add(self, playlist):
        playlist = self.create(playlist)

        return playlist


###
#  Models
###
class Artist(models.Model):
    hash = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    objects = ArtistManager()

    def __str__(self):
        return self.name


class Song(models.Model):
    hash = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, related_name='songs')
    objects = SongManager()

    @property
    def source_jpg(self):
        return '/' + settings.MEDIA_URL + self.artist.hash + '/' + self.hash + '.jpg'

    @property
    def source_mp3(self):
        return '/' + settings.MEDIA_URL + self.artist.hash + '/' + self.hash + '.mp3'

    def __str__(self):
        return self.title + ', source_mp3: ' + self.source_mp3 + ', artist: ' + self.artist.name


class Account(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    objects = ArtistManager()

    def __str__(self):
        return self.username


class Playlist(models.Model):
    hash = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(Account, related_name='playlists')
    songs = models.ManyToManyField(Song, blank=True)
    objects = PlaylistManager()

    def __str__(self):
        return self.title
