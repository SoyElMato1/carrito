class Carrito:
    def __init__(self, request):
        self.request = request
        self.session = request.session
        carito = self.session.get("carrito")
        if not carito:
            self.session["carrito"] = {}
            self.carito = self.session["carrito"]
        else:
            self.carito = carito

    def agregar(self, producto):
        producto_id = str(producto.codigo_producto)
        if producto_id not in self.carito:
            self.carito[producto_id] = {'cantidad': 1, 'precio': str(producto.precio)}
        else:
            self.carito[producto_id]['cantidad'] += 1
        self.guardar_carrito()

    def guardar_carrito(self):
        self.session["carrito"] = self.carito
        self.session.modified = True

    def eliminar(self, Producto):
        id = str(Producto.codigo_producto)
        if id in self.carito:
            del self.carito[id]
            self.guardar_carrito()
    
    def restar(self, Producto):
        for key, value in self.carito.items():
            if key == str(Producto.codigo_producto):
                value["cantidad"] = value["cantidad"] - 1
                if value["cantidad"] <=0:
                    self.eliminar(Producto)
                self.guardar_carrito()
                break
            else:
                print("El producto no existe en el carrito")

    def limpiar(self):
        self.session["carrito"] = {}
        self.session.modified = True

    def obtener_items(self):
        from .models import Producto  # Importación tardía para evitar problemas de importación circular
        productos = Producto.objects.filter(codigo_producto__in=[int(key) for key in self.carito.keys() if key.isdigit()])
        items = []
        total = 0
        for producto in productos:
            cantidad = self.carito[str(producto.codigo_producto)]['cantidad']
            subtotal = producto.precio * cantidad
            total += subtotal
            items.append({
                'producto': producto,
                'cantidad': cantidad,
                'subtotal': subtotal,
            })
        return items, total

    # def registrar_cliente(self, rut, correo_user, nom_user, ap_user):
    #     # Si no existe el usuario, lo registramos
    #     cliente, created = User.objects.get_or_create(
    #         username=rut,
    #         defaults={
    #             'correo_user': correo_user,
    #             'nom_user': nom_user,
    #             'ap_user': ap_user,
    #             'is_staff': False,
    #             'is_superuser': False,
    #             'rol': 'cliente'
    #         }
    #     )
    #     if created:
    #         cliente.set_unusable_password()  # Se puede autogenerar una contraseña o deshabilitarla
    #         cliente.save()
    #     self.cliente = cliente
    #     self.save()

    # def autocompletar_datos_cliente(rut=None, correo_user=None):
    #     try:
    #         if rut:
    #             cliente = User.objects.get(username=rut)
    #         elif correo_user:
    #             cliente = User.objects.get(correo_user=correo_user)
    #         else:
    #             return None
            
    #         # Devuelve los datos para autocompletar
    #         return {
    #             'nombre': cliente.nom_user,
    #             'apellido': cliente.ap_user,
    #             'correo': cliente.correo_user
    #         }
    #     except User.DoesNotExist:
    #         return None