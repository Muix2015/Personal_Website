# Generated by Django 2.2.3 on 2019-07-29 07:43

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='avatar',
            field=imagekit.models.fields.ProcessedImageField(default='avatar/default.png', upload_to='avatar', verbose_name='头像'),
        ),
    ]
