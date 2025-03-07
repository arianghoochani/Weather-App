from db import db

class Weather(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.Floa(50), nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)
