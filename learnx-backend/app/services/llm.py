import httpx, orjson
from typing import Dict, Any
from ..settings import settings

SYSTEM_PROMPT = (
    "You are LearnX, an expert teacher. Generate concise, structured lessons that build intuition, "
    "include small examples, and end each section with a quick check-for-understanding quiz."
)

async def generate_with_ollama(prompt: str) -> str:
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(
            f"{settings.OLLAMA_HOST}/api/generate",
            json={"model": settings.OLLAMA_MODEL, "prompt": prompt, "stream": False},
        )
        resp.raise_for_status()
        data = resp.json()
        return data.get("response", "")

async def generate_with_openai(prompt: str) -> str:
    # Works with OpenAI-compatible APIs
    headers = {"Authorization": f"Bearer {settings.OPENAI_API_KEY}"}
    json_payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role":"system","content": SYSTEM_PROMPT}, {"role":"user","content": prompt}],
        "temperature": 0.7,
    }
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(f"{settings.OPENAI_BASE_URL}/chat/completions", headers=headers, json=json_payload)
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"]

def render_mock_lesson(topic: str, level: str, goals: str|None) -> Dict[str, Any]:
    sections = [
        {
            "heading": f"What is {topic}?",
            "content": f"A quick intuition-first intro to {topic} for {level} learners. " +
                       (f"Goal: {goals}. " if goals else "") +
                       f"We start with the core idea and avoid jargon.",
            "example": f"Example: A simple scenario where {topic} is applied.",
            "quiz": {
                "question": f"Pick the true statement about {topic}.",
                "options": ["It's magic", f"It has a core idea used to solve problems", "It's only for experts", "It cannot be learned"],
                "answer": f"It has a core idea used to solve problems"
            }
        },
        {
            "heading": "Step-by-step",
            "content": f"Break {topic} into 3 steps: understand, try, reflect.",
            "example": f"Walkthrough applying {topic} to a tiny task."
        },
        {
            "heading": "Mini project",
            "content": f"Build a tiny project using {topic} to cement learning."
        }
    ]
    return {"title": f"Lesson: {topic}", "level": level, "sections": sections, "summary": f"You learned the core of {topic}."}

def render_mock_course(topic: str, duration_weeks: int, goals: str|None) -> Dict[str, Any]:
    weeks = []
    for w in range(1, duration_weeks+1):
        weeks.append({
            "title": f"Week {w}: {topic} - Part {w}",
            "lessons": [
                {"title": f"{topic} Basics {w}.1", "outcome": "Core ideas"},
                {"title": f"{topic} Practice {w}.2", "outcome": "Hands-on"},
                {"title": f"{topic} Project {w}.3", "outcome": "Build something small"},
            ]
        })
    return {"course_title": f"{topic} in {duration_weeks} weeks", "weeks": weeks, "goals": goals}

async def generate_lesson(topic: str, level: str, goals: str|None) -> Dict[str, Any]:
    if settings.LLM_PROVIDER == "mock":
        return render_mock_lesson(topic, level, goals)
    prompt = f"Create a compact, structured lesson on '{topic}' for a {level} learner. Goals: {goals}. Return clear sections with headings, short content, and one quick quiz."
    if settings.LLM_PROVIDER == "ollama":
        text = await generate_with_ollama(prompt)
    elif settings.LLM_PROVIDER == "openai":
        text = await generate_with_openai(prompt)
    else:
        text = render_mock_lesson(topic, level, goals)  # fallback
        return text
    # Try to parse JSON if the model returned JSON, else wrap text
    try:
        data = orjson.loads(text)
        return data
    except Exception:
        return {"title": f"Lesson: {topic}", "level": level, "sections": [{"heading":"Content","content": text}]}

async def generate_course(topic: str, duration_weeks: int, goals: str|None) -> Dict[str, Any]:
    if settings.LLM_PROVIDER == "mock":
        return render_mock_course(topic, duration_weeks, goals)
    prompt = f"Design a {duration_weeks}-week course on '{topic}' with weekly modules and 3 lessons each. Include brief outcomes. Goals: {goals}. Return JSON."
    if settings.LLM_PROVIDER == "ollama":
        text = await generate_with_ollama(prompt)
    elif settings.LLM_PROVIDER == "openai":
        text = await generate_with_openai(prompt)
    else:
        text = render_mock_course(topic, duration_weeks, goals)
        return text
    try:
        data = orjson.loads(text)
        return data
    except Exception:
        return {"course_title": f"{topic} in {duration_weeks} weeks", "weeks": [{"title":"Overview","lessons":[{"title":"Syllabus","outcome": text}]}]}
