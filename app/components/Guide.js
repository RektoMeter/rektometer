'use client';
import { useEffect, useState } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

const steps = [
  { number: '01', title: 'Add a Project', desc: 'Create a new project for each airdrop you are farming. Give it a name and categorize it — L1, L2, DeFi, NFT, GameFi, or Other.', tip: 'Example: "Arbitrum" → Type: L2' },
  { number: '02', title: 'Add Your Wallets', desc: 'Add each wallet you use for the project. Name them clearly so you can track performance per wallet independently.', tip: 'Example: Wallet 1 (main), Wallet 2 (burner)' },
  { number: '03', title: 'Log Your Holdings', desc: 'Search for the asset you used as capital. Enter quantity and buy price. RektoMeter pulls live prices from Pyth Network automatically.', tip: 'Live price auto-fills — or enter your actual buy price manually' },
  { number: '04', title: 'Track Every Expense', desc: 'Log every cost: gas fees, bridge fees, swap fees. Add a date and note for each. These are your real operational costs.', tip: 'Example: Mar 17 · Bridge to Arbitrum · $2.50' },
  { number: '05', title: 'Record Any Income', desc: 'Log profits from trading, selling a whitelist spot, or any other gains from this project.', tip: 'Example: Sold WL NFT · +$200' },
  { number: '06', title: 'Input Airdrop Value', desc: 'Once you receive and sell your airdrop, enter the USD value. RektoMeter instantly calculates your real net P&L.', tip: 'Net P&L = Airdrop + Income − Expenses' },
];

const labels = [
  { name: 'Retro',   color: '#fc8181', bg: 'rgba(252,129,129,0.1)', desc: 'Retroactive farming — no guaranteed reward' },
  { name: 'Invest',  color: '#63b3ed', bg: 'rgba(99,179,237,0.1)',  desc: 'Capital deployed — has unrealized value' },
  { name: 'Yapping', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', desc: 'Discord roles, social tasks — zero capital' },
  { name: 'Testnet', color: '#68d391', bg: 'rgba(72,187,120,0.1)',  desc: 'Testnet activity — minimal cost' },
];

export default function Guide({ onBack }) {
  const isMobile = useIsMobile();
  const p = isMobile ? '16px' : '48px';

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', color: '#1a1a1a' }}>

      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #eee', padding: `0 ${p}`, height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#gg)"/>
            <path d="M8 22 L8 10 L14 10 Q18 10 18 14 Q18 17 15 17.5 L19 22 L16 22 L12.5 17.8 L11 17.8 L11 22 Z" fill="white" opacity="0.95"/>
            <path d="M11 10.5 L11 15.5 L14 15.5 Q16.5 15.5 16.5 13 Q16.5 10.5 14 10.5 Z" fill="white" opacity="0.95"/>
            <path d="M20 18 L23 22 L26 18" stroke="#f6ad55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="23" cy="15" r="2" fill="#f6ad55"/>
            <defs>
              <linearGradient id="gg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#c05621"/><stop offset="100%" stopColor="#7b341e"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '0.02em' }}>
            Rekto<span style={{ color: '#f6ad55' }}>Meter</span>
          </span>
        </div>
        <button onClick={onBack}
          style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '7px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
          ← Back
        </button>
      </nav>

      {/* Hero */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: isMobile ? '40px 16px' : '64px 48px' }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(246,173,85,0.1)', border: '1px solid rgba(246,173,85,0.3)', borderRadius: '999px', padding: '5px 14px', marginBottom: '20px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f6ad55', display: 'inline-block' }}></span>
            <span style={{ fontSize: '11px', color: '#c05621', fontWeight: 600, letterSpacing: '0.06em' }}>REKTOMETER GUIDE</span>
          </div>
          <h1 style={{ fontSize: isMobile ? '2rem' : 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Track Your Airdrops<br />
            <span style={{ color: '#f6ad55', fontStyle: 'italic' }}>Like a Pro.</span>
          </h1>
          <p style={{ fontSize: isMobile ? '14px' : '16px', color: '#666', lineHeight: 1.7, maxWidth: '560px', margin: '0 0 28px' }}>
            Most airdrop hunters know what they earned — but not what they spent. This guide shows you how to use RektoMeter to track every project, wallet, and expense so you always know your real P&L.
          </p>
          <div style={{ display: 'flex', gap: isMobile ? '20px' : '32px' }}>
            {[['6', 'Steps'], ['4', 'Categories'], ['∞', 'Wallets']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 900, color: '#1a1a1a' }}>{num}</div>
                <div style={{ fontSize: '11px', color: '#999', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '32px 16px' : '60px 48px', display: 'flex', flexDirection: 'column', gap: isMobile ? '40px' : '60px' }}>

        {/* ROI Formula */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '4px', height: '28px', background: '#f6ad55', borderRadius: '2px' }}></div>
            <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: 900, margin: 0 }}>The Real ROI Formula</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '24px', borderTop: '3px solid #f6ad55' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Formula</div>
              <div style={{ fontFamily: 'monospace', fontSize: isMobile ? '13px' : '14px', lineHeight: 2, color: '#1a1a1a' }}>
                <div><span style={{ color: '#a78bfa' }}>Net P&L</span> = Airdrop + Income − Expenses</div>
                <div><span style={{ color: '#63b3ed' }}>ROI %</span> &nbsp;= Net P&L ÷ Expenses × 100</div>
              </div>
            </div>
            <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '24px', borderTop: '3px solid #68d391' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Real Example — Arbitrum</div>
              <div style={{ fontFamily: 'monospace', fontSize: isMobile ? '12px' : '13px', lineHeight: 2, color: '#888' }}>
                <div>Expenses <span style={{ color: '#fc8181', float: 'right' }}>-$45</span></div>
                <div>Airdrop received <span style={{ color: '#68d391', float: 'right' }}>+$2,800</span></div>
                <div style={{ borderTop: '1px solid #333', marginTop: '8px', paddingTop: '8px' }}>
                  Net P&L <span style={{ color: '#68d391', float: 'right', fontWeight: 700 }}>+$2,755</span>
                </div>
                <div>ROI <span style={{ color: '#f6ad55', float: 'right', fontWeight: 700 }}>6,122%</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '4px', height: '28px', background: '#f6ad55', borderRadius: '2px' }}></div>
            <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: 900, margin: 0 }}>Step-by-Step Guide</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '12px' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(246,173,85,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '14px', color: '#f6ad55' }}>↗</span>
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#f6ad55', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '10px' }}>STEP {s.number}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, margin: '0 0 8px', color: '#1a1a1a' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, margin: '0 0 12px' }}>{s.desc}</p>
                <div style={{ background: '#fafaf8', border: '1px solid #f0f0ec', borderRadius: '8px', padding: '8px 10px', fontSize: '11px', fontFamily: 'monospace', color: '#999' }}>
                  💡 {s.tip}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Labels */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '4px', height: '28px', background: '#f6ad55', borderRadius: '2px' }}></div>
            <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: 900, margin: 0 }}>Classify Your Strategy</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
            {labels.map(l => (
              <div key={l.name} style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'inline-block', fontSize: '11px', fontFamily: 'monospace', padding: '3px 10px', border: `1px solid ${l.color}`, background: l.bg, color: l.color, borderRadius: '5px', marginBottom: '10px', fontWeight: 600 }}>
                  {l.name}
                </div>
                <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: 1.6 }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pyth section */}
        <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: isMobile ? '28px 20px' : '40px 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(72,187,120,0.1)', border: '1px solid rgba(72,187,120,0.25)', borderRadius: '999px', padding: '4px 12px', marginBottom: '14px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#68d391', display: 'inline-block' }}></span>
            <span style={{ fontSize: '11px', color: '#68d391', fontWeight: 600, letterSpacing: '0.05em' }}>POWERED BY PYTH</span>
          </div>
          <h3 style={{ fontSize: isMobile ? '1.2rem' : '1.4rem', fontWeight: 900, color: '#fff', margin: '0 0 10px' }}>Live Prices, Institutional Grade</h3>
          <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.7, margin: '0 0 20px', maxWidth: '480px' }}>
            RektoMeter uses Pyth Network price feeds — data sourced directly from top exchanges and market makers like Binance, Bybit, and Jane Street. Prices update every 15 seconds.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {[['500+', 'Price feeds'], ['400ms', 'Update speed'], ['40+', 'Blockchains']].map(([num, label]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: isMobile ? '12px 8px' : '12px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '16px' : '20px', fontWeight: 900, color: '#f6ad55' }}>{num}</div>
                <div style={{ fontSize: '10px', color: '#555', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '10px 0 32px' }}>
          <h3 style={{ fontSize: isMobile ? '1.4rem' : '1.8rem', fontWeight: 900, margin: '0 0 10px', letterSpacing: '-0.01em' }}>
            Ready to know your<br /><span style={{ color: '#f6ad55', fontStyle: 'italic' }}>real numbers?</span>
          </h3>
          <p style={{ fontSize: '13px', color: '#999', marginBottom: '24px' }}>Start tracking your first airdrop project in under 2 minutes.</p>
          <button onClick={onBack}
            style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '13px 32px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
            Start Tracking →
          </button>
        </div>

      </div>
    </div>
  );
}