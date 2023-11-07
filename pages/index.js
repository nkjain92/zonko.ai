import { useState, useRef, useEffect } from "react";
import ChatMessage from "../components/chatMessage";

export default function Home() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      role: "assistant",
      content: "How can I help you?",
    },
  ]);
  function clearChat() {
    setChatLog([]);
  }
  const chatLogRef = useRef(null);
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);
  async function handlesubmit(e) {
    e.preventDefault();
    let chatlogNew = [...chatLog, { role: "user", content: `${input}` }];
    await setInput("");
    await setChatLog(chatlogNew);
    // const messages = chatlogNew.map((content) => content.content).join("\n");
    const messages = chatlogNew;
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: messages,
      }),
    });
    const data = await response.json();
    await setChatLog([
      ...chatlogNew,
      // { role: "assistant", content: `${data.content}` },
      data.content,
    ]);
  }
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenubutton" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log" ref={chatLogRef}>
          {chatLog.map((content, index) => (
            <ChatMessage key={index} content={content} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handlesubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-text-area"
              placeholder="Type your prompt here"
            ></input>
          </form>
          <div className="disclaimer">
            {" "}
            <p>
              All LLMs can make mistakes. Consider checking important
              information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
