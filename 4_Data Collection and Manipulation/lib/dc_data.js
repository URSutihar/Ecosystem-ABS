// ═══════════════════════════════════════════════════════════════
//  DATA COLLECTION & MANIPULATION — Data
//  All input parameters for the Ecosystem ABM are hypothetically
//  fabricated.  This file documents every assumption.
// ═══════════════════════════════════════════════════════════════

// ── Team (same as 3_Project Management) ─────────────────────────
var TEAM = [
  { id: 'urs',    name: 'Utkarsh Raj Suthihar', initials: 'UR', color: '#ef4455',
    studentId: '1008039',
    university: 'SUTD - D&E Scholar', course: 'ESD (BOAR + Finance) | AI & DTS minors',
    linkedin: 'https://www.linkedin.com/in/sutihar/', website: 'https://sutihar.com/utkarsh/' },
  { id: 'xinyu',  name: 'Ye Xinyu',             initials: 'YX', color: '#2dd4a0',
    studentId: '1007833',
    university: 'SUTD', course: '40.015 Simulation Modeling & Analysis',
    linkedin: '', website: '' },
  { id: 'yuqing', name: 'Jiang Yuqing',         initials: 'YQ', color: '#f5a623',
    studentId: '1007904',
    university: 'SUTD', course: '40.015 Simulation Modeling & Analysis',
    linkedin: '', website: '' },
  { id: 'jolie',  name: 'Jolie Chua',           initials: 'JC', color: '#60a5fa',
    studentId: '1008463',
    university: 'SUTD', course: '40.015 Simulation Modeling & Analysis',
    linkedin: '', website: '' }
];

var INSTRUCTOR = {
  id: 'nuno', name: 'Nuno Antunes Ribeiro', initials: 'NR', color: '#a78bfa',
  university: 'SUTD - ESD',
  course: 'Assistant Professor\nDeputy Director (Aviation Studies Institute, ASI)',
  linkedin: 'https://www.linkedin.com/in/nunoantunesribeiro/',
  website: 'https://nunoantunesribeiro.github.io/'
};

var TEAM_IMG_PATH = '../3_Project Management/images/team/';

// ── Pipeline steps (SVG diagram) ────────────────────────────────
var PIPELINE = [
  { label: 'Ecological\nAssumptions', color: '#60a5fa' },
  { label: 'Parameter\nValues',       color: '#f5a623' },
  { label: 'Mulberry32\nPRNG',        color: '#a78bfa' },
  { label: 'Agent\nInitialisation',   color: '#2dd4a0' },
  { label: 'Simulation\nRuns',        color: '#ef4455' }
];

// ── Biome reference ──────────────────────────────────────────────
var BIOMES = [
  { name: 'Grassland',   id: 'B0', color: '#4caf50', xCols: '0–19',  species: 'Grazer, Hopper, Burrower, Seedling',        predator: 'Plains Stalker' },
  { name: 'Ice Tundra',  id: 'B1', color: '#90caf9', xCols: '20–39', species: 'Frostmite, Snowdrift, Icewalker, Chillworm', predator: 'Frost Fang' },
  { name: 'Desert',      id: 'B2', color: '#ffb74d', xCols: '40–59', species: 'Sandbug, Dustrunner, Heatscale, Mirage',     predator: 'Dune Striker' },
  { name: 'Rainforest',  id: 'B3', color: '#009688', xCols: '60–79', species: 'Vinefly, Canopod, Mosscrawl, Bloomwing',     predator: 'Canopy Prowler' },
  { name: 'Swamp',       id: 'B4', color: '#785589', xCols: '80–99', species: 'Bogskimmer, Murkeel, Pondhopper, Mistshell', predator: 'Marsh Maw' }
];

// ── Parameter sections ───────────────────────────────────────────
var SECTIONS = [

  // ── 1 ── World Architecture ─────────────────────────────────────
  {
    id: 'world',
    title: 'World Architecture',
    type: 'structure',
    intro: 'The simulation world is a discrete 100 × 100 grid divided into five equal vertical biome columns (20 cells wide each). Prey species are confined to their home biome; specialist predators are similarly constrained. One generalist predator species roams freely across all biomes using toroidal wrapping at horizontal boundaries.',
    params: [
      { name: 'Grid dimensions',      symbol: 'gridSize²',       value: '50 × 50',  dist: '—',        rationale: 'Large enough for meaningful spatial dynamics; small enough for real-time rendering at 30 fps' },
      { name: 'Number of biomes',     symbol: 'NUM_BIOMES',      value: '5',          dist: '—',        rationale: 'Five distinct environments gives each specialist a clear "home"; odd number avoids a symmetric grid' },
      { name: 'Biome width',          symbol: 'gridSize / 5',    value: '20 cells',   dist: '—',        rationale: 'Equal area per biome; no biome is artificially advantaged by space' },
      { name: 'Prey species total',   symbol: 'NUM_PREY_SPECIES', value: '20',         dist: '—',        rationale: '4 per biome × 5 biomes; sufficient species diversity without overwhelming the visualisation' },
      { name: 'Predator types',       symbol: '—',               value: '6 (1 gen + 5 spec)', dist: '—', rationale: 'One generalist vs one specialist per biome — the minimum to test the Generalists vs Specialists thesis' },
      { name: 'Prey extinction floor', symbol: 'PREY_FLOOR',     value: '2',          dist: '—',        rationale: 'Species below 2 receive immigration reinforcement; models dispersal from outside the grid and prevents irreversible extinction from obscuring generalist-specialist dynamics' }
    ]
  },

  // ── 2 ── Initial Population Synthesis ───────────────────────────
  {
    id: 'init',
    title: 'Initial Population Synthesis',
    type: 'synthesis',
    intro: 'No census or field data exists for fictional species. Initial counts were chosen so that all three trophic groups coexist at t = 0 with predation pressure present but not immediately lethal. Spatial placement uses a seeded uniform-random draw within each agent\'s assigned biome boundaries.',
    params: [
      { name: 'Total prey agents',        symbol: 'preyCount',  value: '600',  dist: 'Uniform in biome',  rationale: '30 per species; dense enough to sustain predation but not saturate carrying capacity immediately' },
      { name: 'Generalist predators',     symbol: 'genCount',   value: '25',     dist: 'Uniform on full grid', rationale: 'Same intial condition as Specialists to see which strategy prevails' },
      { name: 'Specialist predators',     symbol: 'specCount',  value: '25',     dist: 'Uniform in biome',  rationale: '5 per biome; balanced starting distribution so no single biome starts with an unfair advantage' },
      { name: 'Initial prey energy',      symbol: 'energy₀',   value: '10',     dist: '—',                 rationale: 'Prey do not track energy; value is stored but unused — set to 10 as a neutral placeholder' },
      { name: 'Initial predator energy',  symbol: 'energy₀',   value: '20',     dist: '—',                 rationale: 'Well above the reproduction gate (8); ensures first generation can breed immediately and dynamics begin from tick 1' },
      { name: 'Specialist diet size',     symbol: 'specDiet',  value: '3.0',    dist: 'Rounded integer',   rationale: 'Each specialist eats 3 of 4 local prey species (chosen by shuffled random draw); partial specialisation avoids single-prey fragility while maintaining ecological specificity' }
    ]
  },

  // ── 3 ── Prey Dynamics ────────────────────────────────────────────
  {
    id: 'prey',
    title: 'Prey Dynamics',
    type: 'parameters',
    intro: 'Prey follow a logistic growth model with stochastic natural mortality. Each tick, surviving prey may reproduce with probability preyRepro × (1 − N_biome / K_biome), where N_biome is the current count in that biome and K_biome = preyK / 5 = 300 per biome. Natural mortality applies independently via a Bernoulli draw each tick.',
    params: [
      { name: 'Carrying capacity',       symbol: 'preyK',     value: '1 500', dist: 'Logistic ceiling', rationale: '300 per biome; set 5× above the starting count so Lotka–Volterra-style oscillations can develop well before the ceiling damps them' },
      { name: 'Base reproduction prob',  symbol: 'preyRepro', value: '0.10',  dist: 'Bernoulli(0.10)', rationale: '1-in-10 chance per tick; modest enough that populations cannot instantly recover from predation, sustaining boom-bust cycles' },
      { name: 'Natural mortality prob',  symbol: 'preyMort',  value: '0.01',  dist: 'Bernoulli(0.01)', rationale: '1 % background death per tick; low enough that natural mortality is secondary to predation as a cause of death' }
    ]
  },

  // ── 4 ── Predator Dynamics ────────────────────────────────────────
  {
    id: 'pred',
    title: 'Predator Dynamics',
    type: 'parameters',
    intro: 'Both predator types lose 1 energy per tick (metabolic cost). Successful hunts restore energy. Reproduction is energy-gated: a predator must exceed ENERGY_GATE (8) to breed, splitting energy equally with its offspring. Death occurs at energy ≤ 0 (starvation) or via a background Bernoulli mortality draw. The key asymmetry: the specialist has a higher hunt rate and larger energy gain per kill, while the generalist has a broader diet but faces higher background mortality from roaming all biomes.',
    table2col: true,
    params: [
      { name: 'Hunt success probability', symbol: 'huntRate',   value_gen: '0.35', value_spec: '0.55', dist: 'Bernoulli', rationale: 'Specialist has higher per-attempt success from local niche mastery; generalist compensates through dietary breadth rather than individual hunt efficiency' },
      { name: 'Energy gain per kill',     symbol: 'energy+',   value_gen: '5',    value_spec: '8',    dist: '—',         rationale: 'Specialist extracts more energy per kill (niche optimisation → richer nutrition from familiar prey); generalist gains less per kill but can hunt across all biomes' },
      { name: 'Energy cost per tick',     symbol: 'energy−',   value_gen: '1',    value_spec: '1',    dist: '—',         rationale: 'Equal metabolic cost regardless of strategy; all asymmetry between types lives in hunting efficiency, energy gain, and mortality' },
      { name: 'Reproduction probability', symbol: 'reproRate', value_gen: '0.06', value_spec: '0.06', dist: 'Bernoulli', rationale: 'Equal baseline fecundity; reproductive success depends entirely on energy accumulation, so hunting differences drive population growth indirectly' },
      { name: 'Natural mortality prob',   symbol: 'mortRate',  value_gen: '0.025', value_spec: '0.015', dist: 'Bernoulli', rationale: 'Generalist faces higher background mortality (≈1.7×) from continuously roaming all five biomes — greater exposure to hazards, pathogens, and unfamiliar terrain. Specialist benefits from a stable, well-known niche with fewer incidental risks.' },
      { name: 'Starvation threshold',     symbol: 'starvation', value_gen: '0',   value_spec: '0',   dist: '—',         rationale: 'Death triggers at energy ≤ 0; a predator starting at energy 20 can survive up to 20 consecutive missed hunts before starving' },
      { name: 'Reproduction energy gate', symbol: 'ENERGY_GATE', value_gen: '8', value_spec: '8',   dist: '—',         rationale: 'Shared gate ensures a predator must be well-fed to breed; prevents population explosion from a single lucky hunt spree' }
    ]
  },

  // ── 5 ── Environmental Shocks ─────────────────────────────────────
  {
    id: 'shocks',
    title: 'Environmental Shocks',
    type: 'parameters',
    intro: 'Stochastic shocks model wildfire, disease, or extreme weather events. Each tick the simulation rolls against shockProb; if triggered, 1–3 biomes are selected at random and a fraction shockSev of all agents within those biomes is killed instantly (Bernoulli draw per agent). Shocks affect all agent types equally — they are indiscriminate.',
    params: [
      { name: 'Shock probability per tick', symbol: 'shockProb', value: '0.01',    dist: 'Bernoulli(0.01)', rationale: '1 % per tick; at 500 ticks ≈ 5 shocks on average — rare enough to feel like an event, frequent enough to test resilience within a single run' },
      { name: 'Shock kill fraction',        symbol: 'shockSev',  value: '0.20',    dist: 'Bernoulli(0.20) per agent', rationale: '20 % of biome killed; severe enough to visibly alter population trajectories while leaving enough survivors for the recovery dynamics to play out' },
      { name: 'Biomes per shock event',     symbol: '—',         value: '1–3 (uniform random)', dist: 'Uniform discrete', rationale: 'Real disasters rarely respect biome boundaries; 1–3 biome spread models localised to regional events without always wiping the entire world' }
    ]
  },

  // ── 6 ── Random Number Generation ─────────────────────────────────
  {
    id: 'rng',
    title: 'Random Number Generation',
    type: 'method',
    intro: 'All stochastic events are driven by a single Mulberry32 seeded PRNG, monkey-patched over Math.random() at simulation start. This guarantees full reproducibility: given the same seed and parameters, every run produces bit-identical results. The Monte Carlo framework exploits this by assigning seeds [seedStart, seedStart+1, …, seedStart+runs−1] across independent runs.',
    code: 'function makeRng(seed) {\n  var s = seed | 0;\n  return function() {\n    s = (s + 0x6D2B79F5) | 0;\n    var t = s;\n    t = Math.imul(t ^ (t >>> 15), t | 1);\n    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);\n    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;\n  };\n}',
    params: [
      { name: 'Algorithm',              symbol: '—',            value: 'Mulberry32',           dist: '—',                    rationale: 'Fast, high-quality 32-bit PRNG; full period over 2³² values; no sequential correlation artifacts visible in population trajectories' },
      { name: 'Output distribution',    symbol: '—',            value: '[0, 1) uniform',        dist: 'Uniform continuous',   rationale: 'All Bernoulli events are implemented as rng() < threshold; all spatial positions as bounds.min + floor(rng() × width)' },
      { name: 'Default single-run seed', symbol: 'p-seed',      value: 'Random on page load',  dist: '—',                    rationale: 'Seed is randomised via Math.random() before the PRNG is seeded, so each page load / reset produces a different world by default' },
      { name: 'Monte Carlo seed start', symbol: 'mc-seed-start', value: 'Random on page load', dist: '—',                    rationale: 'First MC run uses seedStart, second uses seedStart+1, etc.; random starting point ensures MC batches are independent between sessions' },
      { name: 'Events using PRNG',      symbol: '—',            value: '8 event types',         dist: 'Bernoulli / Uniform',  rationale: 'Movement (Uniform ±1), spatial placement (Uniform), hunt success (Bernoulli), prey reproduction (Bernoulli), predator reproduction (Bernoulli), natural mortality (Bernoulli), shock trigger (Bernoulli), shock kill (Bernoulli)' }
    ]
  }
];
