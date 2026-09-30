"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/SectionWrapper';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';

// Define gtag on window for TypeScript
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: object) => void;
  }
}

export default function ThankYouPage() {
  // Fire conversion event on page load
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      // Replace with your conversion label
      window.gtag('event', 'conversion', {
          'send_to': 'AW-YOUR_GOOGLE_ADS_ID/YOUR_CONVERSION_LABEL',
      });
    }
  }, []);

  return (
    <SectionWrapper 
      className="h-full" 
      containerClassName="h-full flex items-center justify-center text-center"
    >
      <Card className="w-full max-w-md bg-background/50 backdrop-blur-md border border-primary/10 shadow-lg p-6 sm:p-10 rounded-xl">
        <CardContent className="p-0">
          <CheckCircle2 className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-green-500 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary mb-4">
            Thank You!
          </h1>
          <p className="text-base sm:text-lg text-foreground/80 mb-8 leading-relaxed">
            Your enquiry has been successfully submitted. We will review your message and get back to you shortly.
          </p>
          <Button asChild size="lg">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
