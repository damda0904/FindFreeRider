# Generated by Django 3.1.7 on 2021-03-31 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessment', '0002_remove_kakaotextfile_filename'),
    ]

    operations = [
        migrations.AddField(
            model_name='kakaotextfile',
            name='filename',
            field=models.CharField(default='error', max_length=100),
        ),
    ]
