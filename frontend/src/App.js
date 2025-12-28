import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [chatId, setChatId] = useState(uuidv4());

  const newChat = async () => {
    await fetch("http://localhost:8000/chat/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId })
    });

    setChatId(uuidv4());
  };

  return (
    <div className="app-layout">
      <Sidebar onNewChat={newChat} />
      <Chat chatId={chatId} />
    </div>
  );
}

export default App;
