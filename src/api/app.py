from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://github.com/4GeeksAcademy/RGG_pkm_app"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # Ruta de tu base de datos SQLite
app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # Clave secreta para JWT (cambia esto en producción)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Configuración de la base de datos (MongoDB)
client = MongoClient('mongodb://localhost:27017/')
mongo_db = client['pokeapp']
users_collection = mongo_db['users']

# Define el modelo Favorite (SQLite)
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    pokemon_id = db.Column(db.String(100))


# Endpoint de registro de usuarios en MongoDB
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = {
        'email': email,
        'password': hashed_password
    }
    users_collection.insert_one(new_user)

    return jsonify(message='User registered successfully'), 201

# Endpoint de inicio de sesión en MongoDB
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = users_collection.find_one({'email': email})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = create_access_token(identity=str(user['_id']))
        return jsonify({"token": token}), 200

    return jsonify({"message": "Invalid credentials"}), 401

# Endpoint para agregar un favorito a un usuario
@app.route('/add_favorite', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    pokemon_id = data.get("pokemon_id")

    if not pokemon_id:
        return jsonify({"message": "Missing 'pokemon_id' in request"}), 400

    current_user_id = get_jwt_identity()  # Obtener el ID del usuario actual a través del token JWT

    new_favorite_pokemon = Favorite(user_id=current_user_id, pokemon_id=pokemon_id)
    db.session.add(new_favorite_pokemon)
    db.session.commit()

    return jsonify({"message": "Pokémon added to favorites successfully"})

# Endpoint para eliminar un favorito de un usuario
@app.route('/remove_favorite', methods=['POST'])
@jwt_required()
def remove_favorite():
    data = request.get_json()
    pokemon_id = data.get("pokemon_id")

    if not pokemon_id:
        return jsonify({"message": "Missing 'pokemon_id' in request"}), 400

    current_user_id = get_jwt_identity()  # Obtener el ID del usuario actual a través del token JWT

    favorite_pokemon = Favorite.query.filter_by(user_id=current_user_id, pokemon_id=pokemon_id).first()

    if favorite_pokemon:
        db.session.delete(favorite_pokemon)
        db.session.commit()

        return jsonify({"message": "Pokémon removed from favorites successfully"})

    return jsonify({"message": "Pokémon not found in favorites"}, 404)

if __name__ == '__main__':
    app.run()
