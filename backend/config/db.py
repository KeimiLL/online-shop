from sqlalchemy import create_engine, MetaData
import os
# Initializes the database engine
engine = create_engine("mysql+pymysql://root:Zaq12wsx@localhost:3306/online_shop")
# Creates a MetaData object to store information about the database schema (tables, columns, ...)
meta = MetaData() 
# Establishes a connection to the database using the engine. The `conn` object is used for executing SQL queries.
conn = engine.connect() 