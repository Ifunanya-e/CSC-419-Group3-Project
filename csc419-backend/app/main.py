from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, text, select
from app.core.database import get_session
from app.models.supplier import Supplier 
from app.schemas.supplier import SupplierCreate, SupplierRead

app = FastAPI()

@app.get("/")
def root():
    return {"status": "IWMS backend running"}

@app.get("/suppliers/", response_model = list[SupplierRead])
def read_suppliers(session: Session = Depends(get_session)):
    statement = select(Supplier)
    return session.exec(statement).all()


@app.post("/suppliers/", response_model=SupplierRead)
def create_supplier(
    supplier_in: SupplierCreate, 
    session: Session = Depends(get_session)
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


@app.get("/suppliers/{supplier_id}", response_model=SupplierRead)
def get_supplier(
    supplier_id: int,
    session: Session = Depends(get_session)
):
    supplier = session.get(Supplier, supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier





  