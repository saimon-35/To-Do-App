from flask import Blueprint, request, jsonify
from models import db, Task, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    create_refresh_token
)
import time
bp = Blueprint('main', __name__)

# ---------------- AUTH ---------------- #

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"msg": "Missing fields"}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    hashed_password = generate_password_hash(password)

    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201



@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"msg": "User not found"}), 404

    # check password here

    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid password"}), 401

    access_token = create_access_token(str(user.id))
    refresh_token = create_refresh_token(str(user.id))
    time.sleep(8)  # Simulate loading time
    return jsonify({
        "access_token": access_token,
        "refresh_token": refresh_token
    }), 200


@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()

    new_access_token = create_access_token(str(user_id))

    return jsonify({
        "access_token": new_access_token
    }), 200

@bp.route('/')
def home():
    return {"message": "Task Manager API is running"}

# ---------------- TASKS ---------------- #

# ✅ Get tasks (only for logged-in user)
@bp.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()

    tasks = Task.query.filter_by(user_id=user_id).all()

    return jsonify([task.to_dict() for task in tasks])


# ✅ Add task (linked to user)
@bp.route('/tasks', methods=['POST'])
@jwt_required()
def add_task():
    data = request.get_json()
    user_id = get_jwt_identity()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    title = data.get("title")

    if not title or not isinstance(title, str) or title.strip() == "":
        return jsonify({"error": "Valid title is required"}), 400

    new_task = Task(
        title=title,
        completed=False,
        user_id=user_id   # 🔑 important
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        "message": "Task added successfully",
        "task": new_task.to_dict()
    }), 201


# ✅ Delete only own task
@bp.route('/tasks/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_task(id):
    user_id = get_jwt_identity()

    task = Task.query.filter_by(id=id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Task not found or unauthorized"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"})


# ✅ Update only own task
@bp.route('/tasks/<int:id>', methods=['PUT'])
@jwt_required()
def update_task(id):
    user_id = get_jwt_identity()
    data = request.get_json()

    task = Task.query.filter_by(id=id, user_id=user_id).first()

    if not task:
        return jsonify({"error": "Task not found or unauthorized"}), 404

    task.completed = data.get("completed", task.completed)

    db.session.commit()

    return jsonify(task.to_dict())