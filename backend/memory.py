memory_store = {}

def add_message(chat_id, role, content):
    memory_store.setdefault(chat_id, []).append(f"{role}: {content}")

def get_context(chat_id):
    return "\n".join(memory_store.get(chat_id, []))

def reset_chat(chat_id):
    memory_store.pop(chat_id, None)

