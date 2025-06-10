from flask import jsonify, request, session
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class User:

    def intialize_session(self, user):
        #do not store user password in session
        del user['password']

        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

    def sign_up(self):

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

    def sign_out(self):
        session.clear()
        return jsonify({"message": "Signed out successful"}), 200

    def login(self):
        #get user data from request
        data = request.get_json()
        user = {
            "email": data.get('email'),
            "password": data.get('password')
        }

        #if the user with such email exists, verify the password
        potentialUser = db.users.find_one({'email': user['email']})

        if potentialUser and pbkdf2_sha256.verify(user['password'], potentialUser['password']):
            return self.intialize_session(user)

        return jsonify({"error": "user not found"}), 401
