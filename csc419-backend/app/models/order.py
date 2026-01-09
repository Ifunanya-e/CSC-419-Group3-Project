from sqlmodel import SQLModel, Field
from typing import Optional
from decimal import Decimal
from datetime import datetime
from enum import Enum

class OrderType(str, Enum):
    inbound = "inbound"
    outbound = "outbound"

class OrderStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    cancelled = "cancelled"

class Order(SQLModel, table=True):
    __tablename__ = "orders"

    id: Optional[int] = Field(default=None, primary_key=True)
    type: OrderType
    status: OrderStatus
    total_amount: Decimal

    created_by: int = Field(foreign_key="users.id")
    date_created: Optional[datetime] = Field(default=None)
