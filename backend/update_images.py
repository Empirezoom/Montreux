import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from core.models import Product

updates = {
    'Vintage Wash Tee': 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1000&auto=format&fit=crop',
    'Velvet Cocktail Dress': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
    'Linen Summer Blazer': 'https://images.unsplash.com/photo-1594938298596-70f594f62bce?q=80&w=1000&auto=format&fit=crop',
    'Plush Bear Toy': 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1000&auto=format&fit=crop',
    'Educational Puzzle': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop',
}

print("Fixing broken/mismatched database images...")

count = 0
for name, img_url in updates.items():
    products = Product.objects.filter(name__icontains=name)
    for p in products:
        p.image_url = img_url
        p.save()
        count += 1

print(f"✅ Fixed {count} product images!")
