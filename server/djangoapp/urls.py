from django.urls import path
from . import views

app_name = 'djangoapp'
urlpatterns = [
    # Rutas estáticas
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    
    # Rutas de Autenticación
    path('login', views.login_user, name='login'),
    path('logout', views.logout_request, name='logout'),
    
    # Rutas de Autos (Models)
    path('get_cars', views.get_cars, name='getcars'),
    
    # Rutas de Concesionarios (Dealers)
    path('get_dealers', views.get_dealerships, name='get_dealers'),
    path('get_dealers/<str:state>', views.get_dealerships, name='get_dealers_by_state'),
    path('dealer/<int:dealer_id>', views.get_dealer_details, name='dealer_details'),
    
    # Rutas de Reseñas (Reviews)
    path('reviews/dealer/<int:dealer_id>', views.get_dealer_reviews, name='dealer_reviews'),
    path('analyze_review', views.analyze_review, name='analyze_review'),
]