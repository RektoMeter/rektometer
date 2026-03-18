'use client';

const TIMEFRAMES = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

export default function Onboarding({ profile, setProfile, onNext }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-10">
      <div className="text-center">
        <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">Before we start</p>
        <h2 className="text-5xl font-black tracking-tight">
          Set your <span className="text-red-500">rules</span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm">Define your targets before emotion does</p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Timeframe */}
        <div>
          <label className="text-xs font-mono text-red-400 tracking-widest uppercase mb-2 block">Timeframe</label>
          <div className="grid grid-cols-4 gap-2">
            {TIMEFRAMES.map(tf => (
              <button key={tf} onClick={() => setProfile(p => ({ ...p, timeframe: tf }))}
                className={`py-2 text-xs font-mono border transition-all
                  ${profile.timeframe === tf
                    ? 'border-red-500 text-red-400 bg-red-500/10'
                    : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}>
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Target gain */}
        <div>
          <label className="text-xs font-mono text-green-400 tracking-widest uppercase mb-2 block">
            Target gain — <span className="text-white">{profile.gain}%</span>
          </label>
          <input type="range" min="1" max="200" value={profile.gain}
            onChange={e => setProfile(p => ({ ...p, gain: +e.target.value }))}
            className="w-full accent-green-400" />
          <div className="flex justify-between text-xs font-mono text-gray-600 mt-1">
            <span>1%</span><span>200%</span>
          </div>
        </div>

        {/* Max loss */}
        <div>
          <label className="text-xs font-mono text-red-400 tracking-widest uppercase mb-2 block">
            Max loss — <span className="text-white">{profile.loss}%</span>
          </label>
          <input type="range" min="1" max="100" value={profile.loss}
            onChange={e => setProfile(p => ({ ...p, loss: +e.target.value }))}
            className="w-full accent-red-400" />
          <div className="flex justify-between text-xs font-mono text-gray-600 mt-1">
            <span>1%</span><span>100%</span>
          </div>
        </div>

        <button onClick={onNext}
          className="bg-red-500 text-white font-black py-4 text-sm tracking-widest uppercase hover:bg-red-400 transition-all mt-2">
          LET'S GO →
        </button>
      </div>
    </div>
  );
}