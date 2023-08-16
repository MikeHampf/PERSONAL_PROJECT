from django.urls import path
from .views import List_manager

urlpatterns = [
    path('', List_manager.as_view(), name="list")
]