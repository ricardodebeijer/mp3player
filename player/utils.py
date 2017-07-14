import hashlib
import re


def create_hash(name):
    name = str.lower(name)
    name = re.sub('[^0-9a-zA-Z]+', '', name)
    hashed = hashlib.md5(str(name).encode('utf-8')).hexdigest()
    return hashed
