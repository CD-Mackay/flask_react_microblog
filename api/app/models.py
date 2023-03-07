from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class Post(db.Model): ## Define Posts model
  id = db.Column(db.Integer, primary_key = True)
  content = db.Column(db.String(250), index=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id')) ## Issue adding to table, check with most recent tab tutorial

  def __repr__(self):
    return '<Post {}>'.format(self.content)

class User(db.Model): ## Define User Model. Contains id, username, email, password and posts list.
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
      self.password_hash = generate_password_hash(password)

    def check_password(self, password):
      self.check_password = check_password_hash(self.password_hash, password)

# @login.user_loader WHAT DOES THIS MEAN??
# def load_user(id):
#     return User.query.get(int(id))
