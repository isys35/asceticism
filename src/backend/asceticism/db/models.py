from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
    ForeignKey,
    Date,
    func,
    DateTime,
)
from sqlalchemy.orm import relationship

from .session import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    homepage_viewed = Column(
        Boolean, server_default="false", default=False, nullable=False
    )
    asces = relationship("Ascesa", back_populates="user")


class Ascesa(Base):
    __tablename__ = "ascesa"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    started_at = Column(Date, nullable=False)
    ended_at = Column(Date, nullable=False)
    days = Column(Integer, nullable=False)
    progress = Column(Integer, nullable=False, server_default="0")
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    user = relationship("User", back_populates="asces")
    completed_active_day = Column(
        Boolean, nullable=False, default=False, server_default="false"
    )
    failed = Column(Boolean, nullable=False, default=False)
    active_day = Column(Date, nullable=False, server_default=func.now())
    updated_at = Column(
        DateTime, nullable=False, server_default=func.now(), onupdate=func.now()
    )
