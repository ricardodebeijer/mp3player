from rest_framework import viewsets
from api.serializers import SongSerializer
from player.models import Song


class SongController(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    lookup_field = 'hash'

