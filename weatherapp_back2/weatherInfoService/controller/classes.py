class GetAllWeatherInfoResponse:
    def __init__(self, status, weathers ):
        self.status = status
        self.weathers = weathers
    def to_dict(self):
        return {"status": self.status, "weathers": self.weathers}
