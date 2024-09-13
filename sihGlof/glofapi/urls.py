from django.contrib import admin
from django.urls import path
from glofapi import views

urlpatterns = [
    path('', view=views.home),
    path('get-data/', view=views.get_other_data)
]
