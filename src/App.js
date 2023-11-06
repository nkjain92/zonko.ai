// import logo from "./logo.svg";
import './normal.css';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function App() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      role: 'assistant',
      content: 'How can I help you?',
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
    let chatlogNew = [...chatLog, { role: 'user', content: `${input}` }];
    await setInput('');
    await setChatLog(chatlogNew);
    // const messages = chatlogNew.map((content) => content.content).join("\n");
    const messages = chatlogNew;
    console.log(messages);
    const response = await fetch('http://localhost:3080', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
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
    <div className='App'>
      <aside className='sidemenu'>
        <div className='sidemenubutton' onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className='chatbox'>
        <div className='chat-log' ref={chatLogRef}>
          {chatLog.map((content, index) => (
            <ChatMessage key={index} content={content} />
          ))}
        </div>
        <div className='chat-input-holder'>
          <form onSubmit={handlesubmit}>
            <input
              rows='1'
              value={input}
              onChange={e => setInput(e.target.value)}
              className='chat-input-text-area'
              placeholder='Type your prompt here'></input>
          </form>
        </div>
      </section>
    </div>
  );
}
export default App;

const ChatMessage = ({ content }) => {
  return (
    <div className={`chat-message ${content.role === 'assistant' ? 'chatgpt' : ''}`}>
      <div className='chat-message-center'>
        <div className={`avatar ${content.role === 'assistant' ? 'chatgpt' : ''}`}>
          {content.role === 'assistant' && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={24}
              height={24}
              fill='none'
              className='icon-md'>
              <text x={-9999} y={-9999}>
                {'ChatGPT'}
              </text>
              <path
                fill='white'
                d='M21.97 9.875a5.832 5.832 0 0 0-.501-4.791 5.899 5.899 0 0 0-6.354-2.83A5.833 5.833 0 0 0 10.716.293a5.9 5.9 0 0 0-5.628 4.084 5.834 5.834 0 0 0-3.901 2.83 5.9 5.9 0 0 0 .726 6.917 5.833 5.833 0 0 0 .501 4.791 5.9 5.9 0 0 0 6.354 2.83 5.833 5.833 0 0 0 4.4 1.961 5.899 5.899 0 0 0 5.629-4.086 5.834 5.834 0 0 0 3.9-2.83 5.9 5.9 0 0 0-.728-6.915Zm-8.8 12.302a4.375 4.375 0 0 1-2.809-1.016c.036-.019.098-.053.139-.078l4.662-2.693a.757.757 0 0 0 .383-.664v-6.572l1.97 1.138a.07.07 0 0 1 .039.054v5.443a4.393 4.393 0 0 1-4.384 4.388ZM3.742 18.15a4.373 4.373 0 0 1-.523-2.94c.035.021.095.058.139.083l4.662 2.693a.759.759 0 0 0 .766 0l5.692-3.286v2.276a.07.07 0 0 1-.028.06l-4.713 2.721a4.393 4.393 0 0 1-5.994-1.606ZM2.515 7.973A4.372 4.372 0 0 1 4.8 6.049l-.002.16v5.386a.757.757 0 0 0 .383.663l5.692 3.286-1.97 1.138a.07.07 0 0 1-.067.006l-4.715-2.724a4.393 4.393 0 0 1-1.606-5.992Zm16.19 3.768-5.692-3.287 1.971-1.137a.071.071 0 0 1 .066-.006l4.713 2.721a4.389 4.389 0 0 1-.678 7.919v-5.547a.757.757 0 0 0-.38-.663Zm1.961-2.952a5.56 5.56 0 0 0-.138-.083l-4.662-2.693a.76.76 0 0 0-.766 0L9.408 9.299V7.023a.07.07 0 0 1 .028-.06l4.712-2.719a4.388 4.388 0 0 1 6.518 4.544Zm-12.33 4.056-1.971-1.138a.07.07 0 0 1-.038-.054V6.21a4.388 4.388 0 0 1 7.196-3.369 4.062 4.062 0 0 0-.138.078L8.723 5.612a.757.757 0 0 0-.383.663l-.004 6.571Zm1.071-2.308 2.535-1.464 2.536 1.463v2.927l-2.535 1.463-2.535-1.463v-2.926Z'
              />
            </svg>
          )}
        </div>
        <div className='content'>
          <ReactMarkdown children={content.content} remarkPlugins={[remarkGfm]} />
        </div>
      </div>
    </div>
  );
};
