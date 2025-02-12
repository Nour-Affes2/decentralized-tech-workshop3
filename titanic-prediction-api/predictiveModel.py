import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Charger les données
df = pd.read_csv("https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv")

# Pré-traitement
df = df.dropna()
X = df[['Pclass', 'Age', 'Fare']]
y = df['Survived']

# Encodage et séparation des données
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Sauvegarde du modèle
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)