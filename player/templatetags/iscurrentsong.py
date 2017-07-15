# from django import template
#
# register = template.Library()
#
#
# @register.filter(name='iscurrentsong',takes_context=True)
# def iscurrentsong(request, song_hash):
#     song = request.session['current_song_json']
#
#     if song_hash == song['hash']:
#         return True
#     else:
#         return False
