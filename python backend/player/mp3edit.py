from django.conf import settings
from pydub import AudioSegment


def slice_mp3(song, type, posistion):
    #print('Deleting ' + type + ' ' + posistion + ' on ' + song.title)
    path = settings.PACKAGE_ROOT + song.source_mp3
    file = AudioSegment.from_mp3(path)
    #print(file)
    duration = file.duration_seconds
    duration = float(duration)
    #print('duration: ' + str(duration))
    index = round(float(posistion), 3)
    #print('index: ' + str(index))
    indexmilis = index * 1000
    #print('indexmilis: ' + str(indexmilis))

    finalfile = None
    if type == 'after':
        sliced = file[:indexmilis]
        #print('sliced after duration: ' + str(sliced.duration_seconds))
        finalfile = sliced
    elif type == 'before':
        start = duration * 1000 - indexmilis
        #print('start: ' + str(start))
        sliced = file[-start:]
        #print('sliced before duration: ' + str(sliced.duration_seconds))
        finalfile = sliced

    #test_path = settings.PACKAGE_ROOT + '/' + settings.MEDIA_URL + song.artist.hash + '/' + song.hash + 'TESTING.mp3'
    finalfile.export(path, format="mp3")
    print('exported!')
