from django.conf import settings
from pydub import AudioSegment


def slice_mp3(song, type, posistion):
    print('Deleting ' + type + ' ' + posistion + ' on ' + song.title)
    path = settings.PACKAGE_ROOT + song.source_mp3
    file = AudioSegment.from_mp3(path)
    print(file)
    duration = file.duration_seconds
    print('duration: ' + str(duration))

    index = posistion
    print('index: ' + str(index))
    index = round(posistion, 0)
    print('index3: ' + str(index))

    if type == 'after':
        sliced = file[:index]
        print('sliced duration: ' + sliced.duration_seconds)
    elif type == 'before':
        start = duration - index
        sliced = file[-start:]
        print('sliced duration: ' + sliced.duration_seconds)
    # sliced.export(path, format="mp3")
    print('exported!')
