'use client';
import Logo from './Logo';

// Warm dark ramp, amber stays the one accent
const C = {
  bg:       '#12110f',
  card:     '#1a1916',
  raised:   '#24221e',
  line:     'rgba(239,233,222,0.08)',
  text:     '#efe9de',
  text2:    '#aaa398',
  muted:    '#8a847a',
  amber:    '#f6ad55',
  onAmber:  '#1f1408',
  positive: '#4cc38a',
  negative: '#e5484d',
};

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';

// Sample ledger for the preview, sums to the net figure shown
const SAMPLE = [
  { name: 'Linea',          type: 'L2', status: 'Done',    wallets: 3, net:  512.40 },
  { name: 'Scroll',         type: 'L2', status: 'Done',    wallets: 2, net:  128.10 },
  { name: 'MegaETH',        type: 'L2', status: 'Waiting', wallets: 3, net: -212.30 },
  { name: 'pointsfarm.xyz', type: 'DeFi', status: 'Rugged', wallets: 1, net:  -86.30 },
];

const usd = (n) => `${n < 0 ? '−' : '+'}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const FEATURES = ['Multi-wallet tracking', 'Live Pyth prices', 'Airdrop P&L', 'Expense logging'];

function Preview() {
  const net = SAMPLE.reduce((s, p) => s + p.net, 0);
  return (
    <div className="rk-preview" style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: '16px', padding: '24px', boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '13px', color: C.text2 }}>Net P&amp;L, all projects</span>
        <span style={{ fontSize: '12px', color: C.muted, fontFamily: MONO }}>4 projects · 9 wallets</span>
      </div>

      <div style={{ fontSize: '40px', lineHeight: 1, fontWeight: 500, color: C.text, marginTop: '12px', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>
        {usd(net)}
      </div>
      <div style={{ fontSize: '12px', color: C.muted, fontFamily: MONO, marginTop: '8px', fontVariantNumeric: 'tabular-nums' }}>
        $1,180.00 airdrops + $36.00 income − $874.10 spent
      </div>

      {/* The meter: where you landed between rekt and paid off */}
      <div style={{ marginTop: '24px' }}>
        <div style={{ position: 'relative', height: '4px', borderRadius: '2px', background: C.raised }}>
          <div style={{ position: 'absolute', left: '50%', top: '-4px', width: '1px', height: '12px', background: C.line }} />
          <div style={{ position: 'absolute', left: '50%', width: '20%', height: '4px', background: C.amber, borderRadius: '0 2px 2px 0' }} />
          <div style={{ position: 'absolute', left: 'calc(70% - 1px)', top: '-6px', width: '2px', height: '16px', borderRadius: '1px', background: C.amber }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', fontFamily: MONO, color: C.muted }}>
          <span>rekt</span><span>break even</span><span>paid off</span>
        </div>
      </div>

      <div style={{ marginTop: '24px', borderTop: `1px solid ${C.line}` }}>
        {SAMPLE.map(p => (
          <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: '16px', height: '44px', borderBottom: `1px solid ${C.line}` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', minWidth: 0 }}>
              <span style={{ fontSize: '14px', color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
              <span style={{ fontSize: '12px', color: C.muted, fontFamily: MONO }}>{p.type} · {p.wallets}w</span>
            </div>
            <span style={{ fontSize: '12px', color: p.status === 'Rugged' ? C.negative : C.text2 }}>{p.status}</span>
            <span style={{ fontSize: '14px', width: '88px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: p.net < 0 ? C.negative : C.positive }}>{usd(p.net)}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '16px', fontSize: '12px', color: C.muted, fontFamily: MONO }}>
        Prices from Pyth, refreshed every 15s
      </div>
    </div>
  );
}

export default function Landing({ onNext, onGuide }) {
  return (
    <div className="rk-landing" style={{ minHeight: '100vh', background: C.bg, color: C.text, display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .rk-landing button { font-family: inherit; transition: background-color 150ms cubic-bezier(0.22,1,0.36,1), transform 150ms cubic-bezier(0.22,1,0.36,1); }
        .rk-landing button:active { transform: scale(0.98); }
        .rk-landing button:focus-visible { outline: 2px solid ${C.amber}; outline-offset: 2px; }
        .rk-primary:hover { background: #f8bb6e !important; }
        .rk-secondary:hover, .rk-nav-btn:hover { background: ${C.raised} !important; }
        .rk-hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 64px; align-items: center; }
        .rk-h1 { font-size: 64px; line-height: 1.04; letter-spacing: -0.03em; }
        .rk-page { padding: 0 32px; }
        @media (max-width: 900px) {
          .rk-hero { grid-template-columns: 1fr; gap: 48px; }
          .rk-h1 { font-size: 40px; letter-spacing: -0.02em; }
          .rk-page { padding: 0 20px; }
          .rk-features { flex-wrap: wrap; gap: 8px 24px !important; }
        }
      `}</style>

      {/* Nav */}
      <nav className="rk-page" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Logo size={28} />
          <span style={{ fontWeight: 600, fontSize: '16px' }}>RektoMeter</span>
        </div>
        <button className="rk-nav-btn" onClick={onNext} style={{ height: '36px', padding: '0 16px', borderRadius: '8px', background: 'transparent', border: `1px solid ${C.line}`, color: C.text, fontSize: '14px', cursor: 'pointer' }}>
          Open app
        </button>
      </nav>

      {/* Hero */}
      <main className="rk-page" style={{ flex: 1, display: 'flex', alignItems: 'center', maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box', paddingTop: '48px', paddingBottom: '64px' }}>
        <div className="rk-hero" style={{ width: '100%' }}>
          <div>
            <h1 className="rk-h1" style={{ margin: 0, fontWeight: 500, color: C.text }}>
              Find out which airdrops actually paid off
            </h1>
            <p style={{ fontSize: '18px', lineHeight: '28px', color: C.text2, margin: '24px 0 0', maxWidth: '34rem' }}>
              Log every project, wallet and fee you spend farming. RektoMeter nets it against what the airdrop paid, with live prices from Pyth.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '40px', flexWrap: 'wrap' }}>
              <button className="rk-primary" onClick={onNext} style={{ height: '48px', padding: '0 20px', borderRadius: '10px', background: C.amber, color: C.onAmber, border: 'none', fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
                Start tracking
              </button>
              <button className="rk-secondary" onClick={() => onGuide && onGuide()} style={{ height: '48px', padding: '0 20px', borderRadius: '10px', background: C.card, color: C.text, border: `1px solid ${C.line}`, fontSize: '15px', cursor: 'pointer' }}>
                How it works
              </button>
            </div>
          </div>

          <Preview />
        </div>
      </main>

      {/* Features */}
      <div className="rk-page" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <div className="rk-features" style={{ display: 'flex', gap: '40px', borderTop: `1px solid ${C.line}`, padding: '20px 0 24px' }}>
          {FEATURES.map(f => (
            <span key={f} style={{ fontSize: '13px', color: C.text2 }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
