import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata = {
  title: 'RektoMeter — Your Airdrop Journal',
  description: 'Track every airdrop project, wallet, and expense. Know your real P&L powered by Pyth Price Feeds.',
  openGraph: {
    title: 'RektoMeter — Your Airdrop Journal',
    description: 'Track every airdrop project, wallet, and expense. Know your real P&L powered by Pyth Price Feeds.',
    url: 'https://rektometer.vercel.app',
    siteName: 'RektoMeter',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RektoMeter — Your Airdrop Journal',
    description: 'Track every airdrop project, wallet, and expense. Know your real P&L powered by Pyth Price Feeds.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={geistSans.className} style={{ overflowX: 'hidden', margin: 0, padding: 0, background: '#080808', WebkitFontSmoothing: 'antialiased' }}>{children}</body>
    </html>
  );
}