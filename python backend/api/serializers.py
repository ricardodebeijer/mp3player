from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.response import Response

from api import infogather, store
from player.models import Artist, Song, Playlist, CurrentSong, AddSong, FetchInfo


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ('url', 'name', 'songs',)
        read_only_fields = ('hash',)
        lookup_field = 'hash'
        extra_kwargs = {
            'url': {
                'lookup_field': 'hash',
            },
            'songs': {'lookup_field': 'hash'}
        }


class SongSerializer(serializers.HyperlinkedModelSerializer):
    def update(self, instance, validated_data):
        print('NEE, niet deze updaten')
        pass

    def create(self, validated_data):
        print('NEE, niet via deze een song aanmaken')
        pass

    class Meta:
        model = Song
        fields = ('url', 'title', 'artist',)
        read_only_fields = ('hash',)
        lookup_field = 'hash'
        extra_kwargs = {
            'url': {
                'lookup_field': 'hash',
            },
            'artist': {'lookup_field': 'hash'}
        }


class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Playlist
        fields = ('hash', 'url', 'title', 'playlist_art', 'owner', 'songs',)
        read_only_fields = ()
        lookup_field = 'hash'
        extra_kwargs = {
            'url': {
                'lookup_field': 'hash',
            },
            'owner': {'lookup_field': 'username'},
            'songs': {'lookup_field': 'hash'}
        }


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'playlists', 'players')
        read_only_fields = ()
        lookup_field = 'username'
        extra_kwargs = {
            'url': {
                'lookup_field': 'username',
            },
            'playlists': {'lookup_field': 'hash'},
            'players': {'view_name': 'player-detail', }
        }


class CurrentSongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CurrentSong
        fields = ('url', 'user', 'playlist', 'song', 'last_time', 'artist_name', 'song_title', 'song_jpg', 'song_mp3',)
        read_only_fields = ()
        # lookup_field = 'user'
        extra_kwargs = {
            'url': {
                # 'lookup_field': 'user',
                'view_name': 'player-detail',
            },
            'user': {'lookup_field': 'username'},
            'playlist': {'lookup_field': 'hash'},
            'song': {'lookup_field': 'hash'}
        }


class AddSongSerializer(serializers.HyperlinkedModelSerializer):
    def update(self, instance, validated_data):
        print('NEE, niet deze updaten')
        pass

    def create(self, validated_data):
        # print(validated_data)
        download_url = validated_data.get('youtube_url')
        # print('getting info for: ' + download_url)
        info = infogather.get_info(download_url)
        artist = info[0]
        title = info[1]

        item = AddSong()
        item.youtube_url = download_url
        item.song = store.add_item(download_url, artist, title)
        item.save()
        return item

    class Meta:
        model = AddSong
        fields = ('url', 'youtube_url',)
        read_only_fields = ()


class FetchInfoSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        download_url = validated_data.get('youtube_url')
        info = infogather.get_info(download_url)
        artist = info[0]
        song = info[1]
        print('info for: ' + download_url + ', is: ' + artist + ' - ' + song)
        item = FetchInfo()
        item.youtube_url = download_url
        item.artist_name = artist
        item.song_title = song
        item.save()
        return item

    class Meta:
        model = FetchInfo
        fields = ('url', 'youtube_url',)
        read_only_fields = ()
