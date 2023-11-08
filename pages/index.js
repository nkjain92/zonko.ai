// pages/index.js
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main chat screen if logged in
    if (status === 'authenticated') {
      router.push('/main-chat-screen');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  if (session) {
    return null; // Or a loading indicator as the useEffect hook will handle redirection
  }

  return (
    <div className='App'>
      <h1>Welcome to Our Chat Application</h1>
      <button onClick={() => signIn()}>Login</button>
    </div>
  );
}
