from sqlmodel import SQLModel, create_engine, Session
import os

DATABASE_URL = "postgresql://postgres:josh@localhost:5432/csc419"

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session
