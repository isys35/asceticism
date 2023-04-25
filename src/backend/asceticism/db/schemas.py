from datetime import date

from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    is_active: bool = True
    is_superuser: bool = False
    first_name: str = None
    last_name: str = None


class UserOut(UserBase):
    pass


class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True


class UserEdit(UserBase):
    password: str | None = None

    class Config:
        orm_mode = True


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str = None
    permissions: str = "user"


class Ascesa(BaseModel):
    name: str
    days: int
    started_at: date

    class Config:
        orm_mode = True


class AscesaOut(BaseModel):
    name: str
    days: int
    started_at: date
    progress: int

    class Config:
        orm_mode = True