import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Decision, SliderParameter } from '../data/types';

interface SliderGameProps {
  decision: Decision;
  onChoice: (choiceIndex: number) => void;
}

export function SliderGame({ decision, onChoice }: SliderGameProps) {
  const sliders = decision.sliders || [];

  // Initialize slider values to midpoint
  const initialValues = sliders.reduce((acc, slider) => {
    acc[slider.label] = (slider.min + slider.max) / 2;
    return acc;
  }, {} as Record<string, number>);

  const [sliderValues, setSliderValues] = useState(initialValues);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSliderChange = (label: string, value: number) => {
    if (hasSubmitted) return;
    setSliderValues((prev) => ({ ...prev, [label]: value }));
  };

  const isInTargetRange = (slider: SliderParameter, value: number): boolean => {
    return value >= slider.targetMin && value <= slider.targetMax;
  };

  const calculateScore = (): number => {
    return sliders.filter((slider) =>
      isInTargetRange(slider, sliderValues[slider.label])
    ).length;
  };

  const getQualityGrade = (score: number): string => {
    if (sliders.length === 0) return 'N/A';
    const percentage = (score / sliders.length) * 100;
    if (percentage >= 75) return 'Excellent';
    if (percentage >= 50) return 'Good';
    if (percentage >= 25) return 'Fair';
    return 'Poor';
  };

  const handleSubmit = () => {
    if (hasSubmitted) return;

    const score = calculateScore();
    const percentage = sliders.length > 0 ? (score / sliders.length) * 100 : 0;

    // Determine choice based on score
    // Higher score = better choice (typically first choice)
    // Lower score = worse choice (typically last choice)
    let choiceIndex = decision.choices.length - 1; // Default to worst choice

    if (percentage >= 75) {
      choiceIndex = 0; // Best choice
    } else if (percentage >= 50 && decision.choices.length > 1) {
      choiceIndex = 1; // Middle choice
    }

    setHasSubmitted(true);

    // Short delay to show the result before transitioning
    setTimeout(() => {
      onChoice(choiceIndex);
    }, 1500);
  };

  const score = calculateScore();
  const qualityGrade = getQualityGrade(score);

  return (
    <motion.div
      className="block w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="block bg-white rounded-lg shadow-lg border border-border p-8">
        {/* Slider Game Badge */}
        <div className="block mb-4">
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded">
            ⚙️ DESIGN CHALLENGE
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
        <div className="block mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="block text-sm font-medium text-text-dark mb-1">
            Fine-tune the implementation design
          </p>
          <p className="block text-sm text-text-secondary">
            Adjust each parameter to optimize the intervention. Implementation details determine whether policies succeed or fail at scale.
          </p>
        </div>

        {/* Sliders */}
        <div className="block space-y-6 mb-6">
          {sliders.map((slider) => {
            const value = sliderValues[slider.label];
            const inRange = isInTargetRange(slider, value);

            return (
              <div key={slider.label} className="block">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-text-dark">
                    {slider.label}
                  </label>
                  <span
                    className={`text-sm font-bold ${
                      inRange ? 'text-green-600' : 'text-gray-600'
                    }`}
                  >
                    {value.toFixed(slider.max > 100 ? 0 : 1)}
                    {inRange && ' ✓'}
                  </span>
                </div>

                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={(slider.max - slider.min) / 100}
                  value={value}
                  onChange={(e) =>
                    handleSliderChange(slider.label, parseFloat(e.target.value))
                  }
                  disabled={hasSubmitted}
                  className={`w-full h-3 rounded-lg appearance-none cursor-pointer
                    ${hasSubmitted ? 'opacity-60 cursor-not-allowed' : ''}
                    ${inRange ? 'accent-green-500' : 'accent-gray-400'}
                  `}
                  style={{
                    background: `linear-gradient(to right,
                      #e5e7eb 0%,
                      #e5e7eb ${((slider.targetMin - slider.min) / (slider.max - slider.min)) * 100}%,
                      #86efac ${((slider.targetMin - slider.min) / (slider.max - slider.min)) * 100}%,
                      #86efac ${((slider.targetMax - slider.min) / (slider.max - slider.min)) * 100}%,
                      #e5e7eb ${((slider.targetMax - slider.min) / (slider.max - slider.min)) * 100}%,
                      #e5e7eb 100%
                    )`,
                  }}
                />

                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>{slider.min}</span>
                  <span className="text-green-600 font-medium">
                    Optimal: {slider.targetMin} - {slider.targetMax}
                  </span>
                  <span>{slider.max}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Score Display */}
        <div className="block mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-text-dark">
              Design Quality:
            </span>
            <span
              className={`text-lg font-bold ${
                score >= sliders.length * 0.75
                  ? 'text-green-600'
                  : score >= sliders.length * 0.5
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {qualityGrade} ({score}/{sliders.length} optimal)
            </span>
          </div>
        </div>

        {/* Result Preview (shown after submission) */}
        {hasSubmitted && (
          <motion.div
            className="block mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="block text-sm font-medium text-green-800 mb-2">
              Implementation design complete
            </p>
            <p className="block text-sm text-green-700">
              Processing your configuration...
            </p>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={hasSubmitted}
          className={`
            w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
            ${hasSubmitted
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark cursor-pointer'
            }
          `}
        >
          {hasSubmitted ? 'Implementing design...' : 'Finalize Design'}
        </button>
      </div>
    </motion.div>
  );
}
