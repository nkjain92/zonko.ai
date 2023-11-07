// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/normal.css";
import "../styles/app.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
