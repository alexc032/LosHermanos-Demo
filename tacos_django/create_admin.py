import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TacosWeb.settings')
django.setup()

from django.contrib.auth.models import User

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@elsabormexicano.com', 'Tacos123!')
    print("Superusuario 'admin' creado con contraseña 'Tacos123!'")
else:
    print("El superusuario ya existe.")
