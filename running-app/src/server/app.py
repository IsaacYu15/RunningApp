from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

app.secret_key = b'\x82\x05\xe2p\xbb\xac\xa8mSJ\xe4E(\xba7\x12'
app.permanent_session_lifetime = timedelta(days=7)

app.config.update(
    SESSION_COOKIE_SAMESITE="None",  #allows for cross site cookie sneding
    SESSION_COOKIE_SECURE=True       #sends cookies over https
)

client = MongoClient('localhost', 27017)
db = client.users

from user.routes import *  
from session.routes import *

if __name__ == "__main__":
    app.run(debug=True)