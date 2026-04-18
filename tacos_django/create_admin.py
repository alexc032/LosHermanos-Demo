import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TacosWeb.settings')
django.setup()

from django.contrib.auth.models import User

if not User.objects.filter(username='ElHermano_228391').exists():
    User.objects.create_superuser('ElHermano_228391', 'ElHermano_228391@gmail.com', 'H3rmanosTacos$2149!')
    print("Superusuario 'ElHermano_228391' creado con contraseña 'H3rmanosTacos$2149!'")
else:
    print("El superusuario ya existe.")
