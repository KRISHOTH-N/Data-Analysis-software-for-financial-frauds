import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import OneClassSVM
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import pickle

# Load the CSV file
df = pd.read_csv('transactions.csv')

# Extract features and target variable
X = df[['Transaction_ID', 'Source_Account', 'Destination_Account', 'Amount']]
y = df['Is_Fraudulent']

# Encode 'Type' column using one-hot encoding
X_encoded = pd.get_dummies(df['Type'], prefix='Type', drop_first=True)
X = pd.concat([X, X_encoded], axis=1)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Isolation Forest Model
fraud_detection_isoforest = IsolationForest(contamination=0.05, random_state=42)
fraud_detection_isoforest.fit(X_train)
y_pred_isoforest = fraud_detection_isoforest.predict(X_test)

# Random Forest Model
fraud_detection_random_forest = RandomForestClassifier(random_state=42)
fraud_detection_random_forest.fit(X_train, y_train)
y_pred_random_forest = fraud_detection_random_forest.predict(X_test)

# Decision Tree Model
fraud_detection_decision_tree = DecisionTreeClassifier(random_state=42)
fraud_detection_decision_tree.fit(X_train, y_train)
y_pred_decision_tree = fraud_detection_decision_tree.predict(X_test)

# One-Class SVM Model
fraud_detection_svm = OneClassSVM()
fraud_detection_svm.fit(X_train)
y_pred_svm = fraud_detection_svm.predict(X_test)

# Evaluate the models
models = {
    'Isolation Forest': y_pred_isoforest,
    'Random Forest': y_pred_random_forest,
    'Decision Tree': y_pred_decision_tree,
    'One-Class SVM': y_pred_svm
}

for model_name, y_pred in models.items():
    accuracy = accuracy_score(y_test, y_pred)
    confusion = confusion_matrix(y_test, y_pred)
    report = classification_report(y_test, y_pred)

    print(f"{model_name} Model:")
    print(f"Accuracy: {accuracy:.2f}")
    print(f"Confusion Matrix:\n{confusion}")
    print(f"Classification Report:\n{report}")
    print()




# Save the models
with open('fraud_detection_isoforest_model.pkl', 'wb') as model_file:
    pickle.dump(fraud_detection_isoforest, model_file)

with open('fraud_detection_random_forest_model.pkl', 'wb') as model_file:
    pickle.dump(fraud_detection_random_forest, model_file)

with open('fraud_detection_decision_tree_model.pkl', 'wb') as model_file:
    pickle.dump(fraud_detection_decision_tree, model_file)

with open('fraud_detection_svm_model.pkl', 'wb') as model_file:
    pickle.dump(fraud_detection_svm, model_file)
