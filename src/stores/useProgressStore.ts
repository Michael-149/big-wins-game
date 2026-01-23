import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Grade, GameMeters } from '../data/types';
import { scenarioMetadata } from '../data/scenarioMetadata';

export interface ScenarioCompletion {
  scenarioId: string;
  completed: boolean;
  bestGrade: Grade | null;
  bestImpact: number;
  bestMeters: GameMeters | null;
  completedAt: string | null;
  playCount: number;
}

interface ProgressState {
  completions: Record<string, ScenarioCompletion>;

  // Actions
  recordCompletion: (
    scenarioId: string,
    grade: Grade,
    impact: number,
    meters: GameMeters
  ) => void;
  isScenarioUnlocked: (scenarioId: string) => boolean;
  isLevelUnlocked: (level: 1 | 2 | 3) => boolean;
  getCompletionCount: (level: 1 | 2 | 3) => number;
  resetProgress: () => void;
}

// Grade ranking for comparison
const gradeRank: Record<Grade, number> = {
  'F': 0,
  'D': 1,
  'C': 2,
  'B': 3,
  'A': 4,
  'A+': 5,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completions: {},

      recordCompletion: (scenarioId, grade, impact, meters) => {
        set((state) => {
          const existing = state.completions[scenarioId];
          const isNewBest = !existing ||
            gradeRank[grade] > gradeRank[existing.bestGrade || 'F'] ||
            (grade === existing.bestGrade && impact > existing.bestImpact);

          return {
            completions: {
              ...state.completions,
              [scenarioId]: {
                scenarioId,
                completed: true,
                bestGrade: isNewBest ? grade : (existing?.bestGrade || grade),
                bestImpact: isNewBest ? impact : (existing?.bestImpact || impact),
                bestMeters: isNewBest ? meters : (existing?.bestMeters || meters),
                completedAt: new Date().toISOString(),
                playCount: (existing?.playCount || 0) + 1,
              },
            },
          };
        });
      },

      isScenarioUnlocked: (scenarioId) => {
        const scenario = scenarioMetadata.find((s) => s.id === scenarioId);
        if (!scenario) return false;

        return get().isLevelUnlocked(scenario.level);
      },

      isLevelUnlocked: (level) => {
        if (level === 1) return true; // Level 1 always unlocked

        const state = get();
        const previousLevel = (level - 1) as 1 | 2;
        const completionCount = state.getCompletionCount(previousLevel);

        // Need 2+ completions from previous level to unlock next
        return completionCount >= 2;
      },

      getCompletionCount: (level) => {
        const state = get();
        const scenariosInLevel = scenarioMetadata.filter((s) => s.level === level);

        return scenariosInLevel.filter((scenario) =>
          state.completions[scenario.id]?.completed
        ).length;
      },

      resetProgress: () => {
        set({ completions: {} });
      },
    }),
    {
      name: 'big-wins-progress',
    }
  )
);
