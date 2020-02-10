from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status


#Authentication check
#
#from rest_framework.permissions import IsAuthenticated
#
#For the sake of simplicity, I'm only checking authentication in React once on logging in and signing up


from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import MeetingRoom, MeetingRoomInBuilding
from .serializers import *
from django.contrib.auth import get_user_model

#To be honest, I never did logging for REST framework
#I do know how to log celery tasks though, so maybe that's something?
#Always willing to learn, my settings.py have logging settings, I did some research on it.
#
#import logging
#logger = logging.getLogger(__name__)
#logger.error('Error')

def convert_dict_to_string(dict):
    # Convert dictionary to string
    employeesAttending = []
    for employee in dict:
        employeesAttending.append(employee["value"])
    employeesAttending = ', '.join([str(emp) for emp in employeesAttending])
    return employeesAttending

class MeetingRoomList(APIView):

    #Real-life app would have this and React would send a token
    #
    #permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        """
     Get meeting room reservation list
     """
        if request.method == 'GET':
            data = []
            nextPage = 1
            previousPage = 1
            if request.GET.get('attendee') != "undefined" and request.GET.get('attendee') != "all":
                reservations = MeetingRoom.objects.filter(employees__contains=request.GET.get('attendee')).order_by('id')
            else:
                reservations = MeetingRoom.objects.all().order_by('id')
            page = request.GET.get('page', 1)
            paginator = Paginator(reservations, 20)
            try:
                data = paginator.page(page)
            except PageNotAnInteger:
                data = paginator.page(1)
            except EmptyPage:
                data = paginator.page(paginator.num_pages)

            serializer = MeetingRoomSerializer(data,context={'request': request} ,many=True)
            if data.has_next():
                nextPage = data.next_page_number()
            if data.has_previous():
                previousPage = data.previous_page_number()

            return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/reservations/?page=' + str(nextPage), 'prevlink': '/api/reservations/?page=' + str(previousPage)})

    def post(self, request, format=None):
        """
             Create a reservation
        """
        print(request.data)
        request.data["employees"] = convert_dict_to_string(request.data["employees"])

        serializer = MeetingRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if "roomReserved" in request.data:
                # Make the room unavailable
                room = MeetingRoomInBuilding.objects.get(meetingRoomTitle=request.data["roomReserved"])
                room.isAvailable = False
                room.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def meeting_room(request, pk):
    """
 Retrieve or delete a reservation by id/pk.
 """
    try:
        reservation = MeetingRoom.objects.get(pk=pk)
    except MeetingRoom.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MeetingRoomSerializer(reservation,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'DELETE':
        rooms = MeetingRoomInBuilding.objects.get(meetingRoomTitle=reservation.roomReserved)
        rooms.isAvailable = True
        rooms.save()
        reservation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', 'PUT'])
def meeting_room_create_delete(request):
    if request.method == 'POST':
        if MeetingRoomInBuilding.objects.filter(meetingRoomTitle=request.data['meetingRoomTitle']).exists():
            return Response("Room already exists!", status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = MeetingRoomInBuildingSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        # Delete a meeting room
        meetingRoom = MeetingRoomInBuilding.objects.get(pk=request.data["pk"])
        # Delete reservation if the room was reserved
        try:
            reservation = MeetingRoom.objects.get(roomReserved=meetingRoom.meetingRoomTitle)
            reservation.delete()
        except MeetingRoom.DoesNotExist:
            pass
        meetingRoom.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def meeting_rooms_list(request):
    """
     List  Meeting Rooms in Building, create a new Meeting Room
     or delete a meeting room.
     """
    if request.method == 'POST':
        data = []
        nextPage = 1
        previousPage = 1
        if "available" in request.data:
            meetingRoomList = MeetingRoomInBuilding.objects.filter(isAvailable=True).order_by('id')
        else:
            meetingRoomList = MeetingRoomInBuilding.objects.all().order_by('id')
        page = request.GET.get('page', 1)
        paginator = Paginator(meetingRoomList, 20)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = MeetingRoomInBuildingSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/meeting_rooms/?page=' + str(nextPage), 'prevlink': '/api/meeting_rooms/?page=' + str(previousPage)})


@api_view(['GET'])
def employees(request):
    """
    List employees.

    To create a new employee, visit the Sign up form on frontend
    Sign up backend is handled by Rest-Auth
    """
    User = get_user_model()
    get_employees = User.objects.all()
    serializer = UserSerializer(get_employees, context={'request': request} ,many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
