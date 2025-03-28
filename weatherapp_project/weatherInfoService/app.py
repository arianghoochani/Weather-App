from flask import Flask
from flask import jsonify, request

from flask_migrate import Migrate
from flask_cors import CORS 
import config 
from data.models import Weather

app = config.connex_app
app.add_api(config.basedir / "swagger.yml")

CORS(app.app, resources={r"/api/*": {"origins": "*"}}, 
     supports_credentials=True, allow_headers=["Content-Type", "Authorization"], 
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
migrate = Migrate(app.app, config.db)


@app.app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
