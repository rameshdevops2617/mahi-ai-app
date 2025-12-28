import requests
import os
import json
import time

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434/api/generate")
MODEL_NAME = os.getenv("MODEL_NAME", "phi")

def stream_ai(message: str, context: str):
    prompt = f"""
You are MAHI AI, a helpful personal assistant.

Conversation context:
{context}

User:
{message}

Assistant:
"""

    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": True
    }

    try:
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

                data = json.loads(line.decode("utf-8"))

                if "response" in data:
                    yield data["response"]

                if data.get("done"):
                    break

    except Exception as e:
        yield f"\n[ERROR]: {str(e)}\n"
        time.sleep(0.1)
