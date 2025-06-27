import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'DPSIS Bridge to Success',
  description: 'Join the DPSIS Bridge Program for a confident start to Primary 2. Seamless transition for K2 graduates.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        {/* Google Ads Tag - Replace AW-YOUR_GOOGLE_ADS_ID with your ID */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-YOUR_GOOGLE_ADS_ID"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-YOUR_GOOGLE_ADS_ID');
            `,
          }}
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow">
          {children}
        </main>
        <AppFooter />
        <Toaster />
      </body>
    </html>
  );
}
