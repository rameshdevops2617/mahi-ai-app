from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from ai_engine import stream_ai
from memory import add_message, get_context, reset_chat

app = FastAPI(title="MAHI AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    chat_id: str

class ResetRequest(BaseModel):
    chat_id: str

@app.post("/chat/stream")
def chat_stream(req: ChatRequest):
    add_message(req.chat_id, "User", req.message)
    context = get_context(req.chat_id)

    return StreamingResponse(
        stream_ai(req.message, context),
        media_type="text/plain"
    )

@app.post("/chat/reset")
def chat_reset(req: ResetRequest):
    reset_chat(req.chat_id)
    return {"status": "reset"}
