from django.contrib import admin
from .models import Pdc, Action, Category
# Register your models here.
admin.site.register(Category)
admin.site.register(Pdc)
admin.site.register(Action)