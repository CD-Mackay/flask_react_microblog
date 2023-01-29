from app import app
import time
from app.forms import LoginForm
from flask import flash, redirect

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

@app.route('/login',method=['POST'])
def login():
    form = LoginForm
    if form.validate_on_submit():
        flash('Login requested for user {}, remember_me={}'.format(
            form.username.data, form.remember_me.data))
        return redirect('/index')
    return form

    