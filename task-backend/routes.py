from flask import Blueprint, request, jsonify
from .models import db, Task

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    return {"message": "Task Manager API is running"}

@bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@bp.route('/tasks', methods=['POST'])
def add_task():
    data = request.json

    # Validation
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    title = data.get("title")

    if not title:
        return jsonify({"error": "Title is required"}), 400

    if not isinstance(title, str) or title.strip() == "":
        return jsonify({"error": "Title must be a non-empty string"}), 400

    # Create task
    new_task = Task(
        title=title,
        completed=False
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        "message": "Task added successfully",
        "task": new_task.to_dict()
    }), 201

@bp.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"})

@bp.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.json

    task.completed = data.get("completed", task.completed)

    db.session.commit()

    return jsonify(task.to_dict())