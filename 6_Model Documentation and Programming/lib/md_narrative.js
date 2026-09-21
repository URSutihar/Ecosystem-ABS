// ═══════════════════════════════════════════════════════════════
//  MODEL DOCUMENTATION — Per-section event narrative slides
//  Tick order matches simStep() in ecosystem_engine.js.
//  Each event is mapped to the parameter section it relates to.
// ═══════════════════════════════════════════════════════════════

(function (global) {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /** Title is escaped; body is static HTML authored here (trusted). */
  function slideBlock(num, title, bodyHtml, accent) {
    return (
      '<article class="md-slide" style="--md-slide-accent:' + esc(accent) + '">' +
      '<div class="md-slide-num">' + esc(num) + '</div>' +
      '<h3>' + esc(title) + '</h3>' +
      '<p>' + bodyHtml + '</p>' +
      '</article>'
    );
  }

  // ── Event slides keyed by section ID ───────────────────────────
  // Each section maps to an array of slides that logically belong
  // after that section's parameter table.

  var SECTION_SLIDES = {

    // World Architecture → spatial mechanics
    world: [
      function () {
        return slideBlock(
          'Event 1', 'Movement',
          'Each living agent draws a random offset in <code>[-1,0,1]</code> for both axes. Prey and specialists keep <code>x</code> inside their biome strip while <code>y</code> wraps; generalists wrap on both axes so they can cross biome boundaries.',
          '#2dd4a0'
        );
      },
      function () {
        return slideBlock(
          'Event 2', 'Spatial indexing',
          'Alive agents are hashed into a dictionary keyed by <code>"x,y"</code> so predators only inspect co-located and neighboring cells during the hunt phase.',
          '#a78bfa'
        );
      }
    ],

    // Initial Population Synthesis → agent spawning
    init: [
      function () {
        return slideBlock(
          '0 · Before tick 1', 'Initialization',
          'The function <code>initSim()</code> reads control values from the left-panel sliders into <code>P</code>. The run seed is taken from <code>#p-seed</code> and wired into Mulberry32. The agent list is cleared; prey are spawned evenly across twenty species inside their home biome columns; generalists receive the full prey diet and uniform placement on the full toroidal grid; specialists are placed inside their biome with a random subset of local prey species in <code>diet</code> (size governed by <code>specDiet</code>).',
          '#60a5fa'
        );
      }
    ],

    // Prey Dynamics → reproduction & immigration
    prey: [
      function () {
        return slideBlock(
          'Event 4', 'Reproduction',
          'Prey use logistic growth: the Bernoulli rate scales with <code>preyRepro</code> and <code>1 − N_biome / K_biome</code> where <code>K_biome = preyK / 5</code>. Predators reproduce only when energy exceeds <code>ENERGY_GATE</code> (8) and a second Bernoulli draw succeeds; parent and child split energy.',
          '#2dd4a0'
        );
      },
      function () {
        return slideBlock(
          'Event 6', 'Prey immigration',
          'Any prey species whose population falls below <code>PREY_FLOOR</code> receives new individuals spawned at random coordinates inside that species\u2019 biome, modelling dispersal from outside the grid.',
          '#60a5fa'
        );
      }
    ],

    // Predator Dynamics → hunting, metabolism, mortality
    pred: [
      function () {
        return slideBlock(
          'Event 3', 'Predation and metabolism',
          'Each predator scans its 3×3 neighborhood (specialists skip cells outside their biome). For edible prey, a Bernoulli trial uses <code>genHunt</code> or <code>specHunt</code>. A successful hunt marks prey dead and credits <code>genEnergy</code> or <code>specEnergy</code>. Every predator then pays a per-tick energy cost; if energy falls to the starvation threshold, the predator dies.',
          '#ef4455'
        );
      },
      function () {
        return slideBlock(
          'Event 5', 'Natural mortality',
          'Independent Bernoulli checks remove agents using <code>preyMort</code>, <code>genMort</code>, and <code>specMort</code> so background death competes with predation.',
          '#f5a623'
        );
      }
    ],

    // Environmental Shocks → shock event
    shocks: [
      function () {
        return slideBlock(
          'Event 7', 'Environmental shocks (auto mode)',
          'When the Auto shock toggle is enabled, each tick may trigger a shock with probability <code>shockProb</code>. One to three biomes are chosen at random; surviving agents inside them face an additional Bernoulli kill with severity <code>shockSev</code>.',
          '#ff9800'
        );
      }
    ],

    // Random Number Generation → end-of-tick cleanup
    rng: [
      function () {
        return slideBlock(
          'Event 8', 'Cleanup, history, and rendering',
          'Dead agents are filtered out, counts are logged for extinction messages, time series are appended, and the SVG surface plus Plotly charts refresh. The scheduler queues the next tick unless <code>maxTicks</code> is reached or both predator populations are gone.',
          '#8899af'
        );
      }
    ]
  };

  /**
   * Return the HTML for event slides belonging to a given section.
   * Called from dc_render.js inside the section loop.
   * @param {string} sectionId  e.g. 'world', 'init', 'prey', etc.
   * @returns {string} HTML string (empty if no slides for this section)
   */
  function renderModelDocSlides(sectionId) {
    var builders = SECTION_SLIDES[sectionId];
    if (!builders || !builders.length) return '';

    var parts = [];
    parts.push('<div class="md-slide-deck" aria-label="Simulation events — ' + esc(sectionId) + '">');
    for (var i = 0; i < builders.length; i++) {
      parts.push(builders[i]());
    }
    parts.push('</div>');
    return parts.join('');
  }

  global.renderModelDocSlides = renderModelDocSlides;
})(typeof window !== 'undefined' ? window : this);
