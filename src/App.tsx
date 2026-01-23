import { useState } from 'react';
import { ImpactCounter } from './components/ImpactCounter';
import { MeterPanel } from './components/MeterPanel';

export default function App() {
  const [meters, setMeters] = useState({
    evidence: 50,
    network: 40,
    narrative: 60,
    implementation: 30,
  });
  const [impact, setImpact] = useState(250000);

  const adjustMeter = (meter: keyof typeof meters, delta: number) => {
    setMeters((prev) => ({
      ...prev,
      [meter]: Math.max(0, Math.min(100, prev[meter] + delta)),
    }));
  };

  return (
    <div className="min-h-screen bg-bg-secondary py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="block text-center mb-8">
          <h1 className="block text-4xl font-bold text-primary mb-2">
            Big Wins: The Game
          </h1>
          <p className="block text-lg text-text-secondary">
            Interactive research-to-policy decision-making
          </p>
        </div>

        {/* Impact Counter */}
        <ImpactCounter
          current={impact}
          target={500000}
          metric="students reached"
        />

        {/* Meter Panel */}
        <MeterPanel
          evidence={meters.evidence}
          network={meters.network}
          narrative={meters.narrative}
          implementation={meters.implementation}
        />

        {/* Demo Controls */}
        <div className="block max-w-4xl mx-auto mt-6 bg-white rounded-lg shadow-md border border-border p-6">
          <h3 className="block text-lg font-bold text-text-dark mb-4">Demo Controls</h3>
          <div className="block grid grid-cols-2 gap-4">
            <button
              onClick={() => adjustMeter('evidence', 10)}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              +10 Evidence
            </button>
            <button
              onClick={() => adjustMeter('network', 10)}
              className="px-4 py-2 bg-success text-white rounded hover:bg-success/90 transition-colors"
            >
              +10 Network
            </button>
            <button
              onClick={() => adjustMeter('narrative', 10)}
              className="px-4 py-2 bg-warning text-white rounded hover:bg-warning/90 transition-colors"
            >
              +10 Narrative
            </button>
            <button
              onClick={() => adjustMeter('implementation', 10)}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              +10 Implementation
            </button>
            <button
              onClick={() => setImpact((prev) => prev + 50000)}
              className="col-span-2 px-4 py-2 bg-primary-dark text-white rounded hover:bg-primary transition-colors"
            >
              +50,000 Impact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
