from fastapi import APIRouter
from sqlalchemy import select
from schemas.user import User
from models.user import users
from config.db import conn
from sqlalchemy import update, select, insert, delete

user = APIRouter()

def row_to_dict(row):
    """
    Convert a SQLAlchemy row into a dictionary.
    Handles None values.
    """
    return dict(row) if row else None

def rows_to_dict(rows):
    """Converts SQLAlchemy Row objects into a list of dictionaries."""
    return [dict(row._mapping) for row in rows]

@user.get('/')
async def fetch_users():
    """
    Fetches all users from the database.
    
    Returns:
        List of all users in the database.
    """
    result = conn.execute(select(users)).fetchall()
    return rows_to_dict(result)

@user.get('/{id}')
async def fetch_user(id: int):
    """
    Fetches a specific user by their ID.
    
    Args:
        id (int): The unique ID of the user to be fetched.
    
    Returns:
        The user record if found, otherwise None.
    """
    result = conn.execute(select(users).where(users.c.id == id)).first()
    return row_to_dict(result)

@user.post('/')
async def create_user(user: User):
    """
    Creates a new user in the database.
    
    Args:
        user (User): A User schema containing the name, email, and password.
    
    Returns:
        List of all users after the new user is added.
    """
    conn.execute(users.insert().values(
        name=user.name,
        email=user.email,
        password=user.password
    ))
    result = conn.execute(select(users)).fetchall()
    return rows_to_dict(result)

@user.put('/{id}')
async def update_user(id: int, user: User):
    """
    Updates an existing user by their ID.
    
    Args:
        id (int): The unique ID of the user to be updated.
        user (User): A User schema containing the new name, email, and password.
    
    Returns:
        List of all users after the update.
    """
    conn.execute(users.insert().values(
        name=user.name,
        email=user.email,
        password=user.password
    ).where(users.c.id == id))
    return conn.execute(users.select()).fetchall()

@user.delete('/{id}')
async def delete_user(id: int):
    """
    Deletes a user by their ID.
    
    Args:
        id (int): The unique ID of the user to be deleted.
    
    Returns:
        List of all users after the deletion.
    """
    conn.execute(users.delete().where(users.c.id == id))
    return conn.execute(users.select()).fetchall()