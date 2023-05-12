import httpx
from fastapi import HTTPException
from starlette import status

from asceticism.core.auth import create_access_token
from asceticism.core.config import (
    GITHUB_APP_ID,
    GITHUB_APP_SECRET,
    GITHUB_ACCESS_TOKEN_URL,
    GITHUB_USER_API,
    GITHUB_USER_EMAILS,
)
from asceticism.db.crud import get_user_by_email, create_oauth_user


async def get_github_email(code: str) -> str:
    data = {
        "client_id": GITHUB_APP_ID,
        "client_secret": GITHUB_APP_SECRET,
        "code": code,
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(
            GITHUB_ACCESS_TOKEN_URL,
            data=data,
            headers={"Accept": "application/json"},
        )
        if response.status_code != 200:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
        response_data = response.json()
        if response_data.get("error"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=response_data.get("error_description"),
            )
        auth_headers = {
            "Authorization": f"Bearer {response_data['access_token']}"
        }
        await client.get(GITHUB_USER_API, headers=auth_headers)
        user_emails = await client.get(GITHUB_USER_EMAILS, headers=auth_headers)
        user_primary_email = [
            email_data["email"]
            for email_data in user_emails.json()
            if email_data["primary"] is True
        ][0]
    return user_primary_email


async def oauth_github(db, code: str):
    email = await get_github_email(code)
    user = get_user_by_email(db, email)
    if not user:
        user = create_oauth_user(db, email)
    return create_access_token(db, user)
