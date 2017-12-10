from rest_framework import viewsets
from rest_framework.response import Response

from api import infogather
from api.serializers import AddSongSerializer, FetchInfoSerializer
from player.models import AddSong, FetchInfo


class AddSongController(viewsets.ModelViewSet):
    queryset = AddSong.objects.all()
    serializer_class = AddSongSerializer


class FetchInfoController(viewsets.ModelViewSet):
    queryset = FetchInfo.objects.all()
    serializer_class = FetchInfoSerializer

    def post(self, request, format=None):

        return Response(info)
