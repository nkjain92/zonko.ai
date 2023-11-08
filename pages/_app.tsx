// pages/_app.tsx
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/normal.css';
import '../styles/app.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Wrap your application with the SessionProvider.
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
