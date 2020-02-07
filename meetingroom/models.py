from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class MeetingRoom(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField("Title", max_length=255)
    roomReserved = models.CharField("Room reserved", default="null", max_length=255)
    fromDate = models.DateTimeField(null=True, blank=True)
    toDate = models.DateTimeField(null=True, blank=True)
    employees = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)


class MeetingRoomInBuilding(models.Model):
    id = models.AutoField(primary_key=True)
    meetingRoomTitle = models.CharField("Title", max_length=255)

    # isAvailable is not a very good practice
    #
    # we need to check during which dates the room is available
    isAvailable = models.BooleanField(default=True)
    roomSize = models.IntegerField(default=0)


