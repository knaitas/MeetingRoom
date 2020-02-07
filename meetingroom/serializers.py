from rest_framework import serializers
from .models import MeetingRoom, MeetingRoomInBuilding
from django.contrib.auth import get_user_model
User = get_user_model()

class MeetingRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeetingRoom
        fields = ('pk', 'title', 'roomReserved', 'fromDate', 'toDate', 'employees','notes','createdAt')

class MeetingRoomInBuildingSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeetingRoomInBuilding
        fields = ('pk', 'meetingRoomTitle', 'isAvailable', 'roomSize')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','username', 'email')