from typing import Optional
from sqlmodel import SQLModel

class SupplierRead(SQLModel):
    id: int
    company_name: str
    contact_email: str
    phone_number: str
    address: str

class SupplierCreate(SQLModel):
    company_name: str
    contact_email: str
    phone_number: str
    address: str

class SupplierUpdate(SQLModel):
    company_name: Optional[str] = None
    contact_email: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    