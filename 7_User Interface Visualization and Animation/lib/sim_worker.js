// ═══════════════════════════════════════════════════════════════
//  SIM WORKER 
// ═══════════════════════════════════════════════════════════════

importScripts('sim_core.js');

self.onmessage = function(e) {
  var msg = e.data;
  if (msg.type !== 'run') return;

  var params = msg.params;
  var seeds = msg.seeds;          // array of seeds for this batch
  var workerId = msg.workerId;

  for (var i = 0; i < seeds.length; i++) {
    var seed = seeds[i];
    var result = SimCore.runHeadless(params, seed);
    self.postMessage({
      type: 'result',
      workerId: workerId,
      seed: seed,
      index: i,
      prey: result.prey,
      gen: result.gen,
      spec: result.spec,
      finalPrey: result.finalPrey,
      finalGen: result.finalGen,
      finalSpec: result.finalSpec
    });
  }

  self.postMessage({ type: 'done', workerId: workerId });
};
