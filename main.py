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
    level = ndb.IntegerProperty()
    experience = ndb.IntegerProperty()
    exp_needed = ndb.IntegerProperty()
    checkpoint = ndb.IntegerProperty()
    hp = ndb.IntegerProperty()
    max_hp = ndb.IntegerProperty()
    attack = ndb.IntegerProperty()
    mp = ndb.IntegerProperty()
    speed = ndb.IntegerProperty()
    item1 = ndb.StringProperty()
    item2 = ndb.StringProperty()
    item3 = ndb.StringProperty()
"""
class Level(ndb.Model):

    level = ndb.IntegerProperty()
    experience = ndb.IntegerProperty()
    checkpoint = ndb.IntegerProperty()
    user_key = ndb.KeyProperty()
"""
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
            if user.checkpoint == 1:
                self.redirect('/game?username=' + user.username + '&password=' + user.password)
            elif user.checkpoint == 2:
                self.redirect('/game1?username=' + user.username + '&password=' + user.password)
        var = {'user' : user, 'invalid': invalid}
        template = env.get_template('home.html')
        self.response.out.write(template.render(var))
class NewUserPage(webapp2.RequestHandler):
    def get(self):
        user_key = ndb.Key('User', self.request.get('username'), 'User', self.request.get('password'))
        user = user_key.get()

        if not user:
            user = User(username = self.request.get('username'),
                        password = self.request.get('password'),
                        level = 1,
                        experience = 1,
                        exp_needed = 20,
                        checkpoint = 1,
                        hp = 40,
                        max_hp = 40,
                        attack = 5,
                        mp = 5,
                        speed = 10,
                        item1 = "potion",
                        item2 = "potion",
                        item3 = "potion")

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

        var = {'user': user}
        template = env.get_template('game.html')
        self.response.out.write(template.render(var))
    def post(self):
        invalid = False

class GamePage1(webapp2.RequestHandler):
    def get(self):
        user_key = ndb.Key('User', self.request.get('username'), 'User', self.request.get('password'))
        user = user_key.get()

        var = {'user': user}
        template = env.get_template('game1.html')
        self.response.out.write(template.render(var))
    def post(self):
        invalid = False

class GamePage2(webapp2.RequestHandler):
    def get(self):
        user_key = ndb.Key('User', self.request.get('username'), 'User', self.request.get('password'))
        user = user_key.get()

        var = {'user': user}
        template = env.get_template('game1.html')
        self.response.out.write(template.render(var))

class saveData(webapp2.RequestHandler):
    def post(self):
        user_key = ndb.Key('User', self.request.get('username'), 'User', self.request.get('password'))
        user = user_key.get()

        user_key.delete()
        user = User(username = self.request.get('username'),
                    password = self.request.get('password'),
                    level = long(self.request.get('level')),
                    experience = long(self.request.get('experience')),
                    exp_needed = long(self.request.get('expNeeded')),
                    checkpoint = long(self.request.get('checkpoint')),
                    hp = long(self.request.get('hp')),
                    max_hp = long(self.request.get('maxHp')),
                    attack = long(self.request.get('attack')),
                    mp = long(self.request.get('magicA')),
                    speed = long(self.request.get('speed')),
                    item1 = self.request.get('item1'),
                    item2 = self.request.get('item2'),
                    item3 = self.request.get('item3'))

        user.key = user_key

        user.put()
        username = user.username
        password = user.password
        if user.checkpoint == 1:
            self.redirect('/game?username=' + username + '&password=' + password)
        elif user.checkpoint == 2:
            self.redirect('/game1?username=' + username + '&password=' + password)
        elif user.checkpoint == 3:
            self.redirect('/game2?username=' + username + '&password=' + password)


app=webapp2.WSGIApplication([
('/', HomePage),
('/new_user', NewUserPage),
('/game', GamePage),
('/save_data', saveData),
('/game1', GamePage1),
('/game2', GamePage2)
])
