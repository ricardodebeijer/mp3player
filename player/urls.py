from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^addsong/$', views.add_song, name='addsong'),
    url(r'^inputurl/$', views.input_url, name='inputurl'),
    url(r'^submitinfo/$', views.submit_info, name='submitinfo'),
    url(r'^artist/(\w+)/$', views.artist, name='artist'),
    url(r'^play/(\w+)/$', views.play_song, name='play_song'),
    url(r'^next/$', views.next_song, name='next_song'),
    url(r'^previous/$', views.previous_song, name='previous_song'),
]
