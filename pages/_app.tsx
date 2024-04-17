import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {ThirdwebProvider} from "thirdweb/react";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
    <ThirdwebProvider >
  <Component {...pageProps} />
  <ToastContainer position="top-left" />
  </ThirdwebProvider>
  </NextUIProvider>
);
}
export default App
