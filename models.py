from db import db

class Weather(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50), nullable=False)  # ✅ Fix: Use String, not Float
    temperature = db.Column(db.Float, nullable=False)  # ✅ Fix: Correct Float usage
    humidity = db.Column(db.Float, nullable=False)
