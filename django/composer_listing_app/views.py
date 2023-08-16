from django.shortcuts import render
from rest_framework.views import APIView
from .models import Composer_listing
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import Composer_listing_serializer
from list_app.models import Listening_list
from .models import Composer_listing
from list_app.models import Composer_listing_item
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND


class All_listings(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self):
        entries = Composer_listing_serializer(Composer_listing.objects.order_by('id'), many=True)
        return Response(entries.data)

    def post(self, request):
        list = Listening_list.objects.get(listener_id=request.user.id)
        composer_name = request.data["composer_name"]
        work_title = request.data["work_title"]

        new_listing = Composer_listing(composer_name=composer_name, work_title=work_title)
        new_listing.save()
        new_listing_item = Composer_listing_item(composer_item_id=new_listing.id, listening_list_id=list.id)
        new_listing_item.save()
        return Response(request.data)
    
class Listing(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        try:
            listing = Composer_listing_item.objects.get(id=id)
            print(listing)
            listing.delete()
        except:
            return Response("ITEM NOT FOUND", status=HTTP_404_NOT_FOUND)

        return Response("ITEM REMOVED", status=HTTP_204_NO_CONTENT)