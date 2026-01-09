from sqlmodel import SQLModel, Field
from typing import Optional
from decimal import Decimal

class Product(SQLModel, table=True):
    __tablename__ = "products"

    id: Optional[int] = Field(default=None, primary_key=True)
    sku: str=Field(index=True, unique=True)
    name: str
    category: str
    description: str
    current_stock: int
    reorder_level: int
    unit_price: Decimal
    bin_location: str

    supplier_id: int = Field(foreign_key="suppliers.id")