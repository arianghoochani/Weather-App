from flask import Flask

app = Flask(__name__)

@app.route("/hello_world",methods=["POST"])
def hello_world():
    return  {
        "message": "Hello, World!"
    }

@app.route("/index/<page_number>")
def index(page_number):
    return  f"<p>this is the index of th page number {page_number}!</p>"

@app.route("/info")
def info():
    return  "<p>this is the info page!</p>"