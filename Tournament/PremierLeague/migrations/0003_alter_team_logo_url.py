# Generated by Django 4.0.3 on 2022-03-30 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PremierLeague', '0002_alter_team_logo_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='logo_url',
            field=models.ImageField(upload_to=''),
        ),
    ]
