from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.core.database import get_session
from app.schemas.auth import LoginRequest, MeResponse, TokenResponse
from app.services.auth import authenticate_user
from app.core.jwt import create_access_token
from app.models.user import User
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/login", response_model=TokenResponse)
def login(
    login_req: LoginRequest,
    session: Session = Depends(get_session)
):
    user = authenticate_user(
        session, login_req.email, login_req.password
    )
    token = create_access_token({
        "sub": str(user.id),
        "role": user.role
    })

    return {"access_token": token}

@router.get("/me", response_model=MeResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return{
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
    }

    