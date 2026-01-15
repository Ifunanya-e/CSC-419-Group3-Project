from sqlmodel import SQLModel, create_engine, Session
from app.core.config import DATABASE_URL  # Import from config instead of hardcoding

# Ensure DATABASE_URL is not None to avoid runtime errors if .env is missing
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in environment variables.")

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session