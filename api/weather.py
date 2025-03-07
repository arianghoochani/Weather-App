from flask import jsonify, request
from models import db, Weather

def get_people():
    """Retrieve all people from the database"""
    weather = Weather.query.all()
    return jsonify([{"id": w.id, "tempreture": w.tempreture, "humidity": w.humidity} for w in weather])


def add_weather():
    """Add a new person to the database"""
    data = request.get_json()
    new_weather = Weather(city=data["city"], tempreture=data["tempreture"],humidity=data["humidity"],)
    db.session.add(new_person)
    db.session.commit()
    return jsonify({"message": "weather added successfully!"}), 201
