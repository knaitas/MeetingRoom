# MeetingRoom

Small cloud system I made as a practical test

## How to connect:

**ssh knaitas@157.245.32.50**
Password is given via PM

## Power up backend:

```
source env/bin/activate

cd backend

python manage.py runserver 0.0.0.0:8000
```

Then open a new terminal

Power up frontend:

``` 
cd frontend

npm start
```

Now the server is accessible via browser on: http://157.245.32.50:3000/

**Sign up for a new account, go to Login => Sign up**

**To view reservations click Reservations tab**

**To create a reservation click Create a Reservation tab**
  - Select a room you want to reserve
  - Think of a reservation title
  - Select date range from - to
  - Select employees that will be attending this meeting
  - Add a note if needed
  
**To view meeting rooms and their availability, go to Meeting Rooms tab**

**To create a meeting room go to Create a Meeting Room tab**
  - Insert room name, must be unique, cannot have two rooms under the same name.
  - Input room size
  
 **To view employees go to Employees tab**
 
 **To create an employee log out, go to login => Sign up again**

