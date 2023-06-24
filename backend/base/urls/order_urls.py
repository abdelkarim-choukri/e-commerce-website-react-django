from django.urls import path
from base.views import order_views as views

urlpatterns =[
    path('add/',views.addOrderItems,name='Order-add'),
    path('<str:pk>/',views.getOrderById,name='User-Order'),
    path('<str:pk>/pay/',views.updateOrderToPaid,name='pay'),
]
