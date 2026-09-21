// ═══════════════════════════════════════════════════════════════
//  ECOSYSTEM SIMULATOR — ENGINE
//  Agent-Based Model: Generalists vs Specialists
//  5 Biomes | 20 Prey Species | Dual Shock Mode
// ═══════════════════════════════════════════════════════════════

// ─── GLOBAL VARIABLES ───
var isRunning = false;
var simTimer = null;
var animationDelay = 50;

var surface;  // D3 selection of SVG
var surfaceWidth, surfaceHeight;
var cellWidth, cellHeight;

// ─── SIMULATION STATE ───
var agents = [];
var tick = 0;
var shockCount = 0;
var simHistory = [];
var nextId = 0;

// ─── BIOMES ───
var NUM_BIOMES = 5;
var BIOME_NAMES = ['Grassland', 'Ice Tundra', 'Desert', 'Rainforest', 'Swamp'];
var BIOME_COLORS = [
  'rgba(76,175,80,0.12)',    // Grassland — green tint
  'rgba(144,202,249,0.12)',  // Ice Tundra — blue tint
  'rgba(255,183,77,0.12)',   // Desert — amber tint
  'rgba(0,150,136,0.12)',    // Rainforest — teal tint
  'rgba(120,85,137,0.12)'    // Swamp — purple tint
];
var BIOME_BORDER_COLORS = [
  'rgba(76,175,80,0.3)',
  'rgba(144,202,249,0.3)',
  'rgba(255,183,77,0.3)',
  'rgba(0,150,136,0.3)',
  'rgba(120,85,137,0.3)'
];

// ─── SVG CREATURE SILHOUETTES (viewBox 0 0 16 16) ───
// 20 unique prey creatures — 4 per biome, each a closed-path silhouette
var PREY_PATHS = [
  // ── Grassland (B0) — small herbivores ──
  'M8,2L11,4L14,2L13,6L14,10L11,9L10,13L8,14L6,13L5,9L2,10L3,6L2,2L5,4Z',     // S0  Grazer: stocky quadruped
  'M7,1L9,1L10,4L12,3L12,7L14,10L11,11L10,14L6,14L5,11L2,10L4,7L4,3L6,4Z',    // S1  Hopper: rabbit (ears+back legs)
  'M8,3L12,4L15,6L14,9L12,10L10,13L6,13L4,10L2,9L1,6L4,4Z',                    // S2  Burrower: wide mole
  'M6,4L10,3L12,4L13,6L12,8L14,10L14,12L12,11L10,10L8,12L6,10L4,8L3,6L4,4Z',  // S3  Seedling: mouse with tail

  // ── Ice Tundra (B1) — arctic creatures ──
  'M8,3L11,4L14,2L13,6L15,8L13,10L14,14L11,12L8,13L5,12L2,14L3,10L1,8L3,6L2,2L5,4Z', // S4  Frostmite: ice tick
  'M8,2L12,1L15,5L12,7L15,12L11,13L8,10L5,13L1,12L4,7L1,5L4,1Z',              // S5  Snowdrift: arctic moth
  'M7,2L9,2L11,4L12,7L11,10L10,13L8,14L6,13L5,10L4,7L5,4Z',                    // S6  Icewalker: upright penguin
  'M3,3L6,2L9,4L12,3L14,5L13,8L10,9L7,8L4,9L2,8L3,5Z',                         // S7  Chillworm: wavy worm

  // ── Desert (B2) — arid creatures ──
  'M6,5L9,4L11,5L12,3L14,2L14,5L12,7L13,10L11,11L9,14L7,14L5,11L3,10L4,7L2,5L2,2L4,3Z', // S8  Sandbug: scorpion
  'M2,7L4,5L6,4L8,5L10,4L12,5L14,6L15,8L13,9L14,12L12,10L10,9L8,10L6,9L4,10L2,12L3,9Z', // S9  Dustrunner: lizard
  'M4,3L8,2L12,3L14,5L13,8L10,10L13,12L12,14L8,13L4,14L3,12L6,10L3,8L2,5Z',   // S10 Heatscale: coiled snake
  'M8,1L10,3L12,5L13,8L12,11L10,13L8,14L6,13L4,11L3,8L4,5L6,3Z',              // S11 Mirage: round beetle

  // ── Rainforest (B3) — tropical creatures ──
  'M8,2L13,1L15,5L12,7L15,11L12,14L8,10L4,14L1,11L4,7L1,5L3,1Z',              // S12 Vinefly: butterfly
  'M8,3L11,2L13,1L12,4L15,5L13,7L15,10L12,9L11,12L8,13L5,12L4,9L1,10L3,7L1,5L4,4L3,1L5,2Z', // S13 Canopod: spider
  'M2,8L3,5L5,4L7,5L8,3L9,5L11,4L13,5L14,8L13,11L11,12L9,11L8,13L7,11L5,12L3,11Z', // S14 Mosscrawl: caterpillar
  'M8,1L10,3L14,2L12,5L14,7L11,7L10,10L12,13L10,14L8,11L6,14L4,13L6,10L5,7L2,7L4,5L2,2L6,3Z', // S15 Bloomwing: dragonfly

  // ── Swamp (B4) — wetland creatures ──
  'M8,4L10,3L13,1L12,5L15,7L12,8L13,12L10,10L9,13L8,14L7,13L6,10L3,12L4,8L1,7L4,5L3,1L6,3Z', // S16 Bogskimmer: water strider
  'M2,8L4,5L7,4L10,4L12,5L13,7L15,5L15,11L13,9L12,11L10,12L7,12L4,11Z',       // S17 Murkeel: fish
  'M6,3L10,3L12,5L13,3L14,5L13,8L14,12L11,14L10,10L6,10L5,14L2,12L3,8L2,5L3,3L4,5Z', // S18 Pondhopper: frog
  'M10,3L12,4L13,7L12,10L10,12L7,13L5,14L3,13L2,11L3,9L5,8L3,6L4,4L6,3L8,2Z'  // S19 Mistshell: snail
];

// Generalist predator: insectoid (mantis/wasp) — angular body, antennae, forelegs
var GEN_PATH  = 'M8,1L10,2L12,1L11,4L14,3L13,6L15,7L13,8L14,11L11,10L10,14L8,15L6,14L5,10L2,11L3,8L1,7L3,6L2,3L5,4L4,1L6,2Z';

// 5 Specialist predators — one unique apex predator per biome
var SPEC_NAMES = [
  'Plains Stalker',   // B0 Grassland — lion
  'Frost Fang',       // B1 Ice Tundra — arctic wolf
  'Dune Striker',     // B2 Desert — raptor/hawk
  'Canopy Prowler',   // B3 Rainforest — panther
  'Marsh Maw'         // B4 Swamp — crocodile
];

var SPEC_PATHS = [
  // B0 Plains Stalker (lion): mane, powerful stance
  'M8,1L4,2L2,4L1,2L1,6L2,8L1,11L4,10L5,14L7,13L8,15L9,13L11,14L12,10L15,11L14,8L15,6L15,2L14,4L12,2Z',
  // B1 Frost Fang (wolf): pointed ears, lean angular
  'M8,1L5,3L2,1L3,5L1,7L3,8L2,12L5,10L6,14L8,13L10,14L11,10L14,12L13,8L15,7L13,5L14,1L11,3Z',
  // B2 Dune Striker (hawk): spread wings, diving
  'M8,1L10,3L14,2L15,6L13,7L15,10L12,9L10,13L8,15L6,13L4,9L1,10L3,7L1,6L2,2L6,3Z',
  // B3 Canopy Prowler (panther): sleek, crouching
  'M3,5L5,3L8,2L11,3L13,5L15,4L14,7L15,10L12,9L13,13L10,12L8,14L6,12L3,13L4,9L1,10L2,7L1,4Z',
  // B4 Marsh Maw (crocodile): long body, wide jaws
  'M1,6L4,4L6,3L8,2L10,3L14,4L15,7L14,8L15,11L12,10L10,12L8,14L6,12L4,10L1,11L2,8Z'
];

// ─── 20 PREY SPECIES (4 per biome) ───
var NUM_PREY_SPECIES = 20;
var PREY_COLORS = d3.quantize(d3.interpolateRainbow, NUM_PREY_SPECIES + 1).slice(0, NUM_PREY_SPECIES);
var PREY_NAMES = [
  // Grassland (B0): S0-S3
  'Grazer','Hopper','Burrower','Seedling',
  // Ice Tundra (B1): S4-S7
  'Frostmite','Snowdrift','Icewalker','Chillworm',
  // Desert (B2): S8-S11
  'Sandbug','Dustrunner','Heatscale','Mirage',
  // Rainforest (B3): S12-S15
  'Vinefly','Canopod','Mosscrawl','Bloomwing',
  // Swamp (B4): S16-S19
  'Bogskimmer','Murkeel','Pondhopper','Mistshell'
];

// Which biome does a species belong to?
function speciesBiome(speciesIdx) {
  return Math.floor(speciesIdx / 4);
}

// Which species belong to a biome?
function biomeSpecies(biomeIdx) {
  var start = biomeIdx * 4;
  return [start, start + 1, start + 2, start + 3];
}

// ─── PARAMETERS ───
var P = {};
var paramIds = [
  'gridSize','maxTicks','speed',
  'preyCount','preyK','preyRepro','preyMort',
  'genCount','genHunt','genEnergy','genRepro','genMort','genStarve',
  'specCount','specHunt','specEnergy','specDiet','specRepro','specMort','specStarve',
  'shockProb','shockSev'
];

// Fixed constants (not sliders)
var ENERGY_GATE = 8;      // predators need energy > 8 to reproduce
var PREY_FLOOR = 2;       // minimum prey per species (immigration)

// ─── SEEDED RNG (mulberry32) ───
// When enabled, overrides Math.random for reproducible runs.
var _originalRandom = Math.random;
function seedRandom(seed) {
  var s = seed | 0;
  Math.random = function() {
    s = (s + 0x6D2B79F5) | 0;
    var t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Read slider values into P object
function readParams() {
  paramIds.forEach(function(id) {
    var slider = document.getElementById('p-' + id);
    var display = document.getElementById('v-' + id);
    if (slider && display) {
      P[id] = parseFloat(slider.value);
      display.textContent = P[id];
    }
  });
}

// Attach live display updates to sliders
paramIds.forEach(function(id) {
  var slider = document.getElementById('p-' + id);
  if (slider) {
    slider.addEventListener('input', function() {
      var display = document.getElementById('v-' + id);
      P[id] = parseFloat(slider.value);
      if (display) display.textContent = P[id];
    });
  }
});

// ─── SPECIES LIST DISPLAY ───
(function renderSpeciesList() {
  var el = document.getElementById('species-list');
  if (!el) return;
  var mkSvg = function(path, color) {
    return '<svg viewBox="0 0 16 16" width="10" height="10" style="flex-shrink:0;"><path d="' + path + '" fill="' + color + '"/></svg>';
  };
  var html = '';
  for (var b = 0; b < NUM_BIOMES; b++) {
    var spp = biomeSpecies(b);
    for (var j = 0; j < spp.length; j++) {
      var s = spp[j];
      html += '<div class="sp" onclick="showSpeciesModal(\'prey-' + s + '\')">' + mkSvg(PREY_PATHS[s], PREY_COLORS[s]) + PREY_NAMES[s] + '</div>';
    }
  }
  // Predator entries
  html += '<div class="sp sp-pred" onclick="showSpeciesModal(\'gen\')">' + mkSvg(GEN_PATH, '#f5a623') + 'Generalist</div>';
  for (var p = 0; p < SPEC_NAMES.length; p++) {
    html += '<div class="sp sp-pred" onclick="showSpeciesModal(\'spec-' + p + '\')">' + mkSvg(SPEC_PATHS[p], '#ef4455') + SPEC_NAMES[p] + '</div>';
  }
  el.innerHTML = html;
})();


// ═══════════════════════════════════════
//  BIOME GEOMETRY
// ═══════════════════════════════════════
// Returns the x-range [xMin, xMax] for a given biome on the grid
function biomeBounds(biomeIdx, gridSize) {
  var biomeWidth = Math.floor(gridSize / NUM_BIOMES);
  var xMin = biomeIdx * biomeWidth;
  var xMax = (biomeIdx === NUM_BIOMES - 1) ? gridSize - 1 : xMin + biomeWidth - 1;
  return { xMin: xMin, xMax: xMax };
}

// Determine which biome a given x coordinate falls in
function getBiomeAtX(x, gridSize) {
  var biomeWidth = Math.floor(gridSize / NUM_BIOMES);
  return Math.min(Math.floor(x / biomeWidth), NUM_BIOMES - 1);
}


// ═══════════════════════════════════════
//  AGENT CONSTRUCTOR
// ═══════════════════════════════════════
function mkAgent(type, x, y, species, biome) {
  return {
    id: nextId++,
    type: type,
    x: x,
    y: y,
    species: (species !== undefined) ? species : -1,
    biome: (biome !== undefined) ? biome : -1,
    diet: null,
    energy: (type === 'prey') ? 10 : 20,
    alive: true,
    age: 0
  };
}


// ═══════════════════════════════════════
//  INITIALIZATION
// ═══════════════════════════════════════
function initSim() {
  readParams();

  // Apply seed for reproducibility
  var seedInput = document.getElementById('p-seed');
  var seedVal = seedInput ? parseInt(seedInput.value) : 28;
  if (isNaN(seedVal)) seedVal = 28;
  seedRandom(seedVal);

  agents = [];
  tick = 0;
  shockCount = 0;
  simHistory = [];
  nextId = 0;

  var gs = P.gridSize;

  // --- Create prey: 4 species per biome, evenly distributed ---
  var perSpecies = Math.floor(P.preyCount / NUM_PREY_SPECIES);
  for (var s = 0; s < NUM_PREY_SPECIES; s++) {
    var b = speciesBiome(s);
    var bounds = biomeBounds(b, gs);
    for (var i = 0; i < perSpecies; i++) {
      var x = bounds.xMin + Math.floor(Math.random() * (bounds.xMax - bounds.xMin + 1));
      var y = Math.floor(Math.random() * gs);
      agents.push(mkAgent('prey', x, y, s, b));
    }
  }

  // --- Create generalists: spread across all biomes ---
  for (var i = 0; i < P.genCount; i++) {
    var x = Math.floor(Math.random() * gs);
    var y = Math.floor(Math.random() * gs);
    var a = mkAgent('generalist', x, y, -1, -1); // biome = -1 means free
    a.diet = [];
    for (var j = 0; j < NUM_PREY_SPECIES; j++) a.diet.push(j);
    agents.push(a);
  }

  // --- Create specialists: distributed across 5 biomes ---
  var specPerBiome = Math.floor(P.specCount / NUM_BIOMES);
  for (var b = 0; b < NUM_BIOMES; b++) {
    var bounds = biomeBounds(b, gs);
    var localSpecies = biomeSpecies(b); // 4 species in this biome
    for (var i = 0; i < specPerBiome; i++) {
      var x = bounds.xMin + Math.floor(Math.random() * (bounds.xMax - bounds.xMin + 1));
      var y = Math.floor(Math.random() * gs);
      var a = mkAgent('specialist', x, y, -1, b);
      // Assign diet: random subset of size specDiet from the 4 local species
      var dietSize = Math.min(Math.round(P.specDiet), localSpecies.length);
      var shuffled = localSpecies.slice().sort(function() { return Math.random() - 0.5; });
      a.diet = shuffled.slice(0, dietSize);
      agents.push(a);
    }
  }

  recordHistory();
  renderSurface();
  updateInfoBar();
  if (typeof updateGraphs === 'function') updateGraphs();
}


// ═══════════════════════════════════════
//  SIMULATION STEP — 8 Events
// ═══════════════════════════════════════
function simStep() {
  if (!isRunning) return;

  tick++;
  var gs = P.gridSize;

  // ── Event 1: MOVEMENT ──
  agents.forEach(function(a) {
    if (!a.alive) return;

    var dx = Math.floor(Math.random() * 3) - 1;
    var dy = Math.floor(Math.random() * 3) - 1;

    if (a.type === 'generalist') {
      // Free movement: toroidal wrapping on all edges
      a.x = (a.x + dx + gs) % gs;
      a.y = (a.y + dy + gs) % gs;
    } else {
      // Prey & Specialists: constrained to their biome
      var bounds = biomeBounds(a.biome, gs);
      var newX = a.x + dx;
      // Clamp to biome boundaries (cannot cross)
      if (newX < bounds.xMin) newX = bounds.xMin;
      if (newX > bounds.xMax) newX = bounds.xMax;
      a.x = newX;
      // Y wraps top/bottom
      a.y = (a.y + dy + gs) % gs;
    }
    a.age++;
  });

  // ── Event 2: SPATIAL INDEXING ──
  var grid = {};
  agents.forEach(function(a) {
    if (!a.alive) return;
    var k = a.x + ',' + a.y;
    if (!grid[k]) grid[k] = [];
    grid[k].push(a);
  });

  // ── Event 3: PREDATION ──
  agents.forEach(function(a) {
    if (!a.alive || a.type === 'prey') return;

    var huntRate = (a.type === 'generalist') ? P.genHunt : P.specHunt;
    var energyGain = (a.type === 'generalist') ? P.genEnergy : P.specEnergy;
    var fed = false;

    for (var dx = -1; dx <= 1 && !fed; dx++) {
      for (var dy = -1; dy <= 1 && !fed; dy++) {
        var nx = (a.x + dx + gs) % gs;
        var ny = (a.y + dy + gs) % gs;

        // Specialists: skip cells outside their biome
        if (a.type === 'specialist') {
          var cellBiome = getBiomeAtX(nx, gs);
          if (cellBiome !== a.biome) continue;
        }

        var k = nx + ',' + ny;
        var cell = grid[k];
        if (!cell) continue;
        for (var t = 0; t < cell.length; t++) {
          var target = cell[t];
          if (!target.alive || target.type !== 'prey') continue;
          if (a.diet.indexOf(target.species) === -1) continue;
          if (Math.random() < huntRate) {
            target.alive = false;
            a.energy += energyGain;
            fed = true;
            break;
          }
        }
      }
    }

    // Energy decay
    a.energy -= 1;

    // Starvation check
    var starveThresh = (a.type === 'generalist') ? P.genStarve : P.specStarve;
    if (a.energy <= starveThresh) {
      a.alive = false;
    }
  });

  // ── Event 4: REPRODUCTION ──
  // Prey: logistic growth per biome
  var preyPerBiome = [0, 0, 0, 0, 0];
  agents.forEach(function(a) {
    if (a.alive && a.type === 'prey') preyPerBiome[a.biome]++;
  });
  var Kb = P.preyK / NUM_BIOMES;

  var newAgents = [];
  agents.forEach(function(a) {
    if (!a.alive) return;

    if (a.type === 'prey') {
      var growthFactor = Math.max(0, 1 - preyPerBiome[a.biome] / Kb);
      if (Math.random() < P.preyRepro * growthFactor) {
        newAgents.push(mkAgent('prey', a.x, a.y, a.species, a.biome));
      }
    } else {
      // Predator reproduction: energy-gated
      var reproRate = (a.type === 'generalist') ? P.genRepro : P.specRepro;
      if (a.energy > ENERGY_GATE && Math.random() < reproRate) {
        var child = mkAgent(a.type, a.x, a.y, -1, a.biome);
        child.diet = a.diet.slice();
        child.energy = Math.floor(a.energy / 2);
        a.energy = Math.ceil(a.energy / 2);
        newAgents.push(child);
      }
    }
  });
  for (var i = 0; i < newAgents.length; i++) agents.push(newAgents[i]);

  // ── Event 5: NATURAL MORTALITY ──
  agents.forEach(function(a) {
    if (!a.alive) return;
    if (a.type === 'prey'       && Math.random() < P.preyMort) a.alive = false;
    if (a.type === 'generalist' && Math.random() < P.genMort)  a.alive = false;
    if (a.type === 'specialist' && Math.random() < P.specMort) a.alive = false;
  });

  // ── Event 6: PREY IMMIGRATION (Extinction Prevention) ──
  // If any prey species drops below PREY_FLOOR, spawn new individuals
  var speciesCounts = new Array(NUM_PREY_SPECIES).fill(0);
  agents.forEach(function(a) {
    if (a.alive && a.type === 'prey') speciesCounts[a.species]++;
  });
  for (var s = 0; s < NUM_PREY_SPECIES; s++) {
    if (speciesCounts[s] < PREY_FLOOR) {
      var deficit = PREY_FLOOR - speciesCounts[s];
      var b = speciesBiome(s);
      var bounds = biomeBounds(b, P.gridSize);
      for (var j = 0; j < deficit; j++) {
        var x = bounds.xMin + Math.floor(Math.random() * (bounds.xMax - bounds.xMin + 1));
        var y = Math.floor(Math.random() * P.gridSize);
        agents.push(mkAgent('prey', x, y, s, b));
      }
    }
  }

  // ── Event 7: ENVIRONMENTAL SHOCK (Auto Mode) ──
  var autoShock = document.getElementById('shock-auto');
  if (autoShock && autoShock.checked) {
    if (Math.random() < P.shockProb) {
      // Pick 1-3 random biomes to shock
      var numBiomes = 1 + Math.floor(Math.random() * 3);
      var biomeOrder = [0, 1, 2, 3, 4].sort(function() { return Math.random() - 0.5; });
      var targetBiomes = biomeOrder.slice(0, numBiomes);
      executeShock(targetBiomes);
    }
  }

  // ── Event 8: CLEANUP & RECORDING ──
  agents = agents.filter(function(a) { return a.alive; });

  var c = getCounts();
  if (c.prey === 0) logEvent('All prey extinct at tick ' + tick, 'extinct');
  if (c.gen === 0 && P.genCount > 0) logEvent('Generalists extinct at tick ' + tick, 'extinct');
  if (c.spec === 0 && P.specCount > 0) logEvent('Specialists extinct at tick ' + tick, 'extinct');

  recordHistory();
  renderSurface();
  updateInfoBar();
  updateGraphs();

  // End conditions
  if (tick >= P.maxTicks || (c.gen === 0 && c.spec === 0)) {
    isRunning = false;
    logEvent('Simulation ended at tick ' + tick, '');
    return;
  }

  simTimer = setTimeout(simStep, 300 - P.speed);
}


// ═══════════════════════════════════════
//  SHOCK EXECUTION
// ═══════════════════════════════════════
// Called by both manual trigger and auto mode.
// targetBiomes: array of biome indices to shock.
function executeShock(targetBiomes) {
  shockCount++;
  var targetSet = {};
  for (var i = 0; i < targetBiomes.length; i++) targetSet[targetBiomes[i]] = true;

  var biomeNames = targetBiomes.map(function(b) { return BIOME_NAMES[b]; }).join(', ');

  agents.forEach(function(a) {
    if (!a.alive) return;

    // Determine which biome this agent is in
    var agentBiome;
    if (a.type === 'generalist') {
      agentBiome = getBiomeAtX(a.x, P.gridSize);
    } else {
      agentBiome = a.biome;
    }

    // Only affect agents in targeted biomes
    if (!targetSet[agentBiome]) return;

    // Equal probability for ALL agent types
    if (Math.random() < P.shockSev) {
      a.alive = false;
    }
  });

  logEvent('Shock at tick ' + tick + ' — ' + biomeNames, 'shock');
}

// Manual shock trigger
function triggerManualShock() {
  var targetBiomes = [];
  for (var b = 0; b < NUM_BIOMES; b++) {
    var cb = document.getElementById('shock-b' + b);
    if (cb && cb.checked) targetBiomes.push(b);
  }
  if (targetBiomes.length === 0) {
    logEvent('No biomes selected for shock', '');
    return;
  }
  executeShock(targetBiomes);

  // Cleanup after manual shock
  agents = agents.filter(function(a) { return a.alive; });
  recordHistory();
  renderSurface();
  updateInfoBar();
  updateGraphs();
}


// ═══════════════════════════════════════
//  HELPER FUNCTIONS
// ═══════════════════════════════════════

function getCounts() {
  var prey = 0, gen = 0, spec = 0;
  agents.forEach(function(a) {
    if (a.type === 'prey') prey++;
    else if (a.type === 'generalist') gen++;
    else spec++;
  });
  return { prey: prey, gen: gen, spec: spec };
}

function getCountsPerBiome() {
  var counts = [];
  for (var b = 0; b < NUM_BIOMES; b++) {
    counts.push({ prey: 0, gen: 0, spec: 0 });
  }
  agents.forEach(function(a) {
    var b;
    if (a.type === 'generalist') {
      b = getBiomeAtX(a.x, P.gridSize);
    } else {
      b = a.biome;
    }
    if (b >= 0 && b < NUM_BIOMES) {
      if (a.type === 'prey') counts[b].prey++;
      else if (a.type === 'generalist') counts[b].gen++;
      else counts[b].spec++;
    }
  });
  return counts;
}

function getSpeciesCounts() {
  var c = new Array(NUM_PREY_SPECIES).fill(0);
  agents.forEach(function(a) { if (a.type === 'prey') c[a.species]++; });
  return c;
}

function recordHistory() {
  var c = getCounts();
  var bc = getCountsPerBiome();
  simHistory.push({
    tick: tick,
    prey: c.prey, gen: c.gen, spec: c.spec,
    biomes: bc
  });
}

function logEvent(msg, cls) {
  var el = document.getElementById('elog');
  if (!el) return;
  var div = document.createElement('div');
  if (cls) div.className = cls;
  div.textContent = msg;
  el.prepend(div);
  while (el.children.length > 60) el.removeChild(el.lastChild);
}

function updateInfoBar() {
  var c = getCounts();
  var setText = function(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setText('info-tick', tick);
  setText('info-prey', c.prey);
  setText('info-gen', c.gen);
  setText('info-spec', c.spec);
  setText('info-shocks', shockCount);
  setText('s-prey', c.prey);
  setText('s-gen', c.gen);
  setText('s-spec', c.spec);
}


// ═══════════════════════════════════════
//  SVG DEFS — Symbols + Glow Filters
// ═══════════════════════════════════════

var _defsReady = false;

function initSvgDefs(svg) {
  if (_defsReady) return;
  var defs = svg.append('defs');

  // ── Glow filter for generalists (amber) ──
  var gGen = defs.append('filter')
    .attr('id', 'glow-gen')
    .attr('x', '-50%').attr('y', '-50%')
    .attr('width', '200%').attr('height', '200%');
  gGen.append('feGaussianBlur')
    .attr('in', 'SourceGraphic').attr('stdDeviation', '2').attr('result', 'blur');
  var mGen = gGen.append('feMerge');
  mGen.append('feMergeNode').attr('in', 'blur');
  mGen.append('feMergeNode').attr('in', 'SourceGraphic');

  // ── Glow filter for specialists (red) ──
  var gSpec = defs.append('filter')
    .attr('id', 'glow-spec')
    .attr('x', '-50%').attr('y', '-50%')
    .attr('width', '200%').attr('height', '200%');
  gSpec.append('feGaussianBlur')
    .attr('in', 'SourceGraphic').attr('stdDeviation', '2').attr('result', 'blur');
  var mSpec = gSpec.append('feMerge');
  mSpec.append('feMergeNode').attr('in', 'blur');
  mSpec.append('feMergeNode').attr('in', 'SourceGraphic');

  // ── Prey symbols (20 species) ──
  for (var i = 0; i < PREY_PATHS.length; i++) {
    defs.append('symbol')
      .attr('id', 'prey-' + i)
      .attr('viewBox', '0 0 16 16')
      .append('path').attr('d', PREY_PATHS[i]);
  }

  // ── Generalist predator symbol ──
  defs.append('symbol')
    .attr('id', 'pred-gen')
    .attr('viewBox', '0 0 16 16')
    .append('path').attr('d', GEN_PATH);

  // ── Specialist predator symbols (one per biome) ──
  for (var j = 0; j < SPEC_PATHS.length; j++) {
    defs.append('symbol')
      .attr('id', 'pred-spec-' + j)
      .attr('viewBox', '0 0 16 16')
      .append('path').attr('d', SPEC_PATHS[j]);
  }

  // ── Biome texture filters (procedural, GPU-rendered) ──
  // Each biome gets a unique feTurbulence pattern composited over its color
  var texConfigs = [
    { id: 'tex-grassland',  freq: '0.15 0.04',  octaves: 3, seed: 1, r: 0.30, g: 0.70, b: 0.32, a: 0.12 },
    { id: 'tex-icetundra',  freq: '0.05 0.05',  octaves: 2, seed: 5, r: 0.56, g: 0.80, b: 0.98, a: 0.10 },
    { id: 'tex-desert',     freq: '0.12 0.12',  octaves: 4, seed: 9, r: 1.00, g: 0.72, b: 0.30, a: 0.10 },
    { id: 'tex-rainforest', freq: '0.08 0.15',  octaves: 5, seed: 3, r: 0.00, g: 0.60, b: 0.53, a: 0.14 },
    { id: 'tex-swamp',      freq: '0.06 0.08',  octaves: 3, seed: 7, r: 0.47, g: 0.33, b: 0.54, a: 0.12 }
  ];

  for (var t = 0; t < texConfigs.length; t++) {
    var tc = texConfigs[t];
    var f = defs.append('filter')
      .attr('id', tc.id)
      .attr('x', '0%').attr('y', '0%')
      .attr('width', '100%').attr('height', '100%');
    // Turbulence noise
    f.append('feTurbulence')
      .attr('type', 'fractalNoise')
      .attr('baseFrequency', tc.freq)
      .attr('numOctaves', tc.octaves)
      .attr('seed', tc.seed)
      .attr('result', 'noise');
    // Tint the noise to biome color
    f.append('feColorMatrix')
      .attr('in', 'noise')
      .attr('type', 'matrix')
      .attr('values',
        tc.r + ' 0 0 0 0  ' +
        '0 ' + tc.g + ' 0 0 0  ' +
        '0 0 ' + tc.b + ' 0 0  ' +
        '0 0 0 ' + tc.a + ' 0')
      .attr('result', 'tinted');
    // Composite: source over texture
    f.append('feComposite')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'tinted')
      .attr('operator', 'over');
  }

  _defsReady = true;
}


// ═══════════════════════════════════════
//  AGENT TOOLTIP (click-to-inspect)
// ═══════════════════════════════════════

function showAgentTooltip(event, d) {
  var tt = document.getElementById('agent-tooltip');
  if (!tt) return;

  var color = '#2dd4a0';
  if (d.type === 'generalist') color = '#f5a623';
  else if (d.type === 'specialist') color = '#ef4455';

  var biomeStr = (d.biome >= 0 && d.biome < BIOME_NAMES.length)
    ? BIOME_NAMES[d.biome] : 'Roaming';

  // Build species key for modal link
  var speciesKey = '';
  if (d.type === 'prey') speciesKey = 'prey-' + d.species;
  else if (d.type === 'generalist') speciesKey = 'gen';
  else if (d.type === 'specialist') speciesKey = 'spec-' + d.biome;

  var html = '<div class="tt-header" style="color:' + color + ';">';
  if (d.type === 'prey') {
    html += '<span class="tt-species-link" onclick="document.getElementById(\'agent-tooltip\').style.display=\'none\'; showSpeciesModal(\'' + speciesKey + '\')">' + PREY_NAMES[d.species] + '</span> <span style="opacity:0.5;font-weight:400;">(Prey)</span>';
  } else if (d.type === 'generalist') {
    html += '<span class="tt-species-link" onclick="document.getElementById(\'agent-tooltip\').style.display=\'none\'; showSpeciesModal(\'' + speciesKey + '\')">Generalist Predator</span>';
  } else {
    var specName = (d.biome >= 0 && d.biome < SPEC_NAMES.length) ? SPEC_NAMES[d.biome] : 'Specialist';
    html += '<span class="tt-species-link" onclick="document.getElementById(\'agent-tooltip\').style.display=\'none\'; showSpeciesModal(\'' + speciesKey + '\')">' + specName + '</span> <span style="opacity:0.5;font-weight:400;">(Specialist)</span>';
  }
  html += '</div>';
  html += '<div class="tt-row"><span>ID</span><span>#' + d.id + '</span></div>';
  html += '<div class="tt-row"><span>Energy</span><span>' + d.energy + '</span></div>';
  html += '<div class="tt-row"><span>Age</span><span>' + d.age + ' ticks</span></div>';
  html += '<div class="tt-row"><span>Biome</span><span>' + biomeStr + '</span></div>';
  html += '<div class="tt-row"><span>Position</span><span>(' + d.x + ', ' + d.y + ')</span></div>';

  if (d.diet && d.diet.length > 0) {
    html += '<div class="tt-diet-label">Diet:</div>';
    if (d.diet.length === NUM_PREY_SPECIES) {
      html += '<div class="tt-diet">All Prey Species (' + d.diet.length + ')</div>';
    } else {
      html += '<div class="tt-diet">' + d.diet.map(function(s) { return PREY_NAMES[s]; }).join(', ') + '</div>';
    }
  }

  tt.innerHTML = html;
  tt.style.display = 'block';
  tt.style.left = (event.clientX + 15) + 'px';
  tt.style.top = (event.clientY - 10) + 'px';

  // Keep tooltip on-screen
  requestAnimationFrame(function() {
    var r = tt.getBoundingClientRect();
    if (r.right > window.innerWidth) tt.style.left = (event.clientX - r.width - 15) + 'px';
    if (r.bottom > window.innerHeight) tt.style.top = (event.clientY - r.height + 10) + 'px';
  });
}

// Dismiss tooltip on background click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.agent') && !e.target.closest('#agent-tooltip')) {
    var tt = document.getElementById('agent-tooltip');
    if (tt) tt.style.display = 'none';
  }
});


// ═══════════════════════════════════════
//  SVG RENDERING (D3)
// ═══════════════════════════════════════

function renderSurface() {
  var box = document.getElementById('surface-box');
  if (!box) return;
  surfaceWidth = box.clientWidth;
  surfaceHeight = box.clientHeight;

  var svg = d3.select('#surface');
  svg.attr('width', surfaceWidth).attr('height', surfaceHeight);

  var gs = P.gridSize;
  cellWidth = surfaceWidth / gs;
  cellHeight = surfaceHeight / gs;

  // Init symbol defs + glow filters once
  initSvgDefs(svg);

  // Agent sizes: predators slightly larger for visibility
  var preySize  = Math.max(cellWidth * 0.65, 2.5);
  var predSize  = Math.max(cellWidth * 0.9, 4);

  // Background
  svg.selectAll('.bg-rect').data([0]).join('rect')
    .attr('class', 'bg-rect')
    .attr('width', surfaceWidth).attr('height', surfaceHeight)
    .attr('fill', '#0b1019');

  // Biome regions
  var biomeData = [];
  for (var b = 0; b < NUM_BIOMES; b++) {
    var bounds = biomeBounds(b, gs);
    biomeData.push({
      biome: b,
      x: bounds.xMin * cellWidth,
      w: (bounds.xMax - bounds.xMin + 1) * cellWidth
    });
  }
  var BIOME_TEX_IDS = ['tex-grassland', 'tex-icetundra', 'tex-desert', 'tex-rainforest', 'tex-swamp'];
  var BIOME_LABEL_COLORS = [
    'rgba(76,175,80,0.85)',
    'rgba(144,202,249,0.85)',
    'rgba(255,183,77,0.85)',
    'rgba(0,150,136,0.85)',
    'rgba(120,85,137,0.85)'
  ];

  svg.selectAll('.biome-rect').data(biomeData, function(d) { return d.biome; })
    .join('rect')
    .attr('class', 'biome-rect')
    .attr('x', function(d) { return d.x; })
    .attr('y', 0)
    .attr('width', function(d) { return d.w; })
    .attr('height', surfaceHeight)
    .attr('fill', function(d) { return BIOME_COLORS[d.biome]; })
    .attr('stroke', function(d) { return BIOME_BORDER_COLORS[d.biome]; })
    .attr('stroke-width', 1)
    .attr('filter', function(d) { return 'url(#' + BIOME_TEX_IDS[d.biome] + ')'; });

  // Biome labels — brighter color + text shadow for contrast
  svg.selectAll('.biome-label').data(biomeData, function(d) { return d.biome; })
    .join('text')
    .attr('class', 'biome-label')
    .attr('x', function(d) { return d.x + d.w / 2; })
    .attr('y', 16)
    .attr('text-anchor', 'middle')
    .attr('fill', function(d) { return BIOME_LABEL_COLORS[d.biome]; })
    .attr('font-size', '10px')
    .attr('font-weight', '700')
    .attr('font-family', 'Segoe UI, Helvetica Neue, Arial, sans-serif')
    .attr('letter-spacing', '0.05em')
    .style('text-shadow', '0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)')
    .text(function(d) { return BIOME_NAMES[d.biome]; });

  // Agent <use> elements — keyed by id for enter/update/exit
  var sel = svg.selectAll('.agent').data(agents, function(d) { return d.id; });

  sel.exit().remove();

  var enter = sel.enter().append('use')
    .attr('class', 'agent')
    .style('cursor', 'pointer')
    .on('click', function(event, d) {
      event.stopPropagation();
      showAgentTooltip(event, d);
    });

  enter.merge(sel)
    .attr('href', function(d) {
      if (d.type === 'prey') return '#prey-' + d.species;
      if (d.type === 'generalist') return '#pred-gen';
      return '#pred-spec-' + d.biome;
    })
    .attr('x', function(d) {
      var sz = (d.type === 'prey') ? preySize : predSize;
      return d.x * cellWidth + cellWidth / 2 - sz / 2;
    })
    .attr('y', function(d) {
      var sz = (d.type === 'prey') ? preySize : predSize;
      return d.y * cellHeight + cellHeight / 2 - sz / 2;
    })
    .attr('width', function(d) { return (d.type === 'prey') ? preySize : predSize; })
    .attr('height', function(d) { return (d.type === 'prey') ? preySize : predSize; })
    .attr('fill', function(d) {
      if (d.type === 'prey') return PREY_COLORS[d.species];
      if (d.type === 'generalist') return '#f5a623';
      return '#ef4455';
    })
    .attr('opacity', function(d) { return (d.type === 'prey') ? 0.8 : 1; })
    .attr('filter', function(d) {
      if (d.type === 'generalist') return 'url(#glow-gen)';
      if (d.type === 'specialist') return 'url(#glow-spec)';
      return null;
    });

  // Ensure predators render on top of prey
  svg.selectAll('.agent')
    .sort(function(a, b) {
      var order = { prey: 0, generalist: 1, specialist: 2 };
      return (order[a.type] || 0) - (order[b.type] || 0);
    });
}


// ═══════════════════════════════════════
//  CONTROLS
// ═══════════════════════════════════════

document.getElementById('btn-start').onclick = function() {
  if (tick === 0) initSim();
  readParams();
  isRunning = true;
  simStep();
};

document.getElementById('btn-pause').onclick = function() {
  isRunning = false;
  if (simTimer) clearTimeout(simTimer);
};

document.getElementById('btn-step').onclick = function() {
  if (tick === 0) initSim();
  readParams();
  isRunning = true;
  simStep();
  isRunning = false;
  if (simTimer) clearTimeout(simTimer);
};

document.getElementById('btn-reset').onclick = function() {
  isRunning = false;
  if (simTimer) clearTimeout(simTimer);
  document.getElementById('elog').innerHTML = '<div style="color:var(--text-muted)">Reset.</div>';
  if (typeof randomizeSeeds === 'function') randomizeSeeds();
  initSim();
  updateGraphs();
};

// Manual shock button
var shockBtn = document.getElementById('btn-shock');
if (shockBtn) {
  shockBtn.onclick = triggerManualShock;
}

// redrawWindow: called when grid/count sliders change
function redrawWindow() {
  isRunning = false;
  if (simTimer) clearTimeout(simTimer);
  document.getElementById('elog').innerHTML = '<div style="color:var(--text-muted)">Parameters changed. Press Start.</div>';
  initSim();
  updateGraphs();
}

window.addEventListener('resize', function() {
  if (!isRunning) renderSurface();
});


// ═══════════════════════════════════════
//  INIT ON PAGE LOAD
// ═══════════════════════════════════════
// Init is called from the HTML page after all scripts are loaded
