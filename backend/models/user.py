from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

users = Table('users', meta,
Column('id', Integer, primary_key=True),
Column('name', String(255)),
Column('email', String(255)),
Column('password', String(255))
)

# Used to create database tables that are defined in the MetaData object (meta) by issuing the appropriate SQL commands to the database
meta.create_all(engine)