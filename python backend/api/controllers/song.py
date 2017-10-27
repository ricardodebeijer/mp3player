from rest_framework import viewsets
from api.serializers import SongSerializer
from api.viewsets import ReadOnlyViewSet, UpdateViewSet
from player.models import Song


class AllSongs(UpdateViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
