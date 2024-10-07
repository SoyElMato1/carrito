from django.shortcuts import redirect, render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication 

# Create your views here.

# ---------------------------------------Proveedor---------------------------------------------
@csrf_exempt
@api_view(['GET', 'POST'])
def Ver_proveedor(request):
    if request.method == 'GET':
        proveedores = Proveedor.objects.all()
        serializer = ProveedorSerializer(proveedores, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        proveedor_data = JSONParser().parse(request)
        proveedor_serializer = ProveedorSerializer(data=proveedor_data)
        if proveedor_serializer.is_valid():
            proveedor_serializer.save()
            return JsonResponse(proveedor_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(proveedor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def detalle_proveedor(request, id):
    """
    Recupera, actualiza o elimina un proveedor.
    """
    try: 
        proveedor = Proveedor.objects.get(rut=id) 
    except Proveedor.DoesNotExist: 
        return JsonResponse({'message': 'El proveedor no existe'}, status=status.HTTP_404_NOT_FOUND) 
    if request.method == 'GET': 
        proveedor_serializer = ProveedorSerializer(proveedor) 
        return JsonResponse(proveedor_serializer.data) 
    elif request.method == 'PUT': 
        proveedor_data = JSONParser().parse(request) 
        proveedor_serializer = ProveedorSerializer(proveedor, data=proveedor_data) 
        if proveedor_serializer.is_valid(): 
            proveedor_serializer.save() 
            return JsonResponse(proveedor_serializer.data) 
        return JsonResponse(proveedor_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE': 
        proveedor.delete() 
        return JsonResponse({'message': 'Proveedor eliminado correctamente!'}, status=status.HTTP_204_NO_CONTENT)

# -----------------------------------------Vista de Producto---------------------------------------------
@csrf_exempt
@api_view(['GET', 'POST'])
def producto(request):
    """
    Lista de productos, o crea un nuevo producto.
    """
    if request.method == 'GET':
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        productos_data = JSONParser().parse(request)
        productos_serializer = ProductoSerializer(data=productos_data)
        if productos_serializer.is_valid():
            productos_serializer.save()
            return JsonResponse(productos_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(productos_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['PUT', 'DELETE'])
def detalle_producto(request, id):
    """
    Actualiza o elimina un producto.
    """
    try:
        producto = Producto.objects.get(id_producto=id)
    except Producto.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        producto_data = JSONParser().parse(request)
        producto_serializer = ProductoSerializer(producto, data=producto_data)
        if producto_serializer.is_valid():
            producto_serializer.save()
            return JsonResponse(producto_serializer.data)
        return JsonResponse(producto_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        producto.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    
# -------------------------------- Vista de Categoría ---------------------------------------------
@csrf_exempt
@api_view(['GET', 'POST'])
def get_categoria(request):
    """
    Lista de categorías, o crea una nueva categoría.
    """
    if request.method == 'GET':
        categorias = Categoria.objects.all()
        serializer = CategoriaSerializer(categorias, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        categoria_data = JSONParser().parse(request)
        categoria_serializer = CategoriaSerializer(data=categoria_data)
        if categoria_serializer.is_valid():
            categoria_serializer.save()
            return JsonResponse(categoria_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(categoria_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['PUT', 'DELETE'])
def detalle_categoria(request, id):
    """
    Actualiza o elimina una categoría.
    """
    try:
        categoria = Categoria.objects.get(id_categoria=id)
    except Categoria.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        categoria_data = JSONParser().parse(request)
        categoria_serializer = CategoriaSerializer(categoria, data=categoria_data)
        if categoria_serializer.is_valid():
            categoria_serializer.save()
            return JsonResponse(categoria_serializer.data)
        return JsonResponse(categoria_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        categoria.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)