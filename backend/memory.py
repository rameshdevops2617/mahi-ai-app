# Stores memory per chat session
chat_memory = {}

MAX_HISTORY = 6

def add_message(chat_id: str, role: str, message: str):
    if chat_id not in chat_memory:
        chat_memory[chat_id] = []

    chat_memory[chat_id].append(f"{role}: {message}")

    if len(chat_memory[chat_id]) > MAX_HISTORY:
        chat_memory[chat_id].pop(0)

def get_context(chat_id: str) -> str:
    return "\n".join(chat_memory.get(chat_id, []))

def reset_chat(chat_id: str):
    chat_memory[chat_id] = []
