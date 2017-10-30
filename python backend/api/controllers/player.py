from rest_framework import viewsets
from api.serializers import CurrentSongSerializer
from api.viewsets import ReadOnlyViewSet, UpdateViewSet
from player.models import CurrentSong


class AllCurrentSongs(viewsets.ModelViewSet):
    queryset = CurrentSong.objects.all()
    serializer_class = CurrentSongSerializer
