from sqlalchemy import Column, Integer, String, TIMESTAMP, text

import config.db as _db

class User(_db.Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False, index=True)
    last_name = Column(String, nullable=False, index=True)
    email = Column(String, nullable=False, index=True, unique=True)
    phone_number = Column(String, nullable=False, index=True, unique=True)
    date_created = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False) 