from django.urls import path
from base.views import order_views as views

urlpatterns =[
    path('',views.getOrders,name='Order-add'),
    path('add/',views.addOrderItems,name='Order-add'),
    path('myorders/',views.getMyOrders,name='MyOrders'),
    path('<str:pk>/deliver/',views.updateOrderToDelivered,name="delivered"),
    path('<str:pk>/',views.getOrderById,name='User-Order'),
    path('<str:pk>/pay/',views.updateOrderToPaid,name='pay'),
]
