from sqlmodel import SQLModel
from datetime import datetime

class UserRead(SQLModel):
    id: int
    full_name: str
    email: str
    role: str
    created_at: datetime

