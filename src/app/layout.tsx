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
  title: 'Rajasthan Arts, Culture and Cinema Forum',
  description: 'Reviving the legacy of Rajasthani arts, culture, and cinema through vision, unity, and structured development.',
  keywords: 'Rajasthan, Arts, Culture, Cinema, IIFFCA, Film Festival, Regional Cinema, Folk Art, Heritage',
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