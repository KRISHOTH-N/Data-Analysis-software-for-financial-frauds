import pandas as pd

# Load the customer data and transactions data into DataFrames
customer_data = pd.read_csv("customer_table.csv")
transactions_data = pd.read_csv("sorted_transactions.csv")
def find_irregular_transactions(customer_id, deviation_threshold=1.7):
    customer_transactions = transactions_data[transactions_data['Source_Account'] == customer_id]

    if not customer_transactions.empty:
        avg_transaction_amount = customer_transactions['Amount'].mean()

        irregular_transactions = customer_transactions[abs(customer_transactions['Amount'] - avg_transaction_amount) > deviation_threshold * customer_transactions['Amount'].std()]

        # Convert the DataFrame to a dictionary
        irregular_transactions_dict = irregular_transactions.to_dict(orient='records')

        return {'transactions': irregular_transactions_dict}
    else:
        return {'error': f"No transactions found for customer ID {customer_id}."}

        

# # Example usage:
# customer_id_input = 10  # Replace with the desired customer ID
# given_amount_input = 50000000000000000  # Replace with the desired amount

# find_irregular_transactions(customer_id_input, given_amount_input)
