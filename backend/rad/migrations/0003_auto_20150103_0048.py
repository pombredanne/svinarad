# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rad', '0002_auto_20150103_0047'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='worker',
            field=models.ForeignKey(related_name='jobs', blank=True, to='rad.Worker', null=True),
            preserve_default=True,
        ),
    ]
