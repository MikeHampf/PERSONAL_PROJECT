from django.db import models

class Composer_listing(models.Model):
    composer_name = models.CharField(null=False, max_length=128)
    work_title = models.CharField(null=True, max_length=128)