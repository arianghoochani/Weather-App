# people.py

from flask import abort, make_response,request

from config import db
from models import Weather, weather_schema, weathers_schema
from .classes import CreateWeatherInfoResponse, GetAllWeatherInfoResponse



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
            print("it is in try")
            city = weather_info.get("city")
            existing_weather = Weather.query.filter(Weather.city == city).one_or_none()
            if existing_weather is None:
                print("do not exist")
                new_weather = weather_schema.load(weather_info, session=db.session)
                db.session.add(new_weather)
                db.session.commit()
                new_weather = weathers_schema.load(weather_info, session=db.session)
            else:
                print("exist")
                staus = "0"
                code = 406
                new_weather = []
        except:
            print("error")
            status = "0"
            code = 400
            new_weather = []
    else:
        print("wrong req")
        status = "0"
        code = 400
        new_weather = []
    response = CreateWeatherInfoResponse(status=status, new_weather=new_weather)
    return response.to_dict(), code


    # city = weather.get("city")
    # temperature = weather.get("temperature")
    # humidity = weather.get("humidity")
    # windspeed = weather.get("windspeed")
    

    # if city not in WEATHER_INFO:
    #     WEATHER_INFO[city] = {
    #         "city": city,
    #         "temperature": temperature,
    #         "humidity": humidity,
    #         "windspeed": windspeed

    #     }
    #     return WEATHER_INFO, 201
    # else:
    #     abort(
    #         406,
    #         f"The weather information of {city} already exists.",
    #     )


def get_one(city):
    weather = Weather.query.filter(Weather.city == city).one_or_none()
    if weather is not None:
        return weather_schema.dump(weather)
    else:
        abort(404, f"weather info of {city} is not found")
    # if city in WEATHER_INFO:
    #     return WEATHER_INFO[city]
    # else:
    #     abort(
    #         404, f"weather info of {city} is not found"
    #     )

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