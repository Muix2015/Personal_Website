from django.db import models

# Create your models here.
class Rate(models.Model):
	# GJJ = models.FloatField(default=0, max_digits=4, decimal_places=2)
	# SYDK = models.FloatField(default=0, max_digits=4, decimal_places=2)	
	GJJ = models.DecimalField(default=0, max_digits=4, decimal_places=2)
	SYDK = models.DecimalField(default=0, max_digits=4, decimal_places=2)