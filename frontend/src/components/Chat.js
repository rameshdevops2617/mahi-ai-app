import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import { MicIcon, SendIcon } from "./Icons";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Clear UI when chatId changes
    setMessages([]);
  }, [chatId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setMessages(prev => [...prev, { sender: "ai", text: "" }]);

    const res = await fetch("http://localhost:8000/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userText,
        chat_id: chatId
      })
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let aiText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      aiText += decoder.decode(value);
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1].text = aiText;
        return copy;
      });
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">MAHI AI Assistant</div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <Message key={i} sender={m.sender} text={m.text} />
        ))}
        <div ref={endRef} />
      </div>

      <div className="chat-input">
        <input
          placeholder="Ask MAHI AI anything"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button><MicIcon /></button>
        <button onClick={sendMessage}><SendIcon /></button>
      </div>
    </div>
  );
};

export default Chat;
