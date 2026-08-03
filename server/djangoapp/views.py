from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
import json
from django.views.decorators.csrf import csrf_exempt
from .models import CarMake, CarModel


# Páginas Estáticas
def about(request):
    return render(request, 'About.html')

def contact(request):
    return render(request, 'Contact.html')

# Endpoint de Login
@csrf_exempt
def login_user(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)

# Endpoint de Logout
def logout_request(request):
    logout(request)
    data = {"userName": "", "status": "Logged out"}
    return JsonResponse(data)

# Endpoint para obtener los autos (Tareas 14 y 15)
def get_cars(request):
    count = CarMake.objects.filter().count()
    if count == 0:
        # Si no hay datos, creamos unos de ejemplo
        make1 = CarMake.objects.create(name="Toyota", description="Great cars")
        CarModel.objects.create(name="Camry", type="SEDAN", year=2020, car_make=make1)
        make2 = CarMake.objects.create(name="Honda", description="Reliable cars")
        CarModel.objects.create(name="Civic", type="SEDAN", year=2021, car_make=make2)
    
    car_models = CarModel.objects.select_related('car_make')
    cars = []
    for car_model in car_models:
        cars.append({"CarMake": car_model.car_make.name, "CarModel": car_model.name})
    return JsonResponse({"CarModels": cars})

# Endpoint simulado para todos los concesionarios (Tarea 9)
def get_dealerships(request, state="All"):
    dealers = [{"id": 1, "city": "El Paso", "state": "Texas", "st": "TX", "address": "3 Nova Court", "zip": "88563", "lat": 31.6948, "long": -106.3, "short_name": "Holden LLC", "full_name": "Holden LLC"}]
    if state != "All":
        dealers = [{"id": 2, "city": "Topeka", "state": "Kansas", "st": "KS", "address": "123 Main St", "zip": "66601", "lat": 39.0558, "long": -95.689, "short_name": "Kansas Auto", "full_name": "Kansas Auto Dealership"}]
    return JsonResponse({"status": 200, "dealers": dealers})

# Endpoint simulado para detalles de un concesionario (Tarea 10)
def get_dealer_details(request, dealer_id):
    dealer = {"id": dealer_id, "city": "El Paso", "state": "Texas", "st": "TX", "address": "3 Nova Court", "zip": "88563", "lat": 31.6948, "long": -106.3, "short_name": "Holden LLC", "full_name": "Holden LLC"}
    return JsonResponse({"status": 200, "dealer": dealer})

# Endpoint simulado para reseñas de un concesionario (Tarea 8)
def get_dealer_reviews(request, dealer_id):
    reviews = [{"id": 1, "name": "John Doe", "dealership": dealer_id, "review": "Great service!", "purchase": True, "purchase_date": "01/01/2026", "car_make": "Toyota", "car_model": "Camry", "car_year": 2020, "sentiment": "positive"}]
    return JsonResponse({"status": 200, "reviews": reviews})

# Endpoint simulado para análisis de sentimiento (Tarea 16)
def analyze_review(request):
    text = request.GET.get('text', '')
    sentiment = "positive" if "fantastic" in text.lower() or "great" in text.lower() else "neutral"
    return JsonResponse({"sentiment": sentiment})