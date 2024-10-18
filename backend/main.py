from fastapi import FastAPI, Depends
from routes.user import user
from typing import TYPE_CHECKING, List
import schemas.user as _userSchemas
import services as _services
from sqlalchemy.orm import Session

if TYPE_CHECKING:
    from sqlalchemy.orm import Session

app = FastAPI()

# app.include_router(user)
@app.post("/api/users/", response_model=_userSchemas.User)
async def create_user(
    user: _userSchemas.CreateUser,
    db: Session = Depends(_services.get_db)
):
    return _services.create_user(user=user, db=db)
