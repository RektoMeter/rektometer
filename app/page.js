'use client';
import { useState } from 'react';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Guide from './components/Guide';

export default function Home() {
  const [screen, setScreen] = useState('landing');

  const profile = { gain: 20, loss: 10, timeframe: 'Monthly' };

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {screen === 'landing'   && <Landing  onNext={() => setScreen('dashboard')} onGuide={() => setScreen('guide')} />}
      {screen === 'dashboard' && <Dashboard profile={profile} onReset={() => setScreen('landing')} />}
      {screen === 'guide'     && <Guide onBack={() => setScreen('landing')} />}
    </main>
  );
}