from flask import Flask, render_template,jsonify,request
from flask_cors import CORS
import pymysql.cursors
import pandas as pd
import base64
from PIL import Image
import io
from flask import send_file
from collections import defaultdict
import pickle
from twilio.rest import Client
import psycopg2
import schedule
import time
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import csv
import irregularMoneyFlow
import tkinter as tk
from tkinter import messagebox

# Create the main window
root = tk.Tk()
root.withdraw()  # Hide the main window







app = Flask(__name__)
CORS(app, origins='*')

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'rjph_db'
}

connection = pymysql.connect(**db_config)
print("connected")

#------------customer_details--------------------
with connection.cursor() as cursor:
    sql = "SELECT * FROM customer_details"
    cursor.execute(sql)
    results = cursor.fetchall()

customer_detail = [{'Customer_ID': entry[0],
                    'Name': entry[1],
                    'Address': entry[2],
                    'Mobile_Number': entry[3],
                    'Email': entry[4],
                    'Account_Balance': entry[5],
                    'PAN_Number':entry[6],
                    'Aadhaar_Number':entry[7],
                    'Photo' :base64.b64encode(entry[8]).decode('utf-8') if entry[8] else None}for entry in results]
  

# print(customer_detail[7])
#-----------------------------------------------------

#---------------------Transactions------------------------
with connection.cursor() as cursor:
    sql = "SELECT * FROM transactions"
    cursor.execute(sql)
    results = cursor.fetchall()

# print(len(results))

transactions = [{'Customer_ID': entry[0],
                'Transaction_ID': entry[1],
                'Source_Account': entry[2],
                'Destination_Account': entry[3],
                'Amount': entry[4],
                'Date': entry[5],
                'Time':entry[6],
                'Is_Fraudulent':entry[7],
                'Category':entry[8],
                'Type':entry[9],
                'Location':entry[10],
                'OldBalanceOrg':entry[11],
                'NewBalanceOrg':entry[12],
                'OldBalanceDest':entry[13],
                'NewBalanceDest':entry[14]} for entry in results]

# print(transactions[7])

#--------------------------------------------------------------------------------------

#---------------------------Fraud Transactions-----------------------------------------
with connection.cursor() as cursor:
    sql = "SELECT * from fraud_transactions"
    cursor.execute(sql)
    results = cursor.fetchall()

fraud_transactions=[{'Customer_ID': entry[0],
                'Transaction_ID': entry[1],
                'Source_Account': entry[2],
                'Destination_Account': entry[3],
                'Amount': entry[4],
                'Date': entry[5],
                'Time':entry[6],
                'Is_Fraudulent':entry[7],
                'Category':entry[8],
                'Type':entry[9],
                'Location':entry[10],
                'OldBalanceOrg':entry[11],
                'NewBalanceOrg':entry[12],
                'OldBalanceDest':entry[13],
                'NewBalanceDest':entry[14]} for entry in results]

# print(fraud_transactions[7])
#-----------------------------------------------------------------------------------------------

#--------------------Fraud account-----------------------------------------------------------------


with connection.cursor() as cursor:
    sql = "SELECT * FROM fraud_accounts"
    cursor.execute(sql)
    results = cursor.fetchall()
fraud_accounts_data= [{'Customer_ID': entry[0],
                    'Name': entry[1],
                    'Address': entry[2],
                    'Mobile_Number': entry[3],
                    'Email': entry[4],
                    'Account_Balance': entry[5],
                    'PAN_Number':entry[6],
                    'Aadhaar_Number':entry[7],
                    'Photo' :base64.b64encode(entry[8]).decode('utf-8') if entry[8] else None}for entry in results]

#------------------------------------------------------------------------------------------------------
@app.route('/api/customer-details')
def customer_details():
    return jsonify(customer_detail)

@app.route('/api/transactions')
def transactions1():
    limited_transactions = transactions[:200]
    return jsonify(limited_transactions)

@app.route('/api/frauds')
def frauds():
    limited_fraud=fraud_transactions[:200]
    return jsonify(limited_fraud)

@app.route('/api/confirmedFraudAccounts')
def fraud_accounts():
    global fraud_accounts_data
    # limited_fraud_accounts=fraud_accounts[:200]
    return jsonify(fraud_accounts_data)
#-----------------------------Dashboard-------------------------------------------------------------
@app.route('/api/dashboard')
def dashboard():
    # Calculate the average amount of fraudulent transactions
    total_fraudulent_amount = sum(entry['Amount'] for entry in fraud_transactions)
    num_fraudulent_transactions = len(fraud_transactions)
    average_fraudulent_amount = total_fraudulent_amount / num_fraudulent_transactions if num_fraudulent_transactions > 0 else 0

    # Calculate the total amount lost due to fraud
    total_amount_lost_due_to_fraud = sum(entry['Amount'] for entry in fraud_transactions)

    # Get the number of customers affected
    num_customers_affected = len(set(entry['Customer_ID'] for entry in fraud_transactions))
    
    # Create a response JSON
    dashboard_data = {
        'average_fraudulent_amount': average_fraudulent_amount,
        'total_amount_lost_due_to_fraud': total_amount_lost_due_to_fraud,
        'num_customers_affected': num_customers_affected,
        'num_fraudulent_transactions': num_fraudulent_transactions,
        'fraudulent_transactions': fraud_transactions,
        'transactions':transactions[:200]
    }

    return jsonify(dashboard_data)
#---------------------------------------------------------------------------------





#---------------------Confirm Fraud--------------------------
    




# Endpoint to receive customer ID and insert it at the front of the fraud list
@app.route("/api/confirmFraud", methods=["POST"])
def confirm_fraud():
     data = request.get_json()
     global customer_detail
     fraud_id = data.get('customer_id')
     for i in customer_detail:
         if int(i['Customer_ID'])== int(fraud_id):
             fraud_accounts_data.insert(0,i)
            #  print(i)
         
    #  print(fraud_id)
    #  print(type(fraud_id))

    #  print(fraud_id)
     return "success"
    





#---------------------------------------------------------------




@app.route('/api/barchart')
def charts():
    # Group fraud transactions by month and type
    frauds_by_month_and_type = defaultdict(lambda: defaultdict(int))

    for fraud in fraud_transactions:
        date_parts = fraud['Date'].split('-')
        month = int(date_parts[0])
        transaction_type = fraud['Type']
        frauds_by_month_and_type[month][transaction_type] += 1

    # Prepare data for the response
    chart_data = [
        {
            'month': month,
            'frauds': [
                {'type': transaction_type, 'count': count}
                for transaction_type, count in types.items()
            ]
        }
        for month, types in frauds_by_month_and_type.items()
    ]

    return jsonify(chart_data)


@app.route('/api/line-chart')
def get_line_chart_data():
    global fraud_transactions

    # Define color mappings for Rajasthan cities
    color_mappings = {
    "Jaipur": "#FF5733",    # Orange Red
    "Jodhpur": "#33A02C",   # Forest Green
    "Udaipur": "#FFD700",   # Gold
    "Ajmer": "#8B0000",     # Dark Red
    "Kota": "#8A2BE2",      # Blue Violet
    "Bikaner": "#00CED1",   # Dark Turquoise
    "Alwar": "#32CD32",     # Lime Green
    "Sikar": "#FF6347",     # Tomato
    "Jaisalmer": "#9932CC",  # Dark Orchid
    "Other": "#808080",     # Gray
    # Add more cities and colors as needed
    }


    # Structure data for export
    fraud_count_by_city = defaultdict(lambda: defaultdict(int))
    
    for entry in fraud_transactions:
        city = entry['Location']
        month = int(entry['Date'].split('-')[1])
        fraud_count_by_city[city][month] += 1

    export_data = []
    for city, monthly_counts in fraud_count_by_city.items():
        data = [
            {"x": "JAN", "y": monthly_counts.get(1, 0)},
            {"x": "FEB", "y": monthly_counts.get(2, 0)},
            {"x": "MARCH", "y": monthly_counts.get(3, 0)},
            {"x": "APRIL", "y": monthly_counts.get(4, 0)},
            {"x": "MAY", "y": monthly_counts.get(5, 0)},
            {"x": "JUNE", "y": monthly_counts.get(6, 0)},
            {"x": "JULY", "y": monthly_counts.get(7, 0)},
            {"x": "AUGUST", "y": monthly_counts.get(8, 0)},
            {"x": "SEPTEMBER", "y": monthly_counts.get(9, 0)},
            {"x": "OCTOBER", "y": monthly_counts.get(10, 0)},
            {"x": "NOVEMBER", "y": monthly_counts.get(11, 0)},
            {"x": "DECEMBER", "y": monthly_counts.get(12, 0)}
        ]

        export_data.append({
            "id": city,
            "color": color_mappings.get(city, "#808080"),
            "data": data
              # Default to gray if color is not defined
        })

    return jsonify(export_data)

@app.route('/api/customers/<int:customer_id>')
def get_customer_details_by_id(customer_id):
    try:
        app.logger.info(f"Fetching details for customer ID: {customer_id}")

        with connection.cursor() as cursor:
            sql = "SELECT * FROM customer_details WHERE Customer_ID = %s"
            cursor.execute(sql, (customer_id,))
            result = cursor.fetchone()

        if result is None:
            app.logger.warning(f"Customer ID {customer_id} not found")
            return jsonify(error='Customer not found'), 404

        customer_data = {
            'Customer_ID': result[0],
            'Name': result[1],
            'Address': result[2],
            'Mobile_Number': result[3],
            'Email': result[4],
            'Account_Balance': result[5],
            'Photo' :base64.b64encode(result[8]).decode('utf-8') 
        }

        app.logger.info(f"Customer details fetched successfully: {customer_data}")

        return jsonify({"customer": customer_data})
    except Exception as e:
        # Log the exception for debugging purposes
        app.logger.error(f"Error fetching customer details: {e}")
        return jsonify(error='Internal Server Error'), 500
    
@app.route('/api/customer/photo/<int:customer_id>')
def get_customer_photo(customer_id):
    try:
        with connection.cursor() as cursor:
            sql = "SELECT Photo FROM customer_details WHERE Customer_ID = %s"
            cursor.execute(sql, (customer_id,))
            result = cursor.fetchone()

        if result and len(result) > 0:
            # Find the index of 'Photo' in your tuple
            column_names = [column[0] for column in cursor.description]
            photo_index = column_names.index('Photo')

            # Use the index to access the 'Photo' element
            photo_data = result[photo_index]

            try:
                # Convert binary data to image
                image = Image.open(io.BytesIO(photo_data))

                # Save the image to a BytesIO object
                img_io = io.BytesIO()
                image.save(img_io, 'JPEG')
                img_io.seek(0)

                return send_file(img_io, mimetype='image/jpeg')

            except Exception as e:
                app.logger.error(f"Error converting binary data to image: {e}")
                return jsonify(error=f"Error converting binary data to image: {e}"), 500

        else:
            app.logger.warning(f"Photo not found for customer ID: {customer_id}")
            return jsonify(error='Photo not found'), 404

    except Exception as e:
        app.logger.error(f"Error fetching customer photo: {e}")
        return jsonify(error=f"Error fetching customer photo: {e}"), 500


@app.route('/api/customer/<int:customer_id>/money_flow')
def get_money_flow(customer_id):
    try:
        with connection.cursor() as cursor:
            # Fetch all transactions for the specified customer
            sql = "SELECT * FROM transactions WHERE Customer_ID = %s OR Destination_Account = %s"
            cursor.execute(sql, (customer_id, customer_id))
            results = cursor.fetchall()

            # Convert results to a list of dictionaries
            transactions = [{
                'Customer_ID': entry[0],
                'Transaction_ID': entry[1],
                'Source_Account': entry[2],
                'Destination_Account': entry[3],
                'Amount': entry[4],
                'Date': entry[5],
                'Time': entry[6],
                'Is_Fraudulent': entry[7],
                'Category': entry[8],
                'Type': entry[9],
                'Location': entry[10],
                'OldBalanceOrg': entry[11],
                'NewBalanceOrg': entry[12]
                # Include other transaction details as needed
            } for entry in results]

            # Calculate the count of each type of transaction
            transaction_types_count = {}
            for entry in results:
                transaction_type = entry[9]  # Assuming 'Type' is at index 9 in the tuple
                if transaction_type in transaction_types_count:
                    transaction_types_count[transaction_type] += 1
                else:
                    transaction_types_count[transaction_type] = 1

            # Return the transaction data and transaction type counts as JSON
            return jsonify({'transactions': transactions, 'transaction_types_count': transaction_types_count})

    except Exception as e:
        app.logger.error(f"Error fetching money flow data: {e}")
        return jsonify(error=f"Error fetching money flow data: {e}"), 500





# new_data = pd.read_csv('newdata.csv').to_dict('records')

# # Append the new data to the existing lists
# customer_detail.extend(new_data)


#------------------KYC-------------------------------
@app.route('/api/kyc', methods=['GET'])
def get_all_kyc_accounts():
    with connection.cursor() as cursor:
        query_aadhar = "SELECT * FROM customer_details WHERE Aadhaar_Number IS NULL OR Aadhaar_Number = ''"
        empty_aadhar_accounts = fetch_accounts(query_aadhar, cursor, prefix='aadhar')

        query_pan = "SELECT * FROM customer_details WHERE PAN_Number IS NULL OR PAN_Number = ''"
        empty_pan_accounts = fetch_accounts(query_pan, cursor, prefix='pan')

        query_same_mobile = """
        SELECT * 
        FROM customer_details
        WHERE Mobile_Number IN (
            SELECT Mobile_Number 
            FROM customer_details 
            GROUP BY Mobile_Number 
            HAVING COUNT(*) > 1
        )
        """
        same_mobile_number_accounts = fetch_accounts(query_same_mobile, cursor, prefix='mobile')

        all_kyc_accounts = {
            'empty_aadhar_accounts': empty_aadhar_accounts,
            'empty_pan_accounts': empty_pan_accounts,
            'same_mobile_number_accounts': same_mobile_number_accounts
        }

        return jsonify(all_kyc_accounts)

def fetch_accounts(query, cursor, prefix=''):
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        accounts = [{
            'id': f'{prefix}_{entry[0]}',  # Unique ID for each row
            'Customer_ID': entry[0],
            'Name': entry[1],
            'Address': entry[2],
            'Mobile_Number': entry[3],
            'Email': entry[4],
            'Account_Balance': entry[5],
            'PAN_Number': entry[6],
            'Aadhaar_Number': entry[7],
            'Photo': base64.b64encode(entry[8]).decode('utf-8') if entry[8] else None
        } for entry in result]
        print("ok" + query)
        return accounts
    except Exception as e:
        print(f"Error fetching accounts: {e}")
        return []

#-----------------------------------------------------------------

#---------------------ALERT MESSAGE--------------------------------

@app.route('/api/alert', methods=['GET'])
def alert():
    # account_sid = 'ACf1f0c0870c825a03dc6db124b365cf6a'
    # auth_token = '25dcf589704383954b7ea8fb7843fb40'
    # client = Client(account_sid, auth_token)
    # message = client.messages.create(
    # from_='+12058500961',
    # body='Hi there from viswa key',
    # to='+917358707649'
    # )
    # print(message.sid)



    account_sid = 'AC876c8648c5b65e7bbe5a939ec48e066c'
    auth_token = '66a6121fd82014c2bd8c4b2e08837e3e'
    client = Client(account_sid, auth_token)
    
    message = client.messages.create(
      from_='+15035361075',
      body='Alert Message from Rajasthan Police',
      to='+917358707649'
    )

    
    print(message.sid)
    return jsonify({'success': True})
    
    
#----------------------------------------------------    







#--------------ML Model Prediction-------------------------------------

# CSV file path
csv_file_path = 'test_data.csv'


with open(csv_file_path, 'r') as file:
        csv_reader = csv.DictReader(file)
        rows = list(csv_reader)


# Load the pre-trained model
model_path = 'fraud_detection_model.pkl'
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

# Simulated data and prediction result
simulated_data = {'row': {}, 'prediction': None}
current_row_index = 0

# Background scheduler to update data
scheduler = BackgroundScheduler()

def read_next_row_and_predict():
        global current_row_index
        global transactions
        if current_row_index < len(rows):
            simulated_data['row'] = rows[current_row_index]
            # Get the current date and time
            current_datetime = datetime.now()
            # Extract date and time separately
            current_date = current_datetime.date()
            current_time = current_datetime.time()
            

            
                


            # Map "type" column
            simulated_data['row']['type'] = {
                "CASH_OUT": 1,
                "TRANSFER": 2,
                "CASH_IN": 3,
                "DEBIT": 4,
                "PAYMENT": 5
            }[simulated_data['row']['type']]

            # Map "isFraud" column
            simulated_data['row']['isFraud'] = {
                0: "No Fraud",
                1: "Fraud"
            }[int(simulated_data['row']['isFraud'])]

            # Extract attributes for prediction
            attributes_for_prediction = [
                simulated_data['row']['type'],
                float(simulated_data['row']['amount']),
                float(simulated_data['row']['oldbalanceOrg']),
                float(simulated_data['row']['newbalanceOrig']),
                float(simulated_data['row']['oldbalanceDest']),
                float(simulated_data['row']['newbalanceDest'])
                
            ]

            # Make prediction using the model
            prediction = model.predict([attributes_for_prediction])
            simulated_data['prediction'] = prediction[0]


            # RE Map "type" column
            simulated_data['row']['type'] = {
                1: "CASH_OUT",
                2: "TRANSFER",
                3: "CASH_IN",
                4: "DEBIT",
                5: "PAYMENT"
            }[simulated_data['row']['type']]
    
            new_entry = {
                     'Customer_ID': simulated_data['row']['source_acc'],
                     'Transaction_ID': current_row_index,
                     'Source_Account': simulated_data['row']['source_acc'],
                     'Destination_Account': simulated_data['row']['dest_acc'],
                     'Amount': float(simulated_data['row']['amount']),
                     'Date': str(current_date),
                     'Time': str(current_time),
                     'Is_Fraudulent':  "True" if prediction[0] == "Fraud" else "False",
                     'Category': simulated_data['row']['category'],
                     'Type': simulated_data['row']['type'],
                     'Location': simulated_data['row']['location'],
                     'OldBalanceOrg':simulated_data['row']['oldbalanceOrg'],
                     'NewBalanceOrg': simulated_data['row']['newbalanceOrig'],
                     'OldBalanceDest': simulated_data['row']['oldbalanceDest'],
                     'NewBalanceDest': simulated_data['row']['newbalanceDest']
                     
                 }
                 
            # Insert the new entry at the beginning of the list
            transactions.insert(0, new_entry)
            global fraud_transactions
            if prediction[0]=="Fraud":
                
                fraud_transactions.insert(0,new_entry)
            
            # Display a simple alert message
            for entry in fraud_accounts_data:
                if entry['Customer_ID'] == new_entry['Destination_Account']:
                   
                     messagebox.showinfo("Alert", "Destination account is fraud!")


            current_row_index += 1
        else:
            current_row_index = 0  # Start over if reached the end of the file
 # Start over if reached the end of the file

# Set up the scheduler to read the next row and predict every second
scheduler.add_job(read_next_row_and_predict, trigger='interval', seconds=2)
scheduler.start()

# Route to get the current row and prediction
@app.route('/api/predict', methods=['GET'])
def get_prediction():
    return jsonify(simulated_data)
#----------------------------------------------------------------------------




#--------------irregular transactions--------------------------

@app.route('/api/find-irregular-transactions', methods=['POST'])
def handle_find_irregular_transactions():
    data = request.get_json()

    customer_id = data.get('customer_id')
    deviation_threshold = data.get('deviation_threshold', 1.7)

    result = irregularMoneyFlow.find_irregular_transactions(customer_id, deviation_threshold)

    return jsonify(result)
#---------------------------------------------------------------------------




    






# Start the GUI event loop


if __name__ == '__main__':
    app.run(debug=True,port=5001)
    root.mainloop()
