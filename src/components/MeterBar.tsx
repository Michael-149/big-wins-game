interface MeterBarProps {
  label: string;
  value: number;
  color: string;
  emoji?: string;
}

export function MeterBar({ label, value, color, emoji }: MeterBarProps) {
  // Clamp value between 0-100
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text-dark">
          {emoji && <span className="mr-1">{emoji}</span>}
          {label}
        </span>
        <span className="text-sm font-bold text-text-dark">{Math.round(clampedValue)}</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-out rounded-full"
          style={{
            width: `${clampedValue}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
