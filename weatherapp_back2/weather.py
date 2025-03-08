# people.py

from flask import abort
from flask import abort, make_response



WEATHER_INFO = {
    "tehran": {
        "city": "tehran",
        "temperature": 22.2,
        "humidity": 2.0,
        "windspeed": 31.2
    },
    "london": {
        "city": "london",
        "temperature": 12.1,
        "humidity": 29.0,
        "windspeed": 3.2
    },
    "vienna": {
        "city": "vienna",
        "temperature": 13.5,
        "humidity": 48.9,
        "windspeed": 88.4
    },
}

def get_all():
    return list(WEATHER_INFO.values())

def create(weather):
    city = weather.get("city")
    temperature = weather.get("temperature")
    humidity = weather.get("humidity")
    windspeed = weather.get("windspeed")
    

    if city not in WEATHER_INFO:
        WEATHER_INFO[city] = {
            "city": city,
            "temperature": temperature,
            "humidity": humidity,
            "windspeed": windspeed

        }
        return WEATHER_INFO, 201
    else:
        abort(
            406,
            f"The weather information of {city} already exists.",
        )


def get_one(city):
    if city in WEATHER_INFO:
        return WEATHER_INFO[city]
    else:
        abort(
            404, f"weather info of {city} is not found"
        )

def update(city, weather_info):
    if city in WEATHER_INFO:
        WEATHER_INFO[city]["temperature"] = weather_info.get("temperature")
        WEATHER_INFO[city]["humidity"] = weather_info.get("humidity")
        WEATHER_INFO[city]["windspeed"] = weather_info.get("windspeed")
        return WEATHER_INFO[city]
    else:
        abort(
            404,
            f"weather info of {city} is not found"
        )

def delete(city):
    if city in WEATHER_INFO:
        del WEATHER_INFO[city]
        return make_response(
            f"{city} successfully deleted", 200
        )
    else:
        abort(
            404,
            f"weather info of {city} is not found"
        )