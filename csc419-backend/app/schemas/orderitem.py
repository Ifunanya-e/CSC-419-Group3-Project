from sqlmodel import SQLModel
from decimal import Decimal
from typing import Optional

class OrderItemCreate(SQLModel):
    quantity: int
    price_at_transaction: Decimal
    order_id: int
    product_id: int

class OrderItemRead(SQLModel):
    id: int
    quantity: int
    price_at_transaction: Decimal
    order_id: int
    product_id: int

class OrderItemUpdate(SQLModel):
    quantity: Optional[int] = None
    price_at_transaction: Optional[Decimal] = None


