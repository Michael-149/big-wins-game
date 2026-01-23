import { MeterBar } from './MeterBar';

interface MeterPanelProps {
  evidence: number;
  network: number;
  narrative: number;
  implementation: number;
}

export function MeterPanel({ evidence, network, narrative, implementation }: MeterPanelProps) {
  return (
    <div className="block w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-border p-6">
      <h2 className="block text-lg font-bold text-text-dark mb-4">Resources</h2>
      <div className="block space-y-4">
        <MeterBar label="Evidence" value={evidence} color="#0779bf" />
        <MeterBar label="Network" value={network} color="#10b981" />
        <MeterBar label="Narrative" value={narrative} color="#f59e0b" />
        <MeterBar label="Implementation" value={implementation} color="#8b5cf6" />
      </div>
    </div>
  );
}
