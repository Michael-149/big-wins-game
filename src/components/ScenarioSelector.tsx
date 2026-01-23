import { ScenarioCard } from './ScenarioCard';
import { getScenariosByLevel } from '../data/scenarioMetadata';
import { useProgressStore } from '../stores/useProgressStore';
import type { ScenarioMetadata } from '../data/scenarioMetadata';

interface ScenarioSelectorProps {
  onSelectScenario: (scenario: ScenarioMetadata) => void;
}

export function ScenarioSelector({ onSelectScenario }: ScenarioSelectorProps) {
  const { completions, isScenarioUnlocked, isLevelUnlocked, getCompletionCount } = useProgressStore();

  const level1Scenarios = getScenariosByLevel(1);
  const level2Scenarios = getScenariosByLevel(2);
  const level3Scenarios = getScenariosByLevel(3);

  const level2Unlocked = isLevelUnlocked(2);
  const level3Unlocked = isLevelUnlocked(3);

  const level1Completions = getCompletionCount(1);
  const level2Completions = getCompletionCount(2);

  return (
    <div className="block w-full max-w-7xl mx-auto">
      <div className="block mb-8 text-center">
        <h1 className="block text-4xl font-bold text-primary mb-2">
          Big Wins: The Game
        </h1>
        <p className="block text-lg text-text-secondary">
          Choose a scenario to play
        </p>
      </div>

      {/* Level 1 */}
      <div className="block mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="block text-2xl font-bold text-text-dark">
            Level 1: Getting Started
          </h2>
          <span className="text-sm text-text-secondary">
            {level1Completions} / {level1Scenarios.length} completed
          </span>
        </div>
        <div className="block grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {level1Scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              completion={completions[scenario.id]}
              isLocked={!isScenarioUnlocked(scenario.id)}
              onSelect={() => onSelectScenario(scenario)}
            />
          ))}
        </div>
      </div>

      {/* Level 2 */}
      <div className="block mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="block text-2xl font-bold text-text-dark">
            Level 2: Intermediate Challenges
            {!level2Unlocked && (
              <span className="ml-2 text-sm font-normal text-text-secondary">
                🔒 Complete 2+ Level 1 scenarios to unlock
              </span>
            )}
          </h2>
          {level2Unlocked && (
            <span className="text-sm text-text-secondary">
              {level2Completions} / {level2Scenarios.length} completed
            </span>
          )}
        </div>
        <div className="block grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {level2Scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              completion={completions[scenario.id]}
              isLocked={!isScenarioUnlocked(scenario.id)}
              onSelect={() => onSelectScenario(scenario)}
            />
          ))}
        </div>
      </div>

      {/* Level 3 */}
      <div className="block mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="block text-2xl font-bold text-text-dark">
            Level 3: Advanced Scenarios
            {!level3Unlocked && (
              <span className="ml-2 text-sm font-normal text-text-secondary">
                🔒 Complete 2+ Level 2 scenarios to unlock
              </span>
            )}
          </h2>
          {level3Unlocked && (
            <span className="text-sm text-text-secondary">
              {getCompletionCount(3)} / {level3Scenarios.length} completed
            </span>
          )}
        </div>
        <div className="block grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {level3Scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              completion={completions[scenario.id]}
              isLocked={!isScenarioUnlocked(scenario.id)}
              onSelect={() => onSelectScenario(scenario)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
