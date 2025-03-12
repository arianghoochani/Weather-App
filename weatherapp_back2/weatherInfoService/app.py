from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS 
import config
from models import Weather
app = config.connex_app
app.add_api(config.basedir / "swagger.yml")
# CORS(app.app)
CORS(app.app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

migrate = Migrate(app.app, config.db)
@app.route("/")
def home():
    return {"content":"hello world!"}

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# ✅ Handle preflight `OPTIONS` requests
@app.route('/api/weather', methods=['OPTIONS'])
def preflight():
    response = jsonify({"message": "Preflight OK"})
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response, 200

if __name__ == "__main__":
    # uvicorn.run("config:connex_app", host="0.0.0.0", port=8000, reload=True)
    app.run(host="0.0.0.0", port=5000)