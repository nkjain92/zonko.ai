// pages/index.js
import { useEffect, useState } from "react"; // Import useState
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/home.module.css"; // Make sure this path is correct

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentText, setCurrentText] = useState(0);
  const textArray = [
    "Empower your conversation with AI.",
    "Experience the future of chatbots.",
    "Engage with smart AI technology.",
  ]; // Replace texts when you want to change the message

  // Redirect to the main chat screen if logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/main-chat-screen");
    }
  }, [status, router]);

  // Text rotation effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentText((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(intervalId);
  }, [textArray.length]);

  if (status === "loading") {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <p className={styles.dynamicText}>{textArray[currentText]}</p>
      </div>
      <div className={styles.rightSide}>
        <button
          onClick={() => signIn("google")}
          className={styles.signInButton}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
