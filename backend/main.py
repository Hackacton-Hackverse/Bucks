#coding:utf-8
from flask import Flask
from flask_mysqldb import MySQL

#initialize Flask
app = Flask(__name__)


@app.route('/')
def root():
    return "Hello, Hassana"

# executing server . . .
if __name__ == "__main__":
    app.run(debug=True)