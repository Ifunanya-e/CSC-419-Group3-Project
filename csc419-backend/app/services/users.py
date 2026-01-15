from sqlmodel import Session, select
from sqlalchemy.exc import IntegrityError
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import hash_password


def create_user(session: Session, user_in: UserCreate) -> User:
    existing = session.exec(
        select(User).where(User.email == user_in.email)
    ).first()

    if existing:
        raise ValueError("Email already exists")
    
    password: str = str(user_in.password)

    print("TYPE:", type(password))
    print("LEN:", len(password))
    print("VAL:", password)
    
    user = User(
        full_name=user_in.full_name,
        email=user_in.email,
        role=user_in.role,
        pass_hash=hash_password(password),
    )

    session.add(user)
    session.commit()
    session.refresh(user)
    return user
