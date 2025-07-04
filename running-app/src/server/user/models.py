from flask import jsonify, request, session
from passlib.hash import pbkdf2_sha256
from app import db
from session.models import SessionManager
import uuid

class User:

    sessionManager = SessionManager()

    def signup(self):
        #get user data from request
        data = request.get_json()
        user = {
            "id": uuid.uuid4().hex,
            "username": data.get('username'),
            "email": data.get('email'),
            "password": data.get('password')
        }
        #encrypt
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        #check if the email exists
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error": "Email is in use"}), 400
        
        #create a new user if a unique email
        if db.users.insert_one(user):
            return self.intialize_session(user)
        
        return jsonify({"error": "Sign up failed"}), 400

    def signout(self):
        session.clear()
        return jsonify({"message": "Signed out successful"}), 200

    def login(self):
        #get user data from request
        data = request.get_json()
        user = {
            "username": data.get('username'),
            "password": data.get('password'),
            "email": data.get('email')
        }

        #if the user with such email exists, verify the password
        potentialUser = db.users.find_one({'email': user['email']})

        if potentialUser and pbkdf2_sha256.verify(user['password'], potentialUser['password']):
            return self.sessionManager.initialize_session(user)

        return jsonify({"error": "user not found"}), 401
