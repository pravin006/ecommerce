This is a Django, React e-commerce application that uses Postgres as its database. Please follow the instructions below to set up and run the application on your local machine.

## Features
Top rated products carousel  
Product pagination  
Product search feature  
  
Product reviews and ratings  
  
Admin Services to:  
Create, delete, update Products  
Edit, delete Users
Update existing Orders  
  
Shopping cart with checkout process  
PayPal / credit card integration  

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.10 or higher
- pip
- PostgreSQL

Or  
- Docker

## Setup Instructions Using Virtual Environment

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pravin006/ecommerce.git
   cd ecommerce
   
2. **Create and Activate a Virtual Environment**
   ```bash
    python -m venv venv
    venv/Scripts/activate
    cd app
   
3. **Install Dependencies**
   ```bash
    pip install -r requirements.txt

4. **Set up the database**
   ```
   psql -U postgres
   CREATE DATABASE ecommerce;
   \q
   ```

5. **Set database password**  
Create a .env file in the app folder as:
    ```bash
    DB_PASSWORD='your postgres password'
    ```
   
6. **Run migrations**
    ```bash
    python manage.py migrate

7. **Create a superuser(optional)**
    ```bash
    python manage.py createsuperuser

8. **Import Sample Products from 3rd party API(optional)**
    ```bash
    python manage.py import_products

9. **Start the Application**
   ```bash
    python manage.py runserver

Access the app at http://127.0.0.1:8000

## Setup Instructions Using Docker

1. **Clone the Repository** 
   ```
    git clone https://github.com/pravin006/ecommerce.git
    cd ecommerce\app
    ```

2. **Set database password**  
Create a .env file in the app folder as:
    ```bash
    DB_PASSWORD='your postgres password'
    ```

3. **Create and run containers** 
    ```
    docker-compose up -d
    ```

4. **Create SuperUser and import sample products(optional)**
    ```
    docker exec -it django_app sh
    python manage.py createsuperuser
    python manage.py import_products
    exit
    ```
Access the app at http://127.0.0.1:8000
