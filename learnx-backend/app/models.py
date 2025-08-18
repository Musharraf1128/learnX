from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    lessons = relationship("Lesson", back_populates="user")
    courses = relationship("Course", back_populates="user")

class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    topic = Column(String, index=True)
    level = Column(String, default="beginner")
    content_json = Column(Text)  # JSON string
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="lessons")

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    topic = Column(String, index=True)
    duration_weeks = Column(Integer, default=2)
    syllabus_json = Column(Text)  # JSON string
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="courses")
