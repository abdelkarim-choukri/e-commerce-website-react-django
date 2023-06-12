# Django Import
from django.core import paginator
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


from .models import *

# Rest Framework Import
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework.response import Response

from base.serializers import ProductSerializer ,UserSerializer,UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework_simplejwt.views import TokenObtainPairView

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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer =UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET']) 
@permission_classes([IsAuthenticated])
def getUserProfile (request):
    user = request.user # @api_view It provides the Response and Request classes that are used to handle API requests and responses.
    Serializer = UserSerializer(user,many=False)
    return Response(Serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    Serializer=UserSerializer(users,many=True)
    return Response(Serializer.data) 