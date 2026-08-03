from django.contrib import admin
from .models import CarMake, CarModel

# Registramos los modelos para que aparezcan en el panel /admin
admin.site.register(CarMake)
admin.site.register(CarModel)
