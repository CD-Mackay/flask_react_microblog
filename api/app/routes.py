from app import app, db
from app.models import User, Post
import time
from flask import flash, redirect, request, jsonify, make_response
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
# from flask_login import current_user

@app.route('/')
@app.route('/index')
def index():
    return 'Hello world'


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/posts')
@jwt_required()
def get_posts():
    posts = Post.query.order_by(Post.id.desc()).all() ## Returns non JSON serializable object? 
    if posts is None:
        return {"error": "posts"}, 500
    response = [post.serialized() for post in posts]
    return response, 200

@app.route('/profile/<id>')
@jwt_required()
def get_profile(id):
    user = User.query.filter_by(id=id).first()
    return {'username': user.username, 'id': user.id}

@app.route('/token',methods=['POST']) ## /token route handles login requests by assigning JWT to logged in users
def get_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user is None:
        return {"error": "wrong email"}, 401
    elif not user.check_password(password):
        return {"error": "wrong password"}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token, "user": user.id}
    return response
    

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/register', methods=["POST"]) ## Registers new Users, sets JWT upon succesful registration
def register_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    username = request.json.get("username", None)
    print(email, password, username)
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    print(response)
    return response

@app.route('/new', methods=['POST'])
def make_post():
    title = request.json.get("title", None)
    content = request.json.get("content", None)
    user = request.json.get("id", None)
    post = Post(content=content, title=title, user_id=user)
    db.session.add(post)
    db.session.commit()
    return {"response": "post successful!"}

@app.route('/follow/<username>', methods=['POST'])
def follow(username):
    id = request.json.get("id", None)
    current_user = user.query.filter_by(id=id).first()
    user = User.query.filter_by(username=username).first()
    if user is None:
        return ('User not found'.format(username))
    current_user.follow(user)
    return "You are now following".format(username)

@app.route('/unfollow/<username>', methods=['POST'])
def unfollow(username):
    id = request.json.get("id", None)
    current_user = user.query.filter_by(id=id).first()
    user = User.query.filter_by(username=username).first()
    if user is None:
        return ('User not found'.format(username))
    current_user.unfollow(user)
    return "You have unfollowed".format(username)





    