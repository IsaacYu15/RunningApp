from app import app
from user.models import User

user = User()

@app.route('/signup', methods=['POST'])
def signup():
    return user.sign_up()

@app.route('/login', methods=['POST'])
def login():
    return user.login()

@app.route('/signout')
def signout():
    return user.sign_out()
