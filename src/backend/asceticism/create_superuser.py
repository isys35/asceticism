#!/usr/bin/env python3
from asceticism.db.crud import create_user
from asceticism.db.schemas import UserCreate
from asceticism.db.session import SessionLocal
from getpass import getpass


def main() -> None:
    db = SessionLocal()
    email = input("Введите email: ")
    password = getpass(prompt="Введите пароль: ")
    create_user(
        db,
        UserCreate(
            email=email,
            password=password,
            is_active=True,
            is_superuser=True,
        ),
    )


if __name__ == "__main__":
    print("Создание суперпользователя")
    main()
    print("Суперпользователь создан")
