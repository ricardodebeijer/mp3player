# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-15 17:30
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('player', '0002_auto_20170714_1817'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='source_jpg',
        ),
        migrations.RemoveField(
            model_name='song',
            name='source_mp3',
        ),
    ]