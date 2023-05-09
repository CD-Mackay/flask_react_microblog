from app import app, db
from app.models import User, Post
import time
from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required

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
    posts = Post.query.order_by(Post.id.desc()).all() 
    if posts is None:
        return {"error": "posts"}, 500
    response = [post.serialized() for post in posts]
    print("response:", response)
    return response, 200


@app.route('/followed_posts/<userid>')
@jwt_required()
def get_followed_posts(userid):
    user = User.query.filter_by(id=userid).first()
    posts = user.followed_posts()
    response = [post.serialized() for post in posts]
    return response, 200


@app.route('/profile/<id>/<currentid>')
@jwt_required()
def get_profile(id, currentid):
    user = User.query.filter_by(id=id).first()
    if id == currentid:
        return {'username': user.username, 'id': user.id}
    current_user = User.query.filter_by(id=currentid).first()
    is_followed = current_user.is_following(user)
    return {'username': user.username, 'id': user.id, 'is_following': is_followed}

## Remove one of these routes, use logic on front-end to verify if current user is viewing own profile or not

@app.route('/user/<id>')
def get_user():
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
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/register', methods=["POST"]) ## Registers new Users, sets JWT upon succesful registration
def register_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    username = request.json.get("username", None)
    check_email = User.query.filter_by(email=email).first()
    if check_email is not None:
        response = make_response('Response')
        response.headers['customHeader'] = 'Email already exists'
        response.statusText = 'Email already exists'
        response.status_code = 401
        return response
    check_username = User.query.filter_by(username=username).first()
    if check_username is not None:
        response = make_response('Response')
        response.headers['customHeader'] = 'Username already exists'
        response.status_code = 401
        return response
    elif check_email is None and check_username is None:
        user = User(username=username, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=email)
        response = {"access_token":access_token}
        print(response)
        return response

@app.route('/new', methods=['POST'])
@jwt_required()
def make_post():
    title = request.json.get("title", None)
    content = request.json.get("content", None)
    user = request.json.get("id", None)
    post = Post(content=content, title=title, user_id=user)
    db.session.add(post)
    db.session.commit()
    return {"response": "post successful!"}

@app.route('/user/follow/<id>/<userid>', methods=['POST'])
@jwt_required()
def follow_user(id, userid):
    user = User.query.filter_by(id=id).first()
    current_user = User.query.filter_by(id=userid).first()
    current_user.follow(user)
    db.session.commit()
    return "You are now following".format(user.username)


@app.route('/user/unfollow/<id>/<userid>', methods=['POST'])
@jwt_required()
def unfollow(id, userid):
    user = User.query.filter_by(id=id).first()
    current_user = User.query.filter_by(id=userid).first()
    current_user.unfollow(user)
    db.session.commit()
    return "You have unfollowed".format(user.username)





    