import { motion } from 'framer-motion';
import type { ScenarioMetadata } from '../data/scenarioMetadata';
import type { ScenarioCompletion } from '../stores/useProgressStore';

interface ScenarioCardProps {
  scenario: ScenarioMetadata;
  completion?: ScenarioCompletion;
  isLocked: boolean;
  onSelect: () => void;
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
};

const gradeColors: Record<string, string> = {
  'A+': 'bg-purple-100 text-purple-700 border-purple-300',
  'A': 'bg-blue-100 text-blue-700 border-blue-300',
  'B': 'bg-green-100 text-green-700 border-green-300',
  'C': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'D': 'bg-orange-100 text-orange-700 border-orange-300',
  'F': 'bg-red-100 text-red-700 border-red-300',
};

export function ScenarioCard({ scenario, completion, isLocked, onSelect }: ScenarioCardProps) {
  return (
    <motion.button
      onClick={isLocked ? undefined : onSelect}
      disabled={isLocked}
      className={`
        block w-full text-left p-6 rounded-lg border-2 transition-all duration-200
        ${isLocked
          ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
          : 'bg-white border-border hover:border-primary hover:shadow-lg cursor-pointer'
        }
      `}
      whileHover={isLocked ? {} : { scale: 1.02 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
    >
      <div className="block">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="block text-xl font-bold text-text-dark mb-1">
              {isLocked ? (
                <span className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>{scenario.data.title}</span>
                </span>
              ) : (
                scenario.data.title
              )}
            </h3>
            <p className="block text-sm text-text-secondary">
              {scenario.estimatedTime}
            </p>
          </div>

          {/* Grade badge if completed */}
          {completion?.bestGrade && !isLocked && (
            <div className={`px-3 py-1 rounded-lg border-2 font-bold ${gradeColors[completion.bestGrade]}`}>
              {completion.bestGrade}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="block text-sm text-text-secondary mb-4 line-clamp-2">
          {scenario.data.description}
        </p>

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-xs px-2 py-1 rounded ${difficultyColors[scenario.difficulty]}`}>
            {scenario.difficulty}
          </span>
          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
            Level {scenario.level}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {scenario.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-gray-100 text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Play count if exists */}
        {completion && completion.playCount > 0 && !isLocked && (
          <p className="block text-xs text-text-secondary mt-3">
            Played {completion.playCount} time{completion.playCount > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </motion.button>
  );
}
