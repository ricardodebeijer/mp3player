from django.contrib import admin

# Register your models here.
from player.models import Playlist, Song, Artist, Account

admin.site.register([Artist, Song, Account, Playlist])
