from rest_framework import serializers
from .models import Composer_listing

class Composer_listing_serializer(serializers.ModelSerializer):
    class Meta:
        model = Composer_listing
        fields = ['id', 'composer_name', 'work_title']