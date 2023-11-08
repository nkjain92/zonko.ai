// pages/main-chat-screen.js
import { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/chatMessage';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function MainChatScreen() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not logged in or while loading the session
  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (status !== 'authenticated') {
      router.push('/'); // Redirect to login page if not authenticated
    }
  }, [status, router]);

  // Early return for loading state
  if (status === 'loading') {
    return <p>Loading...</p>; // Show a loading message while checking for session
  }

  // Early return if there is no session
  if (!session) {
    return null; // Protect the page from being rendered if no session
  }

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
    const chatlogNew = [...chatLog, { role: 'user', content: input }];
    setChatLog(chatlogNew);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: input }),
    });
    const data = await response.json();

    setChatLog(chatLog => [...chatLog, { role: 'assistant', content: data.content }]);
  }

  return (
    <div className='App'>
      <header>
        Welcome {session.user.name || session.user.email}, thanks for using our app.{' '}
        <button onClick={() => signOut()}>Logout</button>
      </header>
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
              type='text' // Specify the type
              value={input}
              onChange={e => setInput(e.target.value)}
              className='chat-input-text-area'
              placeholder='Type your prompt here'
              autoFocus // Optional, to focus on load
            />
          </form>
          <div className='disclaimer'>
            <p>All LLMs can make mistakes. Consider checking important information.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
