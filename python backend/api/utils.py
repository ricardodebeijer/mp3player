from player.models import CurrentSong


def create_current_song(song):
    item = CurrentSong()
    item.artist = song.artist
    item.song = song
    item.artist_name = item.artist.name
    item.song_title = song.title
    item.song_jpg = song.source_jpg
    item.song_mp3 = song.source_mp3
    return item
