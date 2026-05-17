import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from core.models import Category, Product

products_data = {
    'men-t-shirts': [
        {'name': 'Classic Cotton Crew', 'price': '45.00', 'img': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Vintage Wash Tee', 'price': '55.00', 'img': 'https://images.unsplash.com/photo-1574180566232-aaad1bce0941?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Minimalist V-Neck', 'price': '40.00', 'img': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Heavyweight Pocket Tee', 'price': '65.00', 'img': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Graphic Logo T-Shirt', 'price': '50.00', 'img': 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Essential Base Layer', 'price': '35.00', 'img': 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop'},
    ],
    'men-jeans': [
        {'name': 'Slim Fit Raw Denim', 'price': '120.00', 'img': 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Relaxed Vintage Wash', 'price': '110.00', 'img': 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Black Selvedge Jeans', 'price': '145.00', 'img': 'https://images.unsplash.com/photo-1560243563-062fac68fdfb?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Tapered Distressed', 'price': '130.00', 'img': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Classic Straight Leg', 'price': '95.00', 'img': 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Washed Indigo Slim', 'price': '115.00', 'img': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop'},
    ],
    'men-suits': [
        {'name': 'Charcoal Wool Suit', 'price': '450.00', 'img': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Navy Two-Piece', 'price': '520.00', 'img': 'https://images.unsplash.com/photo-1594938298596-70f594f62bce?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Light Grey Tailored', 'price': '480.00', 'img': 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Midnight Blue Tuxedo', 'price': '650.00', 'img': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Italian Cut Brown Suit', 'price': '550.00', 'img': 'https://images.unsplash.com/photo-1555069519-127baddedf1a?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Linen Summer Suit', 'price': '380.00', 'img': 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop'},
    ],
    'women-dresses': [
        {'name': 'Silk Slip Dress', 'price': '180.00', 'img': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Floral Wrap Midi', 'price': '145.00', 'img': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Black Evening Gown', 'price': '320.00', 'img': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Linen Summer Maxi', 'price': '120.00', 'img': 'https://images.unsplash.com/photo-1515347619152-6b94098eaed3?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Velvet Mini Dress', 'price': '160.00', 'img': 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Pleated Chiffon Gown', 'price': '250.00', 'img': 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop'},
    ],
    'women-skirts': [
        {'name': 'Leather Mini Skirt', 'price': '190.00', 'img': 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Pleated Midi Skirt', 'price': '110.00', 'img': 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Denim A-Line', 'price': '85.00', 'img': 'https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Silk Bias Cut Skirt', 'price': '150.00', 'img': 'https://images.unsplash.com/photo-1582533561751-2954497e5ea7?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Tweed Pencil Skirt', 'price': '135.00', 'img': 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Boho Tiered Maxi', 'price': '95.00', 'img': 'https://images.unsplash.com/photo-1560457099-64cb8a5eb506?q=80&w=1000&auto=format&fit=crop'},
    ],
    'women-handbags': [
        {'name': 'Leather Tote Bag', 'price': '280.00', 'img': 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Quilted Crossbody', 'price': '310.00', 'img': 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Minimalist Clutch', 'price': '150.00', 'img': 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Woven Summer Bag', 'price': '125.00', 'img': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Structured Top Handle', 'price': '350.00', 'img': 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Suede Hobo Bag', 'price': '240.00', 'img': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'},
    ],
    'kids-toys': [
        {'name': 'Wooden Stacking Blocks', 'price': '35.00', 'img': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Plush Bear Toy', 'price': '25.00', 'img': 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Educational Puzzle', 'price': '20.00', 'img': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Classic Tin Car', 'price': '45.00', 'img': 'https://images.unsplash.com/photo-1581557991964-125469da3b8a?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Musical Xylophone', 'price': '30.00', 'img': 'https://images.unsplash.com/photo-1586282869926-218f3a3bfb89?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Building Bricks Set', 'price': '55.00', 'img': 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=1000&auto=format&fit=crop'},
    ],
    'kids-schoolwear': [
        {'name': 'Classic White Shirt', 'price': '25.00', 'img': 'https://images.unsplash.com/photo-1584288035314-e0573e35abec?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Navy Pleated Skirt', 'price': '30.00', 'img': 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'School Trousers', 'price': '35.00', 'img': 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'V-Neck Jumper', 'price': '40.00', 'img': 'https://images.unsplash.com/photo-1574180566232-aaad1bce0941?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Polo Shirt 2-Pack', 'price': '28.00', 'img': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'School Blazer', 'price': '65.00', 'img': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop'},
    ],
    'kids-sneakers': [
        {'name': 'Running Shoes', 'price': '60.00', 'img': 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'High-Top Canvas', 'price': '45.00', 'img': 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Velcro Sports Shoe', 'price': '50.00', 'img': 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Slip-on Sneakers', 'price': '40.00', 'img': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Light-up Shoes', 'price': '55.00', 'img': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop'},
        {'name': 'Classic Court Shoe', 'price': '48.00', 'img': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop'},
    ]
}

print("Starting to seed products...")

count = 0
for cat_slug, products in products_data.items():
    try:
        category = Category.objects.get(slug=cat_slug)
        for i, prod in enumerate(products):
            slug_base = f"{cat_slug}-{i+1}-{prod['name'].lower().replace(' ', '-')}"
            
            # Add some random discounts to the second item in each category
            discount_price = None
            if i == 1:
                discount_price = f"{float(prod['price']) * 0.8:.2f}"

            obj, created = Product.objects.get_or_create(
                slug=slug_base,
                defaults={
                    'category': category,
                    'name': prod['name'],
                    'description': f"Premium quality {prod['name'].lower()} from Montreux Archival Collection.",
                    'base_price': prod['price'],
                    'discount_price': discount_price,
                    'image_url': prod['img'],
                    'is_featured': i == 0 # First item is featured
                }
            )
            count += 1
    except Category.DoesNotExist:
        print(f"Warning: Category with slug '{cat_slug}' does not exist. Please run seed.py first.")

print(f"✅ Successfully seeded {count} new products into the database!")
