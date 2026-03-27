'use client';

const AMBER  = '#f6ad55';
const BORDER = 'rgba(255,255,255,0.07)';
const DIM    = 'rgba(255,255,255,0.35)';

export default function Tour({ steps, currentStep, onNext, onBack, onSkip, onDone }) {
  const step = steps[currentStep];
  if (!step) return null;
  const isLast  = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)' }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201, background: '#0f0f0f', border: `1px solid ${BORDER}`, borderRadius: '16px 16px 0 0', overflow: 'hidden', boxShadow: '0 -8px 40px rgba(0,0,0,0.6)' }}>
        <div style={{ height: '3px', background: AMBER }} />
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{ height: '100%', background: AMBER, width: `${((currentStep + 1) / steps.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
        <div style={{ padding: '20px 20px 36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(246,173,85,0.1)', border: '1px solid rgba(246,173,85,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>{step.icon}</div>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: AMBER, letterSpacing: '0.1em' }}>STEP {currentStep + 1} / {steps.length}</div>
            </div>
            <button onClick={onSkip} style={{ fontSize: '11px', fontFamily: 'monospace', color: DIM, background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>Skip all</button>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{step.title}</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: '0 0 14px' }}>{step.desc}</p>
          {step.action && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(246,173,85,0.06)', border: '1px solid rgba(246,173,85,0.15)', borderRadius: '8px', padding: '8px 12px', marginBottom: '16px' }}>
              <span>👆</span>
              <span style={{ fontSize: '12px', fontFamily: 'monospace', color: AMBER }}>{step.action}</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '16px' }}>
            {steps.map((_, i) => <div key={i} style={{ width: i === currentStep ? '20px' : '6px', height: '6px', borderRadius: '999px', background: i === currentStep ? AMBER : 'rgba(255,255,255,0.15)', transition: 'all 0.2s' }} />)}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {!isFirst && (
              <button onClick={onBack} style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`, color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 600, borderRadius: '10px', cursor: 'pointer', fontFamily: 'monospace' }}>← Back</button>
            )}
            <button onClick={isLast ? onDone : onNext} style={{ flex: 2, padding: '12px', background: isLast ? AMBER : 'rgba(246,173,85,0.12)', border: `1px solid ${isLast ? AMBER : 'rgba(246,173,85,0.3)'}`, color: isLast ? '#1a0a00' : AMBER, fontSize: '13px', fontWeight: 700, borderRadius: '10px', cursor: 'pointer', fontFamily: 'monospace' }}>
              {isLast ? 'Start Tracking →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}