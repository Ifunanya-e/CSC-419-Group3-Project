from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import Session, select
from app import models
from app.core.database import get_session
from sqlalchemy.orm import Session
from app.models.product import Product
from app.routers.auth import get_me
from app.schemas.product import ProductCreate, ProductRead
from app.dependencies.auth import require_admin_or_manager, require_admin, get_current_user
from typing import List
from app.services.product import get_low_stock_products, search_products


router = APIRouter(
    prefix="/products",
    tags=["products"]
)

@router.get("/", response_model=list[ProductRead])
def read_products(
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user),
    ):
    return session.exec(select(Product)).all()


@router.get("/search", response_model=List[ProductRead])
def search_for_products(
    query: str = Query(..., min_length=1),
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user),
):
    return search_products(session, query)


@router.get("/low-stock", response_model=List[ProductRead])
def low_stock_products(
    session: Session = Depends(get_session),
    current_user=Depends(get_current_user),
):
    return get_low_stock_products(session)

@router.post("/", response_model=ProductRead, status_code=201)
def create_product(
    product_in: ProductCreate,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager),
):
    existing_product = session.exec(
        select(Product).where(Product.sku == product_in.sku)
    ).first()

    if existing_product:
        raise HTTPException(status_code=400, detail="Product with this SKU already exists")
    
    db_product = Product.model_validate(product_in)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

@router.get("/{product_id}", response_model=ProductRead)
def get_product(
    product_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(get_current_user)
):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

from app.schemas.product import ProductCreate, ProductRead, ProductUpdate # Ensure ProductUpdate is imported

@router.patch("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,                  # 1. Changed 'id' to 'product_id' to match the path
    product_in: ProductUpdate,        # 2. Changed 'ProductCreate' to 'ProductUpdate'
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    # 3. Use 'product_id' here to fetch the record
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # This logic correctly applies only the fields sent by the frontend
    product_data = product_in.model_dump(exclude_unset=True)
    for key, value in product_data.items():
        setattr(product, key, value)
    
    session.add(product)
    session.commit()
    session.refresh(product)
    return product




@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, session: Session = Depends(get_session), current_user = Depends(require_admin)):
    # Use session.get() - it's cleaner and safer
    product = session.get(Product, product_id)
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    try:
        session.delete(product)
        session.commit()
        return None
    except Exception:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Cannot delete product. It is currently linked to existing order items. Remove those first."
        )