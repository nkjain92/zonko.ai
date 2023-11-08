// pages/protected.tsx
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export default function ProtectedPage() {
  const { data: session } = useSession();

  if (session && session.user) {
    return <div>Welcome to the protected page, {session.user.email}</div>;
  }

  return <div>You must be signed in to view this page</div>;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
