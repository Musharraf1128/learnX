from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .settings import settings
from .database import engine, Base
from .routers import auth as auth_router
from .routers import generate as generate_router

app = FastAPI(title="LearnX API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router.router)
app.include_router(generate_router.router)

@app.get("/")
def root():
    return {"status": "ok", "app": "LearnX API"}
