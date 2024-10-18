from fastapi import APIRouter
from schemas.user import User
from models.user import User
from sqlalchemy import update, select, insert, delete

user = APIRouter()
