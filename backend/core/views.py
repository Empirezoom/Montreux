from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as django_login
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from .models import Category, Product, Cart, CartItem, Order, ProductVariation, ContactMessage, Customer
from .serializers import CategorySerializer, ProductSerializer, CartSerializer, OrderSerializer, ContactMessageSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.prefetch_related('variations', 'category').all()
    serializer_class = ProductSerializer

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        variation_id = request.data.get('variation_id')
        quantity = int(request.data.get('quantity', 1))
        
        try:
            variation = ProductVariation.objects.get(id=variation_id)
            item, created = CartItem.objects.get_or_create(cart=cart, variation=variation)
            if not created:
                item.quantity += quantity
            else:
                item.quantity = quantity
            item.save()
            return Response({'status': 'added'}, status=status.HTTP_201_CREATED)
        except ProductVariation.DoesNotExist:
            return Response({'error': 'Variation not found'}, status=status.HTTP_404_NOT_FOUND)

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Checkout logic: Create order from cart (DB) or items (Request)
        items_data = self.request.data.get('items', [])
        address = self.request.data.get('address', '')
        
        from .models import OrderItem, ProductVariation, Cart
        total_price = 0
        order_items_to_create = []

        if items_data:
            for item in items_data:
                # Handle variation object or ID
                variation_data = item.get('variation')
                variation_id = variation_data.get('id') if isinstance(variation_data, dict) else variation_data
                
                if not variation_id: continue
                try:
                    variation = ProductVariation.objects.get(id=variation_id)
                    quantity = item.get('quantity', 1)
                    price = variation.product.discount_price if variation.product.discount_price else variation.product.base_price
                    total_price += price * quantity
                    order_items_to_create.append((variation, quantity, price))
                except ProductVariation.DoesNotExist:
                    continue
        else:
            try:
                cart = Cart.objects.get(user=self.request.user)
                db_items = cart.items.all()
                for item in db_items:
                    price = item.variation.product.discount_price if item.variation.product.discount_price else item.variation.product.base_price
                    total_price += price * item.quantity
                    order_items_to_create.append((item.variation, item.quantity, price))
                cart.items.all().delete()
            except Cart.DoesNotExist:
                pass
        
        order = serializer.save(user=self.request.user, total_price=total_price, address=address, status='PAID')
        
        for variation, quantity, price in order_items_to_create:
            OrderItem.objects.create(
                order=order,
                variation=variation,
                quantity=quantity,
                price=price
            )

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def auth_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email_or_username = data.get('email')
            password = data.get('password')
            name = data.get('name')
            mode = data.get('mode')

            if mode == 'signup':
                if User.objects.filter(username=email_or_username).exists() or User.objects.filter(email=email_or_username).exists():
                    return JsonResponse({'error': 'Email already registered.'}, status=400)
                user = User.objects.create_user(username=email_or_username, email=email_or_username, password=password, first_name=name)
                Customer.objects.create(user=user)
                django_login(request, user)
                return JsonResponse({'status': 'created', 'name': user.first_name, 'email': user.email})
            else:
                user_obj = User.objects.filter(email=email_or_username).first() or User.objects.filter(username=email_or_username).first()
                if user_obj:
                    user = authenticate(username=user_obj.username, password=password)
                else:
                    user = None

                if user:
                    django_login(request, user)
                    customer, _ = Customer.objects.get_or_create(user=user)
                    return JsonResponse({
                        'name': user.first_name or user.username, 
                        'email': user.email,
                        'phone': customer.phone,
                        'gender': customer.gender,
                        'country': customer.country,
                        'state': customer.state,
                        'city': customer.city,
                        'address': customer.address
                    })
                return JsonResponse({'error': 'Invalid email or password.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def auth_logout(request):
    from django.contrib.auth import logout
    logout(request)
    return JsonResponse({'status': 'logged out'})

@csrf_exempt
def user_profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Not authenticated. Please sign in.'}, status=401)
    
    customer, _ = Customer.objects.get_or_create(user=request.user)
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            request.user.first_name = data.get('name', request.user.first_name)
            request.user.save()
            customer.phone = data.get('phone', customer.phone)
            customer.gender = data.get('gender', customer.gender)
            customer.country = data.get('country', customer.country)
            customer.state = data.get('state', customer.state)
            customer.city = data.get('city', customer.city)
            customer.address = data.get('address', customer.address)
            customer.save()
            return JsonResponse({'status': 'updated'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
    return JsonResponse({
        'name': request.user.first_name or request.user.username,
        'email': request.user.email,
        'phone': customer.phone,
        'gender': customer.gender,
        'country': customer.country,
        'state': customer.state,
        'city': customer.city,
        'address': customer.address
    })
