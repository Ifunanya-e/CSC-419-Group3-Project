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