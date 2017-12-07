from rest_framework import viewsets
from api.serializers import ArtistSerializer
from player.models import Artist


class ArtistController(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
