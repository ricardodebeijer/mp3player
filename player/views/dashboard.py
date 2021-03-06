import glob
import os
import shutil

from django.conf import settings
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from pprint import pprint
from player.forms import ArtistForm, SongForm, UserForm, PlaylistForm
from player.models import Artist, Song, Playlist
from player.mp3edit import slice_mp3
from player.utils import create_hash


def admin_index(request):
    context = {
        'artists': Artist.objects.all(),
        'users': User.objects.all()
    }
    return render(request, 'dashboard/dashboard.html', context)


def admin_artist(request, artist_hash=None):
    artist = get_object_or_404(Artist, hash=artist_hash)
    if request.method == "POST":
        form = ArtistForm(request.POST, instance=artist)
        if form.is_valid():
            old_item = Artist.objects.get(hash=artist_hash)
            new_item = form.save(commit=False)
            item = update_artist(old_item, new_item)
            item.save()
            return redirect('dashboard_index')
    else:
        form = ArtistForm(instance=artist)
    return render(request, 'dashboard/edit.html', {'form': form, 'title': 'Admin Artist Edit', })


def admin_artist_delete(request, artist_hash=None):
    Artist.objects.get(hash=artist_hash).delete()
    path = settings.PACKAGE_ROOT + '/' + settings.MEDIA_URL + '/' + artist_hash
    # print('delete path: ' + path)
    shutil.rmtree(path)
    return redirect('dashboard_index')


def admin_song(request, song_hash=None):
    song = get_object_or_404(Song, hash=song_hash)
    if request.method == "POST":
        form = SongForm(request.POST, instance=song)
        if form.is_valid():
            old_item = Song.objects.get(hash=song_hash)
            new_item = form.save(commit=False)
            item = update_song(old_item, new_item)
            item.save()
            return redirect('dashboard_index')
    else:
        form = SongForm(instance=song)
    return render(request, 'dashboard/edit.html',
                  {'form': form, 'title': 'Admin Song Edit', 'issong': True, 'selected_song': song})


def admin_song_mp3(request):
    if request.method == "POST":
        song_hash = request.POST['edithash']
        song = Song.objects.get(hash=song_hash)
        type = request.POST['edittype']
        position = request.POST['edittime']
        slice_mp3(song, type, position)
        return redirect('dashboard_song', song_hash)
    return redirect('dashboard_index')


def admin_song_delete(request, song_hash=None):
    song = Song.objects.get(hash=song_hash)
    mp3_path = settings.PACKAGE_ROOT + song.source_mp3
    jpg_path = settings.PACKAGE_ROOT + song.source_jpg
    mp3_path = mp3_path.replace('\\', '/')
    jpg_path = jpg_path.replace('\\', '/')
    try:
        os.remove(mp3_path)
        os.remove(jpg_path)
    except OSError:
        pass
    song.delete()
    return redirect('dashboard_index')


def admin_user(request, username=None):
    user = get_object_or_404(User, username=username)
    if request.method == "POST":
        form = UserForm(request.POST, instance=user)
        if form.is_valid():
            item = form.save(commit=False)
            item.save()
            return redirect('dashboard_index')
    else:
        form = UserForm(instance=user)
    return render(request, 'dashboard/edit.html', {'form': form, 'title': 'Admin User Edit', })


def admin_playlist(request, playlist_hash=None):
    playlist = get_object_or_404(Playlist, hash=playlist_hash)
    if request.method == "POST":
        form = PlaylistForm(request.POST, instance=playlist)
        if form.is_valid():
            item = form.save(commit=False)
            item.save()
            return redirect('dashboard_index')
    else:
        form = PlaylistForm(instance=playlist)
    return render(request, 'dashboard/edit.html', {'form': form, 'title': 'Admin Playlist Edit', })


def update_artist(old, new):
    print('old: ', old.name, old.hash)
    print('new: ', new.name, new.hash)

    item = old
    if old.name != new.name:
        item.name = new.name
        item.hash = create_hash(item.name)
    print('item: ', item.name, item.hash)
    # rename folder and move everything
    base = settings.PACKAGE_ROOT + '/' + settings.MEDIA_URL
    base = base.replace('\\', '/')
    old_path = base + new.hash
    new_path = base + item.hash
    print('renaming folder from: ' + old_path + ', to: ' + new_path)
    os.rename(old_path, new_path)
    return item


def update_song(old, new):
    item = old
    # pprint(vars(old))
    # pprint(vars(new))
    old_mp3_path = item.source_mp3[1:]
    old_jpg_path = item.source_jpg[1:]
    if old.title != new.title:
        item.title = new.title
        item.hash = create_hash(item.title)

    if old.artist_id != new.artist_id:
        item.artist = Artist.objects.get(id=new.artist_id)

    new_mp3_path = item.source_mp3[1:]
    new_jpg_path = item.source_jpg[1:]
    # print(old_jpg_path + '\r\n' + new_jpg_path + '\r\n' + old_mp3_path + '\r\n' + new_mp3_path)
    # move mp3 and jpg
    print('moving mp3 from: ' + old_mp3_path + ', to: ' + new_mp3_path)
    try:
        shutil.move(old_jpg_path, new_jpg_path)
        shutil.move(old_mp3_path, new_mp3_path)
    except OSError:
        pass

    # pprint(vars(item))
    return item
