from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^addsong/$', views.addsong, name='addsong'),
    url(r'^inputurl/$', views.inputurl, name='inputurl'),
    url(r'^submitinfo/$', views.submitinfo, name='submitinfo'),
    url(r'^songs/$', views.songs, name='songs'),
    url(r'^song/(\w+)/$', views.song, name='song')
]
