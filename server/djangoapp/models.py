from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Modelo para la marca del auto (Car Make)
class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

# Modelo para el modelo del auto (Car Model)
class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('TRUCK', 'Truck'),
        ('COUPE', 'Coupe')
    ]
    type = models.CharField(max_length=10, choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(
        default=2024,
        validators=[MaxValueValidator(2024), MinValueValidator(2015)]
    )
    dealer_id = models.IntegerField(null=True) # Relación con el concesionario

    def __str__(self):
        return f"{self.car_make.name} {self.name} ({self.year})"
