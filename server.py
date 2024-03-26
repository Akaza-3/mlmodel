from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import datetime
import numpy as np
from sklearn.linear_model import LinearRegression
import random
from bson import json_util

app = Flask(__name__)
CORS(app)   


@app.route('/')
def default():
    return 'hello world!'


df = pd.read_csv('Advertising.csv')
df = df.drop(['Unnamed: 0'], axis=1)
x = df.drop(['Sales'], axis=1)
y = df['Sales']
model = LinearRegression()
model.fit(x,y)


@app.route('/prediction-data', methods=['GET'])
def prediction():
    print("url hit")
    a = round(random.uniform(1,300 ), 1)
    b = round(random.uniform(1,75 ), 1)
    c = round(random.uniform(1,100 ), 1)
    now = datetime.datetime.now()
    now_string = now.strftime('%H:%M:%S')
    predicted_value = model.predict([[a,b,c]])

    data = {"value": round((predicted_value[0]),1), "time":now_string, "a": a, "b":b, "c":c}
    return jsonify({'data' : json_util.dumps(data)})


if(__name__) == '__main__':
    app.run()