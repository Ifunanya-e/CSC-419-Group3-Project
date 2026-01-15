from sqlmodel import SQLModel
from decimal import Decimal
from typing import Optional

class ProductCreate(SQLModel):
    sku: str
    name: str
    category: str
    description: Optional[str] = None
    current_stock: int
    reorder_level: int
    unit_price: Decimal
    bin_location: str
    supplier_id: int

class ProductRead(SQLModel):
    id: int
    sku: str
    name: str
    category: str
    description: Optional[str]
    current_stock: int
    reorder_level: int
    unit_price: Decimal
    bin_location: str
    supplier_id: int

class ProductUpdate(SQLModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    current_stock: Optional[int] = None
    reorder_level: Optional[int] = None
    unit_price: Optional[Decimal] = None
    bin_location: Optional[str] = None
    supplier_id: Optional[int] = None