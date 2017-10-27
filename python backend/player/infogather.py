import requests
from lxml.html import fromstring


def get_info(url):
    r = requests.get(url)
    tree = fromstring(r.content)
    header = tree.findtext('.//title')
    data = str.split(header, '-')
    artist = data[0].strip()
    title = data[1].strip()
    title = clean_title(title)
    info = [artist, title]
    return info


def clean_title(title):
    title = title.replace('"', '')
    return title
