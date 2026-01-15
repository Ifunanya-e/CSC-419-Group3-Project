from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.core.database import get_session
from app.models.orderitem import OrderItem
from app.schemas.orderitem import OrderItemCreate, OrderItemRead
from app.services.orderitems import calc_order_total
from app.dependencies.auth import require_admin_or_manager, require_admin

router = APIRouter(
    prefix="/orderitems",
    tags=["orderitems"]
)

@router.get("/", response_model=list[OrderItemRead])
def get_orderitems(
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    return session.exec(select(OrderItem)).all()

@router.post("/", response_model=OrderItemRead, status_code=201)
def create_orderitem(
    orderitem_in: OrderItemCreate,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    db_orderitem = OrderItem.model_validate(orderitem_in)
    session.add(db_orderitem)
    session.commit()
    session.refresh(db_orderitem)
    calc_order_total(db_orderitem.order_id, session)
    return db_orderitem

@router.get("/{orderitem_id}", response_model=OrderItemRead)
def get_orderitem(
    orderitem_id: int,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    orderitem = session.get(OrderItem, orderitem_id)
    if not orderitem:
        raise HTTPException(status_code=404, detail="Order item not found")
    return orderitem

@router.patch("/{orderitem_id}", response_model=OrderItemRead)
def update_orderitem(
    id: int,
    orderitem_in: OrderItemCreate,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    orderitem = session.get(OrderItem, id)
    if not orderitem:
        raise HTTPException(status_code=404, detail="Order item not found")
    
    orderitem_data = orderitem_in.model_dump(exclude_unset=True)
    for key, value in orderitem_data.items():
        setattr(orderitem, key, value)
    
    session.add(orderitem)
    session.commit()
    session.refresh(orderitem)
    calc_order_total(orderitem.order_id, session)
    return orderitem

@router.delete("/{orderitem_id}", status_code=204)
def delete_orderitem(
    orderitem_id: int,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin)
):
    orderitem = session.get(OrderItem, orderitem_id)
    if not orderitem:
        raise HTTPException(status_code=404, detail="Order item not found")
    
    order_id = orderitem.order_id
    session.delete(orderitem)
    session.commit()
    calc_order_total(order_id, session)

