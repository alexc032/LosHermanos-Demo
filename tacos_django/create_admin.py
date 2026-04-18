import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TacosWeb.settings')
django.setup()

from django.contrib.auth.models import User

try:
    user, created = User.objects.get_or_create(
        username='ElHermano_228391',
        defaults={'email': 'ElHermano_228391@gmail.com'}
    )
    user.set_password('H3rmanosTacos$2149!')
    user.is_superuser = True
    user.is_staff = True
    user.save()
    print("¡Exito rotundo! Contraseña reparada y guardada a la velocidad de la luz.")
except Exception as e:
    print(f"Hubo un error: {e}")
