from sqlmodel import Session, select
from app.models.order import Order
from app.models.orderitem import OrderItem


def calc_order_total(order_id: int, session: Session):
    order_items = session.exec(
        select(OrderItem).where(OrderItem.order_id == order_id)
    ).all()

    total = sum(item.quantity * item.price_at_transaction for item in order_items)

    order = session.get(Order, order_id)
    if order is None:
        return
    
    order.total_amount = total
    session.add(order)
    session.commit()
    session.refresh(order)
    