from sqlmodel import SQLModel
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class UserRead(SQLModel):
    id: int
    full_name: str
    email: str
    role: str
    created_at: datetime

class UserCreate(SQLModel):
    full_name: str
    email: str
    password: str
    role: str

class UserUpdate(SQLModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None
    
class UpdatePasswordRequest(BaseModel):
    current_password: str
    new_password: str