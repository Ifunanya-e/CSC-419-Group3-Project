from fastapi import Depends, HTTPException, status
from sqlmodel import Session
from app.core.database import get_session
from app.models.user import User
from app.core.jwt import decode_access_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session),
) -> User:

    token = credentials.credentials

    payload = decode_access_token(token)

    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = session.get(User, int(user_id))
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


def require_admin_or_manager(
        current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role not in ("admin", "manager", "Admin", "Manager"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="admin or manager only",
        )
    
    return current_user

def require_admin(
        current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="admin only",
        )
    
    return current_user
