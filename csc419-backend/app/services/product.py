from sqlmodel import Session, select
from app.models.product import Product

def get_low_stock_products(session: Session):
    statement = select(Product).where(
        Product.current_stock <= Product.reorder_level
    )
    return session.exec(statement).all()

def search_products(
        session: Session, 
        query: str,
        limit: int = 20,
        offset: int = 0
    ):

    q = f"%{query}%"

    statement = (select(Product).where(
        (Product.name.ilike(q)) |
        (Product.category.ilike(q)) |
        (Product.sku.ilike(q))
    )
    .limit(limit)
    .offset(offset)
)
    return session.exec(statement).all()