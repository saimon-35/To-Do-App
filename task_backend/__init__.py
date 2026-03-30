from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from models import db
from routes import bp
from config import Config

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    # Initialize extensions
    db.init_app(app)
    JWTManager(app)  # ✅ Needed for JWT authentication

    # Register routes
    app.register_blueprint(bp)

    # Create database tables
    with app.app_context():
        db.create_all()

    return app