from django.contrib import admin

from .models import Rate

class RateAdmin (admin.ModelAdmin):
    list_display = ('id','GJJ','SYDK')


# Register your models here.
admin.site.register(Rate)