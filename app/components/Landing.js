'use client';

export default function Landing({ onNext, onGuide }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Glow background */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(180,80,20,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Nav */}
      <nav style={{
  position: 'absolute',
  top: 0, left: 0, right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 40px',
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="url(#grad)"/>
      <path d="M8 22 L8 10 L14 10 Q18 10 18 14 Q18 17 15 17.5 L19 22 L16 22 L12.5 17.8 L11 17.8 L11 22 Z" fill="white" opacity="0.95"/>
      <path d="M11 10.5 L11 15.5 L14 15.5 Q16.5 15.5 16.5 13 Q16.5 10.5 14 10.5 Z" fill="white" opacity="0.95"/>
      <path d="M20 18 L23 22 L26 18" stroke="#f6ad55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="23" cy="15" r="2" fill="#f6ad55"/>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c05621"/>
          <stop offset="100%" stopColor="#7b341e"/>
        </linearGradient>
      </defs>
    </svg>
    <span style={{ fontWeight: 800, fontSize: '15px', color: '#fff', letterSpacing: '0.02em' }}>
      Rekto<span style={{ color: '#f6ad55' }}>Meter</span>
    </span>
  </div>
  <button onClick={onNext} style={{
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#fff',
    fontSize: '12px',
    padding: '8px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 500,
    letterSpacing: '0.03em',
  }}>
    Open App ↗
  </button>
</nav>

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(246,173,85,0.1)',
          border: '1px solid rgba(246,173,85,0.25)',
          borderRadius: '999px',
          padding: '5px 14px',
          marginBottom: '32px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f6ad55', display: 'inline-block' }}></span>
          <span style={{ fontSize: '11px', color: '#f6ad55', letterSpacing: '0.06em', fontWeight: 500 }}>Powered by Pyth Price Feeds</span>
        </div>

        {/* Headline */}
        <h1 style={{ margin: '0 0 16px', lineHeight: 1.1 }}>
          <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
            Track Every
          </span>
          <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900, fontStyle: 'italic', color: '#f6ad55', letterSpacing: '-0.02em' }}>
            Airdrop.
          </span>
          <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
            Know Your P&L
          </span>
        </h1>

        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: '0 auto 40px', maxWidth: '480px' }}>
          Your airdrop journal - track wallets, expenses, income, and real time holdings powered by Pyth Price Feeds.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={onNext} style={{
            background: '#f6ad55',
            color: '#1a0a00',
            border: 'none',
            padding: '13px 28px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}>
            Start Tracking ↗
          </button>
          <button onClick={() => onGuide && onGuide()}
  style={{
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '13px 28px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
  }}>
  Learn More
</button>
        </div>

        {/* Features strip */}
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '48px' }}>
          {['Multi-wallet tracking', 'Live Pyth prices', 'Airdrop P&L', 'Expense logging'].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#f6ad55', display: 'inline-block' }}></span>
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}