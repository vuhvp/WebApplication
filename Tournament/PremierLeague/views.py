from django.shortcuts import render
from django.db.models import Count
from datetime import datetime
from .models import Match, Team

# Create your views here.
def match_index(request):
  matches = []
  all_matches = Match.objects.all()
  # Source code obtained from San4ez (2012), https://stackoverflow.com/a/10154412
  group_by_date_matches = Match.objects.extra(select={'day': 'date( match_time )'}).values('day').annotate(count=Count('match_time'))
  for match in group_by_date_matches:
    filteredMatches = [m for m in all_matches if str(datetime.date(m.match_time)) == match['day']]
    item = {
      'day': filteredMatches[0].match_time,
      'items': filteredMatches
    }
    matches.append(item)
  return render(request, 'match/index.html', {'matches': matches})

def match_detail(request, match_id):
  match = Match.objects.get(id = match_id)
  return render(request, 'match/detail.html', {'match': match})

def team_index(request):
  teams = Team.objects.all()
  return render(request, 'team/index.html', {'teams': teams})