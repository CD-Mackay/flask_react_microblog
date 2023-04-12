import os
os.environ['DATABASE_URL'] = 'sqlite://'

from datetime import datetime, timedelta
import unittest
from app import app, db
from app.models import User, Post

class UserModelCase(unittest.TestCase):
    def setup(self):
        self.app_context = app.app_context()
        self.app_context.push()
        db.create_all()
        
        