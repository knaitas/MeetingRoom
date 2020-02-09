import requests
import pytz, datetime

utc = pytz.utc
api_url = 'http://157.245.32.50:8000'

def get_reservations(attendee = ""):
    if attendee:
        r = requests.get(api_url + '/api/reservations/?attendee=' + attendee)
        assert r.status_code == 200
    else:
        r = requests.get(api_url + '/api/reservations/?attendee=')
        assert r.status_code == 200

def get_meeting_rooms(available = ""):
    if available:
        r = requests.get(api_url + '/api/meeting_rooms/?available=' + available)
        assert r.status_code == 200
    else:
        r = requests.get(api_url + '/api/meeting_rooms/?available=')
        assert r.status_code == 200

def get_employees():
    r = requests.get(api_url + '/api/employees/')
    assert r.status_code == 201

def make_reservation(json):
    r = requests.post(api_url + '/api/reservations/', data=json)
    assert r.status_code == 201

def delete_reservation(reservation_id):
    r = requests.delete(api_url + '/api/reservations/'+str(reservation_id))
    if r.status_code == 404:
        print("Wrong reservation id")
    else:
        assert r.status_code == 204

def create_meeting_room(json):
    r = requests.post(api_url + '/api/meeting_rooms/', data=json)
    if r.status_code == 400:
        print("Cannot create the same room twice, choose a different room name")
    else:
        assert r.status_code == 201




#get_reservations()
#get_meeting_rooms()
delete_reservation(49)
#get_employees()
make_reservation({"title":"test",
                  "fromDate":datetime.datetime.now(tz=utc),
                  "toDate":datetime.datetime.now(tz=utc),
                  "employees":"test",
                  "notes":"bring water",
                  "roomReserved":"Medium room"})

create_meeting_room({"meetingRoomTitle":"Test Room",
                     "roomSize":"20",
                     "isAvailable":True})




