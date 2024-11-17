from fastapi import APIRouter, Depends
from typing import TYPE_CHECKING, List, Annotated
import schemas.user as _userSchemas
import services as _services
from sqlalchemy.orm import Session
import datetime
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
import core.jwt_utils as jwtUtils


if TYPE_CHECKING:
    from sqlalchemy.orm import Session

user = APIRouter()


@user.get("/api/users/{user_id}", response_model=_userSchemas.UserResponse, summary="Get a user by id")
async def get_user(db, username: str):
    return _services.get_user(db=db, username=username)
    

@user.post("/api/users/", response_model=_userSchemas.UserResponse, summary="Create a new user", status_code=201)
async def create_user(
    user: _userSchemas.CreateUser,
    db: Session = Depends(_services.get_db)
):
    return _services.create_user(user=user, db=db)


@user.put("/api/users/{user_id}", response_model=_userSchemas.UserResponse, summary="Update an existing user")
async def update_user(
    user_id: int,
    user: _userSchemas.UpdateUser,
    db: Session = Depends(_services.get_db)
):
    return _services.update_user(user_id=user_id, user=user, db=db)


@user.delete("/api/users/{user_id}", response_model=_userSchemas.UserResponse, summary="Delete a user by id")
async def delete_user(
    user_id: int,
    db: Session = Depends(_services.get_db)
):
    return _services.delete_user(user_id=user_id, db=db)


@user.get("/api/users/", response_model=List[_userSchemas.UserResponse], summary="Get all users")
async def get_all_users(db: Session = Depends(_services.get_db)):
    return _services.get_all_users(db=db)


@user.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(_services.get_db)
) -> jwtUtils.Token:
    user = jwtUtils.authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = datetime.timedelta(minutes=jwtUtils.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = jwtUtils.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return jwtUtils.Token(access_token=access_token, token_type="bearer")
