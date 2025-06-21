// app/layout.tsx - Updated with New Branding
import './tailwind.css';
import { Playfair_Display, Inter, Noto_Sans_Devanagari } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Toaster } from 'react-hot-toast';

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

export const metadata = {
  title: 'Rajasthan Screen Stage Forum - Cultural & Cinema Revival',
  description: 'Reviving the legacy of Rajasthani cinema, arts, and culture through vision, unity, and structured development. Join the movement to bring Rajasthan\'s stories to Rajasthan\'s screens.',
  keywords: 'Rajasthan, Cinema, Culture, Arts, Revival, Screen Stage Forum, Rajasthani Cinema, Cultural Heritage, Film Industry, Folk Arts',
  authors: [{ name: 'Rajasthan Screen Stage Forum' }],
  creator: 'Rajasthan Screen Stage Forum',
  publisher: 'Rajasthan Screen Stage Forum',
  openGraph: {
    title: 'Rajasthan Screen Stage Forum - Cultural & Cinema Revival',
    description: 'Join the movement to revive Rajasthani cinema, arts, and culture. Sign the petition and be part of this historic initiative.',
    url: 'https://rajscreenstage.org',
    siteName: 'Rajasthan Screen Stage Forum',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rajasthan Screen Stage Forum - Cultural Revival Movement',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajasthan Screen Stage Forum - Cultural & Cinema Revival',
    description: 'Join the movement to revive Rajasthani cinema, arts, and culture.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoHindi.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#d97706" />
      </head>
      <body className="font-sans">
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
                background: '#ffffff',
                color: '#1f2937',
                border: '1px solid #d97706',
              },
              success: {
                iconTheme: {
                  primary: '#059669',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#dc2626',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}