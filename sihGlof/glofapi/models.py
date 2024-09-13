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