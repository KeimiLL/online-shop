from pydantic import BaseModel  
import datetime as _dt

class _BaseUser(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: str


class User(_BaseUser):
    id: int
    date_created: _dt.datetime

    class Config:
        from_attributes = True


class CreateUser(_BaseUser):
    pass