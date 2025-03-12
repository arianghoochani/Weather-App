# people.py

from flask import abort, make_response,request, jsonify

from config import db
from models import Weather, weather_schema, weathers_schema
from .classes import CreateWeatherInfoResponse, GetAllWeatherInfoResponse, GetWeatherInfoResponse



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

    



def update(city):
    weather = request.get_json()
    existing_weather = Weather.query.filter(Weather.city == city).one_or_none()

    if existing_weather:
        update_weather = weather_schema.load(weather, session=db.session)
        existing_weather.temperature = update_weather.temperature
        existing_weather.humidity = update_weather.humidity
        existing_weather.windspeed = update_weather.windspeed
        db.session.merge(existing_weather)
        db.session.commit()
        return weather_schema.dump(existing_weather), 201
    else:
        abort(404, f"city {city} is not found")
    # if city in WEATHER_INFO:
    #     WEATHER_INFO[city]["temperature"] = weather_info.get("temperature")
    #     WEATHER_INFO[city]["humidity"] = weather_info.get("humidity")
    #     WEATHER_INFO[city]["windspeed"] = weather_info.get("windspeed")
    #     return WEATHER_INFO[city]
    # else:
    #     abort(
    #         404,
    #         f"weather info of {city} is not found"
    #     )

def delete(city):
    existing_weather = Weather.query.filter(Weather.city == city).one_or_none()

    if existing_weather:
        db.session.delete(existing_weather)
        db.session.commit()
        return make_response(f"{city} successfully deleted", 200)
    else:
        abort(404, f"city {city} is not found")
    # if city in WEATHER_INFO:
    #     del WEATHER_INFO[city]
    #     return make_response(
    #         f"{city} successfully deleted", 200
    #     )
    # else:
    #     abort(
    #         404,
    #         f"weather info of {city} is not found"
    #     )



def handle_options():
    response = jsonify({"message": "Preflight OK"})
    response.headers.add("Access-Control-Allow-Origin", "http://116.203.184.212:3000")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response, 204