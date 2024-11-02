from fastapi import APIRouter, Depends
from typing import TYPE_CHECKING, List
import schemas.user as _userSchemas
import services as _services
from sqlalchemy.orm import Session

if TYPE_CHECKING:
    from sqlalchemy.orm import Session

user = APIRouter()

@user.post("/api/users/", response_model=_userSchemas.User, summary="Create a new user", status_code=201)
async def create_user(
    user: _userSchemas.CreateUser,
    db: Session = Depends(_services.get_db)
):
    return _services.create_user(user=user, db=db)


@user.put("/api/users/{user_id}", response_model=_userSchemas.User, summary="Update an existing user")
async def update_user(
    user_id: int,
    user: _userSchemas.UpdateUser,
    db: Session = Depends(_services.get_db)
):
    return _services.update_user(user_id=user_id, user=user, db=db)


@user.delete("/api/users/{user_id}", response_model=_userSchemas.User, summary="Delete a user by id")
async def delete_user(
    user_id: int,
    db: Session = Depends(_services.get_db)
):
    return _services.delete_user(user_id=user_id, db=db)


@user.get("/api/users/", response_model=List[_userSchemas.User], summary="Get all users")
async def get_all_users(db: Session = Depends(_services.get_db)):
    return _services.get_all_users(db=db)