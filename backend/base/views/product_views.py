# Rest Framework Import
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from base.serializers import ProductSerializer 
from django.shortcuts import get_object_or_404

# Local Import

from base.models import *

@api_view(['GET'])
def getProducts (request):
    products=Product.objects.all()
    Serializer = ProductSerializer(products,many=True)
    return Response(Serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product= Product.objects.get(pk=pk)
    Serializer=ProductSerializer(product)
    return Response(Serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct (request,pk):
    product=Product.objects.get(_id=pk)
    product.delete()
    return Response("the prodeuct was deleted")

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    data = request.data
    serializer = ProductSerializer(data=data)

    if serializer.is_valid():
        product = serializer.save(user=request.user)
        serialized_product = ProductSerializer(product)
        return Response(serialized_product.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response("Product not found.", status=status.HTTP_404_NOT_FOUND)
    
    data = request.data
    serializer = ProductSerializer(instance=product, data=data)
    print(data)
    if serializer.is_valid():
        print('is-valid')
        updated_product = serializer.save()
        serialized_product = ProductSerializer(product)
        return Response('serialized_product.data', status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = get_object_or_404(Product, _id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response({"message": "Image was uploaded"}, status=status.HTTP_200_OK)