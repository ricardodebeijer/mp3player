from django.contrib.auth.models import User
from rest_framework import viewsets
from api.serializers import UserSerializer
from api.viewsets import ReadOnlyViewSet


class AllUsers(ReadOnlyViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
