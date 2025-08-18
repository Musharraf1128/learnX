from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    class Config:
        from_attributes = True

# Lesson
class QuizItem(BaseModel):
    question: str
    options: List[str]
    answer: str

class LessonSection(BaseModel):
    heading: str
    content: str
    example: Optional[str] = None
    quiz: Optional[QuizItem] = None

class LessonCreate(BaseModel):
    topic: str
    level: str = "beginner"
    goals: Optional[str] = None

class LessonOut(BaseModel):
    id: int
    topic: str
    level: str
    content: Any

    class Config:
        from_attributes = True

# Course
class CourseCreate(BaseModel):
    topic: str
    duration_weeks: int = 2
    goals: Optional[str] = None

class CourseOut(BaseModel):
    id: int
    topic: str
    duration_weeks: int
    syllabus: Any

    class Config:
        from_attributes = True
