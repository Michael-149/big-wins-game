import type { Scenario } from './types';

// Import all scenario data
import growthMindsetData from './scenarios/growth-mindset.json';
import movingToOpportunityData from './scenarios/moving-to-opportunity.json';
import needleExchangeData from './scenarios/needle-exchange.json';
import behavioralNudgesData from './scenarios/behavioral-nudges.json';
import emissionsTradingData from './scenarios/emissions-trading.json';
import diceModelData from './scenarios/dice-model.json';
import fccSpectrumData from './scenarios/fcc-spectrum.json';
import amcVaccinesData from './scenarios/amc-vaccines.json';

export interface ScenarioMetadata {
  id: string;
  data: Scenario;
  level: 1 | 2 | 3;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  tags: string[];
}

export const scenarioMetadata: ScenarioMetadata[] = [
  // Level 1: Easier scenarios with clearer paths
  {
    id: 'growth_mindset',
    data: growthMindsetData as Scenario,
    level: 1,
    difficulty: 'Easy',
    estimatedTime: '10-15 min',
    tags: ['Education', 'Psychology', 'US Policy'],
  },
  {
    id: 'moving_to_opportunity',
    data: movingToOpportunityData as Scenario,
    level: 1,
    difficulty: 'Easy',
    estimatedTime: '12-15 min',
    tags: ['Housing', 'Mobility', 'RCT'],
  },
  {
    id: 'needle_exchange',
    data: needleExchangeData as Scenario,
    level: 1,
    difficulty: 'Medium',
    estimatedTime: '12-18 min',
    tags: ['Public Health', 'Harm Reduction', 'Controversy'],
  },

  // Level 2: More complex scenarios
  {
    id: 'behavioral_nudges',
    data: behavioralNudgesData as Scenario,
    level: 2,
    difficulty: 'Medium',
    estimatedTime: '15-20 min',
    tags: ['Behavioral Economics', 'Policy Design', 'Global'],
  },
  {
    id: 'emissions_trading',
    data: emissionsTradingData as Scenario,
    level: 2,
    difficulty: 'Medium',
    estimatedTime: '15-20 min',
    tags: ['Environment', 'Economics', 'Market Design'],
  },
  {
    id: 'dice_model',
    data: diceModelData as Scenario,
    level: 2,
    difficulty: 'Hard',
    estimatedTime: '18-25 min',
    tags: ['Climate', 'Economics', 'Modeling'],
  },

  // Level 3: Most challenging scenarios
  {
    id: 'fcc_spectrum',
    data: fccSpectrumData as Scenario,
    level: 3,
    difficulty: 'Hard',
    estimatedTime: '20-25 min',
    tags: ['Telecommunications', 'Auction Design', 'Regulation'],
  },
  {
    id: 'amc_vaccines',
    data: amcVaccinesData as Scenario,
    level: 3,
    difficulty: 'Hard',
    estimatedTime: '20-30 min',
    tags: ['Global Health', 'Market Design', 'International'],
  },
];

// Helper functions
export function getScenariosByLevel(level: 1 | 2 | 3): ScenarioMetadata[] {
  return scenarioMetadata.filter((s) => s.level === level);
}

export function getScenarioById(id: string): ScenarioMetadata | undefined {
  return scenarioMetadata.find((s) => s.id === id);
}
