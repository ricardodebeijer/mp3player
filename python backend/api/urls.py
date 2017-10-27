from django.conf.urls import url, include
from rest_framework import routers

from api.controllers.artist import AllArtists
from api.controllers.player import AllCurrentSongs
from api.controllers.playlist import AllPlaylists
from api.controllers.song import AllSongs
from api.controllers.user import AllUsers

router = routers.DefaultRouter()
router.register(r'users', AllUsers)
router.register(r'artist', AllArtists)
router.register(r'song', AllSongs)
router.register(r'playlist', AllPlaylists)
router.register(r'current', AllCurrentSongs)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
