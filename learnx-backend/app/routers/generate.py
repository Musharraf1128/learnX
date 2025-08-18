from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import orjson
from ..database import get_db
from ..auth import get_current_user
from .. import models, schemas
from ..services.llm import generate_lesson, generate_course

router = APIRouter(prefix="/generate", tags=["generate"])

@router.post("/lesson", response_model=schemas.LessonOut)
async def create_lesson(payload: schemas.LessonCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    data = await generate_lesson(payload.topic, payload.level, payload.goals)
    record = models.Lesson(user_id=user.id, topic=payload.topic, level=payload.level, content_json=orjson.dumps(data).decode())
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"id": record.id, "topic": record.topic, "level": record.level, "content": data}

@router.post("/course", response_model=schemas.CourseOut)
async def create_course(payload: schemas.CourseCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    data = await generate_course(payload.topic, payload.duration_weeks, payload.goals)
    record = models.Course(user_id=user.id, topic=payload.topic, duration_weeks=payload.duration_weeks, syllabus_json=orjson.dumps(data).decode())
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"id": record.id, "topic": record.topic, "duration_weeks": record.duration_weeks, "syllabus": data}
