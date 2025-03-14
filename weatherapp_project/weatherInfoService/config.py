import os
import pathlib
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import pymysql

basedir = pathlib.Path(__file__).parent.resolve()

# Create Connexion app
connex_app = connexion.App(__name__, specification_dir=basedir)
app = connex_app.app  # Connexion wraps Flask

# Load database credentials from environment variables
db_user = os.getenv("MYSQL_USER", "flaskuser")
db_password = os.getenv("MYSQL_PASSWORD", "flaskpassword")
db_host = os.getenv("MYSQL_HOST", "mysqldb")  
db_name = os.getenv("MYSQL_DB", "weather_db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
