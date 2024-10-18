from typing import TYPE_CHECKING
import config.db as _db
import models.user as _userModels
import schemas.user as _userSchemas

if TYPE_CHECKING:
    from sqlalchemy.orm import Session

def _add_tables():
    return _db.Base.metadata.create_all(bind=_db.engine)


def get_db():
    db = _db.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_user(
        user: _userSchemas.CreateUser, db: "Session"
) -> _userSchemas.User:    
    new_user = _userModels.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user