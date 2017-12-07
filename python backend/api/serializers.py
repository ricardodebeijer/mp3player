from django.contrib.auth.models import User
from rest_framework import serializers
from player.models import Artist, Song, Playlist, CurrentSong


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ('url', 'hash', 'name', 'songs',)
        read_only_fields = ( )


class SongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = ('hash', 'url', 'title', 'artist',)
        read_only_fields = ()


class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Playlist
        fields = ('hash', 'url', 'title', 'owner', 'songs',)
        read_only_fields = ()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'playlists')
        read_only_fields = ()


class CurrentSongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CurrentSong
        fields = ('url', 'user', 'playlist', 'song', 'last_time', 'artist_name', 'song_title', 'song_jpg', 'song_mp3',)
        read_only_fields = ()
        extra_kwargs = {
            'url': {
                'view_name': 'player-detail',
            }
        }
