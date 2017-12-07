from rest_framework import viewsets
from api.serializers import PlaylistSerializer
from player.models import Playlist


class PlaylistController(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
