'use client';

const AMBER  = '#f6ad55';
const BORDER = 'rgba(255,255,255,0.07)';
const DIM    = 'rgba(255,255,255,0.35)';

export default function Tour({ steps, currentStep, onNext, onBack, onSkip, onDone }) {
  const step   = steps[currentStep];
  const isLast  = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;
  if (!step) return null;

  const PANEL_HEIGHT = 320;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>

      {/* Overlay — atas saja, tidak nutup panel bawah */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        bottom: PANEL_HEIGHT,
        background: 'rgba(0,0,0,0.65)',
        pointerEvents: 'auto',
      }} />

      {/* Panel bawah — selalu bisa diklik */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: PANEL_HEIGHT,
        background: '#0f0f0f',
        borderTop: `2px solid ${AMBER}`,
        boxShadow: '0 -8px 40px rgba(0,0,0,0.8)',
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 20px 32px',
        gap: '12px',
      }}>

        {/* Progress bar */}
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', flexShrink: 0 }}>
          <div style={{ height: '100%', background: AMBER, borderRadius: '2px', width: `${((currentStep + 1) / steps.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(246,173,85,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>{step.icon}</div>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: AMBER, letterSpacing: '0.1em' }}>STEP {currentStep + 1} / {steps.length}</span>
          </div>
          <button onClick={onSkip} style={{ fontSize: '12px', fontFamily: 'monospace', color: DIM, background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            Skip all ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{step.title}</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
          {step.action && (
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(246,173,85,0.06)', border: '1px solid rgba(246,173,85,0.2)', borderRadius: '7px', padding: '6px 10px' }}>
              <span style={{ fontSize: '12px' }}>👆</span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: AMBER }}>{step.action}</span>
            </div>
          )}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexShrink: 0 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: i === currentStep ? '18px' : '5px', height: '5px', borderRadius: '999px', background: i === currentStep ? AMBER : 'rgba(255,255,255,0.15)', transition: 'all 0.2s' }} />
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          {!isFirst && (
            <button onClick={onBack} style={{ flex: 1, padding: '13px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${BORDER}`, color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, borderRadius: '10px', cursor: 'pointer', fontFamily: 'monospace' }}>
              ← Back
            </button>
          )}
          <button onClick={isLast ? onDone : onNext} style={{ flex: 2, padding: '13px', background: isLast ? AMBER : 'rgba(246,173,85,0.15)', border: `1px solid ${isLast ? AMBER : 'rgba(246,173,85,0.4)'}`, color: isLast ? '#1a0a00' : AMBER, fontSize: '14px', fontWeight: 700, borderRadius: '10px', cursor: 'pointer', fontFamily: 'monospace' }}>
            {isLast ? '🚀 Start Tracking' : 'Next →'}
          </button>
        </div>

      </div>
    </div>
  );
}