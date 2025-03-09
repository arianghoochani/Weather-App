from flask import Flask
from flask_migrate import Migrate
import config
from models import Weather
app = config.connex_app
app.add_api(config.basedir / "swagger.yml")

migrate = Migrate(app.app, config.db)
@app.route("/")
def home():
    return {"content":"hello world!"}

if __name__ == "__main__":
    # uvicorn.run("config:connex_app", host="0.0.0.0", port=8000, reload=True)
    app.run(host="0.0.0.0", port=5000)