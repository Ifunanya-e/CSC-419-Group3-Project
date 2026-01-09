from sqlmodel import SQLModel, Field
from typing import Optional

class Supplier(SQLModel, table=True):
    __tablename__ = "suppliers"

    id: Optional[int] = Field(default=None, primary_key=True)
    company_name: str
    contact_email: str
    phone_number: str
    address: str