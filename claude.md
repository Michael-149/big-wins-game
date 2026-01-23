# Big Wins - Interactive Research-to-Policy Game

## Project Overview

**Big Wins** is a 15-minute interactive decision-making game about research-to-policy pathways. Players navigate realistic scenarios based on actual social science research that changed the world, learning how research moves from discovery to real-world impact through strategic resource management.

**Live URL**: Deploy to GitHub Pages
**Tech Stack**: React 18 + TypeScript + Vite + Tailwind CSS 4 + Zustand + Framer Motion

---

## User Profile & Working Preferences

### User Profile
- I am not a professional software engineer.
- I cannot read code. I often do not understand tooling, deployment, or infrastructure steps.
- Assume I prefer clarity and safety over cleverness.

### How to Work with Me
- Explain *why* changes are needed before making them.
- Default to the simplest possible solution.
- Avoid advanced abstractions unless clearly necessary.
- If multiple approaches exist, briefly compare them and recommend one.

### Coding Style Preferences
- Prefer readable, boring code.
- Add comments when logic is non-obvious.
- Do not refactor unrelated code without asking.

### Workflow Preferences
- When debugging:
  1. State the hypothesis
  2. Show how you verified it
  3. Propose the fix

- When changing behavior, tell me what will be different afterward.

### Deployment & Visibility Instructions (IMPORTANT)
When work involves **GitHub Pages or any deployment step**, you MUST:

- Assume I do NOT know:
  - where deployments are triggered
  - how to confirm a deployment succeeded
  - how long deployments typically take
  - where to view the deployed result

- Give **explicit, step-by-step instructions** that include:
  - the exact GitHub UI locations to click (e.g., "Settings → Pages → Deployments")
  - what I should expect to see at each step
  - how to confirm whether the deployment used the latest commit
  - how to know whether I am viewing a cached or outdated version

- Explicitly answer:
  - "What do I need to do *right now* to see the updated site?"
  - "How do I verify this update is live?"

- If there are multiple valid ways to view a deployment (Actions tab, Pages settings, commit hash, etc.), recommend **one primary path** and explain why.

### Guardrails
- If something could break production or deployment, warn me explicitly.
- Ask before introducing new dependencies, frameworks, or build steps.

---

## Development Workflow & Session Continuity

### Before Starting Any Work
1. Check `STATUS.md` for current project state and next tasks
2. Review any `TODO.md` or incomplete tasks from previous sessions
3. Run `npm run dev` to verify the project builds and runs

### During Development
1. Make small, incremental commits with descriptive messages
2. Update `STATUS.md` after completing each phase or significant milestone
3. If interrupted mid-task, leave a clear comment in the code: `// TODO: [description of what's needed next]`

### Before Ending a Session
1. Commit all working changes (even if incomplete, commit to a WIP branch)
2. Update `STATUS.md` with:
   - What was completed
   - What's in progress
   - Clear next steps
3. Run the build to ensure no breaking changes: `npm run build`

### STATUS.md Format
```markdown
# Project Status

## Current Phase
[Phase X: Name]

## Completed
- [x] Task 1
- [x] Task 2

## In Progress
- [ ] Task 3 (partial - describe state)

## Next Steps
1. Specific next action
2. Following action

## Known Issues
- Issue description

## Last Updated
[Date/Time]
```

---

## Code Style & Conventions

### General
- Use TypeScript strict mode
- Prefer functional components with hooks
- Keep components under 200 lines; extract when larger
- Use named exports for components
- Colocate related files (component + types + tests)

### File Structure
```
src/
├── components/          # React components
│   ├── App.tsx
│   ├── ScenarioSelector.tsx
│   ├── DecisionCard.tsx
│   ├── PolicyWindow.tsx
│   ├── FramingMiniGame.tsx
│   ├── SliderMiniGame.tsx
│   ├── MeterBar.tsx
│   ├── MeterPanel.tsx
│   ├── ImpactCounter.tsx
│   └── EndScreen.tsx
├── data/
│   ├── types.ts         # TypeScript interfaces
│   └── scenarios/       # 8 JSON scenario files
├── stores/
│   ├── useGameState.ts  # Game state (Zustand)
│   └── useProgressState.ts # Progress tracking (Zustand)
├── App.tsx
├── main.tsx
└── index.css
```

### Naming Conventions
- Components: PascalCase (`DecisionCard.tsx`)
- Hooks: camelCase with `use` prefix (`useGameState.ts`)
- Types/Interfaces: PascalCase (`interface Scenario`)
- Constants: SCREAMING_SNAKE_CASE
- CSS classes: Tailwind utilities only (no custom CSS classes)

---

## Visual Design System (Stanford Impact Style)

Match the aesthetic of https://impact.stanford.edu/

### Color Palette
```css
/* Primary */
--color-primary: #0779bf;
--color-primary-dark: #005a8c;
--color-primary-light: #3399cc;

/* Neutrals */
--color-white: #ffffff;
--color-text-dark: #1a1a1a;
--color-text-secondary: #4a5568;
--color-bg-secondary: #f8fafc;
--color-border: #e2e8f0;

/* Semantic */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
```

### Typography
- **Headlines**: System sans-serif, bold (700)
- **Body**: Inter or system sans-serif, regular (400)
- Clean, institutional aesthetic

### Layout Principles
- Card-based layout
- Generous whitespace
- Subtle shadows, clean borders
- Mobile-first responsive
- Max content width: 1200px, centered

---

## Critical CSS/Layout Rules

**These rules exist to prevent text alignment and framing issues that plagued the previous build.**

1. **Never use `display: 'inline'` on Framer Motion animated elements**
2. **Use Tailwind's `block` class for all text wrappers inside animations**
3. **Set explicit `max-width` on text containers, not just parent cards**
4. **Use flexbox or grid for ALL layouts** - never inline/inline-block for structure
5. **Test all text at 320px, 768px, and 1200px viewport widths**
6. **Avoid inline styles entirely** - use Tailwind classes only

### Safe Animation Pattern
```tsx
// GOOD - text stays block-level
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  <div className="block max-w-prose">
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="text-base">{description}</p>
  </div>
</motion.div>

// BAD - causes text alignment issues
<motion.span style={{ display: 'inline' }}>
  {title}
</motion.span>
```

---

## Game Mechanics

### Four Resource Meters (0-100)
| Meter | Description |
|-------|-------------|
| Evidence | Research credibility and scientific rigor |
| Network | Coalition strength and key partnerships |
| Narrative | Public framing and storytelling effectiveness |
| Implementation | Readiness to scale and institutional capacity |

### Impact Counter
- Accumulating number toward victory target
- Display with scenario's metric (e.g., "500,000 students reached")

### Victory Conditions
- Meet or exceed scenario's impact target
- Grades: F → D → C → B → A → A+

### Progression System
- **Level 1**: 3 scenarios always unlocked
- **Level 2**: Unlocks after 1+ scenario completions
- **Level 3**: Unlocks after 4+ scenario completions

---

## Decision Types

### 1. Simple Decision (`type: "simple"`)
Standard card with 2-3 choices. Player selects one, effects applied.

### 2. Policy Window (`type: "policy_window"`)
- Countdown timer (default 30 seconds)
- Urgency indicator changes color as time depletes
- Auto-selects last choice if timer expires

### 3. Framing Mini-Game (`type: "framing_game"`)
- 3 word categories presented
- Player selects exactly 3 words
- Selection pattern determines choice branch

### 4. Slider Mini-Game (`type: "slider_game"`)
- 4 parameter sliders with target zones
- Quality score based on sliders in target
- Score determines choice branch

---

## Data Structures

### Scenario
```typescript
interface Scenario {
  id: string;
  title: string;
  description: string;
  startYear: number;
  victoryTarget: number;
  victoryMetric: string;
  decisions: Decision[];
}
```

### Decision
```typescript
interface Decision {
  id: number;
  yearRange: string;
  title: string;
  contextCard: string;
  type: "simple" | "policy_window" | "framing_game" | "slider_game";
  timer?: number;
  choices: Choice[];
}
```

### Choice
```typescript
interface Choice {
  text: string;
  effects: {
    evidence?: number;
    network?: number;
    narrative?: number;
    implementation?: number;
    impact?: number;
  };
  nextDecision: number | "end";
}
```

### Game State (Zustand)
```typescript
interface GameState {
  currentScenario: string | null;
  currentDecision: number;
  meters: { evidence: number; network: number; narrative: number; implementation: number };
  impact: number;
  history: PlayerChoice[];
  // Actions
  initializeGame: (scenarioId: string) => void;
  makeChoice: (choice: Choice) => void;
  resetGame: () => void;
}
```

### Progress State (Zustand, persisted)
```typescript
interface ProgressState {
  completedScenarios: string[];
  scenarioProgress: Record<string, { completed: boolean; bestImpact: number; bestGrade: string; timesPlayed: number }>;
  // Actions
  completeScenario: (id: string, impact: number, grade: string) => void;
  getUnlockedScenarios: () => string[];
}
```

---

## Scenarios (8 Total)

### Level 1 (Always Available)
1. **Growth Mindset in Education** (1978-2023) - 500K students
2. **Moving to Opportunity** (1994-2019) - 50K families
3. **Needle Exchange Programs** (1986-2005) - 100K infections prevented

### Level 2 (After 1 completion)
4. **Behavioral Nudges in Policy** (2005-2018) - 10M people
5. **Emissions Trading Systems** (1990-2010) - 2M tons CO2
6. **DICE Climate Model** (1992-2015) - 50 countries

### Level 3 (After 4 completions)
7. **FCC Spectrum Auctions** (1993-2008) - $50B revenue
8. **AMC Vaccines** (1999-2008) - 50M vaccines

**Note**: The 8 scenario JSON files from the original project are in the datat/scenario subfolder 

---

## Build Phases

### Phase 1: Foundation
- [ ] Vite + React + TypeScript project setup
- [ ] Tailwind CSS with Stanford Impact colors
- [ ] Base layout with centered container
- [ ] MeterBar component
- [ ] MeterPanel component
- [ ] ImpactCounter component
- [ ] Create STATUS.md, update after phase

### Phase 2: Core Game Loop
- [ ] Zustand game state store
- [ ] DecisionCard component
- [ ] App game loop (card → effects → next)
- [ ] Test with single hardcoded scenario
- [ ] Update STATUS.md

### Phase 3: Scenarios & Data
- [ ] TypeScript interfaces in `types.ts`
- [ ] Import all 8 scenario JSONs
- [ ] ScenarioSelector component
- [ ] Progression/unlock system
- [ ] Zustand progress store with persistence
- [ ] Update STATUS.md

### Phase 4: Mini-Games
- [ ] PolicyWindow component
- [ ] FramingMiniGame component
- [ ] SliderMiniGame component
- [ ] Integrate into game loop by decision type
- [ ] Update STATUS.md

### Phase 5: Polish & Deploy
- [ ] EndScreen with grades
- [ ] Responsive testing (320px, 768px, 1200px)
- [ ] Animation polish
- [ ] GitHub Pages deployment
- [ ] Final STATUS.md update

---

## Screen Flow

```
[Scenario Selector] → [Decision Cards / Mini-Games] × 8 → [End Screen] → [Scenario Selector]
```

---

## Testing Checklist

Before considering any phase complete:
- [ ] Text aligns correctly at 320px mobile width
- [ ] Text aligns correctly at 768px tablet width
- [ ] Text aligns correctly at 1200px desktop width
- [ ] No text overflow or clipping
- [ ] Cards are centered with consistent spacing
- [ ] Animations don't cause layout shifts
- [ ] `npm run build` succeeds with no errors

---

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "framer-motion": "^12.x",
    "zustand": "^5.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "vite": "^6.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^4.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}
```
