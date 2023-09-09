from django.contrib import admin
from .models import Team, TeamStatistic, Match, MatchResult, MatchStatistic
# Register your models here.

class MatchAdmin(admin.ModelAdmin):
  list_display = ['home_team', 'away_team','match_time']
  ordering = ['-match_time']
  
class TeamAdmin(admin.ModelAdmin):
  list_display = ['name', 'location', 'email_address','overall_statistic']
  ordering = ['name']

admin.site.register(Team, TeamAdmin)
admin.site.register(TeamStatistic)
admin.site.register(Match, MatchAdmin)
admin.site.register(MatchStatistic)
admin.site.register(MatchResult)
