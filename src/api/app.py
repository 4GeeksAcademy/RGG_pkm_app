from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # Supongo que debes buscar al usuario en la colección 'users' de MongoDB y verificar su contraseña
    user = users_collection.find_one({'username': email})
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = create_access_token(identity=str(user['_id']))
        return jsonify({"token": token}), 200

    return jsonify({"message": "Invalid credentials"}), 401

# Importa la clase FavoritePokemon si aún no lo has hecho
from .models import FavoritePokemon

# Endpoint para agregar un favorito a un usuario
@app.route('/add_favorite/<user_id>/<pokemon_id>', methods=['POST'])
@jwt_required()
def add_favorite(user_id, pokemon_id):
    current_user_id = get_jwt_identity()
    
    # Asume que `FavoritePokemon` es un modelo que tiene user_id y pokemon_id como campos
    # Aquí se crea una instancia de `FavoritePokemon` y se la asocia al usuario actual
    favorite = FavoritePokemon(user_id=current_user_id, pokemon_id=pokemon_id)
    
    db.session.add(favorite)
    db.session.commit()
    
    return jsonify(message='Favorite added successfully'), 200

# Endpoint para eliminar un favorito de un usuario
@app.route('/remove_favorite/<user_id>/<pokemon_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite(user_id, pokemon_id):
    current_user_id = get_jwt_identity()
    
    # Asume que `FavoritePokemon` es un modelo que tiene user_id y pokemon_id como campos
    # Aquí se busca la instancia de `FavoritePokemon` asociada al usuario actual y al pokemon_id
    favorite = FavoritePokemon.query.filter_by(user_id=current_user_id, pokemon_id=pokemon_id).first()
    
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify(message='Favorite removed successfully'), 200
    else:
        return jsonify(message="Favorite not found"), 404
