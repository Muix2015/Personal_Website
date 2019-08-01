#!/usr/bin/python
#coding:utf-8
 
from django.db import models
 
class Blog(models.Model):
    terms = models.IntegerField(default=True)
    monthlyPayment = models.FloatField(default=True)
    monthlyPrincipal = models.FloatField(default=True)
    monthlyInterest = models.FloatField(default=True)
     
    def __unicode__(self):
        return self.title