import { useState, useEffect } from 'react';
import { ImpactCounter } from './components/ImpactCounter';
import { MeterPanel } from './components/MeterPanel';
import { DecisionCard } from './components/DecisionCard';
import { PolicyWindow } from './components/PolicyWindow';
import { ScenarioSelector } from './components/ScenarioSelector';
import { EndScreen, calculateGrade } from './components/EndScreen';
import { useGameState } from './stores/useGameState';
import { useProgressStore } from './stores/useProgressStore';
import type { ScenarioMetadata } from './data/scenarioMetadata';

type GameScreen = 'menu' | 'playing' | 'ended';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const [selectedScenarioMeta, setSelectedScenarioMeta] = useState<ScenarioMetadata | null>(null);

  const {
    currentScenario,
    currentDecisionId,
    meters,
    impact,
    initializeGame,
    makeChoice,
    resetGame,
  } = useGameState();

  const { recordCompletion } = useProgressStore();

  // When a scenario is selected from the menu
  const handleSelectScenario = (scenarioMeta: ScenarioMetadata) => {
    setSelectedScenarioMeta(scenarioMeta);
    initializeGame(scenarioMeta.data);
    setCurrentScreen('playing');
  };

  // When game ends, record completion
  useEffect(() => {
    if (currentDecisionId === -1 && currentScreen === 'playing' && currentScenario && selectedScenarioMeta) {
      const grade = calculateGrade(impact, currentScenario.victoryTarget);
      recordCompletion(selectedScenarioMeta.id, grade, impact, meters);
      setCurrentScreen('ended');
    }
  }, [currentDecisionId, currentScreen, currentScenario, selectedScenarioMeta, impact, meters, recordCompletion]);

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

  // Handle game restart (same scenario)
  const handleRestart = () => {
    if (!selectedScenarioMeta) return;
    resetGame();
    initializeGame(selectedScenarioMeta.data);
    setCurrentScreen('playing');
  };

  // Return to menu
  const handleBackToMenu = () => {
    resetGame();
    setSelectedScenarioMeta(null);
    setCurrentScreen('menu');
  };

  return (
    <div className="min-h-screen bg-bg-secondary py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {currentScreen === 'menu' ? (
          // Scenario Selection Screen
          <ScenarioSelector onSelectScenario={handleSelectScenario} />
        ) : (
          <>
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
              <button
                onClick={handleBackToMenu}
                className="mt-2 text-sm text-primary hover:underline"
              >
                ← Back to Scenarios
              </button>
            </div>

            {/* Impact Counter */}
            {currentScenario && currentScreen === 'playing' && (
              <ImpactCounter
                current={impact}
                target={currentScenario.victoryTarget}
                metric={currentScenario.victoryMetric}
              />
            )}

            {/* Meter Panel */}
            {currentScreen === 'playing' && (
              <MeterPanel
                evidence={meters.evidence}
                network={meters.network}
                narrative={meters.narrative}
                implementation={meters.implementation}
              />
            )}

            {/* Game Content */}
            <div className="mt-6">
              {currentScreen === 'ended' && currentScenario ? (
                // End Screen with grading
                <EndScreen
                  scenario={currentScenario}
                  impact={impact}
                  meters={meters}
                  onRestart={handleRestart}
                  onBackToMenu={handleBackToMenu}
                />
              ) : currentDecision ? (
                // Render appropriate decision type
                currentDecision.type === 'policy_window' ? (
                  <PolicyWindow decision={currentDecision} onChoice={handleChoice} />
                ) : (
                  // Default to DecisionCard for simple, framing_game, and slider_game
                  <DecisionCard decision={currentDecision} onChoice={handleChoice} />
                )
              ) : (
                // Loading state
                <div className="block text-center text-text-secondary">
                  Loading...
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
