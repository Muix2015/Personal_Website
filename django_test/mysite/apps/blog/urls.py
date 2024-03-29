from django.urls import path
from .views import index_view, article_view, catalogue_view

app_name = '[blog]'

urlpatterns = [
    path('', index_view, name='index_url'),
    path('article/<str:slug>', article_view, name='article_url'),
    path('cata/<str:slug>', catalogue_view, name='cata_url'),

]