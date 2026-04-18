import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TacosWeb.settings')
django.setup()

from django.contrib.auth.models import User

try:
    # 1. Borrar absolutamente todos los usuarios existentes (Limpieza nuclear)
    User.objects.all().delete()
    print("Usuarios antiguos eliminados con éxito.")

    # 2. Crear un usuario limpio desde 0
    User.objects.create_superuser(
        username='ElHermano_228391',
        email='ElHermano_228391@gmail.com',
        password='H3rmanosTacos$2149!'
    )
    print("¡Exito rotundo! Base de datos reiniciada y superusuario creado intacto.")
except Exception as e:
    print(f"Hubo un error: {e}")
