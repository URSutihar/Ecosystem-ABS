// ═══════════════════════════════════════════════════════════════
//  SIMULATION DESIGN — Data
//  Source of truth: ecosystem_engine.js (974 lines)
// ═══════════════════════════════════════════════════════════════

// ── Team ────────────────────────────────────────────────────────
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

// ── Tick-loop events (8 per tick) ───────────────────────────────
var TICK_EVENTS = [
  {
    step: 1, name: 'Movement',
    color: '#60a5fa',
    desc: 'Every living agent moves by a random offset (dx, dy) ∈ {−1, 0, +1}. Generalists wrap toroidally on all edges; prey and specialists are clamped to their biome\'s x-bounds but wrap vertically. Age increments by 1.'
  },
  {
    step: 2, name: 'Spatial\nIndexing',
    color: '#8899af',
    desc: 'A 2-D spatial hash is rebuilt: grid[x][y] → list of agents at that cell. This index is used in Event 3 to find neighbours in O(1) per cell lookup.'
  },
  {
    step: 3, name: 'Predation',
    color: '#ef4455',
    desc: 'Each predator scans its 3×3 Moore neighbourhood (specialists skip cells outside their biome). For the first diet-matching prey found, a Bernoulli trial with huntRate decides the outcome: success kills the prey and grants energyGain; failure moves on. After hunting, every predator pays 1 energy (metabolic cost). Energy ≤ starveThresh → dead.'
  },
  {
    step: 4, name: 'Reproduction',
    color: '#2dd4a0',
    desc: 'Prey reproduce with probability preyRepro × max(0, 1 − N_biome / K_biome) — logistic density-dependence. Predators reproduce with probability reproRate if energy > ENERGY_GATE (8); parent and child share energy equally (floor/ceil split). Child spawns at parent\'s cell.'
  },
  {
    step: 5, name: 'Natural\nMortality',
    color: '#f5a623',
    desc: 'Each living agent passes an independent Bernoulli trial (preyMort, genMort, or specMort). Models disease, old age, and non-predation causes not explicitly represented elsewhere.'
  },
  {
    step: 6, name: 'Prey\nImmigration',
    color: '#a78bfa',
    desc: 'If any prey species count falls below PREY_FLOOR (2), the simulation spawns immigrants in that species\' home biome until the floor is reached. Models dispersal from outside the grid and prevents irreversible single-species extinction from obscuring dynamics.'
  },
  {
    step: 7, name: 'Env.\nShock',
    color: '#ff9800',
    desc: 'With probability shockProb per tick (or triggered manually), 1–3 biomes are chosen at random. Every agent within those biomes faces a Bernoulli kill with probability shockSev. Shocks are indiscriminate: prey, generalists, and specialists are all affected equally.'
  },
  {
    step: 8, name: 'Cleanup &\nRecord',
    color: '#8899af',
    desc: 'Dead agents are removed from the agents array. Population counts {prey, gen, spec} are appended to the history buffer. If both predator counts reach 0 the simulation halts early and pads the remaining ticks with the last recorded counts.'
  }
];

// ── Prey state machine ──────────────────────────────────────────
// Positions in a 540 × 200 viewBox
var PREY_STATES = [
  { id: 'alive', label: 'ALIVE',  color: '#2dd4a0', x: 140, y: 100 },
  { id: 'dead',  label: 'DEAD',   color: '#ef4455', x: 400, y: 100 }
];

var PREY_TRANS = [
  // Self-loops on ALIVE
  {
    from: 'alive', to: 'alive',
    label: 'Move', sublabel: 'random walk · biome-confined',
    loopAnchor: 'top-left',
    color: '#60a5fa'
  },
  {
    from: 'alive', to: 'alive',
    label: 'Reproduce', sublabel: 'preyRepro × growthFactor',
    loopAnchor: 'bottom-left',
    color: '#2dd4a0'
  },
  // ALIVE → DEAD
  {
    from: 'alive', to: 'dead',
    label: 'Predated', sublabel: 'p = huntRate',
    curveOffset: -52,
    color: '#ef4455'
  },
  {
    from: 'alive', to: 'dead',
    label: 'Natural mortality', sublabel: 'p = preyMort (0.02)',
    curveOffset: 0,
    color: '#f5a623'
  },
  {
    from: 'alive', to: 'dead',
    label: 'Shock', sublabel: 'p = shockSev (0.40)',
    curveOffset: 52,
    color: '#ff9800'
  }
];

// ── Predator state machine ──────────────────────────────────────
var PRED_STATES = [
  { id: 'alive', label: 'ALIVE',  color: '#f5a623', x: 140, y: 110 },
  { id: 'dead',  label: 'DEAD',   color: '#ef4455', x: 420, y: 110 }
];

var PRED_TRANS = [
  // Self-loops on ALIVE
  {
    from: 'alive', to: 'alive',
    label: 'Move', sublabel: 'Generalist: toroidal · Specialist: biome-confined',
    loopAnchor: 'top-left',
    color: '#60a5fa'
  },
  {
    from: 'alive', to: 'alive',
    label: 'Hunt (success)', sublabel: 'Gen: p=0.35, +5e · Spec: p=0.55, +8e',
    loopAnchor: 'top-right',
    color: '#2dd4a0'
  },
  {
    from: 'alive', to: 'alive',
    label: 'Metabolic decay', sublabel: '−1 energy / tick',
    loopAnchor: 'bottom-left',
    color: '#8899af'
  },
  {
    from: 'alive', to: 'alive',
    label: 'Reproduce', sublabel: 'energy > 8 · Gen: p=0.06 · Spec: p=0.06',
    loopAnchor: 'bottom-right',
    color: '#a78bfa'
  },
  // ALIVE → DEAD
  {
    from: 'alive', to: 'dead',
    label: 'Starvation', sublabel: 'energy ≤ −2',
    curveOffset: -55,
    color: '#ef4455'
  },
  {
    from: 'alive', to: 'dead',
    label: 'Natural mortality', sublabel: 'Gen: p=0.025 · Spec: p=0.015',
    curveOffset: 0,
    color: '#f5a623'
  },
  {
    from: 'alive', to: 'dead',
    label: 'Shock', sublabel: 'p = shockSev (0.40)',
    curveOffset: 55,
    color: '#ff9800'
  }
];

// ── Generalist vs Specialist diff table ─────────────────────────
var PRED_DIFF = [
  { param: 'Hunt success rate',      symbol: 'huntRate',  gen: '0.35', spec: '0.55',  note: 'Specialist is locally adapted → higher per-attempt success' },
  { param: 'Energy per kill',        symbol: 'energyGain', gen: '5',   spec: '8',     note: 'Specialist gains more per kill (niche optimisation)' },
  { param: 'Reproduction prob',      symbol: 'reproRate', gen: '0.06', spec: '0.06',  note: 'Equal in default parameters; tunable via sliders' },
  { param: 'Natural mortality',      symbol: 'mortRate',  gen: '0.025', spec: '0.015', note: 'Generalist faces higher background mortality from roaming all biomes; specialist benefits from a stable, familiar niche' },
  { param: 'Diet breadth',           symbol: 'diet',      gen: 'All 20 species', spec: '1–4 local species', note: 'Core generalist–specialist trade-off' },
  { param: 'Movement constraint',    symbol: '—',         gen: 'Toroidal (unrestricted)', spec: 'Biome-confined', note: 'Specialist cannot escape its biome' },
  { param: 'Starvation threshold',   symbol: 'starveThresh', gen: '−2', spec: '−2',  note: 'Equal; 2 ticks of energy debt before death' },
  { param: 'Reproduction energy gate', symbol: 'ENERGY_GATE', gen: '8', spec: '8',   note: 'Shared gate; must be well-fed to breed' }
];

// ── Biomes ──────────────────────────────────────────────────────
var BIOMES = [
  { name: 'Grassland',  id: 'B0', color: '#4caf50', prey: 'Grazer · Hopper · Burrower · Seedling',        predator: 'Plains Stalker' },
  { name: 'Ice Tundra', id: 'B1', color: '#90caf9', prey: 'Frostmite · Snowdrift · Icewalker · Chillworm', predator: 'Frost Fang' },
  { name: 'Desert',     id: 'B2', color: '#ffb74d', prey: 'Sandbug · Dustrunner · Heatscale · Mirage',     predator: 'Dune Striker' },
  { name: 'Rainforest', id: 'B3', color: '#009688', prey: 'Vinefly · Canopod · Mosscrawl · Bloomwing',     predator: 'Canopy Prowler' },
  { name: 'Swamp',      id: 'B4', color: '#7e57c2', prey: 'Bogskimmer · Murkeel · Pondhopper · Mistshell', predator: 'Marsh Maw' }
];

// Confinement rules table
var CONFINEMENT = [
  { entity: 'Prey (20 species)',      xMove: 'Clamped to biome x-bounds',       yMove: 'Toroidal wrap',  note: 'biome = species ÷ 4 (integer)' },
  { entity: 'Specialist (5 types)',   xMove: 'Clamped to biome x-bounds',       yMove: 'Toroidal wrap',  note: 'biome assigned at spawn' },
  { entity: 'Generalist (1 type)',    xMove: 'Toroidal wrap (unrestricted)',     yMove: 'Toroidal wrap',  note: 'roams entire 100×100 grid' },
  { entity: 'Environmental Shocks',   xMove: '1–3 biomes chosen at random',     yMove: 'Full height',    note: 'all agents in those columns affected' }
];

// ── Rules & Assumptions ─────────────────────────────────────────
var RULES = [
  {
    title: 'Logistic prey growth',
    rationale: 'Reproduction probability is scaled by (1 − N_biome / K_biome), density-dependent per biome, preventing unbounded population explosions.'
  },
  {
    title: 'Energy-gated predator reproduction',
    rationale: 'A predator must accumulate energy > 8 (ENERGY_GATE) before it may breed, ensuring only well-fed individuals pass on genes.'
  },
  {
    title: 'Prey immigration floor (PREY_FLOOR = 2)',
    rationale: 'Any species below 2 individuals receives reinforcement immigrants, preventing permanent single-species extinction from masking generalist–specialist dynamics.'
  },
  {
    title: 'Equal metabolic cost',
    rationale: 'Both predator types lose exactly 1 energy per tick. All strategy asymmetry is expressed through hunting and reproduction, not metabolism.'
  },
  {
    title: 'Generalist diet: all 20 prey',
    rationale: 'The generalist\'s diet spans every prey species across all biomes, giving it maximum dietary flexibility at the cost of lower per-attempt hunt efficiency.'
  },
  {
    title: 'Specialist diet: random local subset',
    rationale: 'Each specialist is initialised with a random subset of size specDiet from the 4 prey species in its home biome, modelling partial niche specialisation.'
  },
  {
    title: 'Starvation: 2-tick energy debt',
    rationale: 'Death triggers at energy ≤ −2, not energy ≤ 0. Two missed hunts before starvation prevents a single unlucky tick from killing an otherwise healthy predator.'
  },
  {
    title: 'Indiscriminate shocks',
    rationale: 'Environmental shocks apply the same kill probability (shockSev) to prey, generalists, and specialists alike — no type receives preferential protection.'
  },
  {
    title: 'Mulberry32 seeded PRNG',
    rationale: 'All stochastic events draw from a single seeded Mulberry32 generator, guaranteeing that any run is fully reproducible given the same seed and parameters.'
  },
  {
    title: 'Monte Carlo: sequential seeds',
    rationale: 'Batch runs use seeds [seedStart, seedStart+1, …, seedStart+runs−1], ensuring statistical independence between runs while remaining reproducible across sessions.'
  }
];
