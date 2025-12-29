import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./Chat.css";

export default function Chat({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setMessages(prev => [...prev, { role: "assistant", text: "" }]);

    const res = await fetch("http://localhost:8000/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText, chat_id: chatId }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let aiText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      aiText += decoder.decode(value);
      setMessages(prev => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = {
          role: "assistant",
          text: aiText + "▍",
        };
        return msgs;
      });
    }

    setMessages(prev => {
      const msgs = [...prev];
      msgs[msgs.length - 1] = {
        role: "assistant",
        text: aiText,
      };
      return msgs;
    });

    setLoading(false);
  };

  return (
    <div className="chat-root">
      <div className="chat-scroll">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="bubble">
              <ReactMarkdown>{m.text}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-bar">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask MAHI AI anything…"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
