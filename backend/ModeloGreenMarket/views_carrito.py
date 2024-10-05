from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from .models import Producto, Cliente, Orden
from .carrito import Carrito
from django.views.decorators.csrf import csrf_exempt
from .serializers import ClienteSerializer

def agregar_al_carrito(request, producto_id):
    carrito = Carrito(request)
    producto = Producto.objects.get(codigo_producto=producto_id)
    carrito.agregar(producto)
    return JsonResponse({'mensaje': 'Producto agregado al carrito'})

def eliminar_del_carrito(request, producto_id):
    carrito = Carrito(request)
    producto = Producto.objects.get(codigo_producto=producto_id)
    carrito.eliminar(producto)
    return JsonResponse({'mensaje': 'Producto eliminado del carrito'})

def restar_producto(request, producto_id):
    carrito = Carrito(request)
    producto = Producto.objects.get(codigo_producto=producto_id)
    carrito.restar(producto)
    return JsonResponse({'mensaje': 'Producto restado del carrito'})

def limpiar_carrito(request):
    carrito = Carrito(request)
    carrito.limpiar()
    return JsonResponse({'mensaje': 'Carrito Limpiado'})

def ver_carrito(request):
    carrito = Carrito(request)
    items, total = carrito.obtener_items()
    items_serializados = [{
        'producto_id': item['producto'].codigo_producto,
        'nombre': item['producto'].nombre_producto,
        'cantidad': item['cantidad'],
        'precio': str(item['producto'].precio),
        'subtotal': str(item['subtotal']),
    } for item in items]
    return JsonResponse({'items': items_serializados, 'total': str(total)})

@csrf_exempt
def checkout(request):
    print(request.method)
    if request.method == 'POST':
        # Obtener datos del cliente desde la solicitud
        cliente_data = JSONParser().parse(request)
        cliente_serializers = ClienteSerializer(data=cliente_data)
        
        if cliente_serializers.is_valid():
            # Usar los datos validados del serializer para buscar o crear el cliente
            rut = cliente_serializers.validated_data['rut']
            dv = cliente_serializers.validated_data['dv']
            correo_electronico = cliente_serializers.validated_data['correo_electronico']
            nombre = cliente_serializers.validated_data.get('nombre', '')
            direccion = cliente_serializers.validated_data.get('direccion', '')

            # Buscar o crear el cliente
            cliente, creado = Cliente.objects.get_or_create(
                rut=rut,
                correo_electronico=correo_electronico,
                defaults={
                    'dv' : dv,
                    'nombre': nombre,
                    'direccion': direccion
                }
            )
            
            if not creado:
                # Si el cliente ya existe, actualizar la información
                cliente.nombre = nombre
                cliente.direccion = direccion
                cliente.save()

            # Obtener los datos del carrito
            carrito = Carrito(request)
            items, total = carrito.obtener_items()

            # Crear la lista de ítems para la orden
            items_orden = [{'producto_id': item['producto'].codigo_producto, 'cantidad': item['cantidad']} for item in items]

            # Crear la orden
            orden = Orden.objects.create(
                cliente=cliente,
                items=items_orden,
                total=total,
                pagado=False,
            )

            # Limpiar el carrito después de crear la orden
            carrito.limpiar()

            # Retornar la respuesta de éxito
            return JsonResponse({'mensaje': 'Orden creada', 'orden_id': orden.id})

    return JsonResponse({'error': 'Método no permitido'}, status=405)