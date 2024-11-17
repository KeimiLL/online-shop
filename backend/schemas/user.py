from pydantic import BaseModel  
import datetime as _dt
from typing import Optional

class _BaseUser(BaseModel):
    first_name: str
    last_name: str
    email: str


class UserResponse(_BaseUser):
    id: int
    date_created: _dt.datetime

    class Config:
        from_attributes = True


class CreateUser(_BaseUser):
    password: str


class UpdateUser(_BaseUser):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None

    class Config:
        from_attributes = True


class UserInDB(UserResponse):
    hashed_password: str

