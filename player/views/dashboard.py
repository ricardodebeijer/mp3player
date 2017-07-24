import shutil
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from pprint import pprint
from player.forms import ArtistForm, SongForm, UserForm, PlaylistForm
from player.models import Artist, Song, Playlist
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
            item = form.save(commit=False)
            item.save()
            return redirect('dashboard_index')
    else:
        form = ArtistForm(instance=artist)
    return render(request, 'dashboard/edit.html', {'form': form, 'title': 'Admin Artist Edit', })


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
    return render(request, 'dashboard/edit.html', {'form': form, 'title': 'Admin Song Edit', })


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
        #print(old_jpg_path + '\r\n' + new_jpg_path + '\r\n' + old_mp3_path + '\r\n' + new_mp3_path)
        # move mp3 and jpg
        shutil.move(old_jpg_path, new_jpg_path)
        shutil.move(old_mp3_path, new_mp3_path)
    # pprint(vars(item))
    return item
