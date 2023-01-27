from app import db

class Post(db.Model):
  id = db.Column(db.Integer, primary_key = True)
  content = db.Column(db.String(250), index=True)

  def __repr__(self):
    return '<Post {}>'.format(self.content)
