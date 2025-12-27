import requests
import json
from config import OLLAMA_URL, MODEL_NAME, SYSTEM_PROMPT

def stream_ai(user_message: str, context: str = ""):
    """
    Streams AI response token-by-token from Ollama
    and cleans escaped characters like \\n
    """

    prompt = f"""
{SYSTEM_PROMPT}

Context:
{context}

User:
{user_message}

Assistant:
"""

    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": True,
        "options": {
            "num_predict": 150,
            "temperature": 0.3
        }
    }

    with requests.post(
        OLLAMA_URL,
        json=payload,
        stream=True,
        timeout=(10, 300)
    ) as response:

        response.raise_for_status()

        for line in response.iter_lines():
            if not line:
                continue

            try:
                data = json.loads(line.decode("utf-8"))
                token = data.get("response", "")

                # 🔥 FIX: convert escaped \n to real newline
                token = token.replace("\\n", "\n")

                yield token
            except json.JSONDecodeError:
                continue
