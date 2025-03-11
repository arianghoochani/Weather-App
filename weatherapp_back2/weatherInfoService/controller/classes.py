class GetAllWeatherInfoResponse:
    def __init__(self, status, weathers ):
        self.status = status
        self.weathers = weathers
    def to_dict(self):
        return {"status": self.status, "weathers": self.weathers}

class createWeatherInfoResponse:
    def __init__(self, status, new_weather):
        self.status = status
        self.new_weather = new_weather
    def to_dict(self):
        return {"status": self.status, "new_weather": self.new_weather}