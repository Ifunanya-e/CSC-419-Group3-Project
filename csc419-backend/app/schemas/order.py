from sqlmodel import SQLModel
from datetime import datetime
from enum import Enum
from typing import Optional

class OrderType(str, Enum):
    inbound = "inbound"
    outbound = "outbound"

class OrderStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    cancelled = "cancelled"

class OrderCreate(SQLModel):
    type: OrderType
    created_by: int
    total_amount: float
    

class OrderRead(SQLModel):
    id: int
    type: OrderType
    status: OrderStatus
    created_by: int
    total_amount: float
    date_created: datetime

class OrderUpdate(SQLModel):
    type: Optional[OrderType] = None
    status: Optional[OrderStatus] = None    
    