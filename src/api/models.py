from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token
import bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
api = Blueprint('api', __name__)

salt = bcrypt.gensalt()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    nickname = db.Column(db.String(120), unique=True, nullable=False)
    birthday = db.Column(db.String(80), unique=False, nullable=True)
  

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
           "id": self.id,
           "name": self.name,
           "last_name": self.last_name,
           "nickname": self.nickname,
           "email": self.email,
           "birthday": self.birthday,
        }
    
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    pokemon_id = db.Column(db.String(100)) 

    def __repr__(self):
        return f'<Favorite: {self.pokemon_id}>'
    
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
        return jsonify({"message": "Email and password are required"})
    
    existing_user_email = User.query.filter_by(email=email).first()
    if existing_user_email:
        return jsonify({"message": "User with this email already exists"})
    
    existing_user_nickname = User.query.filter_by(nickname=nickname).first()
    if existing_user_nickname:
        return jsonify({"message": "Nickname already exists"})
    
    password_encriptada = bcrypt.hashpw(password.encode('utf-8'), salt)
    new_user = User(
        email=email,
        password=password_encriptada,
        name=name,
        last_name=last_name,
        nickname=nickname,
        birthday=birthday,
        
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400
    
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "User doesn't exist"}), 401
    
    if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"message": "Password incorrect"}), 401

    token = create_access_token(identity=user.id)
    return jsonify({"token": token, "user": user.serialize()}), 200

app.register_blueprint(api)

if __name__ == '__main__':
    app.run()


