# simulation.py

import random
from datetime import datetime
import os

# Initialize transaction_id_counter
transaction_id_counter = 0

def get_last_transaction_id():
    # Check if the file exists
    if os.path.exists("last_transaction_id.txt"):
        with open("last_transaction_id.txt", "r") as file:
            last_transaction_id = int(file.read().strip())
    else:
        last_transaction_id = 0
    return last_transaction_id


def update_last_transaction_id(new_transaction_id):
    with open("last_transaction_id.txt", "w") as file:
        file.write(str(new_transaction_id))

def generate_random_transaction():
    global transaction_id_counter

    # Load the last used transaction_id
    last_transaction_id = get_last_transaction_id()

    # Ensure transaction_id is unique
    transaction_id_counter = max(transaction_id_counter, last_transaction_id) + 1

    categories = ['Grocery', 'Electronics', 'Clothing', 'Entertainment', 'Other', 'Trading']
    transaction_types = ["transfer", "debit", "cash In", "cash out", "payment"]
    Rajasthan_cities = ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer', 'Kota', 'Bikaner', 'Alwar', 'Sikar', 'Jaisalmer', 'Other']

    customer_id = random.randint(1, 100)
    source_account = random.randint(1, 100)
    destination_account = random.randint(1, 100)
    while source_account == destination_account:
        destination_account = random.randint(1, 100)

    amount = round(random.uniform(1, 1000), 2)
    current_datetime = datetime.now()
    date_str = current_datetime.strftime('%Y-%m-%d')
    time_str = current_datetime.strftime('%H:%M:%S.%f')[:-3]
    category = random.choice(categories)
    transaction_type = random.choice(transaction_types)
    location = random.choice(Rajasthan_cities)

    # Calculate old balance and new balance
    old_balance = round(random.uniform(5000, 10000), 2)
    new_balance = old_balance - amount if transaction_type in ["debit", "cash out"] else old_balance + amount

    # Update last used transaction_id
    update_last_transaction_id(transaction_id_counter)

    # Return the generated transaction data
    return {
        'transaction_id': transaction_id_counter,
        'customer_id': customer_id,
        'source_account': source_account,
        'destination_account': destination_account,
        'amount': amount,
        'date_str': date_str,
        'time_str': time_str,
        'category': category,
        'transaction_type': transaction_type,
        'location': location,
        'old_balance': old_balance,
        'new_balance': new_balance
    }
