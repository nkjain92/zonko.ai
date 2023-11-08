// components/Login-logout.js
import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginLogout() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
