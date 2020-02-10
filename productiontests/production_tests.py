import requests
import pytz, datetime
import json

utc = pytz.utc
api_url = 'http://157.245.32.50:8000'

def test_get_reservations(attendee = ""):
    if attendee:
        r = requests.get(api_url + '/api/reservations/?attendee=' + attendee)
        assert r.status_code == 200
    else:
        r = requests.get(api_url + '/api/reservations/?attendee=')
        assert r.status_code == 200

def test_get_meeting_rooms(json = ""):
    if json:
        r = requests.post(api_url + '/api/meeting_rooms/', data=json)
        assert r.status_code == 200
    else:
        r = requests.post(api_url + '/api/meeting_rooms/')
        assert r.status_code == 200

def test_get_employees():
    r = requests.get(api_url + '/api/employees/')
    assert r.status_code == 201


def test_delete_reservation(reservation_id):
    r = requests.delete(api_url + '/api/reservations/'+str(reservation_id))
    if r.status_code == 404:
        print("Wrong reservation id")
    else:
        assert r.status_code == 204

def test_make_reservation(json_data):
    r = requests.post(api_url + '/api/reservations/', data=json_data)
    assert r.status_code == 201
    # Delete reservation after creating it
    j_string = r.text.replace("'", "\"")
    d = json.loads(j_string)
    test_delete_reservation(d["pk"])

def test_create_meeting_room(json):
    r = requests.post(api_url + '/api/meeting_rooms_create/', data=json)
    if r.status_code == 400:
        print("Cannot create the same room twice, choose a different room name")
    else:
        assert r.status_code == 201

#Test for login

def test_login(json):
    r = requests.post(api_url + '/rest-auth/login/', data=json)
    assert r.status_code == 200

#Test for sign up

def test_register_account(json):
    r = requests.post(api_url + '/rest-auth/registration/', data=json)
    assert r.status_code == 201




test_get_reservations()

test_get_meeting_rooms()

test_get_employees()

test_register_account({"username":"username212333",
                  "email": "emailas2222@email.com",
                  "password1": "helouhalou9999",
                  "password2": "helouhalou9999",})
                  

test_login({"username":"username212333",
            "password":"helouhalou9999"})
            


test_create_meeting_room({"meetingRoomTitle":"Medium room",
                     "roomSize":"20",
                     "isAvailable":True})
                                 


test_make_reservation({
                  "title":"test",
                  "fromDate":datetime.datetime.now(tz=utc),
                  "toDate":datetime.datetime.now(tz=utc),
                  "employees": "test, knaitas, tadas",
                  "notes":"bring water",
                  "roomReserved":"Medium room"
                })






