# Django Import


# Rest Framework Import
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response

from base.serializers import ProductSerializer 

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