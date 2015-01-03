# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rad', '0004_auto_20150103_0134'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='reasons',
            field=models.ForeignKey(to='rad.Reason', blank=True),
            preserve_default=True,
        ),
    ]
