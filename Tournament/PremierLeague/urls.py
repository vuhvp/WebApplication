from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path('match', views.match_index, name='match_index'),
  path('match/<int:match_id>', views.match_detail, name='match_detail'),
  path('team', views.team_index, name='team_index')
]