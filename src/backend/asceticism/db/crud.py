from datetime import date, timedelta

from fastapi import HTTPException, status
from sqlalchemy import insert
from sqlalchemy.orm import Session

from . import models, schemas
from asceticism.core.security import get_password_hash


def get_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_user_by_email(db: Session, email: str) -> schemas.UserBase:
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[schemas.UserOut]:
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(user)
    db.commit()
    return user


def edit_user(db: Session, user_id: int, user: schemas.UserEdit) -> schemas.User:
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User not found")
    update_data = user.dict(exclude_unset=True)

    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(user.password)
        del update_data["password"]

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_ascesa(db: Session, ascesa: schemas.Ascesa, current_user: schemas.User):
    progress_days = (date.today() - ascesa.started_at).days - 1
    if progress_days < 0:
        progress_days = 0
    elif progress_days > ascesa.days:
        progress_days = ascesa.days
    db_acsesa = models.Ascesa(
        name=ascesa.name,
        days=ascesa.days,
        started_at=ascesa.started_at,
        ended_at=ascesa.started_at + timedelta(days=ascesa.days),
        progress=progress_days,
        user_id=current_user.id,
    )
    db.add(db_acsesa)
    db.commit()
    db.refresh(db_acsesa)
    return db_acsesa


def complete_ascesa(db: Session, ascesa_id: int, current_user: schemas.User):
    ascesa = db.query(models.Ascesa).filter(
        models.Ascesa.id == ascesa_id,
        models.Ascesa.user_id == current_user.id
    ).first()
    if not ascesa:
        raise HTTPException(status_code=404, detail="Ascesa not found")
    ascesa.progress += 1
    ascesa.completed_today = True
    db.add(ascesa)
    db.commit()
    db.refresh(ascesa)
    return ascesa


def get_my_asces(db: Session, current_user, skip: int = 0, limit: int = 100) -> list[schemas.AscesaOut]:
    return db.query(models.Ascesa).filter(
        models.Ascesa.user_id == current_user.id
    ).offset(skip).limit(limit).all()


def set_user_homepage_viewed(db: Session, user: models.User) -> models.User:
    if not user.homepage_viewed:
        user.homepage_viewed = True
        db.commit()
    return user
