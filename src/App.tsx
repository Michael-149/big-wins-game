import { useEffect } from 'react';
import { ImpactCounter } from './components/ImpactCounter';
import { MeterPanel } from './components/MeterPanel';
import { DecisionCard } from './components/DecisionCard';
import { useGameState } from './stores/useGameState';
import growthMindsetData from './data/scenarios/growth-mindset.json';
import type { Scenario } from './data/types';

export default function App() {
  const {
    currentScenario,
    currentDecisionId,
    meters,
    impact,
    initializeGame,
    makeChoice,
    resetGame,
  } = useGameState();

  // Initialize game with growth mindset scenario on mount
  useEffect(() => {
    initializeGame(growthMindsetData as Scenario);
  }, [initializeGame]);

  // Find current decision
  const currentDecision = currentScenario?.decisions.find(
    (d) => d.id === currentDecisionId
  );

  // Handle choice selection
  const handleChoice = (choiceIndex: number) => {
    if (!currentDecision) return;
    const choice = currentDecision.choices[choiceIndex];
    makeChoice(choice, currentDecisionId, choice.text);
  };

  // Handle game restart
  const handleRestart = () => {
    resetGame();
    initializeGame(growthMindsetData as Scenario);
  };

  // Game ended
  const gameEnded = currentDecisionId === -1;

  return (
    <div className="min-h-screen bg-bg-secondary py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="block text-center mb-8">
          <h1 className="block text-4xl font-bold text-primary mb-2">
            Big Wins: The Game
          </h1>
          {currentScenario && (
            <p className="block text-lg text-text-secondary">
              {currentScenario.title}
            </p>
          )}
        </div>

        {/* Impact Counter */}
        {currentScenario && (
          <ImpactCounter
            current={impact}
            target={currentScenario.victoryTarget}
            metric={currentScenario.victoryMetric}
          />
        )}

        {/* Meter Panel */}
        <MeterPanel
          evidence={meters.evidence}
          network={meters.network}
          narrative={meters.narrative}
          implementation={meters.implementation}
        />

        {/* Game Content */}
        <div className="mt-6">
          {gameEnded ? (
            // End Screen (placeholder)
            <div className="block max-w-4xl mx-auto bg-white rounded-lg shadow-lg border border-border p-8 text-center">
              <h2 className="block text-3xl font-bold text-primary mb-4">
                Game Complete!
              </h2>
              <p className="block text-xl text-text-dark mb-2">
                Final Impact: {impact.toLocaleString()} / {currentScenario?.victoryTarget.toLocaleString()}
              </p>
              <p className="block text-lg text-text-secondary mb-6">
                {impact >= (currentScenario?.victoryTarget || 0)
                  ? 'You achieved your goal! 🎉'
                  : 'Keep trying to reach your target!'}
              </p>
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Play Again
              </button>
            </div>
          ) : currentDecision ? (
            // Decision Card
            <DecisionCard decision={currentDecision} onChoice={handleChoice} />
          ) : (
            // Loading state
            <div className="block text-center text-text-secondary">
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
