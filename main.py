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

class User(ndb.Model):
    username = ndb.StringProperty()
    password = ndb.StringProperty()
class HomePage(webapp2.RequestHandler):
    def get(self):
        invalid = False
        user_key = ndb.Key('User', self.request.get('username'), 'User', self.request.get('password'))
        user = user_key.get()
        if not user:
            invalid = True
            self.redirect('/')
        else:
            self.redirect('/game')

        template = env.get_template('main.html')
        var = {'user' : user, 'invalid': invalid}
        self.response.out.write(template.render(var))
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
