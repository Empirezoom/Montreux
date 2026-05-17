from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, CartViewSet, OrderViewSet, ContactMessageViewSet, auth_login, user_profile, auth_logout

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'contact', ContactMessageViewSet, basename='contact')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/auth/login/', auth_login, name='auth_login'),
    path('api/auth/logout/', auth_logout, name='auth_logout'),
    path('api/auth/profile/', user_profile, name='user_profile'),
]
