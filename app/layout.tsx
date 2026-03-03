import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  metadataBase: new URL('https://john-eric-portfolio.vercel.app'),
  title: {
    default: 'John Eric — Designer & Editor',
    template: '%s | John Eric'
  },
  description: 'Portfolio of John Eric: Graphic Design, Video Editing, UI/UX, Motion and Music Production.',
  openGraph: {
    title: 'John Eric — Designer & Editor',
    description: 'Premium creative portfolio for ecommerce, motion and product design.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} min-h-screen font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
