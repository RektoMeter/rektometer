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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}