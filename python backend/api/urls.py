from django.conf.urls import url, include
from api.controllers.artist import ArtistController
from api.controllers.playlist import PlaylistController
from api.controllers.player import PlayerController
from api.controllers.song import SongController
from api.controllers.user import UserController
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'artist', ArtistController, base_name='artist')
router.register(r'playlist', PlaylistController, base_name='playlist')
router.register(r'player', PlayerController, base_name='player')
router.register(r'song', SongController, base_name='song')
router.register(r'user', UserController, base_name='user')

urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'', include(router.urls)),
]
