import webapp2
import os
os.sys.path.append(os.path.dirname(os.path.abspath('.')))
import jinja2
import logging
import json
import urllib
import urllib2
import random
import datetime
import game
#from ..python_text_battle.classes import magic
#from ..python_text_battle.classes import inventory
from google.appengine.api import users
from google.appengine.ext import ndb

env = jinja2.Environment(loader = jinja2.FileSystemLoader(os.path.dirname(__file__)
+ '/templates'))

class User(ndb.Model):
    username = ndb.StringProperty()
    password = ndb.StringProperty()

class LevelUp():
    character = game.Person("Yes", 40, 5, 5, 5, "Fire", "Potion")
    level = 1
    experience = 0
    checkpoint = 0

class HomePage(webapp2.RequestHandler):
    def get(self):
        template = env.get_template('home.html')
        self.response.out.write(template.render())
    def post(self):
        user_key = ndb.Key('User', self.request.get('username'), 'User', self.request.get('password'))
        user = user_key.get()
        if not user:
            invalid = True
        else:
            invalid = False
            self.redirect('/game')
        var = {'user' : user, 'invalid': invalid}
        template = env.get_template('home.html')
        self.response.out.write(template.render(var))
class NewUserPage(webapp2.RequestHandler):
    def get(self):
        user_key = ndb.Key('User', self.request.get('username'), 'User', self.request.get('password'))
        user = user_key.get()
        if not user:
            user = User(username = self.request.get('username'),
                        password = self.request.get('password'))
            user.key = user_key
            user.put()
            self.redirect('/')
        else:
            invalid = True
            var = {'user': user, 'invalid': invalid}
            template = env.get_template('newuser.html')
            self.response.out.write(template.render(var))
    def post(self):
        template = env.get_template('newuser.html')
        self.response.out.write(template.render())


class GamePage(webapp2.RequestHandler):
    def get(self):
        user_key = ndb.Key('User', self.request.get('username'), 'User', self.request.get('password'))
        user = user_key.get()
        template = env.get_template('game.html')
        self.response.out.write(template.render())
    def post(self):
        invalid = False

app=webapp2.WSGIApplication([
('/', HomePage),
('/new_user', NewUserPage),
('/game', GamePage),
])
