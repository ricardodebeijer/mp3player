from __future__ import unicode_literals
import youtube_dl


class MyLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)


def download(url, artist, title):
    ydl_opts = {
        # 'keepvideo': True,
        'no-mtime': True,
        # 'format': 'bestaudio/best',
        'writethumbnail': True,
        'outtmpl': 'music/' + artist + '/' + title + '.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
        }],
        'logger': MyLogger()
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
