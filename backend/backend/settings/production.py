import os
from backend.settings.common import *


DEBUG = False

SECRET_KEY = os.environ['SECRET_KEY']

# SECURITY WARNING: update this when you have the production host
ALLOWED_HOSTS = ['0.0.0.0', 'localhost']

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'mkb_10',
        'USER': 'CHANGE_WITH_USERNAME_ON_PROD',
        'PASSWORD': '_PASSWORD_FOR_USERNAME_ON_PROD',
        'HOST': 'localhost',
        'PORT' : '5432',
    }
}