from rest_framework import viewsets
from api.serializers import ArtistSerializer
from api.viewsets import ReadOnlyViewSet, UpdateViewSet
from player.models import Artist


class AllArtists(UpdateViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
