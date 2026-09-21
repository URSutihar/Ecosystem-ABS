// ═══════════════════════════════════════════════════════════════
//  SIM CORE
// ═══════════════════════════════════════════════════════════════

(function(global) {
  'use strict';

  // ── Constants (must match ecosystem_engine.js) ──
  var NUM_BIOMES = 5;
  var NUM_PREY_SPECIES = 20;
  var PREY_FLOOR = 2;
  var ENERGY_GATE = 8;

  // ── Seeded PRNG (mulberry32) ──
  function makeRng(seed) {
    var s = seed | 0;
    return function() {
      s = (s + 0x6D2B79F5) | 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ── Biome geometry ──
  function speciesBiome(s) { return Math.floor(s / 4); }
  function biomeSpecies(b) {
    var out = [];
    for (var s = b * 4; s < b * 4 + 4; s++) out.push(s);
    return out;
  }
  function biomeBounds(b, gs) {
    var w = Math.floor(gs / NUM_BIOMES);
    var xMin = b * w;
    var xMax = (b === NUM_BIOMES - 1) ? gs - 1 : xMin + w - 1;
    return { xMin: xMin, xMax: xMax };
  }
  function getBiomeAtX(x, gs) {
    var w = Math.floor(gs / NUM_BIOMES);
    return Math.min(Math.floor(x / w), NUM_BIOMES - 1);
  }

  // ── Agent factory ──
  function mkAgent(nextIdRef, type, x, y, species, biome) {
    return {
      id: nextIdRef.v++,
      type: type,
      x: x, y: y,
      species: (species !== undefined) ? species : -1,
      biome: (biome !== undefined) ? biome : -1,
      diet: null,
      energy: (type === 'prey') ? 10 : 20,
      alive: true,
      age: 0
    };
  }

  // ── Main headless runner ──
  // params: { gridSize, maxTicks, preyCount, preyK, preyRepro, preyMort,
  //           genCount, genHunt, genEnergy, genRepro, genMort, genStarve,
  //           specCount, specHunt, specEnergy, specDiet, specRepro, specMort, specStarve,
  //           shockSev, shockProb, autoShock }
  // seed: integer seed for reproducibility
  // Returns: { ticks, prey, gen, spec, preyPerBiome, genPerBiome, specPerBiome }
  //   where arrays are length (tick + 1), indexed by tick
  function runHeadless(params, seed) {
    var rng = makeRng(seed);
    var nextId = { v: 0 };
    var agents = [];
    var gs = params.gridSize | 0;
    var maxTicks = params.maxTicks | 0;

    // ── Init prey ──
    var perSpecies = Math.floor(params.preyCount / NUM_PREY_SPECIES);
    for (var s = 0; s < NUM_PREY_SPECIES; s++) {
      var b = speciesBiome(s);
      var bn = biomeBounds(b, gs);
      for (var i = 0; i < perSpecies; i++) {
        var x = bn.xMin + Math.floor(rng() * (bn.xMax - bn.xMin + 1));
        var y = Math.floor(rng() * gs);
        agents.push(mkAgent(nextId, 'prey', x, y, s, b));
      }
    }

    // ── Init generalists ──
    for (var i = 0; i < params.genCount; i++) {
      var x = Math.floor(rng() * gs);
      var y = Math.floor(rng() * gs);
      var ag = mkAgent(nextId, 'generalist', x, y, -1, -1);
      ag.diet = [];
      for (var j = 0; j < NUM_PREY_SPECIES; j++) ag.diet.push(j);
      agents.push(ag);
    }

    // ── Init specialists ──
    var specPerBiome = Math.floor(params.specCount / NUM_BIOMES);
    for (var bb = 0; bb < NUM_BIOMES; bb++) {
      var bn2 = biomeBounds(bb, gs);
      var localSpecies = biomeSpecies(bb);
      for (var i2 = 0; i2 < specPerBiome; i2++) {
        var x2 = bn2.xMin + Math.floor(rng() * (bn2.xMax - bn2.xMin + 1));
        var y2 = Math.floor(rng() * gs);
        var sp = mkAgent(nextId, 'specialist', x2, y2, -1, bb);
        var dietSize = Math.min(Math.round(params.specDiet), localSpecies.length);
        var shuffled = localSpecies.slice().sort(function() { return rng() - 0.5; });
        sp.diet = shuffled.slice(0, dietSize);
        agents.push(sp);
      }
    }

    // ── History arrays ──
    var histPrey = [];
    var histGen = [];
    var histSpec = [];

    function countAll() {
      var p = 0, g = 0, sp = 0;
      for (var k = 0; k < agents.length; k++) {
        var a = agents[k];
        if (!a.alive) continue;
        if (a.type === 'prey') p++;
        else if (a.type === 'generalist') g++;
        else sp++;
      }
      return { prey: p, gen: g, spec: sp };
    }

    var c0 = countAll();
    histPrey.push(c0.prey); histGen.push(c0.gen); histSpec.push(c0.spec);

    // ── Tick loop ──
    for (var tick = 1; tick <= maxTicks; tick++) {

      // Event 1: Movement
      for (var ai = 0; ai < agents.length; ai++) {
        var a = agents[ai];
        if (!a.alive) continue;
        var dx = Math.floor(rng() * 3) - 1;
        var dy = Math.floor(rng() * 3) - 1;
        if (a.type === 'generalist') {
          a.x = (a.x + dx + gs) % gs;
          a.y = (a.y + dy + gs) % gs;
        } else {
          var bnm = biomeBounds(a.biome, gs);
          var nx = a.x + dx;
          if (nx < bnm.xMin) nx = bnm.xMin;
          if (nx > bnm.xMax) nx = bnm.xMax;
          a.x = nx;
          a.y = (a.y + dy + gs) % gs;
        }
        a.age++;
      }

      // Event 2: Spatial indexing
      var grid = {};
      for (var gi = 0; gi < agents.length; gi++) {
        var ag2 = agents[gi];
        if (!ag2.alive) continue;
        var gk = ag2.x + ',' + ag2.y;
        if (!grid[gk]) grid[gk] = [];
        grid[gk].push(ag2);
      }

      // Event 3: Predation
      for (var pi = 0; pi < agents.length; pi++) {
        var pr = agents[pi];
        if (!pr.alive || pr.type === 'prey') continue;
        var huntRate = (pr.type === 'generalist') ? params.genHunt : params.specHunt;
        var energyGain = (pr.type === 'generalist') ? params.genEnergy : params.specEnergy;
        var fed = false;
        for (var ddx = -1; ddx <= 1 && !fed; ddx++) {
          for (var ddy = -1; ddy <= 1 && !fed; ddy++) {
            var nnx = (pr.x + ddx + gs) % gs;
            var nny = (pr.y + ddy + gs) % gs;
            if (pr.type === 'specialist') {
              if (getBiomeAtX(nnx, gs) !== pr.biome) continue;
            }
            var ck = nnx + ',' + nny;
            var cell = grid[ck];
            if (!cell) continue;
            for (var ti = 0; ti < cell.length; ti++) {
              var target = cell[ti];
              if (!target.alive || target.type !== 'prey') continue;
              if (pr.diet.indexOf(target.species) === -1) continue;
              if (rng() < huntRate) {
                target.alive = false;
                pr.energy += energyGain;
                fed = true;
                break;
              }
            }
          }
        }
        pr.energy -= 1;
        var starveThresh = (pr.type === 'generalist') ? params.genStarve : params.specStarve;
        if (pr.energy <= starveThresh) pr.alive = false;
      }

      // Event 4: Reproduction
      var preyPerBiome = [0, 0, 0, 0, 0];
      for (var ri = 0; ri < agents.length; ri++) {
        var ar = agents[ri];
        if (ar.alive && ar.type === 'prey') preyPerBiome[ar.biome]++;
      }
      var Kb = params.preyK / NUM_BIOMES;
      var newAgents = [];
      for (var rri = 0; rri < agents.length; rri++) {
        var ra = agents[rri];
        if (!ra.alive) continue;
        if (ra.type === 'prey') {
          var gf = Math.max(0, 1 - preyPerBiome[ra.biome] / Kb);
          if (rng() < params.preyRepro * gf) {
            newAgents.push(mkAgent(nextId, 'prey', ra.x, ra.y, ra.species, ra.biome));
          }
        } else {
          var reproRate = (ra.type === 'generalist') ? params.genRepro : params.specRepro;
          if (ra.energy > ENERGY_GATE && rng() < reproRate) {
            var child = mkAgent(nextId, ra.type, ra.x, ra.y, -1, ra.biome);
            child.diet = ra.diet.slice();
            child.energy = Math.floor(ra.energy / 2);
            ra.energy = Math.ceil(ra.energy / 2);
            newAgents.push(child);
          }
        }
      }
      for (var ni = 0; ni < newAgents.length; ni++) agents.push(newAgents[ni]);

      // Event 5: Natural mortality
      for (var mi = 0; mi < agents.length; mi++) {
        var ma = agents[mi];
        if (!ma.alive) continue;
        if (ma.type === 'prey' && rng() < params.preyMort) ma.alive = false;
        else if (ma.type === 'generalist' && rng() < params.genMort) ma.alive = false;
        else if (ma.type === 'specialist' && rng() < params.specMort) ma.alive = false;
      }

      // Event 6: Prey immigration
      var speciesCounts = new Array(NUM_PREY_SPECIES);
      for (var sc = 0; sc < NUM_PREY_SPECIES; sc++) speciesCounts[sc] = 0;
      for (var ic = 0; ic < agents.length; ic++) {
        var ia = agents[ic];
        if (ia.alive && ia.type === 'prey') speciesCounts[ia.species]++;
      }
      for (var is = 0; is < NUM_PREY_SPECIES; is++) {
        if (speciesCounts[is] < PREY_FLOOR) {
          var def = PREY_FLOOR - speciesCounts[is];
          var ibi = speciesBiome(is);
          var ibn = biomeBounds(ibi, gs);
          for (var dj = 0; dj < def; dj++) {
            var ix = ibn.xMin + Math.floor(rng() * (ibn.xMax - ibn.xMin + 1));
            var iy = Math.floor(rng() * gs);
            agents.push(mkAgent(nextId, 'prey', ix, iy, is, ibi));
          }
        }
      }

      // Event 7: Auto shock
      if (params.autoShock) {
        if (rng() < params.shockProb) {
          var numB = 1 + Math.floor(rng() * 3);
          var order = [0, 1, 2, 3, 4].sort(function() { return rng() - 0.5; });
          var targets = order.slice(0, numB);
          var tSet = {};
          for (var ts = 0; ts < targets.length; ts++) tSet[targets[ts]] = true;
          for (var si = 0; si < agents.length; si++) {
            var sa = agents[si];
            if (!sa.alive) continue;
            var sab = (sa.biome >= 0) ? sa.biome : getBiomeAtX(sa.x, gs);
            if (tSet[sab] && rng() < params.shockSev) sa.alive = false;
          }
        }
      }

      // Event 8: Cleanup + record
      var kept = [];
      for (var ki = 0; ki < agents.length; ki++) if (agents[ki].alive) kept.push(agents[ki]);
      agents = kept;

      var c = countAll();
      histPrey.push(c.prey);
      histGen.push(c.gen);
      histSpec.push(c.spec);

      // Early termination: both predator types extinct
      if (c.gen === 0 && c.spec === 0) {
        // Pad remaining ticks with zeros for consistent array lengths
        for (var pad = tick + 1; pad <= maxTicks; pad++) {
          histPrey.push(c.prey);
          histGen.push(0);
          histSpec.push(0);
        }
        break;
      }
    }

    return {
      prey: histPrey,
      gen: histGen,
      spec: histSpec,
      finalPrey: histPrey[histPrey.length - 1],
      finalGen: histGen[histGen.length - 1],
      finalSpec: histSpec[histSpec.length - 1]
    };
  }

  // ── Export ──
  var api = { runHeadless: runHeadless, makeRng: makeRng };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    global.SimCore = api;
  }
})(typeof self !== 'undefined' ? self : this);
