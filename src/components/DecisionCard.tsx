import { motion } from 'framer-motion';
import type { Decision } from '../data/types';

interface DecisionCardProps {
  decision: Decision;
  onChoice: (choiceIndex: number) => void;
}

export function DecisionCard({ decision, onChoice }: DecisionCardProps) {
  return (
    <motion.div
      className="block w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="block bg-white rounded-lg shadow-lg border border-border p-8">
        {/* Year Range */}
        <div className="block mb-2">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded">
            {decision.yearRange}
          </span>
        </div>

        {/* Title */}
        <div className="block mb-4">
          <h2 className="block text-2xl font-bold text-text-dark">
            {decision.title}
          </h2>
        </div>

        {/* Context Card */}
        <div className="block mb-6">
          <p className="block text-base text-text-secondary leading-relaxed">
            {decision.contextCard}
          </p>
        </div>

        {/* Choices */}
        <div className="block space-y-3">
          {decision.choices.map((choice, index) => (
            <motion.button
              key={index}
              onClick={() => onChoice(index)}
              className="block w-full text-left p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="block">
                <p className="block text-base font-medium text-text-dark">
                  {choice.text}
                </p>
                {/* Effect hints */}
                <div className="block mt-2 flex flex-wrap gap-2">
                  {choice.effects.evidence && (
                    <span className={`text-xs px-2 py-1 rounded ${choice.effects.evidence > 0 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                      Evidence {choice.effects.evidence > 0 ? '+' : ''}{choice.effects.evidence}
                    </span>
                  )}
                  {choice.effects.network && (
                    <span className={`text-xs px-2 py-1 rounded ${choice.effects.network > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      Network {choice.effects.network > 0 ? '+' : ''}{choice.effects.network}
                    </span>
                  )}
                  {choice.effects.narrative && (
                    <span className={`text-xs px-2 py-1 rounded ${choice.effects.narrative > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      Narrative {choice.effects.narrative > 0 ? '+' : ''}{choice.effects.narrative}
                    </span>
                  )}
                  {choice.effects.implementation && (
                    <span className={`text-xs px-2 py-1 rounded ${choice.effects.implementation > 0 ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700'}`}>
                      Implementation {choice.effects.implementation > 0 ? '+' : ''}{choice.effects.implementation}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
