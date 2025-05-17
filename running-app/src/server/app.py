from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient('localhost', 27017)
# mongodb database
db = client.flask_database
#todos collection
runHistory = db.runHistory

@app.route("/", methods=['GET', 'POST'])
def index():
    data = request.get_json()
    coordinates = data.get('coordinates')


    if request.method == 'POST':
        if not coordinates:
            return jsonify({"error": "No coordinates provided"}), 400
    
        runHistory.insert_one({"runs" : coordinates})
        print(coordinates)
        return jsonify({"message": "Coordinates saved successfully"}), 201

if __name__ == "__main__":
    app.run(debug=True)