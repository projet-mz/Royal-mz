import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Amarck Royal International School',
  description: 'School Management System for Amarck Royal International School',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Disable Content Security Policy in development */}
        {process.env.NODE_ENV === 'development' && (
          <meta httpEquiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';" />
        )}
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                