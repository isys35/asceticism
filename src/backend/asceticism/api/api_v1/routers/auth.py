from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status

from asceticism.db.session import get_db
from asceticism.core.auth import authenticate_user, create_access_token
from asceticism.core import oauth

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

    return create_access_token(db, user)


@router.get("/oauth/github/{code}")
async def oauth_github(code, db=Depends(get_db)):
    return await oauth.oauth_github(db, code)
