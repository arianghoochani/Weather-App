import connexion
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# Initialize Connexion app
app = connexion.App(__name__, specification_dir="./")
app.add_api("swagger.yaml")

# Flask App & Database setup
flask_app = app.app  # ✅ This is the actual Flask app
flask_app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///weather.db"
flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(flask_app)
ma = Marshmallow(flask_app)

if __name__ == "__main__":
    with flask_app.app_context():  # ✅ Use the actual Flask app context
        db.create_all()
    flask_app.run(debug=True)
