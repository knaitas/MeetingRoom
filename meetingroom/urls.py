from django.contrib import admin
from django.urls import path
from meetingroom import views
from django.conf.urls import url


urlpatterns = [
    #path('admin/', admin.site.urls),
    url(r'^api/employees/$', views.employees),
    url(r'^api/reservations/$', views.MeetingRoomList.as_view()),
    url(r'^api/reservations/(?P<pk>[0-9]+)$', views.meeting_room),
    url(r'^api/meeting_rooms/$', views.meeting_rooms_list),
    url(r'^api/meeting_rooms_create/$', views.meeting_room_create_delete),
]
