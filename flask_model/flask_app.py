from flask import Flask, request
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import pickle
import sklearn
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

model_1 = pickle.load(open('model_1.pkl', 'rb'))



@app.post("/get-area-stats")
@cross_origin()
def areaStatsHandler():
    coordinatesData = request.get_json()
    print('cordinates data is ', coordinatesData)
    prediction = model_1.predict([[coordinatesData['ndvi'], coordinatesData['evi'], coordinatesData['nri'], coordinatesData['dswi']]])
    print('return data',prediction)
    return {"status" : "true", "data" : prediction[0]}


if __name__=="__main__":
    app.run(debug=True)