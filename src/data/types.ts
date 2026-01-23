export interface Scenario {
  id: string;
  title: string;
  description: string;
  startYear: number;
  victoryTarget: number;
  victoryMetric: string;
  decisions: Decision[];
}

export interface Decision {
  id: number;
  yearRange: string;
  title: string;
  contextCard: string;
  type: "simple" | "policy_window" | "framing_game" | "slider_game";
  timer?: number;
  choices: Choice[];
  // For framing game
  categories?: FramingCategory[];
  // For slider game
  sliders?: SliderParameter[];
}

export interface Choice {
  text: string;
  effects: MeterEffects;
  nextDecision: number | "end";
}

export interface MeterEffects {
  evidence?: number;
  network?: number;
  narrative?: number;
  implementation?: number;
  impact?: number;
}

export interface FramingCategory {
  category: string;
  words: string[];
}

export interface SliderParameter {
  label: string;
  min: number;
  max: number;
  targetMin: number;
  targetMax: number;
}

export interface PlayerChoice {
  decisionId: number;
  choiceText: string;
  effects: MeterEffects;
}

export interface GameMeters {
  evidence: number;
  network: number;
  narrative: number;
  implementation: number;
}

export type Grade = "F" | "D" | "C" | "B" | "A" | "A+";
