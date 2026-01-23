import { motion } from 'framer-motion';
import type { Scenario, Grade, GameMeters } from '../data/types';

interface EndScreenProps {
  scenario: Scenario;
  impact: number;
  meters: GameMeters;
  onRestart: () => void;
  onBackToMenu: () => void;
}

function calculateGrade(impact: number, target: number): Grade {
  const percentage = (impact / target) * 100;

  if (percentage >= 150) return 'A+';
  if (percentage >= 120) return 'A';
  if (percentage >= 100) return 'B';
  if (percentage >= 75) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}

const gradeColors: Record<Grade, string> = {
  'A+': 'text-purple-600 bg-purple-50 border-purple-200',
  'A': 'text-blue-600 bg-blue-50 border-blue-200',
  'B': 'text-green-600 bg-green-50 border-green-200',
  'C': 'text-yellow-600 bg-yellow-50 border-yellow-200',
  'D': 'text-orange-600 bg-orange-50 border-orange-200',
  'F': 'text-red-600 bg-red-50 border-red-200',
};

const gradeMessages: Record<Grade, string> = {
  'A+': 'Outstanding! You exceeded all expectations and created transformative impact.',
  'A': 'Excellent work! Your strategy achieved significant real-world impact.',
  'B': 'Good job! You met your goal and made a meaningful difference.',
  'C': 'Decent effort. You made progress but fell short of the full goal.',
  'D': 'Limited impact. Your approach struggled to gain traction.',
  'F': 'Unsuccessful. Your strategy failed to achieve meaningful impact.',
};

export function EndScreen({ scenario, impact, meters, onRestart, onBackToMenu }: EndScreenProps) {
  const grade = calculateGrade(impact, scenario.victoryTarget);
  const percentage = Math.round((impact / scenario.victoryTarget) * 100);

  return (
    <motion.div
      className="block w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-border p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="block text-center mb-8">
        <h2 className="block text-3xl font-bold text-text-dark mb-2">
          Scenario Complete!
        </h2>
        <p className="block text-lg text-text-secondary">
          {scenario.title}
        </p>
      </div>

      {/* Grade Display */}
      <div className={`block mb-8 p-8 rounded-lg border-2 ${gradeColors[grade]}`}>
        <div className="text-center">
          <div className="block text-7xl font-bold mb-2">
            {grade}
          </div>
          <p className="block text-lg font-medium">
            {gradeMessages[grade]}
          </p>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="block mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="block text-lg font-bold text-text-dark mb-4">Impact Summary</h3>

        <div className="block mb-4">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm text-text-secondary">Final Impact</span>
            <span className="text-sm font-medium text-text-dark">{percentage}% of goal</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min(100, percentage)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm font-medium text-text-dark">
              {impact.toLocaleString()} {scenario.victoryMetric}
            </span>
            <span className="text-sm text-text-secondary">
              Goal: {scenario.victoryTarget.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Meter breakdown */}
        <div className="block grid grid-cols-2 gap-3 mt-4">
          <div>
            <span className="block text-xs text-text-secondary mb-1">Evidence</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${meters.evidence}%` }}
                />
              </div>
              <span className="text-sm font-medium text-text-dark w-8">{meters.evidence}</span>
            </div>
          </div>
          <div>
            <span className="block text-xs text-text-secondary mb-1">Network</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${meters.network}%` }}
                />
              </div>
              <span className="text-sm font-medium text-text-dark w-8">{meters.network}</span>
            </div>
          </div>
          <div>
            <span className="block text-xs text-text-secondary mb-1">Narrative</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${meters.narrative}%` }}
                />
              </div>
              <span className="text-sm font-medium text-text-dark w-8">{meters.narrative}</span>
            </div>
          </div>
          <div>
            <span className="block text-xs text-text-secondary mb-1">Implementation</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${meters.implementation}%` }}
                />
              </div>
              <span className="text-sm font-medium text-text-dark w-8">{meters.implementation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="block flex gap-4">
        <button
          onClick={onBackToMenu}
          className="flex-1 px-6 py-3 bg-gray-200 text-text-dark rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Back to Scenarios
        </button>
        <button
          onClick={onRestart}
          className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
}

export { calculateGrade };
