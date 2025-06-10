from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

app.secret_key = b'\x82\x05\xe2p\xbb\xac\xa8mSJ\xe4E(\xba7\x12'

client = MongoClient('localhost', 27017)
db = client.users

from user.routes import *  

if __name__ == "__main__":
    app.run(debug=True)