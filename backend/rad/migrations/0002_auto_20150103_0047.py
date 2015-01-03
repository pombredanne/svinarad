# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rad', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='worker',
            field=models.ForeignKey(related_name='jobs', blank=True, to='rad.Worker'),
            preserve_default=True,
        ),
    ]
