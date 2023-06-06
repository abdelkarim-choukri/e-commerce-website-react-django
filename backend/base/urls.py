from django.urls import path
from . import views


urlpatterns =[

    path('products/',views.getProducts,name='Products'),
    path('products/<int:pk>/',views.getProduct,name='Product'),
]