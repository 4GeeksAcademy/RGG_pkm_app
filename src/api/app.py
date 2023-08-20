from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos (MongoDB)
client = MongoClient('mongodb://localhost:27017/')
db = client['pokeapp']
users_collection = db['users']

# Endpoint de registro de usuarios
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    new_user = {
        'username': data['username'],
        'password': hashed_password
    }
    users_collection.insert_one(new_user)
    return jsonify(message='User registered successfully'), 201

# Endpoint de inicio de sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = users_collection.find_one({'username': data['username']})
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify(message='Login successful'), 200
    return jsonify(message='Invalid credentials'), 401

# Endpoint para agregar un favorito a un usuario
@app.route('/add_favorite/<user_id>/<pokemon_id>', methods=['POST'])
def add_favorite(user_id, pokemon_id):
    # Aquí podrías agregar la lógica para almacenar el favorito en la base de datos
    return jsonify(message='Favorite added successfully'), 200

# Endpoint para eliminar un favorito de un usuario
@app.route('/remove_favorite/<user_id>/<pokemon_id>', methods=['DELETE'])
def remove_favorite(user_id, pokemon_id):
    # Aquí podrías agregar la lógica para eliminar el favorito de la base de datos
    return jsonify(message='Favorite removed successfully'), 200

if __name__ == '__main__':
    app.run(debug=True)
