from rest_framework import viewsets
from api.serializers import CurrentSongSerializer
from player.models import CurrentSong


class PlayerController(viewsets.ModelViewSet):
    queryset = CurrentSong.objects.all()
    serializer_class = CurrentSongSerializer
