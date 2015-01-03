# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rad', '0005_auto_20150103_0149'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='reasons',
        ),
        migrations.AddField(
            model_name='reason',
            name='job',
            field=models.ForeignKey(related_name='reasons', default=1, to='rad.Job'),
            preserve_default=False,
        ),
    ]
