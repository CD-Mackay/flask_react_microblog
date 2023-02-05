from app import db

class Post(db.Model): ## Define Posts model
  id = db.Column(db.Integer, primary_key = True)
  content = db.Column(db.String(250), index=True)

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
