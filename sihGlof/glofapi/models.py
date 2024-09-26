from django.db import models

# Create your models here.
class GLOFattributes(models.Model):
    latitude = models.TextField()
    longitude = models.TextField()
    totalarea = models.TextField()
    meanwidth = models.TextField()
    meanlength = models.TextField()
    meanelevation = models.TextField()
    meandepth = models.TextField()
    maxelevation = models.TextField()
    minelevation = models.TextField()
    period_activity_start = models.TextField()
    period_activity_end = models.TextField()
    num_basins = models.TextField()
    area_in_state = models.TextField()
    area_exp = models.TextField()
    source_nourish = models.TextField()