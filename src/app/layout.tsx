// app/layout.tsx - Updated with Global Translation Support
'use client';
import './tailwind.css';

import { Playfair_Display, Inter, Noto_Sans_Devanagari } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { TranslationProvider } from '@/contexts/GlobalTranslationContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-royal'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

const notoHindi = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-hindi'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set document metadata using useEffect since we can't export metadata in client components
  useEffect(() => {
    document.title = 'RACC Forum - Rajasthan Arts, Culture & Cinema | राजस्थान कला, संस्कृति और सिनेमा मंच';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Reviving the legacy of Rajasthani cinema, arts, and culture. राजस्थानी सिनेमा, कला और संस्कृति की विरासत को पुनर्जीवित करना।');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Reviving the legacy of Rajasthani cinema, arts, and culture. राजस्थानी सिनेमा, कला और संस्कृति की विरासत को पुनर्जीवित करना।';
      document.head.appendChild(meta);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'Rajasthan, Cinema, Culture, Arts, Revival, RACC, मारवाड़ी, राजस्थान, सिनेमा, संस्कृति, कला');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'Rajasthan, Cinema, Culture, Arts, Revival, RACC, मारवाड़ी, राजस्थान, सिनेमा, संस्कृति, कला';
      document.head.appendChild(meta);
    }

    // Set document language
    document.documentElement.lang = 'en';
  }, []);

  return (
    <html className={`${playfair.variable} ${inter.variable} ${notoHindi.variable}`}>
      <head>
        {/* Essential meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Language alternates for SEO */}
        <link rel="alternate" hrefLang="en" href="/" />
        <link rel="alternate" hrefLang="hi" href="/?lang=hi" />
        <link rel="alternate" hrefLang="mwr" href="/?lang=mwr" />
      </head>
      <body className="font-sans">
        <TranslationProvider>
          <AuthProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1f2937',
                  color: '#f9fafb',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '14px',
                  maxWidth: '400px',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#f9fafb',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#f9fafb',
                  },
                },
              }}
            />
          </AuthProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}