from django.contrib.auth.models import User
from rest_framework import serializers

from player.models import Artist, Song, Playlist, CurrentSong


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'playlists')


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ('url', 'name', 'songs',)
        read_only_fields = ('hash',)


class SongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = ('url', 'title', 'artist',)
        read_only_fields = ('hash',)


class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Playlist
        fields = ('url', 'title', 'owner', 'songs',)
        read_only_fields = ('hash',)


class CurrentSongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CurrentSong
        fields = ('url', 'user', 'playlist', 'song', 'last_time', 'artist_name', 'song_title', 'song_jpg', 'song_mp3',)
        read_only_fields = ()
