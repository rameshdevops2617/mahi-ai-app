const sendMessage = async () => {
  if (!input.trim() || loading) return;

  const userText = input;
  setMessages(prev => [...prev, { sender: "user", text: userText }]);
  setInput("");
  setLoading(true);

  // Add empty AI message placeholder
  setMessages(prev => [...prev, { sender: "ai", text: "" }]);

  const response = await fetch("http://localhost:8000/chat/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userText })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let aiText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    aiText += decoder.decode(value);
    setMessages(prev => {
      const msgs = [...prev];
      msgs[msgs.length - 1] = { sender: "ai", text: aiText };
      return msgs;
    });
  }

  setLoading(false);
};
