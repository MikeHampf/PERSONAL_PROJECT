from django.db import models
from listener_app.models import Listener
from composer_listing_app.models import Composer_listing

class Listening_list(models.Model):
    listener= models.ForeignKey(Listener, on_delete=models.CASCADE, null=True)

class Composer_listing_item(models.Model):
    listening_list = models.ForeignKey(Listening_list, on_delete=models.CASCADE, null=True)
    composer_item = models.ForeignKey(Composer_listing, on_delete=models.CASCADE, null=True)
    date_added = models.DateField(auto_now_add=True)