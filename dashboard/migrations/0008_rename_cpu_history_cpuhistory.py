# Generated by Django 4.2.1 on 2023-05-29 02:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0007_remove_cpu_history_dev_datetime_cpu_history_dev_date_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CPU_history',
            new_name='CpuHistory',
        ),
    ]
