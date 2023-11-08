// pages/index.js
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

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
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <h1 className={styles.title}>ChatGot</h1>
        <p className={styles.subtitle}>Chat Freely, Got Every AI Assistants Here for You</p>
        <button onClick={() => signIn()} className={styles.signInButton}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
