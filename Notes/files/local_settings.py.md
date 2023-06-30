\# Database

\# https://docs.djangoproject.com/en/1.11/ref/settings/\#databases

import os

import uuid

\# Build paths inside the project like this: os.path.join(BASE_DIR, ...)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

  
  

\# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = os.environ.get('DEBUG', True)

  

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', ['*'])

  

\#\#PROD

\#DATABASES = {

\#        'default': {

\#            'ENGINE': 'mssql',

\#            'NAME': 'IRCPeopleDirectoryApplication',

\#            'USER': 'IRCPeopleDirectoryApplication',

\#            'PASSWORD': 'loR5l!UH!ovM',

\#            'HOST': 'theirc-production-sql-eastus2.database.windows.net',

\#            'PORT': '1433',

\#            'OPTIONS': {

\#                    'driver': 'ODBC Driver 18 for SQL Server',

\#                },

\#        },

\#}

  

\#QA

DATABASES = {

        'default': {

            'ENGINE': 'mssql',

            'NAME': 'IRCPeopleDirectory_QA',

            'USER': 'IRCPeopleDirectoryApplication',

            'PASSWORD': 'loR5l!UH!ovM',

            'HOST': 'theirc-staging-sql-eastus2.database.windows.net',

            'PORT': '1433',

            'OPTIONS': {

                    'driver': 'ODBC Driver 18 for SQL Server',

                },

        },

}

  

ENVIRONMENT = os.environ.get('ENVIRONMENT', " - DEV")

  

VERSIONNUMBER = os.environ.get('VERSIONNUMBER', "1.0")

  

HASH = uuid.uuid4().hex

  

GOOGLE_ANALYTICS = os.environ.get('GOOGLE_ANALYTICS', "")

  
  
  

\#DEV

\#AUTH_SERVICE_BASE_URL = os.getenv('AUTH_SERVICE_BASE_URL', "http://localhost:60618/")

\#AUTH_SERVICE_USER = os.getenv('AUTH_SERVICE_USER', "integraadmin")

  

\#QA

AUTH_SERVICE_BASE_URL = os.getenv('AUTH_SERVICE_BASE_URL', "https://qa-adservice.rescue.org/")

AUTH_SERVICE_USER = os.getenv('AUTH_SERVICE_USER', "integraadmin")

AUTH_SERVICE_API_KEY = os.getenv('AUTH_SERVICE_API_KEY', "7c35e71a-2b08-4f93-8636-ddf3dbb9e668")

AUTH_SERVICE_PASSWORD = os.getenv('AUTH_SERVICE_PASSWORD', "P@ssw0rd")

  

\#Prod

\#AUTH_SERVICE_USER = os.getenv('AUTH_SERVICE_USER', "PDXc")

\#AUTH_SERVICE_BASE_URL = os.getenv('AUTH_SERVICE_BASE_URL', "https://adservice.rescue.org/")

\#

\#AUTH_SERVICE_API_KEY = os.getenv('AUTH_SERVICE_API_KEY', "7c35e71a-2b08-4f93-8636-ddf3dbb9e668")

\#

\#AUTH_SERVICE_PASSWORD = os.getenv('AUTH_SERVICE_PASSWORD', "mUG&\#mH[zf8T")

  
  

\#CORNERSTONE_FUNCTION_URL = os.getenv('CORNERSTONE_FUNCTION_URL', "https://cornerstoneconnectorappAzureproduction.azurewebsites.net/")

CORNERSTONE_FUNCTION_URL = os.getenv('CORNERSTONE_FUNCTION_URL', "https://cornerstoneconnectorappazure20180926125740.azurewebsites.net/")

\#CORNERSTONE_FUNCTION_URL = os.getenv('CORNERSTONE_FUNCTION_URL', "http://localhost:7071/")

CORNERSTONE_SERVICE_API_KEY = os.getenv('CORNERSTONE_SERVICE_API_KEY', "sodh2j83h23uioh213lik2jhe2l")

  

INTEGRA_FUNCTION_URL = 'https://edintegraintegrationfunctionapp-qa.azurewebsites.net/'

  

\#QA

AD_FUNCTION_URL = 'https://activedirectoryconnectorappazure-qa.azurewebsites.net/'

  

\#PROD

\#AD_FUNCTION_URL = 'https://activedirectoryconnectorappazureproduction.azurewebsites.net/'

  

AD_DOMAIN = 'nyinfra.org'

  

DEFAULT_SENDER = os.getenv('DEFAULT_SENDER', "IRCPeopleDirectorySetupForm@rescue.org")

AD_NOTIFICATION_RECIPIENTS = ['juanpablo.sala@rescue.org',]

SEND_GRID_URL = 'https://emailservicefunctionapp.azurewebsites.net/api/EmailRequestFunction'

SEND_GRID_SECRET = 'bcf1c33d-6d05-4455-aa20-9dfa17d18eac'

  

CREATE_AD_USER = "True"

  

SYNC_TO_AD_START_DATETIME = '2018-12-31 12:50:48'

SYNC_TO_AD_END_DATETIME = '2019-01-14 18:58:48'

  

\#2018-12-31 18:52:48.167000+00:00

  

DATA_SERVICE = {

        "URL_TEMPLATE": os.environ.get('DATA_SERVICE_URL',

                                       "https://data.rescue.org/Data/%(service)s/%(collection)s"),

        "USER": os.environ.get('DATA_SERVICE_USER', "otis"),

        "PASSWORD": os.environ.get('DATA_SERVICE_PASSWORD', "P@ssw0rd"),

    }

  

AD_CREATION_EMAIL_OVERRIDE_RECIPIENTS = ['juanpablo.sala@rescue.org',]

AD_CREATION_ERROR_EMAIL_RECIPIENTS = ['juanpablo.sala@rescue.org',]

  

EXPIRATION_EMAIL_OVERRIDE = 'juanpablo.sala@rescue.org'

  

PERSON_SEARCH_ENABLED = True