'use client';
import React, { useState, useEffect } from 'react';
import Tour from './tour';

const STATUS_OPTIONS = ['Active', 'Waiting', 'Done', 'Rugged'];
const PROJECT_TYPES  = ['L1', 'L2', 'DeFi', 'NFT', 'GameFi', 'Other'];
const AIRDROP_LABELS = ['Retro', 'Invest', 'Yapping', 'Testnet'];

const STATUS_STYLE = {
  Active:  { bg: 'rgba(72,187,120,0.1)',  color: '#68d391', border: 'rgba(72,187,120,0.25)' },
  Waiting: { bg: 'rgba(246,173,85,0.1)',  color: '#f6ad55', border: 'rgba(246,173,85,0.25)' },
  Done:    { bg: 'rgba(99,179,237,0.1)',  color: '#63b3ed', border: 'rgba(99,179,237,0.25)' },
  Rugged:  { bg: 'rgba(252,129,129,0.1)', color: '#fc8181', border: 'rgba(252,129,129,0.25)' },
};

const LABEL_STYLE = {
  Retro:   { bg: 'rgba(252,129,129,0.1)', color: '#fc8181', border: 'rgba(252,129,129,0.2)' },
  Invest:  { bg: 'rgba(99,179,237,0.1)',  color: '#63b3ed', border: 'rgba(99,179,237,0.2)' },
  Yapping: { bg: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: 'rgba(167,139,250,0.2)' },
  Testnet: { bg: 'rgba(72,187,120,0.1)',  color: '#68d391', border: 'rgba(72,187,120,0.2)' },
};

const emptyEntry   = () => ({ id: Date.now() + Math.random(), date: new Date().toISOString().split('T')[0], note: '', amount: '' });
const emptyWallet  = (n = 1) => ({ id: Date.now() + Math.random(), name: `Wallet ${n}`, address: '', walletType: '', assetSymbol: '', assetFeedId: '', assetQty: '', assetPrice: '', expenses: [], showExpenses: false, incomes: [], showIncomes: false, airdropValue: '', airdropLabels: [], status: 'Active' });
const emptyProject = () => ({ id: Date.now(), name: '', type: 'L2', open: true, wallets: [emptyWallet(1)] });

const BG     = '#080808';
const BG2    = '#0f0f0f';
const BG3    = '#141414';
const BORDER = 'rgba(255,255,255,0.07)';
const MUTED  = 'rgba(255,255,255,0.6)';
const DIM    = 'rgba(255,255,255,0.35)';
const AMBER  = '#f6ad55';
const GREEN  = '#68d391';
const RED    = '#fc8181';
const PURPLE = '#a78bfa';

const TOUR_STEPS = [
  { icon: '📋', title: 'Welcome to RektoMeter!', desc: 'Your airdrop journal. Let me show you around in a few quick steps — or skip anytime.', target: null, action: null },
  { icon: '📁', title: 'Create your first project', desc: 'Click "+ Add Project" below to start tracking a new airdrop. Each airdrop gets its own project.', target: 'add-project', action: 'Click "+ Add Project"' },
  { icon: '✏️', title: 'Name your project', desc: 'Type the name of the airdrop you\'re farming — e.g. "Arbitrum", "ZkSync", "Fogo".', target: 'project-name', action: 'Type a project name' },
  { icon: '👛', title: 'Add a wallet', desc: 'Click "+ Add wallet" to add a wallet for this project. Paste your address and RektoMeter auto-detects EVM or SVM.', target: 'add-wallet', action: 'Click "+ Add wallet"' },
  { icon: '🔍', title: 'Search your asset', desc: 'Search the crypto you used as capital — ETH, SOL, etc. Live prices are pulled from Pyth Network automatically.', target: 'asset-search', action: 'Search an asset (e.g. ETH)' },
  { icon: '💸', title: 'Log an expense', desc: 'Click "+ Add expense" to track gas fees, bridge costs, or swap fees. Add a date and note for each.', target: 'add-expense', action: 'Click "+ Add expense"' },
  { icon: '🪂', title: 'Enter airdrop value', desc: 'Once you receive and sell your airdrop, enter the USD value here. Net P&L = Airdrop + Income − Expenses.', target: 'airdrop-input', action: 'Enter airdrop value in USD' },
  { icon: '✅', title: "You're all set!", desc: 'Everything saves automatically in your browser. Come back anytime to update your P&L as prices move.', target: null, action: null },
];

function detectWalletType(address) {
  if (!address) return '';
  if (/^0x[0-9a-fA-F]{40}$/.test(address.trim())) return 'EVM';
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address.trim())) return 'SVM';
  return '';
}

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

function ExpenseRow({ exp, pid, wid, field, color, onUpdate, onDelete, inp }) {
  const [localDate,   setLocalDate]   = useState(exp.date   || '');
  const [localNote,   setLocalNote]   = useState(exp.note   || '');
  const [localAmount, setLocalAmount] = useState(exp.amount || '');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '8px' }}>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <input type="date" value={localDate} onChange={e => setLocalDate(e.target.value)} onBlur={() => onUpdate(pid, wid, exp.id, 'date', localDate, field)} style={{ ...inp({ flex: 1 }), fontSize: '11px' }} />
        <input type="number" inputMode="decimal" value={localAmount} onChange={e => setLocalAmount(e.target.value)} onBlur={() => onUpdate(pid, wid, exp.id, 'amount', localAmount, field)} placeholder="$0" style={{ ...inp({ width: '70px' }), color, fontSize: '12px' }} />
        <button onClick={() => onDelete(pid, wid, exp.id)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '14px', padding: '0 4px' }}>✕</button>
      </div>
      <input type="text" value={localNote} onChange={e => setLocalNote(e.target.value)} onBlur={() => onUpdate(pid, wid, exp.id, 'note', localNote, field)} placeholder="Note (e.g. gas fee bridge)" style={{ ...inp({ width: '100%' }), fontSize: '11px' }} />
    </div>
  );
}

export default function Dashboard({ onReset }) {
  const [projects, setProjects]             = useState(() => { if (typeof window === 'undefined') return []; try { return JSON.parse(localStorage.getItem('rektometer_v3') || '[]'); } catch { return []; } });
  const [allFeeds, setAllFeeds]             = useState([]);
  const [prices, setPrices]                 = useState({});
  const [searchState, setSearchState]       = useState({});
  const [expandedWallet, setExpandedWallet] = useState(null);
  const [showTour, setShowTour]             = useState(() => { if (typeof window === 'undefined') return false; return !localStorage.getItem('rektometer_tour_done'); });
  const [tourStep, setTourStep]             = useState(0);
  const isMobile = useIsMobile();

  const handleTourNext = () => {
    if (tourStep === TOUR_STEPS.length - 1) { localStorage.setItem('rektometer_tour_done', 'true'); setShowTour(false); }
    else setTourStep(s => s + 1);
  };
  const handleTourSkip = () => { localStorage.setItem('rektometer_tour_done', 'true'); setShowTour(false); };

  useEffect(() => { localStorage.setItem('rektometer_v3', JSON.stringify(projects)); }, [projects]);

  useEffect(() => {
    fetch('https://hermes.pyth.network/v2/price_feeds?asset_type=crypto')
      .then(r => r.json())
      .then(data => setAllFeeds(data.filter(f => f.attributes?.base && f.attributes?.quote_currency === 'USD').map(f => ({ id: f.id, symbol: f.attributes.base, display: `${f.attributes.base}/USD` })).sort((a, b) => a.symbol.localeCompare(b.symbol)))).catch(() => {});
  }, []);

  useEffect(() => {
    const ids = [...new Set(projects.flatMap(p => p.wallets.map(w => w.assetFeedId).filter(Boolean)))];
    if (!ids.length) return;
    const refresh = () => {
      const params = new URLSearchParams();
      ids.forEach(id => params.append('ids[]', id));
      fetch(`https://hermes.pyth.network/v2/updates/price/latest?${params}`).then(r => r.json()).then(data => { const p = {}; data.parsed.forEach(item => { p[item.id] = parseFloat(item.price.price) * Math.pow(10, item.price.expo); }); setPrices(prev => ({ ...prev, ...p })); }).catch(() => {});
    };
    refresh();
    const t = setInterval(refresh, 15000);
    return () => clearInterval(t);
  }, [projects]);

  const updP = (pid, key, val) => setProjects(prev => prev.map(p => p.id === pid ? { ...p, [key]: val } : p));
  const updW = (pid, wid, key, val) => setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: p.wallets.map(w => w.id !== wid ? w : { ...w, [key]: val }) }));
  const updE = (pid, wid, eid, key, val, field) => setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: p.wallets.map(w => w.id !== wid ? w : { ...w, [field]: w[field].map(e => e.id !== eid ? e : { ...e, [key]: val }) }) }));
  const addProject = () => setProjects(prev => [...prev, emptyProject()]);
  const delProject = (pid) => { if (confirm('Delete this project?')) setProjects(prev => prev.filter(p => p.id !== pid)); };
  const addWallet  = (pid) => setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: [...p.wallets, emptyWallet(p.wallets.length + 1)] }));
  const delWallet  = (pid, wid) => setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: p.wallets.filter(w => w.id !== wid) }));
  const addExpense = (pid, wid) => setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: p.wallets.map(w => w.id !== wid ? w : { ...w, expenses: [...(w.expenses || []), emptyEntry()], showExpenses: true }) }));
  const delExpense = (pid, wid, eid) => setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: p.wallets.map(w => w.id !== wid ? w : { ...w, expenses: w.expenses.filter(e => e.id !== eid) }) }));
  const addIncome  = (pid, wid) => setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: p.wallets.map(w => w.id !== wid ? w : { ...w, incomes: [...(w.incomes || []), emptyEntry()], showIncomes: true }) }));
  const delIncome  = (pid, wid, eid) => setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: p.wallets.map(w => w.id !== wid ? w : { ...w, incomes: w.incomes.filter(e => e.id !== eid) }) }));

  const toggleLabel = (pid, wid, label) => {
    setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: p.wallets.map(w => { if (w.id !== wid) return w; const labels = w.airdropLabels || []; return { ...w, airdropLabels: labels.includes(label) ? labels.filter(l => l !== label) : [...labels, label] }; }) }));
  };

  const handleAddressInput = (pid, wid, address, walletIndex) => {
    const type = detectWalletType(address);
    setProjects(prev => prev.map(p => p.id !== pid ? p : { ...p, wallets: p.wallets.map(w => { if (w.id !== wid) return w; return { ...w, address, walletType: type, name: type ? `${type} Wallet ${walletIndex}` : w.name }; }) }));
  };

  const selectFeed = async (pid, wid, feed) => {
    updW(pid, wid, 'assetFeedId', feed.id);
    updW(pid, wid, 'assetSymbol', feed.symbol);
    setSearchState(prev => ({ ...prev, [wid]: { text: feed.display, show: false } }));
    try {
      const r = await fetch(`https://hermes.pyth.network/v2/updates/price/latest?ids[]=${feed.id}`);
      const d = await r.json();
      if (d.parsed?.[0]) { const p = parseFloat(d.parsed[0].price.price) * Math.pow(10, d.parsed[0].price.expo); setPrices(prev => ({ ...prev, [feed.id]: p })); }
    } catch {}
  };

  const fmt  = (n, d = 2) => Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const fmtP = (n) => n > 1 ? fmt(n) : Number(n).toFixed(6);

  const calcW = (w) => {
    const live          = prices[w.assetFeedId] || 0;
    const buyPrice      = parseFloat(w.assetPrice) || live;
    const qty           = parseFloat(w.assetQty) || 0;
    const modalCost     = qty * buyPrice;
    const modalNow      = qty * live;
    const unrealizedPnl = live > 0 ? modalNow - modalCost : 0;
    const unrealizedPct = modalCost > 0 ? (unrealizedPnl / modalCost) * 100 : 0;
    const spend         = (w.expenses || []).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
    const income        = (w.incomes  || []).reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
    const airdrop       = parseFloat(w.airdropValue) || 0;
    const netPnl        = airdrop + income - spend;
    const netPct        = spend > 0 ? (netPnl / spend) * 100 : 0;
    return { live, buyPrice, qty, modalCost, modalNow, unrealizedPnl, unrealizedPct, spend, income, airdrop, netPnl, netPct };
  };

  const calcP = (p) => {
    const ww = p.wallets.map(calcW);
    return { totalModalNow: ww.reduce((s, w) => s + w.modalNow, 0), totalUnrealized: ww.reduce((s, w) => s + w.unrealizedPnl, 0), totalSpend: ww.reduce((s, w) => s + w.spend, 0), totalIncome: ww.reduce((s, w) => s + w.income, 0), totalAirdrop: ww.reduce((s, w) => s + w.airdrop, 0), totalNetPnl: ww.reduce((s, w) => s + w.netPnl, 0) };
  };

  const grand = projects.reduce((s, p) => { const c = calcP(p); return { modalNow: s.modalNow + c.totalModalNow, unrealized: s.unrealized + c.totalUnrealized, spend: s.spend + c.totalSpend, income: s.income + c.totalIncome, airdrop: s.airdrop + c.totalAirdrop, netPnl: s.netPnl + c.totalNetPnl }; }, { modalNow: 0, unrealized: 0, spend: 0, income: 0, airdrop: 0, netPnl: 0 });

  const inp = (extra = {}) => ({ background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}`, color: '#fff', fontSize: '11px', fontFamily: 'monospace', padding: '5px 8px', outline: 'none', borderRadius: '6px', ...extra });

  const MobileWalletCard = ({ w, proj, wIndex }) => {
    const wc = calcW(w);
    const isExpanded = expandedWallet === w.id;
    const expenses = w.expenses || [];
    const incomes  = w.incomes  || [];
    const labels   = w.airdropLabels || [];
    const st       = STATUS_STYLE[w.status] || STATUS_STYLE.Active;
    const [localSearch, setLocalSearch]     = useState(w.assetSymbol ? `${w.assetSymbol}/USD` : '');
    const [showDrop, setShowDrop]           = useState(false);
    const [localQty, setLocalQty]           = useState(w.assetQty || '');
    const [localPrice, setLocalPrice]       = useState(w.assetPrice || '');
    const [localAirdrop, setLocalAirdrop]   = useState(w.airdropValue || '');
    const [localName, setLocalName]         = useState(w.name || '');
    const [localAddr, setLocalAddr]         = useState(w.address || '');
    const filtered = allFeeds.filter(f => f.symbol.toLowerCase().includes(localSearch.toLowerCase().replace('/usd', ''))).slice(0, 15);

    return (
      <div style={{ background: BG3, border: `1px solid ${BORDER}`, borderRadius: '10px', overflow: 'visible', marginBottom: '8px' }}>
        <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setExpandedWallet(isExpanded ? null : w.id)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#fff', fontWeight: 600 }}>{w.name || `Wallet ${wIndex + 1}`}</span>
              {w.walletType && <span style={{ fontSize: '9px', fontFamily: 'monospace', padding: '2px 6px', borderRadius: '4px', background: w.walletType === 'EVM' ? 'rgba(99,179,237,0.1)' : 'rgba(167,139,250,0.1)', border: `1px solid ${w.walletType === 'EVM' ? 'rgba(99,179,237,0.3)' : 'rgba(167,139,250,0.3)'}`, color: w.walletType === 'EVM' ? '#63b3ed' : '#a78bfa' }}>{w.walletType}</span>}
            </div>
            {w.address && w.walletType && <span style={{ fontSize: '9px', fontFamily: 'monospace', color: DIM }}>{w.address.slice(0, 6)}...{w.address.slice(-4)}</span>}
          </div>
          <div style={{ textAlign: 'right' }}>
            {(wc.spend > 0 || wc.income > 0 || wc.airdrop > 0) && <div style={{ fontSize: '14px', fontFamily: 'monospace', fontWeight: 700, color: wc.netPnl >= 0 ? GREEN : RED }}>{wc.netPnl >= 0 ? '+' : '-'}${fmt(Math.abs(wc.netPnl))}</div>}
            <div style={{ fontSize: '9px', fontFamily: 'monospace', color: DIM }}>{isExpanded ? '▲ collapse' : '▼ expand'}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${BORDER}`, borderBottom: isExpanded ? `1px solid ${BORDER}` : 'none' }}>
          {[{ label: 'Holdings', val: wc.modalCost > 0 ? '$' + fmt(wc.modalNow) : '—', color: '#fff' }, { label: 'Expenses', val: wc.spend > 0 ? '-$' + fmt(wc.spend) : '—', color: RED }, { label: 'Income', val: wc.income > 0 ? '+$' + fmt(wc.income) : '—', color: GREEN }, { label: 'Airdrop', val: wc.airdrop > 0 ? '$' + fmt(wc.airdrop) : '—', color: PURPLE }].map(s => (
            <div key={s.label} style={{ padding: '8px 6px', borderRight: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: '8px', fontFamily: 'monospace', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: s.color, fontWeight: 600, marginTop: '2px' }}>{s.val}</div>
            </div>
          ))}
        </div>

        {isExpanded && (
          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Wallet</div>
              <input value={localName} onChange={e => setLocalName(e.target.value)} onBlur={() => updW(proj.id, w.id, 'name', localName)} style={inp({ width: '100%' })} placeholder="Wallet name" />
              <input value={localAddr} onChange={e => setLocalAddr(e.target.value)} onBlur={() => handleAddressInput(proj.id, w.id, localAddr, wIndex + 1)} style={inp({ width: '100%', color: w.walletType === 'EVM' ? '#63b3ed' : w.walletType === 'SVM' ? PURPLE : DIM })} placeholder="Paste wallet address (EVM or SVM)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Holdings</div>
              <div style={{ position: 'relative', zIndex: 30 }}>
                <input type="text" value={localSearch} onChange={e => { setLocalSearch(e.target.value); setShowDrop(true); }} onFocus={() => setShowDrop(true)} placeholder="Search asset (e.g. BTC, ETH, FOGO)" style={inp({ width: '100%' })} data-tour="asset-search" />
                {showDrop && localSearch.length > 0 && filtered.length > 0 && (
                  <div style={{ position: 'absolute', width: '100%', background: '#1a1a1a', border: `1px solid ${BORDER}`, borderRadius: '8px', maxHeight: '200px', overflowY: 'auto', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', marginTop: '2px', zIndex: 50 }}>
                    {filtered.map(f => <button key={f.id} onMouseDown={e => { e.preventDefault(); setLocalSearch(f.display); setShowDrop(false); selectFeed(proj.id, w.id, f); }} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', fontSize: '13px', fontFamily: 'monospace', color: MUTED, background: 'none', border: 'none', cursor: 'pointer', borderBottom: `1px solid rgba(255,255,255,0.04)` }}>{f.display}</button>)}
                  </div>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '9px', fontFamily: 'monospace', color: DIM, marginBottom: '3px' }}>QTY</div>
                  <input type="number" inputMode="decimal" value={localQty} onChange={e => setLocalQty(e.target.value)} onBlur={() => updW(proj.id, w.id, 'assetQty', localQty)} placeholder="0.00" style={inp({ width: '100%' })} />
                </div>
                <div>
                  <div style={{ fontSize: '9px', fontFamily: 'monospace', color: DIM, marginBottom: '3px' }}>BUY PRICE</div>
                  <input type="number" inputMode="decimal" value={localPrice} onChange={e => setLocalPrice(e.target.value)} onBlur={() => updW(proj.id, w.id, 'assetPrice', localPrice)} placeholder={wc.live > 0 ? `$${fmt(wc.live)}` : '0.00'} style={inp({ width: '100%' })} />
                </div>
              </div>
              {wc.live > 0 && <div style={{ fontSize: '10px', fontFamily: 'monospace', color: GREEN }}>Live ${fmtP(wc.live)}</div>}
              {wc.modalCost > 0 && <div style={{ fontSize: '11px', fontFamily: 'monospace', color: wc.unrealizedPnl >= 0 ? GREEN : RED }}>Unrealized: {wc.unrealizedPnl >= 0 ? '+' : '-'}${fmt(Math.abs(wc.unrealizedPnl))} ({wc.unrealizedPct >= 0 ? '+' : ''}{fmt(wc.unrealizedPct)}%)</div>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Expenses</div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: RED, fontWeight: 600 }}>{wc.spend > 0 ? '-$' + fmt(wc.spend) : '$0'}</div>
              </div>
              {expenses.map(exp => <ExpenseRow key={exp.id} exp={exp} pid={proj.id} wid={w.id} field="expenses" color={RED} onUpdate={updE} onDelete={delExpense} inp={inp} />)}
              <button onClick={() => addExpense(proj.id, w.id)} data-tour="add-expense" style={{ fontSize: '12px', fontFamily: 'monospace', color: RED, background: 'rgba(252,129,129,0.05)', border: `1px dashed rgba(252,129,129,0.25)`, padding: '8px', borderRadius: '6px', cursor: 'pointer', textAlign: 'center' }}>+ Add expense</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Income</div>
                <div style={{ fontSize: '12px', fontFamily: 'monospace', color: GREEN, fontWeight: 600 }}>{wc.income > 0 ? '+$' + fmt(wc.income) : '$0'}</div>
              </div>
              {incomes.map(inc => <ExpenseRow key={inc.id} exp={inc} pid={proj.id} wid={w.id} field="incomes" color={GREEN} onUpdate={updE} onDelete={delIncome} inp={inp} />)}
              <button onClick={() => addIncome(proj.id, w.id)} style={{ fontSize: '12px', fontFamily: 'monospace', color: GREEN, background: 'rgba(72,187,120,0.05)', border: `1px dashed rgba(72,187,120,0.25)`, padding: '8px', borderRadius: '6px', cursor: 'pointer', textAlign: 'center' }}>+ Add income</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Airdrop Value (USD)</div>
              <input type="number" inputMode="decimal" value={localAirdrop} onChange={e => setLocalAirdrop(e.target.value)} onBlur={() => updW(proj.id, w.id, 'airdropValue', localAirdrop)} placeholder="0.00" style={inp({ width: '100%', color: PURPLE })} data-tour="airdrop-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Labels</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {AIRDROP_LABELS.map(label => { const ls = LABEL_STYLE[label]; const active = labels.includes(label); return <button key={label} onClick={() => toggleLabel(proj.id, w.id, label)} style={{ fontSize: '12px', fontFamily: 'monospace', padding: '5px 14px', border: `1px solid ${active ? ls.border : BORDER}`, background: active ? ls.bg : 'transparent', color: active ? ls.color : DIM, cursor: 'pointer', borderRadius: '5px' }}>{label}</button>; })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: `1px solid ${BORDER}` }}>
              <select value={w.status || 'Active'} onChange={e => updW(proj.id, w.id, 'status', e.target.value)} style={{ fontSize: '12px', fontFamily: 'monospace', padding: '6px 12px', border: `1px solid ${st.border}`, background: st.bg, color: st.color, outline: 'none', cursor: 'pointer', borderRadius: '6px' }}>
                {STATUS_OPTIONS.map(s => <option key={s} style={{ background: '#1a1a1a', color: '#fff' }}>{s}</option>)}
              </select>
              <button onClick={() => delWallet(proj.id, w.id)} style={{ background: 'none', border: `1px solid rgba(252,129,129,0.2)`, color: RED, cursor: 'pointer', fontSize: '11px', fontFamily: 'monospace', padding: '6px 14px', borderRadius: '6px' }}>Delete</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#fff', position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '800px', height: '300px', background: 'radial-gradient(ellipse, rgba(180,80,20,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <nav style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '12px 16px' : '16px 28px', borderBottom: `1px solid ${BORDER}`, background: 'rgba(8,8,8,0.8)' }}>
        <button onClick={onReset} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#gnav)"/>
            <path d="M8 22 L8 10 L14 10 Q18 10 18 14 Q18 17 15 17.5 L19 22 L16 22 L12.5 17.8 L11 17.8 L11 22 Z" fill="white" opacity="0.95"/>
            <path d="M11 10.5 L11 15.5 L14 15.5 Q16.5 15.5 16.5 13 Q16.5 10.5 14 10.5 Z" fill="white" opacity="0.95"/>
            <path d="M20 18 L23 22 L26 18" stroke="#f6ad55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="23" cy="15" r="2" fill="#f6ad55"/>
            <defs><linearGradient id="gnav" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#c05621"/><stop offset="100%" stopColor="#7b341e"/></linearGradient></defs>
          </svg>
          <span style={{ fontWeight: 800, fontSize: isMobile ? '14px' : '15px', color: '#fff', letterSpacing: '0.02em' }}>Rekto<span style={{ color: AMBER }}>Meter</span></span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontFamily: 'monospace', color: GREEN }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: GREEN, display: 'inline-block' }}></span>
            {!isMobile && 'Pyth live'}
          </div>
          <button onClick={() => { setTourStep(0); setShowTour(true); }}
  style={{ fontSize: '11px', fontFamily: 'monospace', color: AMBER, background: 'rgba(246,173,85,0.08)', border: `1px solid rgba(246,173,85,0.25)`, padding: '5px 12px', borderRadius: '7px', cursor: 'pointer' }}>
  ? Guide
</button>
<button onClick={onReset} style={{ fontSize: '11px', fontFamily: 'monospace', color: MUTED, background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`, padding: '5px 12px', borderRadius: '7px', cursor: 'pointer' }}>Reset</button>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '16px' : '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
          {[
            { label: 'Holdings', val: '$' + fmt(grand.modalNow),   sub: (grand.unrealized >= 0 ? '+' : '-') + '$' + fmt(Math.abs(grand.unrealized)) + ' unrlzd', accent: grand.unrealized >= 0 ? GREEN : RED },
            { label: 'Expenses', val: '-$' + fmt(grand.spend),     sub: 'Gas · fees · swaps',  accent: RED },
            { label: 'Income',   val: '+$' + fmt(grand.income),    sub: 'Trades · WL · sales', accent: GREEN },
            { label: 'Net P&L',  val: (grand.netPnl >= 0 ? '+' : '-') + '$' + fmt(Math.abs(grand.netPnl)), sub: 'Airdrop + income − exp', accent: grand.netPnl >= 0 ? GREEN : RED },
          ].map(s => (
            <div key={s.label} style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: isMobile ? '14px' : '18px 20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: s.accent, opacity: 0.5, borderRadius: '12px 12px 0 0' }} />
              <div style={{ fontSize: '9px', fontFamily: 'monospace', color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontSize: isMobile ? '16px' : '22px', fontWeight: 800, marginTop: '6px', color: s.accent, fontFamily: 'monospace' }}>{s.val}</div>
              <div style={{ fontSize: '9px', fontFamily: 'monospace', color: DIM, marginTop: '4px' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div style={{ background: BG2, border: `1px dashed rgba(255,255,255,0.08)`, borderRadius: '12px', padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
            <div style={{ fontSize: '14px', color: MUTED, fontWeight: 600 }}>No projects yet</div>
            <div style={{ fontSize: '12px', color: DIM, marginTop: '4px', fontFamily: 'monospace' }}>Tap "+ Add Project" below to start</div>
          </div>
        )}

        {projects.map(proj => {
          const pc = calcP(proj);
          return (
            <div key={proj.id} style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: isMobile ? '12px 14px' : '14px 18px', borderBottom: proj.open ? `1px solid ${BORDER}` : 'none', cursor: 'pointer', background: BG3 }} onClick={() => updP(proj.id, 'open', !proj.open)}>
                <span style={{ fontSize: '10px', color: DIM, fontFamily: 'monospace' }}>{proj.open ? '▼' : '▶'}</span>
                <input value={proj.name} onChange={e => { e.stopPropagation(); updP(proj.id, 'name', e.target.value); }} onClick={e => e.stopPropagation()} placeholder="Project name..." data-tour="project-name"
                  style={{ background: 'none', border: 'none', outline: 'none', fontWeight: 700, fontSize: isMobile ? '13px' : '14px', color: '#fff', width: isMobile ? '120px' : '180px' }} />
                {!isMobile && <select value={proj.type} onChange={e => { e.stopPropagation(); updP(proj.id, 'type', e.target.value); }} onClick={e => e.stopPropagation()} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${BORDER}`, color: MUTED, fontSize: '10px', fontFamily: 'monospace', padding: '4px 10px', outline: 'none', borderRadius: '6px' }}>{PROJECT_TYPES.map(t => <option key={t} style={{ background: '#1a1a1a' }}>{t}</option>)}</select>}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '20px', fontSize: '11px', fontFamily: 'monospace' }}>
                  {isMobile ? (
                    <span style={{ color: pc.totalNetPnl >= 0 ? GREEN : RED, fontWeight: 700 }}>{pc.totalNetPnl >= 0 ? '+' : '-'}${fmt(Math.abs(pc.totalNetPnl))}</span>
                  ) : (
                    <>
                      <span style={{ color: DIM }}>Holdings <span style={{ color: pc.totalUnrealized >= 0 ? GREEN : RED }}>${fmt(pc.totalModalNow)}</span></span>
                      <span style={{ color: DIM }}>Expenses <span style={{ color: RED }}>-${fmt(pc.totalSpend)}</span></span>
                      <span style={{ color: DIM }}>Income <span style={{ color: GREEN }}>+${fmt(pc.totalIncome)}</span></span>
                      <span style={{ color: DIM }}>Net P&L <span style={{ color: pc.totalNetPnl >= 0 ? GREEN : RED, fontWeight: 700 }}>{pc.totalNetPnl >= 0 ? '+' : '-'}${fmt(Math.abs(pc.totalNetPnl))}</span></span>
                    </>
                  )}
                  <button onClick={e => { e.stopPropagation(); delProject(proj.id); }} style={{ background: 'none', border: 'none', color: DIM, cursor: 'pointer', fontSize: '14px' }} onMouseEnter={e => e.target.style.color = RED} onMouseLeave={e => e.target.style.color = DIM}>✕</button>
                </div>
              </div>

              {proj.open && (
                isMobile ? (
                  <div style={{ padding: '12px' }}>
                    {proj.wallets.map((w, wIndex) => <MobileWalletCard key={w.id} w={w} proj={proj} wIndex={wIndex} />)}
                    <button onClick={() => addWallet(proj.id)} data-tour="add-wallet"
                      style={{ width: '100%', fontSize: '12px', fontFamily: 'monospace', color: DIM, background: 'none', border: `1px dashed rgba(246,173,85,0.2)`, padding: '10px', borderRadius: '8px', cursor: 'pointer', marginTop: '4px' }}>
                      + Add wallet
                    </button>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                          {['Wallet', 'Holdings', 'Expenses', 'Income', 'Airdrop', 'Labels', 'P&L', 'Status', ''].map(h => (
                            <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '9px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {proj.wallets.map((w, wIndex) => {
                          const wc       = calcW(w);
                          const ss       = searchState[w.id] || { text: w.assetSymbol ? `${w.assetSymbol}/USD` : '', show: false };
                          const filtered = allFeeds.filter(f => f.symbol.toLowerCase().includes((ss.text || '').toLowerCase().replace('/usd', ''))).slice(0, 15);
                          const expenses = w.expenses || [];
                          const incomes  = w.incomes  || [];
                          const labels   = w.airdropLabels || [];
                          const st       = STATUS_STYLE[w.status] || STATUS_STYLE.Active;
                          return (
                            <React.Fragment key={w.id}>
                              <tr style={{ borderBottom: `1px solid rgba(255,255,255,0.04)`, verticalAlign: 'top' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <td style={{ padding: '14px', minWidth: '180px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <input value={w.name || ''} onChange={e => updW(proj.id, w.id, 'name', e.target.value)} style={{ background: 'none', border: 'none', outline: 'none', fontSize: '12px', fontFamily: 'monospace', color: '#fff', width: '140px', fontWeight: 600 }} />
                                    <input value={w.address || ''} onChange={e => handleAddressInput(proj.id, w.id, e.target.value, wIndex + 1)} placeholder="Paste wallet address..." style={{ ...inp({ width: '155px' }), fontSize: '10px', color: w.walletType === 'EVM' ? '#63b3ed' : w.walletType === 'SVM' ? '#a78bfa' : DIM }} />
                                    {w.walletType && <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1em', padding: '2px 8px', borderRadius: '4px', background: w.walletType === 'EVM' ? 'rgba(99,179,237,0.1)' : 'rgba(167,139,250,0.1)', border: `1px solid ${w.walletType === 'EVM' ? 'rgba(99,179,237,0.3)' : 'rgba(167,139,250,0.3)'}`, color: w.walletType === 'EVM' ? '#63b3ed' : '#a78bfa', width: 'fit-content' }}><span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}></span>{w.walletType}</div>}
                                    {w.address && w.walletType && <div style={{ fontSize: '9px', fontFamily: 'monospace', color: DIM }}>{w.address.slice(0, 6)}...{w.address.slice(-4)}</div>}
                                  </div>
                                </td>
                                <td style={{ padding: '14px', minWidth: '160px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <div style={{ position: 'relative' }}>
                                      <input type="text" value={ss.text || ''} onChange={e => setSearchState(prev => ({ ...prev, [w.id]: { text: e.target.value, show: true } }))} onFocus={() => setSearchState(prev => ({ ...prev, [w.id]: { ...ss, show: true } }))} placeholder="Search asset..." style={inp({ width: '140px' })} data-tour="asset-search" />
                                      {ss.show && (ss.text || '').length > 0 && filtered.length > 0 && (
                                        <div style={{ position: 'absolute', zIndex: 20, width: '180px', background: '#1a1a1a', border: `1px solid ${BORDER}`, borderRadius: '8px', maxHeight: '160px', overflowY: 'auto', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginTop: '2px' }}>
                                          {filtered.map(f => <button key={f.id} onClick={() => selectFeed(proj.id, w.id, f)} style={{ width: '100%', textAlign: 'left', padding: '7px 12px', fontSize: '11px', fontFamily: 'monospace', color: MUTED, background: 'none', border: 'none', cursor: 'pointer', borderBottom: `1px solid rgba(255,255,255,0.04)` }} onMouseEnter={e => { e.target.style.background = 'rgba(246,173,85,0.08)'; e.target.style.color = AMBER; }} onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = MUTED; }}>{f.display}</button>)}
                                        </div>
                                      )}
                                    </div>
                                    <input type="number" value={w.assetQty || ''} onChange={e => updW(proj.id, w.id, 'assetQty', e.target.value)} placeholder="Qty" style={inp({ width: '140px' })} />
                                    <input type="number" value={w.assetPrice || ''} onChange={e => updW(proj.id, w.id, 'assetPrice', e.target.value)} placeholder={wc.live > 0 ? `Live $${fmtP(wc.live)}` : 'Buy price'} style={inp({ width: '140px' })} />
                                    {wc.live > 0 && <div style={{ fontSize: '10px', fontFamily: 'monospace', color: GREEN }}>Live ${fmtP(wc.live)}</div>}
                                    {wc.modalCost > 0 && <div style={{ fontSize: '10px', fontFamily: 'monospace', color: wc.unrealizedPnl >= 0 ? GREEN : RED }}>{wc.unrealizedPnl >= 0 ? '+' : '-'}${fmt(Math.abs(wc.unrealizedPnl))} ({wc.unrealizedPct >= 0 ? '+' : ''}{fmt(wc.unrealizedPct)}%)</div>}
                                  </div>
                                </td>
                                <td style={{ padding: '14px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <div style={{ fontSize: '14px', fontFamily: 'monospace', color: RED, fontWeight: 700 }}>{wc.spend > 0 ? '-$' + fmt(wc.spend) : '—'}</div>
                                    <button onClick={() => addExpense(proj.id, w.id)} data-tour="add-expense" style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }} onMouseEnter={e => e.target.style.color = RED} onMouseLeave={e => e.target.style.color = DIM}>+ Add expense</button>
                                    {expenses.length > 0 && <button onClick={() => updW(proj.id, w.id, 'showExpenses', !w.showExpenses)} style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>{w.showExpenses ? '▲ hide' : `▼ ${expenses.length} item${expenses.length > 1 ? 's' : ''}`}</button>}
                                  </div>
                                </td>
                                <td style={{ padding: '14px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <div style={{ fontSize: '14px', fontFamily: 'monospace', color: GREEN, fontWeight: 700 }}>{wc.income > 0 ? '+$' + fmt(wc.income) : '—'}</div>
                                    <button onClick={() => addIncome(proj.id, w.id)} style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }} onMouseEnter={e => e.target.style.color = GREEN} onMouseLeave={e => e.target.style.color = DIM}>+ Add income</button>
                                    {incomes.length > 0 && <button onClick={() => updW(proj.id, w.id, 'showIncomes', !w.showIncomes)} style={{ fontSize: '10px', fontFamily: 'monospace', color: DIM, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>{w.showIncomes ? '▲ hide' : `▼ ${incomes.length} item${incomes.length > 1 ? 's' : ''}`}</button>}
                                  </div>
                                </td>
                                <td style={{ padding: '14px' }}>
                                  <input type="number" value={w.airdropValue || ''} onChange={e => updW(proj.id, w.id, 'airdropValue', e.target.value)} placeholder="0" style={inp({ width: '100px', color: PURPLE })} data-tour="airdrop-input" />
                                </td>
                                <td style={{ padding: '14px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {AIRDROP_LABELS.map(label => { const ls = LABEL_STYLE[label]; const active = labels.includes(label); return <button key={label} onClick={() => toggleLabel(proj.id, w.id, label)} style={{ fontSize: '10px', fontFamily: 'monospace', padding: '3px 10px', border: `1px solid ${active ? ls.border : BORDER}`, background: active ? ls.bg : 'transparent', color: active ? ls.color : DIM, cursor: 'pointer', textAlign: 'left', borderRadius: '5px', transition: 'all 0.15s' }}>{label}</button>; })}
                                  </div>
                                </td>
                                <td style={{ padding: '14px', minWidth: '120px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', fontFamily: 'monospace' }}>
                                    {wc.modalCost > 0 && <div><div style={{ color: DIM, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Unrealized</div><div style={{ color: wc.unrealizedPnl >= 0 ? GREEN : RED }}>{wc.unrealizedPnl >= 0 ? '+' : '-'}${fmt(Math.abs(wc.unrealizedPnl))}</div></div>}
                                    {wc.spend > 0 && <div><div style={{ color: DIM, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Expenses</div><div style={{ color: RED }}>-${fmt(wc.spend)}</div></div>}
                                    {wc.income > 0 && <div><div style={{ color: DIM, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Income</div><div style={{ color: GREEN }}>+${fmt(wc.income)}</div></div>}
                                    {wc.airdrop > 0 && <div><div style={{ color: DIM, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Airdrop</div><div style={{ color: PURPLE }}>+${fmt(wc.airdrop)}</div></div>}
                                    {(wc.spend > 0 || wc.income > 0 || wc.airdrop > 0) && <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: '6px', marginTop: '2px' }}><div style={{ color: DIM, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Net</div><div style={{ color: wc.netPnl >= 0 ? GREEN : RED, fontWeight: 700, fontSize: '14px' }}>{wc.netPnl >= 0 ? '+' : '-'}${fmt(Math.abs(wc.netPnl))}</div></div>}
                                    {wc.spend === 0 && wc.income === 0 && wc.airdrop === 0 && wc.modalCost === 0 && <span style={{ color: DIM }}>—</span>}
                                  </div>
                                </td>
                                <td style={{ padding: '14px' }}>
                                  <select value={w.status || 'Active'} onChange={e => updW(proj.id, w.id, 'status', e.target.value)} style={{ fontSize: '10px', fontFamily: 'monospace', padding: '4px 10px', border: `1px solid ${st.border}`, background: st.bg, color: st.color, outline: 'none', cursor: 'pointer', borderRadius: '6px' }}>
                                    {STATUS_OPTIONS.map(s => <option key={s} style={{ background: '#1a1a1a', color: '#fff' }}>{s}</option>)}
                                  </select>
                                </td>
                                <td style={{ padding: '14px' }}>
                                  <button onClick={() => delWallet(proj.id, w.id)} style={{ background: 'none', border: 'none', color: DIM, cursor: 'pointer', fontSize: '14px' }} onMouseEnter={e => e.target.style.color = RED} onMouseLeave={e => e.target.style.color = DIM}>✕</button>
                                </td>
                              </tr>
                              {w.showExpenses && expenses.map(exp => (
                                <tr key={exp.id} style={{ background: 'rgba(252,129,129,0.03)', borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                                  <td colSpan={9} style={{ padding: '6px 14px 6px 200px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span style={{ fontSize: '10px', fontFamily: 'monospace', color: RED }}>↳</span>
                                      <input type="date" value={exp.date || ''} onChange={e => updE(proj.id, w.id, exp.id, 'date', e.target.value, 'expenses')} style={inp({ width: '130px' })} />
                                      <input type="text" value={exp.note || ''} onChange={e => updE(proj.id, w.id, exp.id, 'note', e.target.value, 'expenses')} placeholder="e.g. gas fee bridge" style={inp({ width: '220px' })} />
                                      <input type="number" value={exp.amount || ''} onChange={e => updE(proj.id, w.id, exp.id, 'amount', e.target.value, 'expenses')} placeholder="0.00" style={inp({ width: '90px', color: RED })} />
                                      <button onClick={() => delExpense(proj.id, w.id, exp.id)} style={{ background: 'none', border: 'none', color: DIM, cursor: 'pointer', fontSize: '12px' }} onMouseEnter={e => e.target.style.color = RED} onMouseLeave={e => e.target.style.color = DIM}>✕</button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                              {w.showIncomes && incomes.map(inc => (
                                <tr key={inc.id} style={{ background: 'rgba(72,187,120,0.03)', borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                                  <td colSpan={9} style={{ padding: '6px 14px 6px 360px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span style={{ fontSize: '10px', fontFamily: 'monospace', color: GREEN }}>↳</span>
                                      <input type="date" value={inc.date || ''} onChange={e => updE(proj.id, w.id, inc.id, 'date', e.target.value, 'incomes')} style={inp({ width: '130px' })} />
                                      <input type="text" value={inc.note || ''} onChange={e => updE(proj.id, w.id, inc.id, 'note', e.target.value, 'incomes')} placeholder="e.g. profit trade ETH" style={inp({ width: '220px' })} />
                                      <input type="number" value={inc.amount || ''} onChange={e => updE(proj.id, w.id, inc.id, 'amount', e.target.value, 'incomes')} placeholder="0.00" style={inp({ width: '90px', color: GREEN })} />
                                      <button onClick={() => delIncome(proj.id, w.id, inc.id)} style={{ background: 'none', border: 'none', color: DIM, cursor: 'pointer', fontSize: '12px' }} onMouseEnter={e => e.target.style.color = RED} onMouseLeave={e => e.target.style.color = DIM}>✕</button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                    <div style={{ padding: '10px 18px', borderTop: `1px solid ${BORDER}` }}>
                      <button onClick={() => addWallet(proj.id)} data-tour="add-wallet" style={{ fontSize: '11px', fontFamily: 'monospace', color: DIM, background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }} onMouseEnter={e => e.target.style.color = AMBER} onMouseLeave={e => e.target.style.color = DIM}>+ Add wallet</button>
                    </div>
                  </div>
                )
              )}
            </div>
          );
        })}

        <button onClick={addProject} data-tour="add-project"
          style={{ border: `1px dashed rgba(255,255,255,0.08)`, padding: '16px', fontSize: '11px', fontFamily: 'monospace', color: DIM, background: 'none', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '12px', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.target.style.borderColor = AMBER; e.target.style.color = AMBER; }}
          onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.color = DIM; }}>
          + Add Project
        </button>
      </div>

      {showTour && <Tour steps={TOUR_STEPS} currentStep={tourStep} onNext={handleTourNext} onSkip={handleTourSkip} onDone={handleTourSkip} />}
    </div>
  );
}