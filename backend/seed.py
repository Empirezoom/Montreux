import os
import django
import sys

# 1. Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
django.setup()

from django.core.management import call_command

# 2. Run migrations
print("Running makemigrations...")
call_command('makemigrations')
print("Running migrate...")
call_command('migrate')

# 3. Seed data
print("Seeding database with categories...")
from core.models import Category

categories = [
    {'name': 'T-Shirts', 'major_category': 'Men', 'slug': 'men-t-shirts'},
    {'name': 'Jeans', 'major_category': 'Men', 'slug': 'men-jeans'},
    {'name': 'Suits', 'major_category': 'Men', 'slug': 'men-suits'},
    {'name': 'Dresses', 'major_category': 'Women', 'slug': 'women-dresses'},
    {'name': 'Skirts', 'major_category': 'Women', 'slug': 'women-skirts'},
    {'name': 'Handbags', 'major_category': 'Women', 'slug': 'women-handbags'},
    {'name': 'Kids Toys', 'major_category': 'Kids', 'slug': 'kids-toys'},
    {'name': 'Schoolwear', 'major_category': 'Kids', 'slug': 'kids-schoolwear'},
    {'name': 'Kids Sneakers', 'major_category': 'Kids', 'slug': 'kids-sneakers'},
]

for cat_data in categories:
    obj, created = Category.objects.get_or_create(
        slug=cat_data['slug'], 
        defaults={'name': cat_data['name'], 'major_category': cat_data['major_category']}
    )
    # If the category existed but had the wrong major_category, update it:
    if not created:
        obj.major_category = cat_data['major_category']
        obj.save()

print("✅ Database seeded successfully! Your new Men, Women, and Kids categories are ready.")
