'use client';
import { useEffect, useState, useRef } from 'react';

const AMBER  = '#f6ad55';
const BORDER = 'rgba(255,255,255,0.07)';
const DIM    = 'rgba(255,255,255,0.35)';

export default function Tour({ steps, currentStep, onSkip, onDone, onNext }) {
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0, placement: 'bottom' });
  const step = steps[currentStep];

  useEffect(() => {
    if (!step?.target) return;
    const el = document.querySelector(`[data-tour="${step.target}"]`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const windowW = window.innerWidth;

    // Scroll element into view
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      const r = el.getBoundingClientRect();
      const tooltipW = Math.min(320, windowW - 32);
      const spaceBelow = windowH - r.bottom;
      const placement = spaceBelow > 200 ? 'bottom' : 'top';

      let left = r.left + r.width / 2 - tooltipW / 2;
      left = Math.max(16, Math.min(left, windowW - tooltipW - 16));

      const top = placement === 'bottom'
        ? r.bottom + 12
        : r.top - 12;

      setTooltipPos({ top, left, placement, width: tooltipW, elRect: r });
    }, 300);
  }, [currentStep, step]);

  if (!step) return null;

  const elRect = tooltipPos.elRect;

  return (
    <>
      {/* Overlay with cutout */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none' }}>
        {elRect ? (
          <>
            {/* Top */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: Math.max(0, elRect.top - 6), background: 'rgba(0,0,0,0.7)', pointerEvents: 'auto' }} onClick={e => e.stopPropagation()} />
            {/* Bottom */}
            <div style={{ position: 'absolute', top: elRect.bottom + 6, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', pointerEvents: 'auto' }} onClick={e => e.stopPropagation()} />
            {/* Left */}
            <div style={{ position: 'absolute', top: elRect.top - 6, left: 0, width: Math.max(0, elRect.left - 6), height: elRect.height + 12, background: 'rgba(0,0,0,0.7)', pointerEvents: 'auto' }} onClick={e => e.stopPropagation()} />
            {/* Right */}
            <div style={{ position: 'absolute', top: elRect.top - 6, left: elRect.right + 6, right: 0, height: elRect.height + 12, background: 'rgba(0,0,0,0.7)', pointerEvents: 'auto' }} onClick={e => e.stopPropagation()} />
            {/* Highlight ring */}
            <div style={{ position: 'absolute', top: elRect.top - 6, left: elRect.left - 6, width: elRect.width + 12, height: elRect.height + 12, border: `2px solid ${AMBER}`, borderRadius: '10px', boxShadow: `0 0 0 4px rgba(246,173,85,0.15)`, pointerEvents: 'none' }} />
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', pointerEvents: 'auto' }} onClick={e => e.stopPropagation()} />
        )}
      </div>

      {/* Tooltip */}
      <div style={{
        position: 'fixed',
        top: tooltipPos.top,
        left: tooltipPos.left,
        width: tooltipPos.width || 320,
        zIndex: 201,
        background: '#0f0f0f',
        border: `1px solid ${BORDER}`,
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}>
        {/* Amber top bar */}
        <div style={{ height: '3px', background: AMBER }} />

        {/* Progress */}
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.05)' }}>
          <div style={{ height: '100%', background: AMBER, width: `${((currentStep + 1) / steps.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>

        <div style={{ padding: '18px 18px 16px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(246,173,85,0.1)', border: '1px solid rgba(246,173,85,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                {step.icon}
              </div>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: AMBER, letterSpacing: '0.1em' }}>
                STEP {currentStep + 1} / {steps.length}
              </div>
            </div>
            <button onClick={onSkip}
              style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, background: 'none', border: 'none', cursor: 'pointer' }}>
              Skip all
            </button>
          </div>

          {/* Title */}
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff', marginBottom: '6px', letterSpacing: '-0.01em' }}>
            {step.title}
          </div>

          {/* Desc */}
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: '0 0 14px' }}>
            {step.desc}
          </p>

          {/* Action hint */}
          {step.action && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(246,173,85,0.06)', border: '1px solid rgba(246,173,85,0.15)', borderRadius: '7px', padding: '7px 10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px' }}>👆</span>
              <span style={{ fontSize: '11px', fontFamily: 'monospace', color: AMBER }}>{step.action}</span>
            </div>
          )}

          {/* Dots */}
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '12px' }}>
            {steps.map((_, i) => (
              <div key={i} style={{ width: i === currentStep ? '16px' : '5px', height: '5px', borderRadius: '999px', background: i === currentStep ? AMBER : 'rgba(255,255,255,0.12)', transition: 'all 0.2s' }} />
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={onSkip}
              style={{ flex: 1, padding: '9px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`, color: DIM, fontSize: '12px', fontWeight: 600, borderRadius: '8px', cursor: 'pointer', fontFamily: 'monospace' }}>
              Skip step
            </button>
            <button onClick={onNext}
              style={{ flex: 2, padding: '9px', background: 'rgba(246,173,85,0.12)', border: `1px solid rgba(246,173,85,0.3)`, color: AMBER, fontSize: '12px', fontWeight: 700, borderRadius: '8px', cursor: 'pointer', fontFamily: 'monospace' }}>
              {currentStep === steps.length - 1 ? 'Done! 🎉' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}