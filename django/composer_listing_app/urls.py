from django.urls import path
from .views import All_listings, Listing

urlpatterns = [
    path("", All_listings.as_view(), name="all_listings"),
    path("add/", All_listings.as_view(), name="add_listing"),
    path("delete/<int:id>/", Listing.as_view(), name="delete_listing"),
]