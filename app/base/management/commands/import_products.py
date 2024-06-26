from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.core.files import File
from tempfile import NamedTemporaryFile
import requests
from base.models import Product

def get_system_user():
    user, created = User.objects.get_or_create(username='system', defaults={
        'is_staff': True,
        'is_superuser': True,
        'email': 'system@example.com',
        'first_name': 'System',
        'last_name': 'User'
    })
    if created:
        user.set_unusable_password()  #system user should not log in
        user.save()
    return user

class Command(BaseCommand):
    help = 'Import products from an external API'

    def handle(self, *args, **options):
        system_user = get_system_user()

        response = requests.get('https://fakestoreapi.com/products')
        products = response.json()

        for product_data in products:
                product = Product.objects.create(
                    user=system_user,
                    name='Sample Name',
                    price=0,
                    brand='Unknown',
                    countInStock=10,
                    category='Sample Category',
                    description=''
                )

                
                product.name = product_data['title']
                product.price = product_data['price']
                product.description = product_data['description']
                product.category = product_data['category'] 
                if 'image' in product_data and product_data['image']:
                    response = requests.get(product_data['image'], stream=True)
                    if response.status_code == 200:
                        #save the image temporarily
                        with NamedTemporaryFile(delete=True) as img_temp:
                            for chunk in response.iter_content(1024):
                                img_temp.write(chunk)
                            img_temp.flush()
                            img_temp.seek(0)
                            product.image.save(f"image_{product._id}.jpg", File(img_temp))

                product.save()

        self.stdout.write(self.style.SUCCESS('Successfully imported products'))
