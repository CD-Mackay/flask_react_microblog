from app import app
import time
from flask import flash, redirect, request, jsonify
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
@jwt_required()
def get_posts():
    return {'content': 'I am a post, woooh look at me lorem ipsum'}

@app.route('/token',methods=['POST']) ## /token route handles login requests by assigning JWT to logged in users
def get_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test@test.com" or password != "test":
        return {"error": "Wrong email or password"}, 401
    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    print(response)
    return response
    

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


    