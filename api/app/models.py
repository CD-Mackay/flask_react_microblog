from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import json

class Post(db.Model): ## Define Posts model
  id = db.Column(db.Integer, primary_key = True)
  content = db.Column(db.String(250), index=True)
  title = db.Column(db.String(200), index=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 

  def __repr__(self):
    return '<Post {}>'.format(self.content)
  def toJSON(self):
    return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

class User(db.Model): ## Define User Model. Contains id, username, email, password and posts list.
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String)
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
      self.password_hash = generate_password_hash(password)

    def check_password(self, password):
      return check_password_hash(self.password_hash, password)

# @get_token.user_loader // Raises circular import error
# def load_user(id):
#     return User.query.get(int(id))
