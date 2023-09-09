from django.db import models

# Create your models here.
class TeamStatistic(models.Model):
  position = models.IntegerField(default=0)
  total_matches = models.IntegerField(default=0)
  wins = models.IntegerField(default=0)
  draws = models.IntegerField(default=0)
  losses = models.IntegerField(default=0)
  goal_for = models.IntegerField(default=0)
  goal_against = models.IntegerField(default=0)
  point = models.IntegerField(default=0)

class Team(models.Model):
  name = models.CharField(max_length=100)
  location = models.CharField(max_length=100)
  email_address = models.EmailField()
  logo_url = models.ImageField()
  overall_statistic = models.ForeignKey(TeamStatistic, on_delete=models.CASCADE, related_name='overall_statistic', null=True)
  home_statistic = models.ForeignKey(TeamStatistic, on_delete=models.CASCADE, related_name='home_statistic', null=True)
  away_statistic = models.ForeignKey(TeamStatistic, on_delete=models.CASCADE, related_name='away_statistic', null=True)

  def __str__(self):
        return self.name
        
class MatchResult(models.Model):
  home_team_halftime_goal = models.IntegerField(default=0)
  away_team_halftime_goal = models.IntegerField(default=0)
  home_team_goal = models.IntegerField(default=0)
  away_team_goal = models.IntegerField(default=0)

class MatchStatistic(models.Model):
  open_play = models.IntegerField()
  set_piece = models.IntegerField(default=0)
  counter_attack = models.IntegerField(default=0)
  penalty = models.IntegerField(default=0)
  own_goal = models.IntegerField(default=0)

class Match(models.Model):
  home_team = models.ForeignKey(Team,on_delete=models.CASCADE, related_name='home_team')
  away_team = models.ForeignKey(Team,on_delete=models.CASCADE, related_name='away_team')
  result = models.ForeignKey(MatchResult,on_delete=models.CASCADE)
  match_time = models.DateTimeField()
  home_team_statistic = models.ForeignKey(MatchStatistic,on_delete=models.CASCADE, related_name='home_team_statistic')
  away_team_statistic = models.ForeignKey(MatchStatistic,on_delete=models.CASCADE, related_name='away_team_statistic')