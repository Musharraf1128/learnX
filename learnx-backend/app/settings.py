from pydantic_settings import BaseSettings
from typing import List, Optional

class Settings(BaseSettings):
    SECRET_KEY: str = "change-me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    ALGORITHM: str = "HS256"
    SQLALCHEMY_DATABASE_URL: str = "sqlite:///./learnx.db"
    CORS_ORIGINS: List[str] = ["http://localhost:5173"]

    # LLM
    LLM_PROVIDER: str = "mock"  # mock | ollama | openai
    OLLAMA_HOST: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3.1:8b"
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_BASE_URL: Optional[str] = "https://api.openai.com/v1"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
