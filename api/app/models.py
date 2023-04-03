from app import db
from werkzeug.security import generate_password_hash, check_password_hash
import json

followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'))
)

class Post(db.Model): ## Define Posts model
  id = db.Column(db.Integer, primary_key = True)
  content = db.Column(db.String(250), index=True)
  title = db.Column(db.String(200), index=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 

  def __repr__(self):
    return '<Post {}>'.format(self.content)

  def serialized(self):
    return {
      'id': self.id,
      'content': self.content,
      'title': self.title,
      'user_id': self.user_id
    }

class User(db.Model): ## Define User Model. Contains id, username, email, password and posts list.
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String)
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    followed = db.relationship(
      'User', secondary=followers,
      primaryjoin=(followers.c.follower_id == id),
      secondaryjoin=(followers.c.followed_id == id),
      backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
      self.password_hash = generate_password_hash(password)

    def check_password(self, password):
      return check_password_hash(self.password_hash, password)
    
    def follow(self, user):
      if not self.is_following(user):
        self.follow.append(user)
      
    def unfollow(self, user):
      if self.is_following(user):
        self.followed.remove(user)
    
    def is_following(self, user):
      return self.followed.filter(
      followers.c.followed_id == user.id).count() > 0
    
    def followed_posts(self):
        followed = Post.query.join(
            followers, (followers.c.followed_id == Post.user_id)).filter(
                followers.c.follower_id == self.id)
        own = Post.query.filter_by(user_id=self.id)
        return followed.union(own).order_by(Post.timestamp.desc())

# @get_token.user_loader // Raises circular import error
# def load_user(id):
#     return User.query.get(int(id))
