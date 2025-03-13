# people.py

from flask import abort, make_response,request, jsonify

from config import db
from models import Weather, weather_schema, weathers_schema
from .classes import CreateWeatherInfoResponse, GetAllWeatherInfoResponse, GetWeatherInfoResponse, DeleteWeatherResponse, UpdateWeatherResponse



def getAllWeatherInfo():
    status = "1"
    weathers = []
    try:
        all_weathers = Weather.query.all()
        weathers = weathers_schema.dump(all_weathers)
    except:
        status = "0"
    response = GetAllWeatherInfoResponse(status=status, weathers = weathers)
    return response.to_dict(),200

def createWeatherInfo():
    status = "1"
    code = 200
    new_weather = []
    weather_info = request.get_json()  
    if weather_info:
        try:
            city = weather_info.get("city")
            existing_weather = Weather.query.filter(Weather.city == city).one_or_none()
            if existing_weather is None:
                new_weather = weather_schema.load(weather_info, session=db.session)
                db.session.add(new_weather)
                db.session.commit()
                weather = Weather.query.filter(Weather.city == city).one_or_none()
                new_weather = weather_schema.dump(weather)
            else:
                staus = "0"
                code = 406
                new_weather = []
        except:
            status = "0"
            code = 400
            new_weather = []
    else:
        status = "0"
        code = 400
        new_weather = []
    response = CreateWeatherInfoResponse(status=status, new_weather=new_weather)
    return response.to_dict(), code



def getWeatherInfo(city):
    status = 1
    foundWeather = ""
    code = 200
    try:
        weather = Weather.query.filter(Weather.city == city).one_or_none()

        if weather is not None:
            foundWeather =  weather_schema.dump(weather)
        else:
            status = 0
            foundWeather = ""
            code = 404

    except:
        status = 0
        foundWeather = ""
        code = 404
    response = GetWeatherInfoResponse(status= status, weather= foundWeather)
    return response.to_dict(), code

    



def updateWeatherInfo(city):
    weather = request.get_json()
    status = 1
    updatedWeather = ""
    code = 201
    try:
        existing_weather = Weather.query.filter(Weather.city == weather["city"]).one_or_none()

        if existing_weather:
            update_weather = weather_schema.load(weather, session=db.session)
            existing_weather.temperature = update_weather.temperature
            existing_weather.humidity = update_weather.humidity
            existing_weather.windspeed = update_weather.windspeed
            db.session.merge(existing_weather)
            db.session.commit()
            updatedWeather =  weather_schema.dump(existing_weather)
        else:
            status = 0
            updatedWeather = ""
            code = 404
    except:
        status = 0
        updatedWeather = ""
        code = 500
    response = UpdateWeatherResponse(status=status, updated_weather=updatedWeather)
    return response.to_dict(), code
    



def deleteWeather(city):
    status = "1"
    code = 200
    try:
        existing_weather = Weather.query.filter(Weather.city == city).one_or_none()
        if existing_weather:
            db.session.delete(existing_weather)
            db.session.commit()
            
        else:
            status = "0"
            code = 404
            
    except:
        status = "0"
        code = 500
    response = DeleteWeatherResponse(status=status)
    return response.to_dict(), code
 


def handle_options():
    response = jsonify({"message": "Preflight OK"})
    response.headers.add("Access-Control-Allow-Origin", "http://116.203.184.212:3000")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response, 204

def handle_options2():
    response = jsonify({"message": "Preflight OK"})
    response.headers.add("Access-Control-Allow-Origin", "http://116.203.184.212:3000")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response, 204