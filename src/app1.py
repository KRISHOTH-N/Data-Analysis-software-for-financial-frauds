import os
from sqlalchemy import create_engine, Column, Integer, String, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from PIL import Image
from sqlalchemy.orm import declarative_base

Base = declarative_base()

# Replace these values with your actual MySQL connection details
DATABASE_URL = "mysql+mysqlconnector://root:root@localhost:3306/rjph_db"


# Create an SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Define the ORM model
Base = declarative_base()


# Define the ORM model
class Customer(Base):
    __tablename__ = 'fraud_accounts'
    Customer_ID = Column(Integer, primary_key=True)
    Name = Column(String)
    Address = Column(String)
    Mobile_Number = Column(String)
    Email = Column(String)
    Account_Balance = Column(Integer)
    PAN_Number = Column(String)
    Aadhaar_Number = Column(String)
    Photo = Column(LargeBinary)
# Create the new column 'photo' in the 'customer_details' table
Base.metadata.create_all(engine)

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Path to the folder containing images
images_folder_path = "images for hack"

# Iterate through the image files in the folder
for filename in os.listdir(images_folder_path):
    if filename.endswith(".jpg"):
        # Extract Customer_ID from the filename
        customer_id = int(os.path.splitext(filename)[0])

        # Get the corresponding customer record
        customer = session.query(Customer).filter_by(Customer_ID=customer_id).first()

        # If the customer exists, update the 'photo' column
        if customer:
            # Get the full path to the image file
            image_path = os.path.join(images_folder_path, filename)

            # Open and read the image file as binary data
            with open(image_path, 'rb') as image_file:
                photo_data = image_file.read()

            # Update the 'photo' column
            customer.Photo = photo_data

# Commit the changes to the database
session.commit()

# Close the session
session.close()


