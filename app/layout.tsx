import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Caveat } from 'next/font/google';
import { PaperCanvas, CustomCursor } from '@/components/paper-kit';
import { ClientMotionConfig } from '@/components/client-config';

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

const hand = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shreyanbuilds.vercel.app'),
  title: 'Shreyan Yemul — Computer Engineering Student & AI Full-Stack Developer',
  description:
    'Computer Engineering Student at Walchand Institute of Technology (WIT), Solapur. Architecting and shipping production-ready web applications, complex multi-table SaaS MVPs, and modern full-stack systems.',
  openGraph: {
    title: 'Shreyan Yemul — Computer Engineering Student & AI Full-Stack Developer',
    description:
      'Computer Engineering Student at Walchand Institute of Technology (WIT), Solapur. Architecting and shipping production-ready web applications, complex multi-table SaaS MVPs, and modern full-stack systems.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable} ${hand.variable}`}>
      <body className="font-sans antialiased">
        <ClientMotionConfig>
          <PaperCanvas />
          <CustomCursor />
          {children}
        </ClientMotionConfig>
      </body>
    </html>
  );
}
