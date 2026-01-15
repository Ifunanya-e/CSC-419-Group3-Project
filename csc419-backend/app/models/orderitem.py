from sqlmodel import SQLModel, Field
from typing import Optional
from decimal import Decimal

class OrderItem(SQLModel, table=True):
    __tablename__ = "order_items"

    id: Optional[int] = Field(default=None, primary_key=True)
    quantity: int
    price_at_transaction: Decimal

    order_id: int = Field(foreign_key="orders.id", ondelete="CASCADE")
    product_id: int = Field(foreign_key="products.id", ondelete="CASCADE")