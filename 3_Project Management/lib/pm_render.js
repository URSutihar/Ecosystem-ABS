// ═══════════════════════════════════════════════════════════════
//  PROJECT MANAGEMENT — RENDER
//  Builds the vertical timeline, stage cards, Gantt, and avatar popovers.
// ═══════════════════════════════════════════════════════════════

// ── Utility ─────────────────────────────────────────────
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function teamById(id) {
  for (var i = 0; i < TEAM.length; i++) { if (TEAM[i].id === id) return TEAM[i]; }
  return null;
}

// Find person in either TEAM or INSTRUCTOR
function findPerson(id) {
  var m = teamById(id);
  if (m) return m;
  if (typeof INSTRUCTOR !== 'undefined' && INSTRUCTOR.id === id) return INSTRUCTOR;
  return null;
}

function weekRange(s, e) {
  return (s === e) ? 'Week ' + s : 'Weeks ' + s + '–' + e;
}

// SVG chevron icon (V shape, 18×18)
var CHEVRON_SVG =
  '<svg class="card-chevron" viewBox="0 0 24 24" width="18" height="18" ' +
      'fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="6 9 12 15 18 9"/>' +
  '</svg>';

// ── Avatar element ───────────────────────────────────────
function avatarHtml(member, opts) {
  opts = opts || {};
  var lg = opts.lg ? ' lg' : '';
  var imgPath = TEAM_IMG_PATH + member.id + '.jpg';
  return '<span class="avatar' + lg + '" style="background-color:' + member.color + ';--avatar-color:' + member.color + ';" ' +
         'title="' + esc(member.name) + '" ' +
         'onclick="event.stopPropagation();showAvatarPopover(\'' + esc(member.id) + '\',this)">' +
           '<span class="av-initials">' + esc(member.initials) + '</span>' +
           '<img class="av-photo" src="' + esc(imgPath) + '" alt="" ' +
                'onerror="this.remove()" ' +
                'onload="this.previousElementSibling.style.visibility=\'hidden\'">' +
         '</span>';
}

function avatarRowHtml(ids) {
  var out = '<span class="avatar-row">';
  for (var i = 0; i < ids.length; i++) {
    var m = teamById(ids[i]);
    if (m) out += avatarHtml(m);
  }
  return out + '</span>';
}

// ── Header strips ────────────────────────────────────────
function renderTeamStrip() {
  var el = document.getElementById('team-strip');
  if (!el) return;
  var html = '<span class="pm-team-label">Team</span>';
  for (var i = 0; i < TEAM.length; i++) {
    var m = TEAM[i];
    var sid = m.studentId ? '<span class="pm-team-student-id">' + esc(m.studentId) + '</span>' : '';
    html += '<span class="pm-team-item">' + avatarHtml(m) +
      '<span class="pm-team-item-text"><span class="pm-team-name">' + esc(m.name) + '</span>' + sid + '</span></span>';
  }
  el.innerHTML = html;
}

function renderInstructorStrip() {
  var el = document.getElementById('instructor-strip');
  if (!el || typeof INSTRUCTOR === 'undefined') return;
  el.innerHTML =
    '<span class="pm-team-label">Instructor</span>' +
    '<span class="pm-team-item">' + esc(INSTRUCTOR.name) + avatarHtml(INSTRUCTOR) + '</span>';
}

// ── Legend ───────────────────────────────────────────────
function renderLegend() {
  var el = document.getElementById('legend');
  if (!el) return;
  var html = '';
  for (var k in TYPE_LABELS) {
    html += '<span><span class="legend-dot" style="background:' + TYPE_COLORS[k] + '"></span>' +
            esc(TYPE_LABELS[k]) + '</span>';
  }
  html += '<span style="margin-left:auto;font-size:0.76rem;">Click card to expand &nbsp;·&nbsp; ← → keys to navigate &nbsp;·&nbsp; Esc to collapse all</span>';
  el.innerHTML = html;
}

// ── Timeline ─────────────────────────────────────────────
function renderTimeline() {
  var host = document.getElementById('timeline');
  if (!host) return;
  var html = '';
  for (var i = 0; i < STAGES.length; i++) {
    var s = STAGES[i];
    var side  = (i % 2 === 0) ? 'left' : 'right';
    var color = TYPE_COLORS[s.type] || '#888';

    var bodyHtml = '<div class="card-body"><div class="card-body-inner">' +
                   '<div class="card-details">' + esc(s.details) + '</div>';

    if (s.ideas && s.ideas.length) {
      bodyHtml += '<div class="card-section-label">Key decisions &amp; ideas generated</div>' +
                  '<ul class="card-ideas">';
      for (var j = 0; j < s.ideas.length; j++) bodyHtml += '<li>' + esc(s.ideas[j]) + '</li>';
      bodyHtml += '</ul>';
    }

    if (s.artefacts && s.artefacts.length) {
      bodyHtml += '<div class="card-section-label">Artefacts</div><div class="card-artefacts">';
      for (var k = 0; k < s.artefacts.length; k++) {
        var a = s.artefacts[k];
        if (a.type === 'image') {
          bodyHtml += '<div class="artefact">' +
            '<img src="' + esc(a.src) + '" alt="' + esc(a.caption || '') + '">' +
            (a.caption ? '<div class="artefact-caption">' + esc(a.caption) + '</div>' : '') +
            '</div>';
        }
      }
      bodyHtml += '</div>';
    }
    bodyHtml += '</div></div>';

    html +=
      '<div class="stage ' + side + '" data-idx="' + i + '">' +
        '<div class="stage-node" style="border-color:' + color + '"></div>' +
        '<div class="stage-week">' + esc(weekRange(s.actualWeekStart, s.actualWeekEnd)) + '</div>' +
        '<div class="card" style="border-color:' + color + '33;" data-color="' + esc(color) + '" onclick="toggleCard(' + i + ')">' +
          '<div class="card-head"><div class="card-head-main">' +
            '<div>' +
              '<span class="card-type" style="background:' + color + '22;color:' + color + ';">' + esc(TYPE_LABELS[s.type] || s.type) + '</span>' +
              '<span class="card-title">' + esc(s.title) + '</span>' +
            '</div>' +
            '<div class="card-summary">' + esc(s.summary) + '</div>' +
            '<div class="card-meta">' +
              (s.contributors && s.contributors.length ? avatarRowHtml(s.contributors) : '') +
              CHEVRON_SVG +
            '</div>' +
          '</div></div>' +
          bodyHtml +
        '</div>' +
      '</div>';
  }
  host.innerHTML = html;
}

// ── Card toggle (multiple open allowed) ──────────────────
var _navIdx = -1;   // -1 = nothing navigated yet via keyboard

function toggleCard(idx) {
  _navIdx = idx;    // sync keyboard cursor to the card that was just interacted with
  var stages = document.querySelectorAll('.stage');
  var stage = stages[idx];
  if (!stage) return;
  var card = stage.querySelector('.card');
  if (!card) return;

  var expanding = !card.classList.contains('expanded');
  card.classList.toggle('expanded');
  var color = card.getAttribute('data-color') || '#888';
  card.style.borderColor = expanding ? color : (color + '33');

  if (expanding) {
    setTimeout(function() {
      stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

// ── Keyboard navigation ──────────────────────────────────
document.addEventListener('keydown', function(e) {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

  // Escape: close popover first; second Esc collapses all cards
  if (e.key === 'Escape') {
    var popover = document.getElementById('avatar-popover');
    if (popover && popover.style.display === 'block') { hideAvatarPopover(); return; }
    document.querySelectorAll('.stage .card.expanded').forEach(function(c) {
      c.classList.remove('expanded');
      c.style.borderColor = (c.getAttribute('data-color') || '#888') + '33';
    });
    _navIdx = -1;
    return;
  }

  var dir = 0;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  dir = +1;
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    dir = -1;
  if (!dir) return;
  e.preventDefault();

  // Compute next index — NO wrap-around, clamp to [0, last]
  var next;
  if (_navIdx < 0) {
    next = 0;   // First press always starts at card 0 regardless of direction
  } else {
    next = _navIdx + dir;
    if (next < 0)              next = 0;
    if (next >= STAGES.length) next = STAGES.length - 1;
  }

  // If already at boundary and direction pushes past it, do nothing
  if (next === _navIdx && _navIdx >= 0) return;

  _navIdx = next;

  // Open the card — arrow keys only open, never toggle-close
  var stages = document.querySelectorAll('.stage');
  var stage = stages[next];
  if (!stage) return;
  var card = stage.querySelector('.card');
  if (!card) return;

  if (!card.classList.contains('expanded')) {
    card.classList.add('expanded');
    card.style.borderColor = card.getAttribute('data-color') || '#888';
  }
  stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ── Avatar Popover ───────────────────────────────────────
var _popoverId = null;

function buildPopoverHtml(person) {
  var imgPath = TEAM_IMG_PATH + person.id + '.jpg';
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

  var ICON_LINKEDIN =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136' +
      ' 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601' +
      ' 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064' +
      ' 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0' +
      ' 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774' +
      ' 23.2 0 22.222 0h.003z"/>' +
    '</svg>';
  var ICON_WEBSITE =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="10"/>' +
      '<line x1="2" y1="12" x2="22" y2="12"/>' +
      '<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' +
    '</svg>';

  var links = [];
  if (person.linkedin) links.push('<a href="' + esc(person.linkedin) + '" target="_blank" class="av-pop-link av-pop-linkedin" title="LinkedIn">' + ICON_LINKEDIN + '</a>');
  if (person.website)  links.push('<a href="' + esc(person.website)  + '" target="_blank" class="av-pop-link av-pop-website"  title="Website">'  + ICON_WEBSITE  + '</a>');
  if (links.length) html += '<div class="av-pop-links">' + links.join('') + '</div>';

  return html;
}

function showAvatarPopover(id, el) {
  var popover = document.getElementById('avatar-popover');
  if (!popover) return;

  // Toggle off if same avatar clicked again
  if (_popoverId === id && popover.style.display === 'block') {
    hideAvatarPopover();
    return;
  }
  _popoverId = id;

  var person = findPerson(id);
  if (!person) return;

  popover.innerHTML = buildPopoverHtml(person);
  popover.style.display = 'block';
  popover.style.borderColor = person.color + '66';

  // Position: below the avatar, clamped to viewport
  var rect = el.getBoundingClientRect();
  var pw = 248;   // popover width (matches CSS)
  var left = rect.left + rect.width / 2 - pw / 2;
  var top  = rect.bottom + 8;

  // Clamp horizontally
  left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
  // If would overflow bottom, flip above
  if (top + 220 > window.innerHeight) top = rect.top - 220 - 8;

  popover.style.left = left + 'px';
  popover.style.top  = top  + 'px';
}

function hideAvatarPopover() {
  var p = document.getElementById('avatar-popover');
  if (p) p.style.display = 'none';
  _popoverId = null;
}

// Close popover when clicking outside of it
document.addEventListener('click', function(e) {
  var p = document.getElementById('avatar-popover');
  if (!p || p.style.display !== 'block') return;
  if (!p.contains(e.target)) hideAvatarPopover();
});

// ── Gantt chart (Plotly) ────────────────────────────────
function renderGantt() {
  if (window.matchMedia('(max-width: 700px)').matches) {
    renderMobileGantt();
    return;
  }

  if (typeof Plotly === 'undefined') return;

  var yLabels = [], plannedBase = [], plannedDur = [],
      actualBase = [], actualDur = [], actualColors = [], hoverTexts = [];

  for (var i = STAGES.length - 1; i >= 0; i--) {
    var s = STAGES[i];
    yLabels.push((i + 1) + '. ' + s.title);
    plannedBase.push(s.plannedWeekStart);
    plannedDur.push(Math.max(0.4, s.plannedWeekEnd - s.plannedWeekStart + 1));
    actualBase.push(s.actualWeekStart);
    actualDur.push(Math.max(0.4, s.actualWeekEnd - s.actualWeekStart + 1));
    actualColors.push(TYPE_COLORS[s.type] || '#888');

    var names = (s.contributors || []).map(function(id) {
      var m = teamById(id); return m ? m.initials : id;
    }).join(', ');
    hoverTexts.push('<b>' + s.title + '</b>' +
      '<br>Planned: ' + weekRange(s.plannedWeekStart, s.plannedWeekEnd) +
      '<br>Actual: '  + weekRange(s.actualWeekStart,  s.actualWeekEnd) +
      (names ? '<br>Team: ' + names : ''));
  }

  var shapes = [];
  for (var w = 1; w <= 15; w++) shapes.push({
    type:'line', xref:'x', yref:'paper', x0:w, x1:w, y0:0, y1:1,
    line:{ color:'#1c2536', width:1, dash:'dot' }
  });

  Plotly.newPlot('gantt-chart', [
    { type:'bar', orientation:'h', y:yLabels, x:plannedDur, base:plannedBase,
      name:'Planned', hoverinfo:'skip', width:0.35, offset:0.05,
      marker:{ color:'rgba(136,153,175,0.12)', line:{color:'#8899af',width:1} } },
    { type:'bar', orientation:'h', y:yLabels, x:actualDur, base:actualBase,
      name:'Actual',  text:hoverTexts, hoverinfo:'text', width:0.35, offset:-0.4,
      marker:{ color:actualColors, line:{color:'#0a0e14',width:1}, opacity:0.85 } }
  ], {
    paper_bgcolor:'#111822', plot_bgcolor:'#111822',
    font:{ color:'#8899af', size:11 },
    margin:{ t:20, r:30, b:60, l:260 },
    barmode:'overlay', bargap:0.25, shapes:shapes,
    xaxis:{ title:'Term 6 Weeks', range:[0.5,15], tickmode:'array',
      tickvals:[1,2,3,4,5,6,7,8,9,10,11,12,13,14],
      ticktext:['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12','W13','W14'],
      gridcolor:'#1c2536', zerolinecolor:'#1c2536' },
    yaxis:{ autorange:true, automargin:true,
      gridcolor:'rgba(0,0,0,0)', zerolinecolor:'rgba(0,0,0,0)' },
    legend:{ orientation:'h', x:0.5, xanchor:'center', y:1.05, bgcolor:'rgba(0,0,0,0)' },
    showlegend:true
  }, { displayModeBar:false, responsive:true });
}

function renderMobileGantt() {
  var host = document.getElementById('gantt-chart');
  if (!host) return;
  var maxWeek = 14;
  var html = '<div class="gantt-mobile" aria-label="Planned and actual project timeline">' +
    '<div class="gantt-mobile-legend"><span class="gantt-mobile-key"><i></i> Planned</span>' +
    '<span class="gantt-mobile-key"><i class="actual"></i> Actual</span></div>';

  for (var i = 0; i < STAGES.length; i++) {
    var s = STAGES[i];
    var plannedLeft = ((s.plannedWeekStart - 1) / maxWeek) * 100;
    var plannedWidth = ((s.plannedWeekEnd - s.plannedWeekStart + 1) / maxWeek) * 100;
    var actualLeft = ((s.actualWeekStart - 1) / maxWeek) * 100;
    var actualWidth = ((s.actualWeekEnd - s.actualWeekStart + 1) / maxWeek) * 100;
    var color = TYPE_COLORS[s.type] || '#f5a623';

    html += '<div class="gantt-mobile-row">' +
      '<div class="gantt-mobile-title">' + (i + 1) + '. ' + esc(s.title) +
      ' <span>Plan ' + esc(weekRange(s.plannedWeekStart, s.plannedWeekEnd)) +
      ' · Actual ' + esc(weekRange(s.actualWeekStart, s.actualWeekEnd)) + '</span></div>' +
      '<div class="gantt-mobile-track">' +
        '<i class="gantt-mobile-bar planned" style="left:' + plannedLeft + '%;width:' + plannedWidth + '%"></i>' +
        '<i class="gantt-mobile-bar actual" style="left:' + actualLeft + '%;width:' + actualWidth + '%;--gantt-color:' + color + '"></i>' +
      '</div></div>';
  }
  host.innerHTML = html + '</div>';
}

// ── Boot ─────────────────────────────────────────────────
window.addEventListener('load', function() {
  renderTeamStrip();
  renderInstructorStrip();
  renderLegend();
  renderTimeline();
  renderGantt();
});

window.addEventListener('resize', function() {
  var host = document.getElementById('gantt-chart');
  if (!host) return;
  var mobileMarkup = host.querySelector('.gantt-mobile');
  var shouldUseMobile = window.matchMedia('(max-width: 700px)').matches;
  if ((shouldUseMobile && !mobileMarkup) || (!shouldUseMobile && mobileMarkup)) renderGantt();
});
