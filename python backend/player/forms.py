from django import forms
from django.contrib.auth.models import User

from .models import Song, Artist, Playlist


class ArtistForm(forms.ModelForm):
    class Meta:
        model = Artist
        fields = ('name',)


class SongForm(forms.ModelForm):
    class Meta:
        model = Song
        fields = ('title', 'artist',)


class PlaylistForm(forms.ModelForm):
    class Meta:
        model = Playlist
        fields = ('title', 'owner', 'songs',)


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username',)
