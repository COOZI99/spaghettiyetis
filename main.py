import webapp2
import os
import jinja2
import logging
import json
import urllib
import urllib2
import random
import datetime
from python_text_battle-master/classes import game
from python_text_battle-master/classes import inventory
from python_text_battle-master/classes import magic
from google.appengine.api import users
from google.appengine.ext import ndb

env = jinja2.Environment(loader = jinja2.FileSystemLoader(os.path.dirname(__file__)
+ '/templates'))

class HomePage(webapp2.RequestHandler):
    def get(self):

class NewUserPage(webapp2.RequestHandler):
    def get(self):
    def post(self):

class GamePage(webapp2.RequestHandler):
    def get(self):
    def post(self):
app=webapp2.WSGIApplication([
('/', HomePage),
('/new_user', NewUserPage),
('/game', GamePage),
])
