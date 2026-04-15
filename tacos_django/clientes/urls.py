from django.urls import path, include
from rest_framework import routers
from .views import PedidoViewSet

router = routers.DefaultRouter()
router.register(r'pedidos', PedidoViewSet, 'pedidos')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]