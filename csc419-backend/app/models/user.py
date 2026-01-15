from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    manager = "manager"
    staff = "staff"

class User(SQLModel, table = True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str
    email: str = Field(index=True, unique=True)
    pass_hash: str
    role: UserRole
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)