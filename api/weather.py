from flask import jsonify, request
from models import db, Weather

def get_weather():
    """Retrieve weather data from the database."""
    weather = Weather.query.all()
    return jsonify([{
        "id": w.id,
        "city": w.city,  # ✅ Fix: Include city in response
        "temperature": w.temperature,  # ✅ Fix typo
        "humidity": w.humidity
    } for w in weather])

def add_weather():
    """Add a new weather entry to the database."""
    data = request.get_json()
    new_weather = Weather(
        city=data["city"],
        temperature=data["temperature"],  # ✅ Fix typo
        humidity=data["humidity"]
    )
    db.session.add(new_weather)  # ✅ Fix: Use the correct variable name
    db.session.commit()
    return jsonify({"message": "Weather added successfully!"}), 201
