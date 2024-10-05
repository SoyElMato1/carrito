from django.urls import path
from .views import *
from .views_carrito import *

urlpatterns = [
    path('producto/', producto, name='producto'),
    path('categoria/', get_categoria, name='categoria'),
    path('provee/', Ver_proveedor, name='proveedor'),
    path('provee/<id>', detalle_proveedor, name='detalle_proveedores'),

# Carrito
    path('carrito/agregar/<int:producto_id>/', agregar_al_carrito, name='agregar_al_carrito'),
    path('carrito/restar/<int:producto_id>/', restar_producto, name='restar producto'),
    path('carrito/', ver_carrito, name='ver_carrito'),
    path('checkout/', checkout, name='checkout'),

]