// ═══════════════════════════════════════════════════════════════
//  PLOTLY GRAPHS FOR ECOSYSTEM SIMULATOR
// ═══════════════════════════════════════════════════════════════

var darkLayout = {
  paper_bgcolor: '#111822',
  plot_bgcolor: '#111822',
  font: { color: '#8899af', size: 10 },
  margin: { t: 10, r: 10, b: 30, l: 40 },
  xaxis: { gridcolor: '#1c2536', zerolinecolor: '#1c2536' },
  yaxis: { gridcolor: '#1c2536', zerolinecolor: '#1c2536' },
  showlegend: true,
  legend: { font: { size: 9, color: '#8899af' }, bgcolor: 'rgba(0,0,0,0)', x: 0.01, y: 0.99 }
};

var plotConfig = { displayModeBar: false, responsive: true };

// Helper to merge layout overrides
function mergeLayout(overrides) {
  var result = {};
  for (var key in darkLayout) result[key] = darkLayout[key];
  for (var key in overrides) {
    if (typeof overrides[key] === 'object' && !Array.isArray(overrides[key]) && darkLayout[key]) {
      result[key] = {};
      for (var k2 in darkLayout[key]) result[key][k2] = darkLayout[key][k2];
      for (var k2 in overrides[key]) result[key][k2] = overrides[key][k2];
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

// ── Initialize empty charts on page load ──
function initCharts() {
  // Chart 1: Dual-axis Prey & Predator dynamics (L-V style)
  Plotly.newPlot('chart-phase', [
    { x: [], y: [], name: 'Prey', mode: 'lines', line: { color: '#2dd4a0', width: 2 } },
    { x: [], y: [], name: 'Generalist', mode: 'lines', line: { color: '#f5a623', width: 2, dash: 'dash' }, yaxis: 'y2' },
    { x: [], y: [], name: 'Specialist', mode: 'lines', line: { color: '#ef4455', width: 2, dash: 'dash' }, yaxis: 'y2' }
  ], mergeLayout({
    xaxis: { gridcolor: '#1c2536', zerolinecolor: '#1c2536', title: 'Tick' },
    yaxis: { gridcolor: '#1c2536', zerolinecolor: '#1c2536', title: 'Prey', titlefont: { color: '#2dd4a0' }, tickfont: { color: '#2dd4a0' } },
    yaxis2: { gridcolor: '#1c2536', zerolinecolor: '#1c2536', title: 'Predators', titlefont: { color: '#f5a623' }, tickfont: { color: '#f5a623' }, overlaying: 'y', side: 'right' },
    showlegend: true,
    legend: { font: { size: 8, color: '#8899af' }, bgcolor: 'rgba(0,0,0,0)', x: 0.01, y: 0.99 }
  }), plotConfig);

  // Chart 3: Prey species bar (grouped by biome)
  var speciesX = [];
  var speciesColors = [];
  for (var i = 0; i < NUM_PREY_SPECIES; i++) {
    speciesX.push(PREY_NAMES[i]);
    speciesColors.push(PREY_COLORS[i]);
  }
  Plotly.newPlot('chart-species', [{
    x: speciesX,
    y: new Array(NUM_PREY_SPECIES).fill(0),
    type: 'bar',
    marker: { color: speciesColors, opacity: 0.85 }
  }], mergeLayout({
    xaxis: { gridcolor: '#1c2536', zerolinecolor: '#1c2536', title: '' },
    yaxis: { gridcolor: '#1c2536', zerolinecolor: '#1c2536', title: 'Count' },
    showlegend: false,
    margin: { t: 10, r: 10, b: 60, l: 35 }
  }), plotConfig);

  // Chart 4: Population per biome (grouped bar: prey, gen, spec)
  var biomeNames = BIOME_NAMES.slice();
  Plotly.newPlot('chart-biome', [
    { x: biomeNames, y: [0,0,0,0,0], name: 'Prey', type: 'bar', marker: { color: '#2dd4a0' } },
    { x: biomeNames, y: [0,0,0,0,0], name: 'Gen', type: 'bar', marker: { color: '#f5a623' } },
    { x: biomeNames, y: [0,0,0,0,0], name: 'Spec', type: 'bar', marker: { color: '#ef4455' } }
  ], mergeLayout({
    barmode: 'group',
    xaxis: { gridcolor: '#1c2536', zerolinecolor: '#1c2536', title: '' },
    yaxis: { gridcolor: '#1c2536', zerolinecolor: '#1c2536', title: 'Count' },
    showlegend: false,
    margin: { t: 10, r: 10, b: 40, l: 35 }
  }), plotConfig);
}

// ── Update all graphs with current data ──
function updateGraphs() {
  if (simHistory.length < 1) return;

  // Downsample for performance (max 200 points)
  var step = Math.max(1, Math.floor(simHistory.length / 200));

  // Dual-axis chart: biome-aware
  var phaseSelect = document.getElementById('phase-biome');
  var phaseBiome = phaseSelect ? parseInt(phaseSelect.value) : -1;
  var dualTicks = [], dualPrey = [], dualGen = [], dualSpec = [];

  for (var i = 0; i < simHistory.length; i += step) {
    var h = simHistory[i];
    dualTicks.push(h.tick);
    if (phaseBiome === -1) {
      dualPrey.push(h.prey);
      dualGen.push(h.gen);
      dualSpec.push(h.spec);
    } else if (h.biomes && h.biomes[phaseBiome]) {
      dualPrey.push(h.biomes[phaseBiome].prey);
      dualGen.push(h.biomes[phaseBiome].gen);
      dualSpec.push(h.biomes[phaseBiome].spec);
    }
  }
  var last = simHistory[simHistory.length - 1];
  if (dualTicks[dualTicks.length - 1] !== last.tick) {
    dualTicks.push(last.tick);
    if (phaseBiome === -1) {
      dualPrey.push(last.prey);
      dualGen.push(last.gen);
      dualSpec.push(last.spec);
    } else if (last.biomes && last.biomes[phaseBiome]) {
      dualPrey.push(last.biomes[phaseBiome].prey);
      dualGen.push(last.biomes[phaseBiome].gen);
      dualSpec.push(last.biomes[phaseBiome].spec);
    }
  }

  // Chart 1: Dual-axis Prey & Predator dynamics (biome-aware)
  Plotly.update('chart-phase', {
    x: [dualTicks, dualTicks, dualTicks],
    y: [dualPrey, dualGen, dualSpec]
  });

  // Chart 3: Species bar chart
  var sc = getSpeciesCounts();
  Plotly.update('chart-species', { y: [sc] });

  // Chart 4: Population per biome
  if (last.biomes) {
    var bPrey = [], bGen = [], bSpec = [];
    for (var b = 0; b < NUM_BIOMES; b++) {
      bPrey.push(last.biomes[b].prey);
      bGen.push(last.biomes[b].gen);
      bSpec.push(last.biomes[b].spec);
    }
    Plotly.update('chart-biome', {
      y: [bPrey, bGen, bSpec]
    });
  }
}

// ── Biome dropdown: re-render chart on change ──
document.addEventListener('DOMContentLoaded', function() {
  var sel = document.getElementById('phase-biome');
  if (sel) {
    sel.addEventListener('change', function() {
      if (typeof updateGraphs === 'function') updateGraphs();
    });
  }
});

// ── Init on load ──
// initCharts is called from the window 'load' handler in ecosystem_engine.js
