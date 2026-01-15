from sqlmodel import Session, select
from fastapi import HTTPException, status
from app.models.user import User
from app.core.security import verify_password


def authenticate_user(
    session: Session,
    email: str,
    password: str,
) -> User:
    user = session.exec(
        select(User).where(User.email == email)
    ).first()

    if not user or not verify_password(password, user.pass_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    return user
