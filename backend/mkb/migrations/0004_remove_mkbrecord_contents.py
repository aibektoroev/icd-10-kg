# Generated by Django 3.2.7 on 2021-12-09 06:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mkb', '0003_auto_20211124_1625'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mkbrecord',
            name='contents',
        ),
    ]
