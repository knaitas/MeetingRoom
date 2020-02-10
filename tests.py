from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from meetingroom import views, models
import pytz, datetime

utc = pytz.utc

class MeetingRoomTests(APITestCase):

    def testCreateMeetingRoom(self):
        factory = APIRequestFactory()
        view = views.meeting_room_create_delete
        request = factory.post('/api/meeting_rooms_create/', {
                "meetingRoomTitle":"Medium room",
                "roomSize":"20",
                "isAvailable":True
                }, format='json')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def testCreateReservation(self):
        room = models.MeetingRoomInBuilding(meetingRoomTitle="Medium room",
                                            isAvailable=True,
                                            roomSize=20)
        room.save()
        factory = APIRequestFactory()
        view = views.MeetingRoomList.as_view()
        request = factory.post('/api/reservations/', {
                  "title":"test",
                  "fromDate":datetime.datetime.now(tz=utc),
                  "toDate":datetime.datetime.now(tz=utc),
                  "employees": [{"value":"test"}],
                  "notes":"bring water",
                  "roomReserved":"Medium room"
                }, format='json')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def testGetReservationsList(self):
        factory = APIRequestFactory()
        view = views.MeetingRoomList.as_view()
        request = factory.get('/api/reservations/?attendee=')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def testGetMeetingRoomsList(self):
        factory = APIRequestFactory()
        view = views.meeting_rooms_list
        request = factory.post('/api/meeting_rooms/')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def testGetMeetingRoomsListAvailable(self):
        factory = APIRequestFactory()
        view = views.meeting_rooms_list
        request = factory.post('/api/meeting_rooms/', {"available": True}, format='json')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)






