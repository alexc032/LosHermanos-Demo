from django.db import models

# Create your models here.


class Pedido(models.Model):
    nombre_cliente = models.CharField(max_length=100)
    correo = models.EmailField()
    descripcion = models.TextField()
    total_estimado = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    estado = models.CharField(max_length=20, default='Pendiente')
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pedido de {self.nombre_cliente}"