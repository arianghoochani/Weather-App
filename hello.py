from flask import Flask

app = Flask(__name__)

@app.route("/hello_world")
def hello_world():
    return  "<p>this is the welcome(hello) page!</p>"

@app.route("/index")
def index():
    return  "<p>this is the index page!</p>"

@app.route("/info")
def info():
    return  "<p>this is the info page!</p>"