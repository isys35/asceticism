from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta


from asceticism.db.crud import set_user_homepage_viewed
from asceticism.db.session import get_db
from asceticism.core import security
from asceticism.core.auth import authenticate_user, sign_up_new_user

auth_router = router = APIRouter(prefix="/api")


@router.post("/token")
async def login(
    db=Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный Email или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(
        minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    if user.is_superuser:
        permissions = "admin"
    else:
        permissions = "user"
    access_token = security.create_access_token(
        data={
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "homepage_viewed": user.homepage_viewed,
            "permissions": permissions,
        },
        expires_delta=access_token_expires,
    )
    set_user_homepage_viewed(db, user)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/signup")
async def signup(
    db=Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = sign_up_new_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Account already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(
        minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    if user.is_superuser:
        permissions = "admin"
    else:
        permissions = "user"
    access_token = security.create_access_token(
        data={"sub": user.email, "permissions": permissions},
        expires_delta=access_token_expires,
    )

    return {"access_token": access_token, "token_type": "bearer"}
