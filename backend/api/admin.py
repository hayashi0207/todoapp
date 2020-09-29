from django.contrib import admin

# Register your models here.
from .models import Todo
#adminにTaskを登録
admin.site.register(Todo)