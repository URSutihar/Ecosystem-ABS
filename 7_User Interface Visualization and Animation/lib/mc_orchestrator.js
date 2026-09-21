// ═══════════════════════════════════════════════════════════════
//  MONTE CARLO ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════

var MC = (function() {

  var running = false;
  var cancelled = false;
  var startTime = 0;
  var results = [];
  var totalRuns = 0;
  var completedRuns = 0;

  function readMcParams() {
    // Pull simulation params from main UI sliders
    var get = function(id) {
      var el = document.getElementById('p-' + id);
      return el ? parseFloat(el.value) : 0;
    };
    var autoShock = document.getElementById('shock-auto');
    return {
      gridSize: get('gridSize'),
      maxTicks: get('maxTicks'),
      preyCount: get('preyCount'),
      preyK: get('preyK'),
      preyRepro: get('preyRepro'),
      preyMort: get('preyMort'),
      genCount: get('genCount'),
      genHunt: get('genHunt'),
      genEnergy: get('genEnergy'),
      genRepro: get('genRepro'),
      genMort: get('genMort'),
      genStarve: get('genStarve'),
      specCount: get('specCount'),
      specHunt: get('specHunt'),
      specEnergy: get('specEnergy'),
      specDiet: get('specDiet'),
      specRepro: get('specRepro'),
      specMort: get('specMort'),
      specStarve: get('specStarve'),
      shockSev: get('shockSev'),
      shockProb: get('shockProb'),
      autoShock: autoShock ? autoShock.checked : false
    };
  }

  function setStatus(text) {
    var el = document.getElementById('mc-status');
    if (el) el.textContent = text;
  }

  function setProgress(pct) {
    var bar = document.getElementById('mc-progress-bar');
    if (bar) bar.style.width = pct + '%';
  }

  function run() {
    if (running) return;
    if (typeof SimCore === 'undefined' || !SimCore.runHeadless) {
      setStatus('Error: sim_core.js not loaded');
      return;
    }
    running = true;
    cancelled = false;
    results = [];
    completedRuns = 0;
    startTime = Date.now();

    var runsInput = document.getElementById('mc-runs');
    var seedInput = document.getElementById('mc-seed-start');
    totalRuns = runsInput ? parseInt(runsInput.value) : 200;
    var seedStart = seedInput ? parseInt(seedInput.value) : 1000;

    var params = readMcParams();

    setStatus('Starting ' + totalRuns + ' runs...');
    setProgress(0);

    var mcBtn = document.getElementById('mc-run-btn');
    if (mcBtn) { mcBtn.disabled = true; mcBtn.textContent = 'Running...'; }

    // Schedule the first run
    runOne(0, seedStart, params);
  }

  function runOne(idx, seedStart, params) {
    if (cancelled) return;
    if (idx >= totalRuns) { finalize(); return; }

    var seed = seedStart + idx;
    var result = SimCore.runHeadless(params, seed);

    results.push({
      seed: seed,
      prey: result.prey,
      gen: result.gen,
      spec: result.spec,
      finalGen: result.finalGen,
      finalSpec: result.finalSpec
    });
    completedRuns++;

    var pct = (completedRuns / totalRuns) * 100;
    setProgress(pct);
    var elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    setStatus(completedRuns + ' / ' + totalRuns + ' runs complete  (' + elapsed + 's)');

    // Yield to the browser so the progress bar + status repaint.
    // 0ms timeout = run ASAP but let one frame paint first.
    setTimeout(function() { runOne(idx + 1, seedStart, params); }, 0);
  }

  function finalize() {
    running = false;

    var elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    setStatus('Complete — ' + results.length + ' runs in ' + elapsed + 's');

    var mcBtn = document.getElementById('mc-run-btn');
    if (mcBtn) { mcBtn.disabled = false; mcBtn.textContent = 'Run Monte Carlo'; }

    plotSpaghetti();
    plotStats();
  }

  // ── Spaghetti plot: all gen + spec trajectories ──
  function plotSpaghetti() {
    if (!results.length) return;
    var maxDisplayInput = document.getElementById('mc-display');
    var maxDisplay = maxDisplayInput ? parseInt(maxDisplayInput.value) : 200;
    maxDisplay = Math.min(maxDisplay, results.length);

    // Random sample of runs to display
    var sampled = results.slice();
    for (var i = sampled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = sampled[i]; sampled[i] = sampled[j]; sampled[j] = tmp;
    }
    sampled = sampled.slice(0, maxDisplay);

    var traces = [];
    var N = results[0].gen.length;
    var ticks = [];
    for (var t = 0; t < N; t++) ticks.push(t);

    // Thin generalist curves
    for (var g = 0; g < sampled.length; g++) {
      traces.push({
        x: ticks, y: sampled[g].gen,
        type: 'scattergl', mode: 'lines',
        line: { color: 'rgba(245,166,35,0.12)', width: 1 },
        hoverinfo: 'skip', showlegend: false
      });
    }
    // Thin specialist curves
    for (var sp = 0; sp < sampled.length; sp++) {
      traces.push({
        x: ticks, y: sampled[sp].spec,
        type: 'scattergl', mode: 'lines',
        line: { color: 'rgba(239,68,85,0.12)', width: 1 },
        hoverinfo: 'skip', showlegend: false
      });
    }

    // Median trajectories (bold)
    var medGen = [], medSpec = [];
    var p25Gen = [], p75Gen = [], p25Spec = [], p75Spec = [];
    for (var k = 0; k < N; k++) {
      var gvals = [], svals = [];
      for (var r = 0; r < results.length; r++) {
        gvals.push(results[r].gen[k]);
        svals.push(results[r].spec[k]);
      }
      gvals.sort(function(a, b) { return a - b; });
      svals.sort(function(a, b) { return a - b; });
      var mid = Math.floor(gvals.length / 2);
      medGen.push(gvals[mid]);
      medSpec.push(svals[mid]);
      var q1 = Math.floor(gvals.length * 0.25);
      var q3 = Math.floor(gvals.length * 0.75);
      p25Gen.push(gvals[q1]); p75Gen.push(gvals[q3]);
      p25Spec.push(svals[q1]); p75Spec.push(svals[q3]);
    }

    traces.push({
      x: ticks, y: medGen, type: 'scatter', mode: 'lines',
      line: { color: '#f5a623', width: 2.5 },
      name: 'Gen (median)', hoverinfo: 'y'
    });
    traces.push({
      x: ticks, y: medSpec, type: 'scatter', mode: 'lines',
      line: { color: '#ef4455', width: 2.5 },
      name: 'Spec (median)', hoverinfo: 'y'
    });

    var layout = {
      paper_bgcolor: '#0a0e14',
      plot_bgcolor: '#0a0e14',
      font: { color: '#8899af', size: 10 },
      margin: { t: 25, r: 10, b: 40, l: 40 },
      xaxis: { title: 'Tick', gridcolor: '#1c2536', zerolinecolor: '#1c2536' },
      yaxis: { title: 'Population', gridcolor: '#1c2536', zerolinecolor: '#1c2536' },
      legend: { orientation: 'h', x: 0.5, xanchor: 'center', y: 1.1, bgcolor: 'rgba(0,0,0,0)' },
      showlegend: true
    };

    Plotly.newPlot('chart-mc', traces, layout, { displayModeBar: false, responsive: true });
  }

  // ── Summary stats ──
  function plotStats() {
    if (!results.length) return;
    var genSurvived = 0, specSurvived = 0;
    var meanFinalGen = 0, meanFinalSpec = 0;
    for (var r = 0; r < results.length; r++) {
      if (results[r].finalGen > 0) genSurvived++;
      if (results[r].finalSpec > 0) specSurvived++;
      meanFinalGen += results[r].finalGen;
      meanFinalSpec += results[r].finalSpec;
    }
    meanFinalGen /= results.length;
    meanFinalSpec /= results.length;
    var genPct = (100 * genSurvived / results.length).toFixed(1);
    var specPct = (100 * specSurvived / results.length).toFixed(1);

    var el = document.getElementById('mc-stats');
    if (el) {
      el.innerHTML =
        '<div class="mc-stat"><span class="mc-stat-label" style="color:#f5a623;">Gen Survival</span>' +
        '<span class="mc-stat-val">' + genPct + '%</span></div>' +
        '<div class="mc-stat"><span class="mc-stat-label" style="color:#ef4455;">Spec Survival</span>' +
        '<span class="mc-stat-val">' + specPct + '%</span></div>' +
        '<div class="mc-stat"><span class="mc-stat-label">Mean Final Gen</span>' +
        '<span class="mc-stat-val">' + meanFinalGen.toFixed(1) + '</span></div>' +
        '<div class="mc-stat"><span class="mc-stat-label">Mean Final Spec</span>' +
        '<span class="mc-stat-val">' + meanFinalSpec.toFixed(1) + '</span></div>';
    }
  }

  function cancel() {
    cancelled = true;
    running = false;
    setStatus('Cancelled');
    var mcBtn = document.getElementById('mc-run-btn');
    if (mcBtn) { mcBtn.disabled = false; mcBtn.textContent = 'Run Monte Carlo'; }
  }

  return { run: run, cancel: cancel };
})();
