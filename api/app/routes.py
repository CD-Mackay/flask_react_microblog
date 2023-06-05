from app import app, db
from app.models import User, Post, Vote
import time
from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, unset_jwt_cookies, jwt_required

@app.route('/')
@app.route('/index')
def index():
    return 'Hello world'


@app.route('/posts')
@jwt_required()
def get_posts():
    posts = Post.query.order_by(Post.id.desc()).all() 
    if posts is None:
        return {"error": "posts"}, 500
    response = [post.serialized() for post in posts]
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


@app.route('/user/<id>')
def get_user():
    user = User.query.filter_by(id=id).first()
    return {'username': user.username, 'id': user.id, 'user_post_vote': user.user_post_vote}

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
    post = Post(content=content, title=title, user_id=user, upvotes=0, downvotes=0)
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

@app.route('/vote/<post_id>/<action_vote>', methods=['POST'])
@jwt_required()
def vote(post_id, action_vote):
    print(action_vote, action_vote == -1, action_vote == 1)
    user_id = request.json.get('user_id', None)
    current_user = User.query.filter_by(id=user_id).first()
    post = Post.query.filter_by(id=post_id).first_or_404()
    if action_vote == "-1":
        print("downvoting!", post.downvotes)
        post.downvote()
        db.session.commit()
        print(post.downvotes)
    elif action_vote == "1":
        print("upvoting!!")
        post.upvote()
        db.session.commit()
    upvote = None
    if action_vote == "1":
        upvote = True
    elif action_vote == "-1":
        upvote = False
    vote = Vote(user = current_user, post = post, upvote = upvote)
    db.session.add(vote)
    db.session.commit()
    response = {"message": "Your opinion has been noted"}
    return response, 200

@app.route('/update_vote/<post_id>/<action_vote>', methods=['POST'])
@jwt_required()
def update_vote(post_id, action_vote):
    print(action_vote, action_vote == -1, action_vote == 1)
    user_id = request.json.get('user_id', None)
    voteId = request.json.get('vote_id', None)
    current_user = User.query.filter_by(id=user_id).first()
    post = Post.query.filter_by(id=post_id).first_or_404()
    if action_vote == "-1":
        print("downvoting!", post.downvotes)
        post.downvote()
        db.session.commit()
        post.downvote()
        db.session.commit()
        print(post.downvotes)
    elif action_vote == "1":
        print("upvoting!!")
        post.upvote()
        db.session.commit()
        post.upvote()
        db.session.commit()
    upvote = None
    if action_vote == "1":
        upvote = True
    elif action_vote == "-1":
        upvote = False
    vote = Vote.query.filter_by(id=voteId).first()
    db.session.delete(vote)
    db.session.commit()
    new_vote = Vote(user = current_user, post = post, upvote = upvote)
    db.session.add(new_vote)
    db.session.commit()
    response = {"message": "Your opinion has been noted"}
    return response, 200


@app.route('/votes')
def get_votes():
    votes = Vote.query.all()
    response = [vote.serialized() for vote in votes]  ## Refactor this to conditionally select user_post_votes  
    return response

@app.route('/user/unfollow/<id>/<userid>', methods=['POST'])
@jwt_required()
def unfollow(id, userid):
    user = User.query.filter_by(id=id).first()
    current_user = User.query.filter_by(id=userid).first()
    current_user.unfollow(user)
    db.session.commit()
    return "You have unfollowed".format(user.username)

@app.route('/change_username/<id>/<newname>', methods=['POST'])
@jwt_required()
def change_username(id, newname):
    user = User.query.filter_by(id=id).first()
    user.username = newname
    db.session.commit()
    response = {"message": "you have changed your username to {}".format(newname)}
    return response

@app.route('/change_password/<id>', methods=['POST'])
@jwt_required()
def change_password(id):
    newPass = request.json.get("password", None)
    user = User.query.filter_by(id=id).first()
    user.password_hash = ""
    user.set_password(newPass)
    db.session.commit()
    response = {"message": "password updated successfully!"}
    return response








    