import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Decision } from '../data/types';

interface PolicyWindowProps {
  decision: Decision;
  onChoice: (choiceIndex: number) => void;
}

export function PolicyWindow({ decision, onChoice }: PolicyWindowProps) {
  const timerDuration = decision.timer || 20;
  const [timeRemaining, setTimeRemaining] = useState(timerDuration);
  const [hasChosen, setHasChosen] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  useEffect(() => {
    if (timeRemaining <= 0 && !hasChosen) {
      // Auto-select last choice when timer expires
      const lastChoiceIndex = decision.choices.length - 1;
      setSelectedChoice(lastChoiceIndex);
      setHasChosen(true);

      setTimeout(() => {
        onChoice(lastChoiceIndex);
      }, 1000);
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, hasChosen, decision.choices.length, onChoice]);

  const handleChoice = (choiceIndex: number) => {
    if (!hasChosen) {
      setHasChosen(true);
      setSelectedChoice(choiceIndex);

      // Add a short delay before transitioning to show selection
      setTimeout(() => {
        onChoice(choiceIndex);
      }, 800);
    }
  };

  const percentage = (timeRemaining / timerDuration) * 100;
  const urgencyColor =
    percentage > 66 ? 'bg-green-500' :
    percentage > 33 ? 'bg-yellow-500' :
    'bg-red-500';

  const urgencyText =
    percentage > 66 ? 'text-green-700' :
    percentage > 33 ? 'text-yellow-700' :
    'text-red-700';

  return (
    <motion.div
      className="block w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="block bg-white rounded-lg shadow-lg border border-border p-8">
        {/* Policy Window Badge */}
        <div className="block mb-4">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded">
            ⏰ POLICY WINDOW
          </span>
        </div>

        {/* Timer */}
        <div className="block mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="block text-sm font-medium text-text-dark">
              Time Remaining
            </span>
            <span className={`block text-2xl font-bold ${urgencyText}`}>
              {timeRemaining}s
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${urgencyColor}`}
              initial={{ width: '100%' }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="block text-xs text-text-secondary mt-1">
            {timeRemaining === 0
              ? 'Time expired - defaulting to last option'
              : 'Act quickly! This opportunity won\'t last.'}
          </p>
        </div>

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

        {/* Result Preview (shown after selection) */}
        {hasChosen && selectedChoice !== null && (
          <motion.div
            className="block mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="block text-sm font-medium text-green-800 mb-2">
              Decision made!
            </p>
            <p className="block text-sm text-green-700">
              {decision.choices[selectedChoice].text}
            </p>
          </motion.div>
        )}

        {/* Choices */}
        <div className="block space-y-3">
          {decision.choices.map((choice, index) => {
            const isSelected = selectedChoice === index;
            return (
              <motion.button
                key={index}
                onClick={() => handleChoice(index)}
                disabled={hasChosen}
                className={`
                  block w-full text-left p-4 border-2 rounded-lg transition-all duration-200
                  ${hasChosen && !isSelected
                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-40'
                    : hasChosen && isSelected
                    ? 'border-green-500 bg-green-50 cursor-not-allowed'
                    : 'border-border hover:border-primary hover:bg-primary/5 cursor-pointer'
                  }
                `}
                whileHover={hasChosen ? {} : { scale: 1.02 }}
                whileTap={hasChosen ? {} : { scale: 0.98 }}
              >
                <div className="block">
                  <p className={`block text-base font-medium ${isSelected ? 'text-green-800' : 'text-text-dark'}`}>
                    {isSelected && '✓ '}{choice.text}
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
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
