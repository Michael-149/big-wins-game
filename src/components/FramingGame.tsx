import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Decision } from '../data/types';

interface FramingGameProps {
  decision: Decision;
  onChoice: (choiceIndex: number) => void;
}

export function FramingGame({ decision, onChoice }: FramingGameProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const words = decision.words || [];
  const maxSelections = 3;

  const toggleWord = (word: string) => {
    if (hasSubmitted) return;

    setSelectedWords((prev) => {
      if (prev.includes(word)) {
        // Deselect word
        return prev.filter((w) => w !== word);
      } else if (prev.length < maxSelections) {
        // Select word (if under limit)
        return [...prev, word];
      }
      return prev;
    });
  };

  const getMatchingChoice = (): string => {
    // Find which choice best matches the selected words
    // The choice with the most keyword matches wins
    let bestChoice = decision.choices[decision.choices.length - 1];
    let bestMatchCount = 0;

    decision.choices.forEach((choice) => {
      if (!choice.keywords) return;

      const matchCount = selectedWords.filter((word) =>
        choice.keywords!.includes(word)
      ).length;

      if (matchCount > bestMatchCount) {
        bestMatchCount = matchCount;
        bestChoice = choice;
      }
    });

    return bestChoice.text;
  };

  const handleSubmit = () => {
    if (selectedWords.length === 0 || hasSubmitted) return;

    // Find matching choice index (default to last/worst choice if no keywords match)
    let bestChoiceIndex = decision.choices.length - 1;
    let bestMatchCount = 0;

    decision.choices.forEach((choice, index) => {
      if (!choice.keywords) return;

      const matchCount = selectedWords.filter((word) =>
        choice.keywords!.includes(word)
      ).length;

      if (matchCount > bestMatchCount) {
        bestMatchCount = matchCount;
        bestChoiceIndex = index;
      }
    });

    setHasSubmitted(true);

    // Short delay to show the result before transitioning
    setTimeout(() => {
      onChoice(bestChoiceIndex);
    }, 1500);
  };

  return (
    <motion.div
      className="block w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="block bg-white rounded-lg shadow-lg border border-border p-8">
        {/* Framing Game Badge */}
        <div className="block mb-4">
          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded">
            💬 FRAMING CHALLENGE
          </span>
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

        {/* Instructions */}
        <div className="block mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="block text-sm font-medium text-text-dark mb-1">
            How will you frame this research?
          </p>
          <p className="block text-sm text-text-secondary">
            Select up to {maxSelections} words that capture your communication strategy. Your framing choices will determine how different audiences respond.
          </p>
          <p className="block text-xs text-text-secondary mt-2">
            Selected: {selectedWords.length} / {maxSelections}
          </p>
        </div>

        {/* Word Grid */}
        <div className="block grid grid-cols-3 gap-3 mb-8">
          {words.map((word) => {
            const isSelected = selectedWords.includes(word);
            return (
              <motion.button
                key={word}
                onClick={() => toggleWord(word)}
                disabled={hasSubmitted}
                className={`
                  p-4 rounded-lg border-2 font-medium transition-all duration-200
                  ${hasSubmitted
                    ? 'cursor-not-allowed opacity-60'
                    : 'cursor-pointer hover:scale-105'
                  }
                  ${isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-white text-gray-900 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                  }
                `}
                whileTap={hasSubmitted ? {} : { scale: 0.95 }}
              >
                {word}
              </motion.button>
            );
          })}
        </div>

        {/* Result Preview (shown after submission) */}
        {hasSubmitted && (
          <motion.div
            className="block mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="block text-sm font-medium text-green-800 mb-2">
              Your framing strategy:
            </p>
            <p className="block text-sm text-green-700">
              "{getMatchingChoice()}"
            </p>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={selectedWords.length === 0 || hasSubmitted}
          className={`
            w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md
            ${selectedWords.length === 0 || hasSubmitted
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-50'
              : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer hover:shadow-lg'
            }
          `}
        >
          {hasSubmitted ? 'Applying your framing...' : 'Submit Framing'}
        </button>
      </div>
    </motion.div>
  );
}
