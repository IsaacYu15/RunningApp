from app import app
from user.models import User

user = User()

@app.route('/signup', methods=['POST'])
def signup():
    return user.signup()

@app.route('/login', methods=['POST'])
def login():
    return user.login()

@app.route('/signout')
def signout():
    return user.signout()
