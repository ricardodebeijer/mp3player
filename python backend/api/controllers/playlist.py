from rest_framework import viewsets
from api.serializers import PlaylistSerializer
from api.viewsets import ReadOnlyViewSet, UpdateViewSet
from player.models import Playlist


class AllPlaylists(UpdateViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
