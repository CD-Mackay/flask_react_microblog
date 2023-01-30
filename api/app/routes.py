from app import app
import time
from app.forms import LoginForm
from flask import flash, redirect, request
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

@app.route('/')
@app.route('/index')
def index():
    return 'Hello world'


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/posts')
def get_posts():
    return {'content': 'I am a post, woooh look at me lorem ipsum'}

@app.route('/token',methods=['POST'])
def get_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response


    