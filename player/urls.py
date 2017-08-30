from django.conf.urls import url
from player.views import pages, playlist, store, user, dashboard

urlpatterns = [
    url(r'^$', pages.index, name='index'),
    url(r'^artist/(\w+)/$', pages.artist, name='artist'),
    url(r'^user/(\w+)/$', pages.user, name='user'),

    url(r'^addsong/$', store.add_song, name='addsong'),
    url(r'^searchitem/$', store.search_item, name='searchitem'),
    url(r'^inputurl/$', store.input_url, name='inputurl'),
    url(r'^submitinfo/$', store.submit_info, name='submitinfo'),
    url(r'^extension/$', store.extension_request, name='extension_request'),

    url(r'^play/(\w+)/$', playlist.play_song, name='play_song'),
    url(r'^next/$', playlist.next_song, name='next_song'),
    url(r'^previous/$', playlist.previous_song, name='previous_song'),

    url(r'^login/$', user.login_user, name='login_user'),
    url(r'^logout/$', user.logout_user, name='logout_user'),

    url(r'^dashboard/$', dashboard.admin_index, name='dashboard_index'),
    url(r'^artist/(\w+)/edit/$', dashboard.admin_artist, name='dashboard_artist'),
    url(r'^artist/(\w+)/delete/$', dashboard.admin_artist_delete, name='dashboard_artist_delete'),
    url(r'^song/(\w+)/edit/$', dashboard.admin_song, name='dashboard_song'),
    url(r'^song/(\w+)/delete/$', dashboard.admin_song_delete, name='dashboard_song_delete'),
    url(r'^playlist/(\w+)/edit/$', dashboard.admin_playlist, name='dashboard_playlist'),
    url(r'^user/(\w+)/edit/$', dashboard.admin_user, name='dashboard_user'),
]
