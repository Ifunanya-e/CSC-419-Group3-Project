from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.core.database import get_session
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderRead, OrderStatus, OrderUpdate
from app.dependencies.auth import require_admin_or_manager, require_admin

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)

@router.get("/", response_model=list[OrderRead])
def get_orders(
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    return session.exec(select(Order)).all()

@router.post("/", response_model=OrderRead, status_code=201)
def create_order(
    order_in: OrderCreate,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    db_order = Order(
        **order_in.model_dump(),
        status=OrderStatus.pending
    )
    session.add(db_order)
    session.commit()
    session.refresh(db_order)
    return db_order

@router.get("/{order_id}", response_model=OrderRead)
def get_order(
    order_id: int,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.patch("/{order_id}", response_model=OrderRead)
def update_order(
    id: int,
    order_in: OrderUpdate,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    order = session.get(Order, id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order_data = order_in.model_dump(exclude_unset=True)
    for key, value in order_data.items():
        setattr(order, key, value)
    
    session.add(order)
    session.commit()
    session.refresh(order)
    return order

@router.delete("/{order_id}", status_code=204)
def delete_order(
    id: int,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    order = session.get(Order, id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    session.delete(order)
    session.commit()
    