from django.urls import path
from .views import Sign_Up, Login, Logout, Info

urlpatterns = [
    path('signup/', Sign_Up.as_view(), name="signup"),
    path('login/', Login.as_view(), name="login"),
    path('logout/', Logout.as_view(), name="logout"),
    path('info/', Info.as_view(), name="info"),
]