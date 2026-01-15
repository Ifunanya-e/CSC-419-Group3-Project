from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.core.database import get_session
from app.models.supplier import Supplier
from app.schemas.supplier import SupplierCreate, SupplierRead, SupplierUpdate
from app.dependencies.auth import require_admin, require_admin_or_manager

router = APIRouter(
    prefix="/suppliers",
    tags=["suppliers"]
)

@router.get("/", response_model=list[SupplierRead])
def read_suppliers(
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    return session.exec(select(Supplier)).all()

@router.post("/", response_model=SupplierRead, status_code=201)
def create_supplier(
    supplier_in: SupplierCreate, 
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    existing_supplier = session.exec(
        select(Supplier).where(Supplier.contact_email == supplier_in.contact_email)
    ).first()

    if existing_supplier:
        raise HTTPException(status_code=400, detail="Supplier with this email already exists")
    
    db_supplier = Supplier.model_validate(supplier_in)
    session.add(db_supplier)
    session.commit()
    session.refresh(db_supplier)
    return db_supplier

@router.get("/{supplier_id}", response_model=SupplierRead)
def get_supplier(
    supplier_id: int,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    supplier = session.get(Supplier, supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier

@router.patch("/{supplier_id}", response_model=SupplierRead)
def update_supplier(
    id: int,
    supplier_in: SupplierUpdate,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin_or_manager)
):
    supplier = session.get(Supplier, id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    supplier_data = supplier_in.model_dump(exclude_unset=True)
    for key, value in supplier_data.items():
        setattr(supplier, key, value)
    
    session.add(supplier)
    session.commit()
    session.refresh(supplier)
    return supplier

@router.delete("/{supplier_id}", status_code=204)
def delete_supplier(
    id: int,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin)
):
    supplier = session.get(Supplier, id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    
    session.delete(supplier)
    session.commit()
    