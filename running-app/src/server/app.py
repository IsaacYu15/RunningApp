from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient('localhost', 27017)
db = client.flask_database

runHistory = db.runHistory
user_collection = db.users

#Register
@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = user_collection.find_one({'username': username, 'password': password})
    return jsonify({"success": user is not None})

@app.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = user_collection.find_one({'username': username})
    
    if (user is None):
        user_collection.insert_one({'username' : username, 'password' : password})

    return jsonify({"success": user is None})
    
#Record 
@app.route("/record", methods=['POST'])
def index():
    data = request.get_json()
    coordinates = data.get('coordinates')
    if not coordinates:
        return jsonify({"error": "No coordinates provided"})
    
    runHistory.insert_one({"runs" : coordinates})
    print(coordinates)
    return jsonify({"message": "Coordinates saved successfully"})
        

if __name__ == "__main__":
    app.run(debug=True)