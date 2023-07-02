# Django Import
from django.core import paginator
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.hashers import make_password
from rest_framework import status

# Rest Framework Import
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework.response import Response

from base.serializers import ProductSerializer ,UserSerializer,UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework_simplejwt.views import TokenObtainPairView

# Local Import

from base.models import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer =UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    try:
        data= request.data
        user=User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),
        )
        serializer=UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    except:
        message={"detail":"User with this email is already registered"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user 
    serializer = UserSerializerWithToken(user,many = False)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] !="":
        user.password= make_password(data['password'])
    user.save()
    return Response(serializer.data)



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

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    user=User.objects.get(id=pk)
    user.delete()
    return Response('user was deleted') 