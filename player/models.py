from django.db import models


class Artist(models.Model):
    hash = models.CharField(max_length=255)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Song(models.Model):
    hash = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    source = models.CharField(max_length=1024)
    artist = models.ForeignKey(Artist, related_name='songs')

    def __str__(self):
        return self.title


class Account(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class Playlist(models.Model):
    hash = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    owner = models.ForeignKey(Account, related_name='playlists')
    songs = models.ManyToManyField(Song)

    def __str__(self):
        return self.title
