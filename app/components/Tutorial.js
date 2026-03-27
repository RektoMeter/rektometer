'use client';
import { useState, useEffect } from 'react';

const STEPS = [
  {
    title: 'Welcome to RektoMeter! 👋',
    desc: 'Your airdrop journal — track every project, wallet, expense, and P&L in one place. Let me show you around.',
    position: 'center',
    icon: '📋',
  },
  {
    title: 'Create a Project',
    desc: 'Start by clicking "+ Add Project". Each airdrop you\'re farming gets its own project — Arbitrum, ZkSync, whatever you\'re working on.',
    position: 'bottom',
    icon: '📁',
    highlight: 'add-project',
  },
  {
    title: 'Add Your Wallets',
    desc: 'Inside each project, add your wallets. Paste your wallet address and RektoMeter will auto-detect if it\'s EVM (0x...) or SVM (Solana).',
    position: 'center',
    icon: '👛',
  },
  {
    title: 'Track Holdings with Live Prices',
    desc: 'Search any crypto asset — RektoMeter pulls real-time prices from Pyth Network. Enter your quantity and buy price to see unrealized P&L update live.',
    position: 'center',
    icon: '📈',
  },
  {
    title: 'Log Every Expense',
    desc: 'Add gas fees, bridge costs, and swap fees with date and notes. These are your real operational costs — every dollar counts.',
    position: 'center',
    icon: '💸',
  },
  {
    title: 'Record Income',
    desc: 'Made profit along the way? Log it here — profit from trading, selling whitelist spots, or any other gains from this project.',
    position: 'center',
    icon: '💰',
  },
  {
    title: 'Input Airdrop Value',
    desc: 'Once you receive and sell your airdrop, enter the USD value. Your Net P&L = Airdrop + Income − Expenses.',
    position: 'center',
    icon: '🪂',
  },
  {
    title: 'Classify with Labels',
    desc: 'Tag each wallet: Retro (retroactive farming), Invest (capital deployed), Yapping (Discord/social tasks), or Testnet (minimal cost activity).',
    position: 'center',
    icon: '🏷️',
  },
  {
    title: "You're all set! 🚀",
    desc: 'Start tracking your first airdrop project. Your data is saved automatically in your browser — no account needed.',
    position: 'center',
    icon: '✅',
  },
];

export default function Tutorial({ onDone }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;
  const isFirst = step === 0;

  const BG     = '#080808';
  const BORDER = 'rgba(255,255,255,0.07)';
  const AMBER  = '#f6ad55';
  const DIM    = 'rgba(255,255,255,0.35)';

  return (
    <>
      {/* Overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}>

        {/* Spotlight arrow for add-project */}
        {current.highlight === 'add-project' && (
          <div style={{
            position: 'fixed', bottom: '120px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            zIndex: 101,
          }}>
            <div style={{ fontSize: '24px', animation: 'bounce 1s infinite' }}>↓</div>
            <div style={{ fontSize: '11px', fontFamily: 'monospace', color: AMBER, letterSpacing: '0.1em' }}>
              CLICK HERE
            </div>
          </div>
        )}

        {/* Modal */}
        <div style={{
          background: '#0f0f0f',
          border: `1px solid ${BORDER}`,
          borderRadius: '16px',
          width: '100%',
          maxWidth: '420px',
          overflow: 'hidden',
          position: 'relative',
        }}>

          {/* Top accent */}
          <div style={{ height: '3px', background: AMBER, opacity: 0.7 }} />

          {/* Progress bar */}
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)' }}>
            <div style={{
              height: '100%', background: AMBER,
              width: `${((step + 1) / STEPS.length) * 100}%`,
              transition: 'width 0.3s',
            }} />
          </div>

          {/* Content */}
          <div style={{ padding: '28px 24px' }}>

            {/* Step counter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, letterSpacing: '0.12em' }}>
                STEP {step + 1} / {STEPS.length}
              </div>
              <button onClick={onDone}
                style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>
                Skip tutorial
              </button>
            </div>

            {/* Icon */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              background: 'rgba(246,173,85,0.1)', border: '1px solid rgba(246,173,85,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', marginBottom: '16px',
            }}>
              {current.icon}
            </div>

            {/* Title */}
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
              {current.title}
            </h3>

            {/* Description */}
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: '0 0 28px' }}>
              {current.desc}
            </p>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '20px' }}>
              {STEPS.map((_, i) => (
                <button key={i} onClick={() => setStep(i)}
                  style={{
                    width: i === step ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '999px',
                    background: i === step ? AMBER : 'rgba(255,255,255,0.15)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.2s',
                  }} />
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {!isFirst && (
                <button onClick={() => setStep(s => s - 1)}
                  style={{
                    flex: 1, padding: '11px',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${BORDER}`,
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '13px', fontWeight: 600,
                    borderRadius: '9px', cursor: 'pointer',
                    fontFamily: 'monospace',
                  }}>
                  ← Back
                </button>
              )}
              <button onClick={() => isLast ? onDone() : setStep(s => s + 1)}
                style={{
                  flex: 2, padding: '11px',
                  background: isLast ? AMBER : 'rgba(246,173,85,0.15)',
                  border: `1px solid ${isLast ? AMBER : 'rgba(246,173,85,0.3)'}`,
                  color: isLast ? '#1a0a00' : AMBER,
                  fontSize: '13px', fontWeight: 700,
                  borderRadius: '9px', cursor: 'pointer',
                  fontFamily: 'monospace', letterSpacing: '0.03em',
                }}>
                {isLast ? 'Start Tracking →' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  );
}