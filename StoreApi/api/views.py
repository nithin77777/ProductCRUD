from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse

# Create your views here.

'''Module Imports'''

from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import ProductSerializer
from .models import Product


@api_view(['GET'])
def all_products(req):

    data = Product.objects.all()
    serialize = ProductSerializer(data, many=True)

    return JsonResponse(serialize.data, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
def id_product(req, id):  # We refer id as primary key which is not defined in model

    try:
        data = Product.objects.get(pk=id)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product Doesnot Exist. Please Check your Input'}, status=status.HTTP_404_NOT_FOUND)
    serialize = ProductSerializer(data)

    return JsonResponse(serialize.data, safe=False, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_product(req):
    
    serialized_data = ProductSerializer(data=req.data)

    if serialized_data.is_valid():
        serialized_data.save()
        return JsonResponse(serialized_data.data, status=status.HTTP_201_CREATED)

    return JsonResponse(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)