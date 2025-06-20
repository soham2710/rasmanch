// app/layout.tsx
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
  title: 'Rajasthan Cultural & Cinema Revival',
  description: 'Reviving the legacy of Rajasthani cinema, arts, and culture through vision, unity, and structure.',
  keywords: 'Rajasthan, Cinema, Culture, Arts, Revival, Ministry, Government',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoHindi.variable}`}>
      <body className="font-sans">
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}