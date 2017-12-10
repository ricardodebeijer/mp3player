import threading
from api import downloader, utils
from player.models import Artist, Song


# When adding a new item, check the artist and song, if they do not already exist
def add_item(url, artist_name, song_title):
    artist = get_or_none(Artist, name=artist_name)
    if artist is None:
        print('Adding Artist to store: ' + artist_name)
        item = Artist()
        item.name = artist_name
        item.hash = utils.create_hash(artist_name)
        item.save()
        artist = item
    else:
        print(artist)
        print('Artist already in store: ' + artist_name)

    song = get_or_none(Song, title=song_title)
    if song is None:
        print('Adding Song to store: ' + song_title)
        item = Song()
        item.title = song_title
        item.hash = utils.create_hash(song_title)
        item.artist = artist
        item.save()
        song = item
        thread = threading.Thread(target=downloader.download, args=[url, artist.hash, song.hash])
        thread.start()
    else:
        print(song)
        print('Song already in store: ' + song_title + ' from: ' + artist_name)
    return song


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None
