from datetime import datetime
from ..config import db, ma

class Weather(db.Model):
    __tablename__ = "weather"
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(32), unique=True)
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Float)
    windspeed = db.Column(db.Float)

class WeatherSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Weather
        load_instance = True
        sqla_session = db.session

weather_schema = WeatherSchema()
weathers_schema = WeatherSchema(many=True)