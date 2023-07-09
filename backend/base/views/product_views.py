# Rest Framework Import
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from base.serializers import ProductSerializer 
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# Local Import

from base.models import *

# @api_view(['GET'])
# def getProducts (request):
#     query=request.query_params.get('')
#     products=Product.objects.all()
#     Serializer = ProductSerializer(products,many=True)
#     return Response(Serializer.data)

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query).order_by('-_id')

    page = request.query_params.get('page')
    paginator = Paginator(products, 3)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        num_reviews = len(reviews)
        product.rating = reviews.aggregate(total=Sum('rating'))['total'] / num_reviews
        product.numReviews = num_reviews
        product.save()

        return Response('Review Added')
    


