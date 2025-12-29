from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import requests
import os
import json
import redis

app = FastAPI(title="MAHI AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434/api/generate")
MODEL_NAME = os.getenv("MODEL_NAME", "phi")
REDIS_HOST = os.getenv("REDIS_HOST", "redis")

redis_client = redis.Redis(host=REDIS_HOST, port=6379, decode_responses=True)

class ChatRequest(BaseModel):
    message: str
    chat_id: str

class ResetRequest(BaseModel):
    chat_id: str


def stream_ai(prompt: str, context: str):
    payload = {
        "model": MODEL_NAME,
        "prompt": context + f"\nUser: {prompt}\nAssistant:",
        "stream": True,
    }

    with requests.post(OLLAMA_URL, json=payload, stream=True) as r:
        r.raise_for_status()
        for line in r.iter_lines():
            if line:
                try:
                    data = json.loads(line.decode("utf-8"))
                    if "response" in data:
                        yield data["response"]
                except Exception:
                    continue


@app.post("/chat/stream")
def chat_stream(req: ChatRequest):
    history = redis_client.get(req.chat_id) or ""
    redis_client.set(req.chat_id, history + f"\nUser: {req.message}")

    return StreamingResponse(
        stream_ai(req.message, history),
        media_type="text/plain",
    )


@app.post("/chat/reset")
def chat_reset(req: ResetRequest):
    redis_client.delete(req.chat_id)
    return {"status": "reset"}
