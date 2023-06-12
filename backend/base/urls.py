from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns =[
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/login/refresh/', views.MyTokenObtainPairView.as_view(), name='token_refresh'),
    path('products/',views.getProducts,name='Products'),
    path('products/<int:pk>/',views.getProduct,name='Product'),

    path('users/profile/',views.getUserProfile,name='Users-profile'),

    path('users/',views.getUsers,name='Users'),
    
    # path('api/token/refresh/', views.MyTokenObtainPairSerializer, name='token_refresh'),
]
