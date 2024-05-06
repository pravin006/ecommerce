This is a Django, React application that uses Postgres as its database. Please follow the instructions below to set up and run the application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.10 or higher
- pip
- PostgreSQL

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pravin006/ecommerce.git
   cd ecommerce
   
2. **Create and Activate a Virtual Environment**
   ```bash
    python -m venv venv
    venv/Scripts/activate
   
3. **Install Dependencies**
   ```bash
    pip install -r requirements.txt

4. **Set up the database**
   ```bash
   psql -U postgres
   CREATE DATABASE e-commerce;
   \q

5. **Set database password**  
Create a .env file in the app folder as:
    ```bash
    DB_PASSWORD={your postgres password}
    ```
    
   Or set the password manually in settings.py:
   ```
   DATABASES = {
    'default': {
        ...
        'PASSWORD': {your postgres password},
        ...
   }}
   ```
   
6. **Run migrations**
    ```bash
    cd app
    python manage.py migrate

7. **Create a superuser(optional)**
    ```bash
    python manage.py createsuperuser

8. **Start the Application**
   ```bash
    python manage.py runserver

Access the app at http://127.0.0.1:8000

