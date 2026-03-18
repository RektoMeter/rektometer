'use client';

const steps = [
  {
    number: '01',
    title: 'Add a Project',
    desc: 'Create a new project for each airdrop you are farming. Give it a name and categorize it ; L1, L2, DeFi, NFT, GameFi, or Other.',
    tip: 'Example: "Arbitrum" → Type: L2',
  },
  {
    number: '02',
    title: 'Add Your Wallets',
    desc: 'Add each wallet you use for the project. Name them clearly so you can track performance per wallet independently.',
    tip: 'Example: Wallet 1 (main), Wallet 2 (burner)',
  },
  {
    number: '03',
    title: 'Log Your Holdings',
    desc: 'Search for the asset you used as capital (ETH, SOL, etc). Enter the quantity and your buy price. RektoMeter pulls live prices from Pyth Network automatically.',
    tip: 'Live price auto-fills — or enter your actual buy price manually',
  },
  {
    number: '04',
    title: 'Track Every Expense',
    desc: 'Log every cost: gas fees, bridge fees, swap fees. Add a date and note for each. These are your real operational costs.',
    tip: 'Example: Mar 17 · Bridge to Arbitrum · $2.50',
  },
  {
    number: '05',
    title: 'Record Any Income',
    desc: 'Did you make money along the way? Log it here; profit from trading, selling a whitelist spot, or any other gains from this project.',
    tip: 'Example: Sold WL NFT · +$200',
  },
  {
    number: '06',
    title: 'Input Airdrop Value',
    desc: 'Once you receive and sell your airdrop, enter the USD value here. RektoMeter will instantly calculate your real net P&L.',
    tip: 'Net P&L = Airdrop + Income − Expenses',
  },
];

const labels = [
  { name: 'Retro', color: '#fc8181', bg: 'rgba(252,129,129,0.1)', desc: 'Retroactive farming: no guaranteed reward, High Risk, Life Changging' },
  { name: 'Invest', color: '#63b3ed', bg: 'rgba(99,179,237,0.1)', desc: 'Capital deployed : has unrealized value, x1 x2 x3 or rekt' },
  { name: 'Yapping', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', desc: 'Discord roles, social tasks, zero capital' },
  { name: 'Testnet', color: '#68d391', bg: 'rgba(72,187,120,0.1)', desc: 'Testnet activity , minimal cost but often for fun' },
];

export default function Guide({ onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', color: '#1a1a1a' }}>

      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '0 48px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#g1)"/>
            <path d="M8 22 L8 10 L14 10 Q18 10 18 14 Q18 17 15 17.5 L19 22 L16 22 L12.5 17.8 L11 17.8 L11 22 Z" fill="white" opacity="0.95"/>
            <path d="M11 10.5 L11 15.5 L14 15.5 Q16.5 15.5 16.5 13 Q16.5 10.5 14 10.5 Z" fill="white" opacity="0.95"/>
            <path d="M20 18 L23 22 L26 18" stroke="#f6ad55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="23" cy="15" r="2" fill="#f6ad55"/>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#c05621"/><stop offset="100%" stopColor="#7b341e"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{ fontWeight: 800, fontSize: '15px', letterSpacing: '0.02em' }}>
            Rekto<span style={{ color: '#f6ad55' }}>Meter</span>
          </span>
        </div>
        <button onClick={onBack}
          style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.03em' }}>
          ← Back to App
        </button>
      </nav>

      {/* Hero */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '64px 48px' }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(246,173,85,0.1)', border: '1px solid rgba(246,173,85,0.3)', borderRadius: '999px', padding: '5px 14px', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f6ad55', display: 'inline-block' }}></span>
            <span style={{ fontSize: '11px', color: '#c05621', fontWeight: 600, letterSpacing: '0.06em' }}>REKTOMETER GUIDE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
            Track Your Airdrops<br />
            <span style={{ color: '#f6ad55', fontStyle: 'italic' }}>Like a Pro.</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.7, maxWidth: '560px', margin: '0 0 32px' }}>
            Most airdrop hunters know what they earned, but not what they spent. This guide shows you how to use RektoMeter to track every project, wallet, and expense so you always know your real P&L.
          </p>
          <div style={{ display: 'flex', gap: '32px' }}>
            {[['6', 'Steps to track'], ['4', 'Label types'], ['∞', 'Projects & wallets']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#1a1a1a' }}>{num}</div>
                <div style={{ fontSize: '12px', color: '#999', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 48px', display: 'flex', flexDirection: 'column', gap: '60px' }}>

        {/* ROI Formula */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '4px', height: '32px', background: '#f6ad55', borderRadius: '2px' }}></div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>The Real ROI Formula</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '28px', borderTop: '3px solid #f6ad55' }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Formula</div>
              <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: 2, color: '#1a1a1a' }}>
                <div><span style={{ color: '#a78bfa' }}>Net P&L</span> = Airdrop + Income − Expenses</div>
                <div><span style={{ color: '#63b3ed' }}>ROI %</span> &nbsp; = Net P&L ÷ Expenses × 100</div>
              </div>
            </div>
            <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '28px', borderTop: '3px solid #68d391' }}>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Real Example — Arbitrum</div>
              <div style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: 2, color: '#888' }}>
                <div>Expenses (gas + bridge) <span style={{ color: '#fc8181', float: 'right' }}>-$45</span></div>
                <div>Airdrop received <span style={{ color: '#68d391', float: 'right' }}>+$2,800</span></div>
                <div style={{ borderTop: '1px solid #333', marginTop: '8px', paddingTop: '8px' }}>
                  Net P&L <span style={{ color: '#68d391', float: 'right', fontWeight: 700 }}>+$2,755</span>
                </div>
                <div>ROI <span style={{ color: '#f6ad55', float: 'right', fontWeight: 700 }}>6,122%</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Step by step */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '4px', height: '32px', background: '#f6ad55', borderRadius: '2px' }}></div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>Step-by-Step Guide</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ position: 'absolute', top: '20px', right: '20px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(246,173,85,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '18px', color: '#f6ad55', fontWeight: 500 }}>↗</span>
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#f6ad55', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '12px' }}>STEP {s.number}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 10px', color: '#1a1a1a' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, margin: '0 0 16px' }}>{s.desc}</p>
                <div style={{ background: '#fafaf8', border: '1px solid #f0f0ec', borderRadius: '8px', padding: '10px 12px', fontSize: '11px', fontFamily: 'monospace', color: '#999' }}>
                  💡 {s.tip}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Labels */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '4px', height: '32px', background: '#f6ad55', borderRadius: '2px' }}></div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>Classify Your Strategy</h2>
          </div>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', lineHeight: 1.7 }}>
            Labels help you understand which airdrop strategy is most profitable for you. Each wallet can have multiple labels.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {labels.map(l => (
              <div key={l.name} style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'inline-block', fontSize: '11px', fontFamily: 'monospace', padding: '4px 12px', border: `1px solid ${l.color}`, background: l.bg, color: l.color, borderRadius: '5px', marginBottom: '12px', fontWeight: 600 }}>
                  {l.name}
                </div>
                <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: 1.6 }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pyth section */}
        <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(72,187,120,0.1)', border: '1px solid rgba(72,187,120,0.25)', borderRadius: '999px', padding: '4px 12px', marginBottom: '16px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#68d391', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
              <span style={{ fontSize: '11px', color: '#68d391', fontWeight: 600, letterSpacing: '0.05em' }}>POWERED BY PYTH</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>Live Prices, Institutional Grade</h3>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.7, margin: 0, maxWidth: '480px' }}>
              RektoMeter uses Pyth Network price feeds — data sourced directly from top exchanges and market makers like Binance, Bybit, and Jane Street. Prices update every 15 seconds so your unrealized P&L is always accurate.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
            {[['500+', 'Price feeds'], ['400ms', 'Update speed'], ['40+', 'Blockchains']].map(([num, label]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '12px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#f6ad55' }}>{num}</div>
                <div style={{ fontSize: '11px', color: '#555', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '20px 0 40px' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
            Ready to know your<br /><span style={{ color: '#f6ad55', fontStyle: 'italic' }}>real numbers?</span>
          </h3>
          <p style={{ fontSize: '14px', color: '#999', marginBottom: '28px' }}>Start tracking your first airdrop project in under 2 minutes.</p>
          <button onClick={onBack}
            style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '14px 36px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em' }}>
            Start Tracking →
          </button>
        </div>

      </div>
    </div>
  );
}