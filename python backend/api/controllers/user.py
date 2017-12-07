from rest_framework import viewsets
from api.serializers import UserSerializer
from player.models import User


class UserController(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
