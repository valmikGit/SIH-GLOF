# Generated by Django 5.1.1 on 2024-09-13 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('glofapi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='glofattributes',
            name='latitude',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='glofattributes',
            name='longitude',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='glofattributes',
            name='maxelevation',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='glofattributes',
            name='meandepth',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='glofattributes',
            name='meanelevation',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='glofattributes',
            name='meanlength',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='glofattributes',
            name='meanwidth',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='glofattributes',
            name='minelevation',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='glofattributes',
            name='totalarea',
            field=models.TextField(),
        ),
    ]
