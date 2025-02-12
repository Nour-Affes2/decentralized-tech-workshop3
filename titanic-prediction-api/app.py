from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Charger le modèle
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route('/predict', methods=['GET'])
def predict():
    # Récupération des paramètres de la requête
    pclass = request.args.get("Pclass", type=int)
    age = request.args.get("Age", type=float)
    fare = request.args.get("Fare", type=float)
    
    # Création du dataframe pour la prédiction
    input_data = pd.DataFrame([[pclass, age, fare]], columns=['Pclass', 'Age', 'Fare'])
    
    # Prédiction
    prediction = model.predict(input_data)[0]
    return jsonify({"prediction": int(prediction)})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
