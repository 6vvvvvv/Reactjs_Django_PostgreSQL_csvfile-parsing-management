from . import views
from django.urls import path

urlpatterns = [
    path('home/', views.Home, name="home"),
    path('tableserializer/', views.TableView.as_view()),
    path('api/savetodb/', views.SaveToDB, name="savetodb"),
    # path('api/delfromdb/', views.DelFromDB, name="delfromdb"),
]
