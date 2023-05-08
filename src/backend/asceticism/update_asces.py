from asceticism.db.crud import update_asces
from asceticism.db.session import SessionLocal


def main() -> None:
    db = SessionLocal()
    update_asces(db)


if __name__ == "__main__":
    main()
