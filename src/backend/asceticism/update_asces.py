from asceticism.db.crud import update_asces
from asceticism.db.session import SessionLocal


def main() -> None:
    print("Обновление состояния аскез")
    db = SessionLocal()
    update_asces(db)


if __name__ == "__main__":
    main()
