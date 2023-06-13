from django.urls import path
from base.views import user_views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns =[
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', views.MyTokenObtainPairView.as_view(), name='token_refresh'),


    path('profile/',views.getUserProfile,name='Users-profile'),

    path('',views.getUsers,name='Users'),
    path('register/',views.registerUser,name='Register-User'),
    
    # path('api/token/refresh/', views.MyTokenObtainPairSerializer, name='token_refresh'),
]
