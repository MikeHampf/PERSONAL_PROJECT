from rest_framework import serializers
from .models import Listening_list, Composer_listing_item

class Listening_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = Listening_list
        fields = ['id','listener']

class Composer_listing_item_serializer(serializers.ModelSerializer):
    class Meta:
        model = Composer_listing_item
        fields = ['listening_list', 'composer_item', 'date_added']