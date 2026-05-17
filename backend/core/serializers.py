from rest_framework import serializers
from .models import Category, Product, ProductVariation, Cart, CartItem, Order, OrderItem, ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'major_category']

class ProductVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariation
        fields = ['id', 'size', 'color', 'stock']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    variations = ProductVariationSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'slug', 'description', 'base_price', 'discount_price', 'image', 'image_url', 'variations', 'is_featured', 'created_at', 'updated_at']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        elif obj.image_url:
            return obj.image_url
        return None

class CartItemSerializer(serializers.ModelSerializer):
    variation = ProductVariationSerializer(read_only=True)
    variation_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'variation', 'variation_id', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at']

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='variation.product.name')
    product_image = serializers.SerializerMethodField()
    variation_details = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product_name', 'product_image', 'variation_details', 'quantity', 'price']

    def get_product_image(self, obj):
        product = obj.variation.product
        if product.image:
            return product.image.url
        return product.image_url

    def get_variation_details(self, obj):
        v = obj.variation
        if v.size and v.color:
            return f"{v.size} / {v.color}"
        return v.size or v.color or "Default"

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_price', 'status', 'address', 'items', 'created_at']
        read_only_fields = ['user', 'total_price', 'status']
