import os

from flask import Flask, render_template, url_for

from flaskr.random_puzzle import random_puzzle
from flaskr.custom_puzzle import custom_puzzle

# create and configure the app
app = Flask(__name__, instance_relative_config=True, static_url_path='/static')
app.config.from_mapping(
    SECRET_KEY='s2210422-tran-thu-thi-anh',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)

# if test_config is None:
#     # load the instance config, if it exists, when not testing
#     app.config.from_pyfile('config.py', silent=True)
# else:
#     # load the test config if passed in
#     app.config.from_mapping(test_config=None)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

# a simple page that says hello
@app.route('/')
def home():
    return render_template('base.html')

app.register_blueprint(random_puzzle.random_puzzle_bp, url_prefix = '/random-puzzle')
app.register_blueprint(custom_puzzle.custom_puzzle_bp, url_prefix = '/custom-puzzle')