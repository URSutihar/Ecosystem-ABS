// ═══════════════════════════════════════════════════════════════
//  DATA COLLECTION & MANIPULATION — RENDER
//  Builds the header, pipeline diagram, and parameter sections.
// ═══════════════════════════════════════════════════════════════

// ── Utility ──────────────────────────────────────────────────────
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function teamById(id) {
  for (var i = 0; i < TEAM.length; i++) { if (TEAM[i].id === id) return TEAM[i]; }
  return null;
}
function findPerson(id) {
  var m = teamById(id);
  if (m) return m;
  if (typeof INSTRUCTOR !== 'undefined' && INSTRUCTOR.id === id) return INSTRUCTOR;
  return null;
}

// ── Type badge colours ────────────────────────────────────────────
var TYPE_COLORS = {
  structure:  '#60a5fa',
  synthesis:  '#2dd4a0',
  parameters: '#f5a623',
  method:     '#a78bfa'
};
var TYPE_LABELS = {
  structure:  'World Structure',
  synthesis:  'Data Synthesis',
  parameters: 'Parameters',
  method:     'Method'
};

// ── Avatar ────────────────────────────────────────────────────────
function avatarHtml(member) {
  var imgPath = TEAM_IMG_PATH + member.id + '.jpg';
  return '<span class="avatar" style="background-color:' + member.color + ';--avatar-color:' + member.color + ';" ' +
         'title="' + esc(member.name) + '" ' +
         'onclick="event.stopPropagation();showAvatarPopover(\'' + esc(member.id) + '\',this)">' +
           '<span class="av-initials">' + esc(member.initials) + '</span>' +
           '<img class="av-photo" src="' + esc(imgPath) + '" alt="" ' +
                'onerror="this.remove()" ' +
                'onload="this.previousElementSibling.style.visibility=\'hidden\'">' +
         '</span>';
}

// ── Header ────────────────────────────────────────────────────────
function renderHeader() {
  var teamEl = document.getElementById('team-strip');
  if (teamEl) {
    var html = '<span class="pm-team-label">Team</span>';
    for (var i = 0; i < TEAM.length; i++) {
      var m = TEAM[i];
      var sid = m.studentId ? '<span class="pm-team-student-id">' + esc(m.studentId) + '</span>' : '';
      html += '<span class="pm-team-item">' + avatarHtml(m) +
        '<span class="pm-team-item-text"><span class="pm-team-name">' + esc(m.name) + '</span>' + sid + '</span></span>';
    }
    teamEl.innerHTML = html;
  }
  var instrEl = document.getElementById('instructor-strip');
  if (instrEl && typeof INSTRUCTOR !== 'undefined') {
    instrEl.innerHTML =
      '<span class="pm-team-label">Instructor</span>' +
      '<span class="pm-team-item">' + esc(INSTRUCTOR.name) + avatarHtml(INSTRUCTOR) + '</span>';
  }
}

// ── Pipeline diagram (SVG) ────────────────────────────────────────
function renderPipeline() {
  var el = document.getElementById('pipeline');
  if (!el) return;

  var steps = PIPELINE;
  var W = 820, H = 90;
  var boxW = 120, boxH = 52, gap = (W - steps.length * boxW) / (steps.length + 1);
  var arrowLen = gap - 4;
  var cy = H / 2;

  var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" ' +
            'style="width:100%;max-width:' + W + 'px;height:auto;display:block;margin:0 auto;">';

  for (var i = 0; i < steps.length; i++) {
    var x = gap + i * (boxW + gap);
    var s = steps[i];
    var col = s.color;

    // Box
    svg += '<rect x="' + x + '" y="' + (cy - boxH / 2) + '" width="' + boxW + '" height="' + boxH + '" ' +
           'rx="8" fill="' + col + '1a" stroke="' + col + '66" stroke-width="1.5"/>';

    // Label (split on \n)
    var lines = s.label.split('\n');
    var lineH = 14;
    var yStart = cy - (lines.length - 1) * lineH / 2;
    for (var l = 0; l < lines.length; l++) {
      svg += '<text x="' + (x + boxW / 2) + '" y="' + (yStart + l * lineH) + '" ' +
             'text-anchor="middle" dominant-baseline="middle" ' +
             'font-family="system-ui,sans-serif" font-size="11" font-weight="600" fill="' + col + '">' +
             esc(lines[l]) + '</text>';
    }

    // Arrow to next
    if (i < steps.length - 1) {
      var ax = x + boxW + 4;
      var ax2 = ax + arrowLen - 8;
      svg += '<line x1="' + ax + '" y1="' + cy + '" x2="' + ax2 + '" y2="' + cy + '" ' +
             'stroke="#8899af" stroke-width="1.5" marker-end="url(#arr)"/>';
    }
  }

  // Arrow marker
  svg += '<defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">' +
         '<path d="M0,0 L0,6 L8,3 z" fill="#8899af"/></marker></defs>';
  svg += '</svg>';

  el.innerHTML = svg;
}

// ── Biome table ────────────────────────────────────────────────────
function renderBiomeTable() {
  var el = document.getElementById('biome-table');
  if (!el || typeof BIOMES === 'undefined') return;
  var html = '<table class="param-table"><thead><tr>' +
    '<th>Biome</th><th>ID</th><th>Grid columns</th><th>Prey species (4)</th><th>Specialist predator</th>' +
    '</tr></thead><tbody>';
  for (var i = 0; i < BIOMES.length; i++) {
    var b = BIOMES[i];
    html += '<tr>' +
      '<td><span class="biome-dot" style="background:' + esc(b.color) + '"></span>' + esc(b.name) + '</td>' +
      '<td class="mono">' + esc(b.id) + '</td>' +
      '<td class="mono">' + esc(b.xCols) + '</td>' +
      '<td style="font-size:0.78rem;color:var(--text-muted)">' + esc(b.species) + '</td>' +
      '<td>' + esc(b.predator) + '</td>' +
      '</tr>';
  }
  html += '</tbody></table>';
  el.innerHTML = html;
}

// ── Sections ──────────────────────────────────────────────────────
function buildParamTable(params, two_col) {
  if (!params || !params.length) return '';
  var html = '<table class="param-table"><thead><tr>';
  if (two_col) {
    html += '<th>Parameter</th><th>Symbol</th><th>Generalist</th><th>Specialist</th><th>Distribution</th><th>Rationale</th>';
  } else {
    html += '<th>Parameter</th><th>Symbol</th><th>Default&nbsp;value</th><th>Distribution</th><th>Rationale</th>';
  }
  html += '</tr></thead><tbody>';
  for (var i = 0; i < params.length; i++) {
    var p = params[i];
    html += '<tr>';
    html += '<td>' + esc(p.name) + '</td>';
    html += '<td class="mono">' + esc(p.symbol) + '</td>';
    if (two_col) {
      html += '<td class="mono val">' + esc(p.value_gen) + '</td>';
      html += '<td class="mono val">' + esc(p.value_spec) + '</td>';
    } else {
      html += '<td class="mono val">' + esc(p.value) + '</td>';
    }
    html += '<td class="dist">' + esc(p.dist) + '</td>';
    html += '<td class="rat">' + esc(p.rationale) + '</td>';
    html += '</tr>';
  }
  html += '</tbody></table>';
  return html;
}

function renderSections() {
  var el = document.getElementById('sections');
  if (!el) return;
  var html = '';

  for (var i = 0; i < SECTIONS.length; i++) {
    var s = SECTIONS[i];
    var col = TYPE_COLORS[s.type] || '#888';
    var label = TYPE_LABELS[s.type] || s.type;

    html += '<section class="dc-section" id="sec-' + esc(s.id) + '">';
    html += '<div class="dc-sec-header" style="border-left-color:' + col + ';">';
    html += '<span class="dc-badge" style="background:' + col + '22;color:' + col + ';">' + esc(label) + '</span>';
    html += '<h2 class="dc-sec-title">' + esc(s.title) + '</h2>';
    html += '</div>';

    html += '<div class="dc-sec-body">';
    if (s.intro) html += '<p class="dc-intro">' + esc(s.intro) + '</p>';

    // Biome table slot (section 1 only)
    if (s.id === 'world') html += '<div id="biome-table" class="dc-biome-wrap"></div>';

    // Code block (RNG section)
    if (s.code) {
      html += '<div class="dc-code-wrap"><pre class="dc-code">' + esc(s.code) + '</pre></div>';
    }

    // Parameter table
    if (s.params && s.params.length) {
      html += buildParamTable(s.params, s.table2col);
    }

    // Model documentation page: per-section event slides (after the table)
    if (typeof renderModelDocSlides === 'function') {
      html += renderModelDocSlides(s.id);
    }

    html += '</div></section>';
  }

  el.innerHTML = html;
  renderBiomeTable();
}

// ── Avatar Popover ────────────────────────────────────────────────
var _popoverId = null;

function buildPopoverHtml(person) {
  var imgPath = TEAM_IMG_PATH + person.id + '.jpg';
  var ICON_LINKEDIN =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">' +
    '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' +
    '</svg>';
  var ICON_WEBSITE =
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>' +
    '<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' +
    '</svg>';

  var html =
    '<div class="av-pop-close" onclick="hideAvatarPopover()" title="Close">✕</div>' +
    '<div class="av-pop-top">' +
      '<div class="av-pop-img" style="background-color:' + person.color + ';">' +
        '<span class="av-initials">' + esc(person.initials) + '</span>' +
        '<img class="av-photo" src="' + esc(imgPath) + '" alt="" ' +
             'onerror="this.remove()" ' +
             'onload="this.previousElementSibling.style.visibility=\'hidden\'">' +
      '</div>' +
      '<div class="av-pop-info">' +
        '<div class="av-pop-name">' + esc(person.name) + '</div>' +
        (person.role       ? '<div class="av-pop-meta">' + esc(person.role)       + '</div>' : '') +
        (person.university ? '<div class="av-pop-meta">' + esc(person.university) + '</div>' : '') +
        (person.course     ? '<div class="av-pop-meta av-pop-course">' + esc(person.course) + '</div>' : '') +
      '</div>' +
    '</div>';

  var links = [];
  if (person.linkedin) links.push('<a href="' + esc(person.linkedin) + '" target="_blank" class="av-pop-link av-pop-linkedin" title="LinkedIn">' + ICON_LINKEDIN + '</a>');
  if (person.website)  links.push('<a href="' + esc(person.website)  + '" target="_blank" class="av-pop-link av-pop-website"  title="Website">'  + ICON_WEBSITE  + '</a>');
  if (links.length) html += '<div class="av-pop-links">' + links.join('') + '</div>';
  return html;
}

function showAvatarPopover(id, el) {
  var popover = document.getElementById('avatar-popover');
  if (!popover) return;
  if (_popoverId === id && popover.style.display === 'block') { hideAvatarPopover(); return; }
  _popoverId = id;
  var person = findPerson(id);
  if (!person) return;
  popover.innerHTML = buildPopoverHtml(person);
  popover.style.display = 'block';
  popover.style.borderColor = person.color + '66';
  var rect = el.getBoundingClientRect();
  var pw = 248;
  var left = rect.left + rect.width / 2 - pw / 2;
  var top  = rect.bottom + 8;
  left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
  if (top + 220 > window.innerHeight) top = rect.top - 220 - 8;
  popover.style.left = left + 'px';
  popover.style.top  = top  + 'px';
}

function hideAvatarPopover() {
  var p = document.getElementById('avatar-popover');
  if (p) p.style.display = 'none';
  _popoverId = null;
}

document.addEventListener('click', function(e) {
  var p = document.getElementById('avatar-popover');
  if (!p || p.style.display !== 'block') return;
  if (!p.contains(e.target)) hideAvatarPopover();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var popover = document.getElementById('avatar-popover');
    if (popover && popover.style.display === 'block') { hideAvatarPopover(); return; }
  }
});

// ── Boot ──────────────────────────────────────────────────────────
window.addEventListener('load', function() {
  renderHeader();
  renderPipeline();
  renderSections();
});
