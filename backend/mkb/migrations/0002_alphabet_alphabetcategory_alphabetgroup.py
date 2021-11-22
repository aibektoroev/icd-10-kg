# Generated by Django 3.2.7 on 2021-11-19 14:38

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('mkb', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlphabetCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, unique=True)),
                ('details', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'AlphabetCategory',
                'managed': True,
            },
            managers=[
                ('alphabet_categories', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='AlphabetGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mkb.alphabetcategory')),
            ],
            options={
                'db_table': 'AlphabetGroup',
                'managed': True,
            },
            managers=[
                ('alphabet_groups', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='Alphabet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phrase', models.CharField(max_length=250)),
                ('details', models.TextField(blank=True, null=True)),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mkb.alphabetgroup')),
            ],
            options={
                'db_table': 'Alphabet',
                'managed': True,
            },
            managers=[
                ('alphabets', django.db.models.manager.Manager()),
            ],
        ),
    ]
