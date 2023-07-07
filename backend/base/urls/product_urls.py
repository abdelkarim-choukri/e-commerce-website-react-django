from django.urls import path
from base.views import product_views as views



urlpatterns =[
    path('create/',views.createProduct,name='Create_Product'),
    path('upload/',views.uploadImage,name="upload_image"),
    path('',views.getProducts,name='Products'),
    path('<str:pk>/',views.getProduct,name='Product'),
    path('delete/<str:pk>/',views.deleteProduct,name='Delete_Product'),
    path('update/<str:pk>/',views.updateProduct,name='Update_Product'),
]
