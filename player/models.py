from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Song(models.Model):
    hash = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    audio_file = models.FileField(upload_to="music")
    artist = models.ForeignKey(Artist, related_name='songs')

    def __str__(self):
        return self.title
