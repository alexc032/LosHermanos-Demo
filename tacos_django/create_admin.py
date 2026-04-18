import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TacosWeb.settings')
django.setup()

from django.contrib.auth.models import User

try:
    # 1. Borrar absolutamente todos los usuarios existentes (Limpieza nuclear)
    User.objects.all().delete()
    print("Usuarios antiguos eliminados con éxito.")

    # 2. Crear un usuario limpio desde 0 (credenciales súper seguras pero sin símbolos conflictivos)
    User.objects.create_superuser(
        username='adminhermano',
        email='contacto@elsabormexicano.com',
        password='TacosHermano123!'
    )
    print("¡Exito rotundo! Base de datos reiniciada y superusuario creado intacto.")
except Exception as e:
    print(f"Hubo un error: {e}")
