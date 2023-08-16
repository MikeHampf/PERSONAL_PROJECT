from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Listening_list, Composer_listing_item
from composer_listing_app.models import Composer_listing
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from composer_listing_app.serializers import Composer_listing_serializer


class List_manager(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reply = {"listings": [], "total_listings": 0}
        list = Listening_list.objects.get(listener_id=request.user.id)
        print(list.id)
        for listings in Composer_listing_item.objects.filter(listening_list_id=list.id):
            reply["total_listings"]+=1
            entry = Composer_listing.objects.get(id=listings.composer_item_id)
            reply["listings"].append({"id":listings.id,
                                          "entry": {
                                              "work":entry.work_title,
                                              "composer": entry.composer_name,
                                              "date added": listings.date_added
                                          }
                                          })
        return Response(reply, status=HTTP_200_OK)