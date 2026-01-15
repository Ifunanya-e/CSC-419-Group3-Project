from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.core.database import get_session
from app.models.user import User
from app.schemas.user import UserCreate, UserRead, UserUpdate, UpdatePasswordRequest
from app.services.users import create_user
from app.dependencies.auth import require_admin
from app.core.security import hash_password, verify_password
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["users"]
)



@router.get("/", response_model=list[UserRead])
def read_users(
    session: Session = Depends(get_session),
    current_user=Depends(require_admin)
):
    return session.exec(select(User)).all()





@router.post("", response_model=UserRead, status_code=201)
def new_user(
    user_in: UserCreate,
    session: Session = Depends(get_session),
    
):
    try:
        return create_user(session, user_in)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))





@router.get("/{user_id}", response_model=UserRead)
def get_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin)
):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user





@router.patch("/{user_id}", response_model=UserRead)
def update_user(
    id: int,
    user_in: UserUpdate,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin)
):
    user = session.get(User, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data = user_in.model_dump(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user, key, value)
    
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.patch("/me/password")
def update_my_password(
    data: UpdatePasswordRequest,
    session: Session = Depends(get_session),
    user = Depends(get_current_user),
):
    if not verify_password(data.current_password, user.pass_hash):
        raise HTTPException(status_code=400, detail="Current password incorrect")

    user.pass_hash = hash_password(data.new_password)
    session.add(user)
    session.commit()

    return {"detail": "Password updated successfully"}

@router.delete("/{user_id}", status_code=204)
def delete_user(
    id: int,
    session: Session = Depends(get_session),
    current_user=Depends(require_admin)
):
    user = session.get(User, id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    session.delete(user)
    session.commit()

