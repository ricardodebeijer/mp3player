from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^addsong/$', views.add_song, name='addsong'),
    url(r'^inputurl/$', views.input_url, name='inputurl'),
    url(r'^submitinfo/$', views.submit_info, name='submitinfo'),
    url(r'^songs/$', views.songs, name='songs'),
    url(r'^song/(\w+)/$', views.song, name='song')
]
