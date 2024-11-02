from pydantic import BaseModel  
import datetime as _dt
from typing import Optional

class _BaseUser(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: str
    password: str


class User(_BaseUser):
    id: int
    date_created: _dt.datetime

    class Config:
        from_attributes = True


class CreateUser(_BaseUser):
    pass


class UpdateUser(_BaseUser):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    password: Optional[str] = None

    class Config:
        from_attributes = True