from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('producto/', producto, name='producto'),
    path('carrito/', listar_carrito, name='carrito'),
    path('add/', agregar_carrito, name='agregar_producto'),
    path('categoria/', get_categoria, name='categoria'),
    path('provee/', Ver_proveedor, name='proveedor'),
    path('proveedores/', ListarProveedores.as_view(), name='listar_proveedores'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


