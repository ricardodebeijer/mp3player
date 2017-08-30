from pydub import AudioSegment


def slicemp3(song, start,end):
    file = AudioSegment.from_mp3(song.source_mp3)
    minute = 60 * 1000
    firstminute = file[:minute]
    firstminute.export(song.source_mp3, format="mp3")

