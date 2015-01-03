# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rad', '0003_auto_20150103_0048'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reason',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('details', models.TextField()),
                ('feedback', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('initiator', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='employer',
            name='rating',
            field=models.FloatField(default=1),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='job',
            name='reasons',
            field=models.ForeignKey(related_name='job', to='rad.Reason'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='worker',
            name='rating',
            field=models.FloatField(default=1),
            preserve_default=True,
        ),
    ]
