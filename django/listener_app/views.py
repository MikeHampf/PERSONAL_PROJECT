from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Listener
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from list_app.models import Listening_list
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_200_OK

class Sign_Up(APIView):
    def post(self, request):
        username = request.data["email"]
        name = request.data["name"]
        email = request.data["email"]
        password = request.data["password"]
        new_listener = Listener.objects.create_user(username=username, email=email, password=password, name=name)
        token = Token.objects.create(user=new_listener)
        listener_list = Listening_list.objects.create(listener=new_listener)
        listener_list.save()
        return Response({
            "listener": new_listener.email,
            "name": name,
            "token": token.key}, 
            status=HTTP_201_CREATED
        )
    
class Login(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        listener = authenticate(username=email, password=password)
        if listener:
            token, created = Token.objects.get_or_create(user=listener)
            return Response(
                {
                    "token": token.key,
                    "listener": listener.name,
                },
                status=HTTP_200_OK
            )

class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response("YOU'VE LOGGED OUT", status=HTTP_204_NO_CONTENT)
    
class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "email": request.user.email,
            "name": request.user.name
        },
        status=HTTP_200_OK)


class Master_Sign_up(APIView):
    def post(self, request):
        master_listener = Listener.objects.create_user(**request.data)
        master_listener.is_staff = True
        master_listener.is_superuser = True
        master_listener.save()
        token = Token.objects.create(user=master_listener)
        return Response({"master_listener": master_listener.email, "token": token.key}, status=HTTP_201_CREATED)