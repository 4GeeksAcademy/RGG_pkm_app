from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Favorite
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash
from flask_cors import CORS

app = Flask(__name__)

# Cors
CORS(app, resources={r"/api/*": {"origins": "https://super-space-fortnight-j95pjqwgx4rcq966-3001.app.github.dev/"}})
CORS(app, resources={r"/login": {"origins": "https://super-space-fortnight-j95pjqwgx4rcq966-3001.app.github.dev/"}})

# Define el Blueprint para la API
api = Blueprint("api", __name__)

@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    last_name = data.get("last_name")
    nickname = data.get("nickname")
    birthday = data.get("birthday")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 409

    new_user = User(
        email=email,
        password=password,
        name=name,
        last_name=last_name,
        nickname=nickname,
        birthday=birthday,
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):  # Cambio para verificar la contraseña
        token = create_access_token(identity=user.id)
        return jsonify({"token": token, "user": user.serialize()}), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def get_user_info():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    if user is None:
        return jsonify({"message": "User not found"}), 404

    return jsonify(message="Welcome, {}".format(user.name)), 200

@api.route("/add_favorite", methods=["POST"])
@jwt_required()
def add_favorite():
    data = request.get_json()
    pokemon_id = data.get("pokemon_id")  # Cambio de pokemon_name a pokemon_id

    if not pokemon_id:
        return jsonify({"message": "Missing 'pokemon_id' in request"}), 400

    user_id = get_jwt_identity()  # Obtener el ID del usuario actual a través del token JWT

    new_favorite_pokemon = Favorite(user_id=user_id, pokemon_id=pokemon_id)
    db.session.add(new_favorite_pokemon)
    db.session.commit()

    return jsonify({"message": "Pokémon added to favorites successfully"})

@api.route("/remove_favorite", methods=["POST"])
@jwt_required()
def remove_favorite():
    data = request.get_json()
    pokemon_id = data.get("pokemon_id")  # Cambio de pokemon_name a pokemon_id

    if not pokemon_id:
        return jsonify({"message": "Missing 'pokemon_id' in request"}), 400

    user_id = get_jwt_identity()  # Obtener el ID del usuario actual a través del token JWT

    favorite_pokemon = Favorite.query.filter_by(user_id=user_id, pokemon_id=pokemon_id).first()

    if favorite_pokemon:
        db.session.delete(favorite_pokemon)
        db.session.commit()

        return jsonify({"message": "Pokémon removed from favorites successfully"})

    return jsonify({"message": "Pokémon not found in favorites"}, 404)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001)
