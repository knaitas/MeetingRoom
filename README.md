# Running Backend Tests

Connect to server with

**ssh knaitas@157.245.32.50**
Password is given via PM

```
source env/bin/activate
cd backend
```

To run rest-framework tests:

```
python manage.py test
```

To run production tests

```
cd tests
python tests_automated.py
```
