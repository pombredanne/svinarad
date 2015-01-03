# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import geoposition.fields
from django.conf import settings
import django_fsm


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Employer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=150)),
                ('state', django_fsm.FSMField(default=b'open', protected=True, max_length=50)),
                ('credit', models.FloatField(default=0)),
                ('location', geoposition.fields.GeopositionField(max_length=42)),
                ('datetime', models.DateTimeField()),
                ('description', models.CharField(max_length=150)),
                ('instructions', models.TextField()),
                ('percentage', models.FloatField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Worker',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='job',
            name='applicants',
            field=models.ManyToManyField(to='rad.Worker'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='job',
            name='owner',
            field=models.ForeignKey(related_name='owned', to='rad.Employer'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='job',
            name='worker',
            field=models.ForeignKey(related_name='jobs', to='rad.Worker'),
            preserve_default=True,
        ),
    ]
