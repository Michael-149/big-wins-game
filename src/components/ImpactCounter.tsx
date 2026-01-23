import { motion } from 'framer-motion';

interface ImpactCounterProps {
  current: number;
  target: number;
  metric: string;
}

export function ImpactCounter({ current, target, metric }: ImpactCounterProps) {
  const percentage = Math.min(100, (current / target) * 100);

  return (
    <div className="block w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-border p-6 mb-6">
      <div className="block">
        <div className="flex justify-between items-baseline mb-2">
          <h2 className="block text-lg font-bold text-text-dark">Impact Progress</h2>
          <span className="block text-sm text-text-secondary">
            {Math.round(percentage)}% to goal
          </span>
        </div>

        <motion.div
          className="block text-4xl font-bold text-primary mb-2"
          key={current}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
        >
          <div className="block">
            {current.toLocaleString()} / {target.toLocaleString()}
          </div>
        </motion.div>

        <p className="block text-sm text-text-secondary mb-4">{metric}</p>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
