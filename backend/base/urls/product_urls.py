from django.urls import path
from base.views import product_views as views



urlpatterns =[
    path('',views.getProducts,name='Products'),
    path('<str:pk>/',views.getProduct,name='Product'),
    path('delete/<str:pk>/',views.deleteProduct,name='Delete_Product'),
]
