import { create } from 'zustand';
import type { Scenario, Choice, PlayerChoice, GameMeters } from '../data/types';

interface GameState {
  // Current game state
  currentScenario: Scenario | null;
  currentDecisionId: number;
  meters: GameMeters;
  impact: number;
  history: PlayerChoice[];

  // Actions
  initializeGame: (scenario: Scenario) => void;
  makeChoice: (choice: Choice, decisionId: number, choiceText: string) => void;
  resetGame: () => void;
}

const INITIAL_METERS: GameMeters = {
  evidence: 50,
  network: 50,
  narrative: 50,
  implementation: 50,
};

export const useGameState = create<GameState>((set) => ({
  // Initial state
  currentScenario: null,
  currentDecisionId: 1,
  meters: INITIAL_METERS,
  impact: 0,
  history: [],

  // Initialize a new game with a scenario
  initializeGame: (scenario: Scenario) => {
    set({
      currentScenario: scenario,
      currentDecisionId: 1,
      meters: INITIAL_METERS,
      impact: 0,
      history: [],
    });
  },

  // Make a choice and apply effects
  makeChoice: (choice: Choice, decisionId: number, choiceText: string) => {
    set((state) => {
      // Apply effects to meters
      const newMeters: GameMeters = {
        evidence: Math.max(0, Math.min(100, state.meters.evidence + (choice.effects.evidence || 0))),
        network: Math.max(0, Math.min(100, state.meters.network + (choice.effects.network || 0))),
        narrative: Math.max(0, Math.min(100, state.meters.narrative + (choice.effects.narrative || 0))),
        implementation: Math.max(0, Math.min(100, state.meters.implementation + (choice.effects.implementation || 0))),
      };

      // Apply impact
      const newImpact = Math.max(0, state.impact + (choice.effects.impact || 0));

      // Record choice in history
      const newHistory: PlayerChoice[] = [
        ...state.history,
        {
          decisionId,
          choiceText,
          effects: choice.effects,
        },
      ];

      // Determine next decision
      const nextDecisionId = choice.nextDecision === "end" ? -1 : choice.nextDecision;

      return {
        meters: newMeters,
        impact: newImpact,
        history: newHistory,
        currentDecisionId: nextDecisionId,
      };
    });
  },

  // Reset game state
  resetGame: () => {
    set({
      currentScenario: null,
      currentDecisionId: 1,
      meters: INITIAL_METERS,
      impact: 0,
      history: [],
    });
  },
}));
