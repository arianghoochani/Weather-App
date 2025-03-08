from flask import jsonify, request
from db import db  # ✅ Import db from app.py
from models import Weather

def get_weather():
    """Retrieve all weather data from the database."""
    weather_data = Weather.query.all()
    return jsonify([
        {"id": w.id, "city": w.city, "temperature": w.temperature, "humidity": w.humidity}
        for w in weather_data
    ])

def add_weather():
    """Add new weather data to the database."""
    data = request.get_json()

    # ✅ Validate the request JSON
    if not all(key in data for key in ["city", "temperature", "humidity"]):
        return jsonify({"error": "Missing required fields"}), 400

    # ✅ Create a new Weather entry
    new_weather = Weather(
        city=data["city"],
        temperature=data["temperature"],
        humidity=data["humidity"]
    )

    # ✅ Save to the database inside an app context
    with db.session.begin():
        db.session.add(new_weather)

    return jsonify({"message": "Weather added successfully!", "id": new_weather.id}), 201
