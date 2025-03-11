# config.py

# import pathlib
# import connexion
# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow

# basedir = pathlib.Path(__file__).parent.resolve()
# connex_app = connexion.App(__name__, specification_dir=basedir)

# app = connex_app.app
# app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{basedir / 'weather.db'}"
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# db = SQLAlchemy(app)
# ma = Marshmallow(app)

import os
import pathlib
import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import pymysql
# Base directory
basedir = pathlib.Path(__file__).parent.resolve()

# Create Connexion app
connex_app = connexion.App(__name__, specification_dir=basedir)
app = connex_app.app  # Connexion wraps Flask

# Load database credentials from environment variables
db_user = os.getenv("MYSQL_USER", "flaskuser")
db_password = os.getenv("MYSQL_PASSWORD", "flaskpassword")
db_host = os.getenv("MYSQL_HOST", "mysqldb")  # Use 'mysqldb' as it's the service name in docker-compose.yml
db_name = os.getenv("MYSQL_DB", "weather_db")

# Use MySQL instead of SQLite
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize database and Marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)



def create_database():
    connection = pymysql.connect(host=db_host, user=db_user, password=db_password)
    with connection.cursor() as cursor:
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name};")
    connection.close()

# Function to create tables if they don't exist
def create_tables():
    with app.app_context():
        db.create_all()  # Automatically creates all tables

# Ensure database and tables are created
create_database()
create_tables()
