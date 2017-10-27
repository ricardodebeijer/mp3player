from django.contrib import admin
from player.models import Playlist, Song, Artist

admin.site.register([Artist, Song, Playlist])
