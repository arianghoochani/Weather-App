import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from db import db
# ✅ Create a single instance of SQLAlchemy & Marshmallow
# db = SQLAlchemy()
ma = Marshmallow()

# ✅ Initialize Connexion app
app = connexion.FlaskApp(__name__, specification_dir="./")
app.add_api("swagger.yaml")

# ✅ Get Flask app instance
flask_app = app.app  
flask_app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///weather.db"
flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ✅ Initialize SQLAlchemy & Marshmallow with Flask app
db.init_app(flask_app)
ma.init_app(flask_app)

# ✅ Enable CORS
CORS(flask_app, resources={r"/*": {"origins": "*"}})  

# ✅ Ensure database tables are created inside an app context
with flask_app.app_context():
    db.create_all()

if __name__ == "__main__":
    flask_app.run(debug=True)
