import Head from "next/head";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { ToastProvider } from "../context/toastContext";
import { AuthProvider } from "../context/authContext";
import { WhatsAppWidget } from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
declare global {
  interface Window {
    FB: any;
  }
}

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Nockira</title>
      </Head>
      <WhatsAppWidget
        sendButton="Ohereza"
        replyTimeText="Tubasubiza muminota mike?"
        companyName="Nockira"
        message="Mwiriwe, Twafasha iki?"
        phoneNumber="+250789117171"
      />
      <AuthProvider>
        <ToastProvider>
          <Layout>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
