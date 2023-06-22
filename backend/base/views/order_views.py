from django.shortcuts import get_object_or_404
from django.shortcuts import render
from datetime import datetime

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Order, Product, ShippingAddress, OrderItem
from base.serializers import OrderSerializer

# Define an API view for adding order items
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data.get('orderItems', [])
    print(data)
    # Check if there are any order items
    if len(orderItems) == 0:
        return Response({'detail': 'No Order Items', 'status': status.HTTP_400_BAD_REQUEST})

    # Create a new order object
    order = Order.objects.create(
        user=user,
        paymentMethod=data['paymentMethod'],
        taxPrice=data['taxPrice'],
        shippingPrice=data['shippingPrice'],
        totalPrice=data['totalPrice'],
    )

    # Create a shipping address object
    shipping = ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postalCode=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country'],
    )

    # Get the product IDs from order items
    product_ids = [item['product'] for item in orderItems] # product_ids would be [1, 2, 3]

    # Fetch the products using the product IDs
    # in_bulk for avoid making multiple separate database queries to fetch each product individually
    products = Product.objects.in_bulk(product_ids)

    order_items = []
    for item in orderItems:
        # Get the product for the current order item
        product = products.get(item['product'])
        if product:
            # Create an order item object   
            order_item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=item['qty'],
                price=item['price'],
                image=product.image.url,
            )
            order_items.append(order_item)
            # Update the countInStock for the product
            product.countInStock -= order_item.qty

    # Bulk update the countInStock for all products
    Product.objects.bulk_update(products.values(), ['countInStock'])

    # Serialize the order and return the response
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getMyOrders(request):
#     user = request.user
#     orders = user.order_set.all()
#     serializer = OrderSerializer(orders, many=True)
#     return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAdminUser])
# def getOrders(request):
#     orders = Order.objects.all()
#     serializer = OrderSerializer(orders, many=True)
#     return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getOrderById(request, pk):
#     order = get_object_or_404(Order, _id=pk)
#     if request.user.is_staff or order.user == request.user:
#         serializer = OrderSerializer(order, many=False)
#         return Response(serializer.data)
#     else:
#         return Response({'detail': 'Not Authorized to view this order'},
#                         status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateOrderToPaid(request, pk):
#     order = get_object_or_404(Order, _id=pk)
#     order.isPaid = True
#     order.paidAt = datetime.now()
#     order.save()
#     return Response('Order was paid')


# @api_view(['PUT'])
# @permission_classes([IsAdminUser])
# def updateOrderToDelivered(request, pk):
#     order = get_object_or_404(Order, _id=pk)
#     order.isDeliver = True
#     order.deliveredAt = datetime.now()
#     order.save()
#     return Response('Order was Delivered')