from typing import TYPE_CHECKING, List
import config.db as _db
import models.user as _userModels
import schemas.user as _userSchemas
from fastapi import HTTPException, status
import core.jwt_utils as jwtUtils

if TYPE_CHECKING:
    # Import SQLAlchemy Session for type checking
    from sqlalchemy.orm import Session


def _add_tables():
    """
    Creates all database tables based on the models defined.
    
    Returns:
        None
    """
    return _db.Base.metadata.create_all(bind=_db.engine)


def get_db():
    """
    Dependency function to provide a database session.
    
    Yields:
        db (Session): The database session object.
    """
    db = _db.SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_user(
        user: _userSchemas.CreateUser, db: "Session"
) -> _userSchemas.UserResponse:    
    """
    Creates a new user in the database.
    
    Args:
        user (_userSchemas.CreateUser): The schema for creating a new user.
        db (Session): The database session object.

    Returns:
        _userSchemas.User: The newly created user object.
    """
     # Check if user with the same email already exists
    db_user = db.query(_userModels.User).filter(_userModels.User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash the password before saving
    hashed_password = jwtUtils.get_password_hash(user.password)
    new_user_data = user.dict()
    new_user_data["hashed_password"] = hashed_password  # Store hashed password
    del new_user_data["password"]  # Remove plain password from data

    # Create the user instance
    new_user = _userModels.User(**new_user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return _userSchemas.UserResponse.from_orm(new_user)


def update_user(user_id: int, user: _userSchemas.UpdateUser, db: "Session") -> _userSchemas.UserResponse:
    """
    Updates an existing user by their user_id.

    Args:
        user_id (int): The ID of the user to be updated.
        user (_userSchemas.UpdateUser): The schema for updating user data, passed from the API request.
        db (Session): The database session object.

    Returns:
        _userSchemas.User: The updated user object.

    Raises:
        HTTPException: If the user is not found in the database, raises a 404 HTTP exception.
    """
    # Fetch the user from the database
    db_user = db.query(_userModels.User).filter(_userModels.User.id == user_id).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if user.first_name:
        db_user.first_name = user.first_name
    if user.last_name:
        db_user.last_name = user.last_name
    if user.email:
        db_user.email = user.email

    db.commit()
    db.refresh(db_user)

    return db_user


def delete_user(user_id: int, db: "Session") -> _userSchemas.UserResponse:
    """
    Deletes a user from the database by their user_id.

    Args:
        user_id (int): The ID of the user to be deleted.
        db (Session): The database session object.

    Returns:
        _userSchemas.User: The deleted user object for confirmation.

    Raises:
        HTTPException: If the user is not found in the database, raises a 404 HTTP exception.
    """
    # Fetch the user from the database
    db_user = db.query(_userModels.User).filter(_userModels.User.id == user_id).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    db.delete(db_user)
    db.commit()

    return db_user


def get_all_users(db: "Session") -> List[_userModels.User]:
    """
    Gets all users from the database.

    Args:
        db (Session): The database session object.

    Returns:
        List[_userModels.User]: A list of all users in the database.
    """
    return db.query(_userModels.User).all()


def get_user(user_id: int, db: "Session") -> _userSchemas.UserResponse:
    user = db.query(_userModels.User).filter(_userModels.User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user