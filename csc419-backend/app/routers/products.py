from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from app.core.database import get_session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductRead
from app.dependencies.auth import require_admin_or_manager, require_admin
from typing import List
from app.services.product import get_low_stock_products, search_products


router = APIRouter(
    prefix="/products",
    tags=["products"]
)

@router.get("/", response_model=list[ProductRead])
def read_products(session: Session = Depends(get_session)):
    return session.exec(select(Product)).all()


@router.get("/search", response_model=List[ProductRead])
def search_for_products(
    query: str = Query(..., min_length=1),
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager),
):
    return search_products(session, query)


@router.get("/low-stock", response_model=List[ProductRead])
def low_stock_products(
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager),
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
    session: Session = Depends(get_session)
):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.patch("/{product_id}", response_model=ProductRead)
def update_product(
    id: int,
    product_in: ProductCreate,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    product = session.get(Product, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_data = product_in.model_dump(exclude_unset=True)
    for key, value in product_data.items():
        setattr(product, key, value)
    
    session.add(product)
    session.commit()
    session.refresh(product)
    return product




@router.delete("/{product_id}", status_code=204)
def delete_product(
    id: int,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin)
):
    product = session.get(Product, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    session.delete(product)
    session.commit()