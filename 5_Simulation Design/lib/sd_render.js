// ═══════════════════════════════════════════════════════════════
//  SIMULATION DESIGN — Render
// ═══════════════════════════════════════════════════════════════

var UML_FONT = 'system-ui,-apple-system,sans-serif';

// ── Utility ──────────────────────────────────────────────────────
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function findPerson(id) {
  for (var i = 0; i < TEAM.length; i++) if (TEAM[i].id === id) return TEAM[i];
  if (typeof INSTRUCTOR !== 'undefined' && INSTRUCTOR.id === id) return INSTRUCTOR;
  return null;
}

// ── Avatar ────────────────────────────────────────────────────────
function avatarHtml(member) {
  var imgPath = TEAM_IMG_PATH + member.id + '.jpg';
  return '<span class="avatar" style="background-color:' + member.color + ';--avatar-color:' + member.color + ';" ' +
         'title="' + esc(member.name) + '" ' +
         'onclick="event.stopPropagation();showAvatarPopover(\'' + esc(member.id) + '\',this)">' +
           '<span class="av-initials">' + esc(member.initials) + '</span>' +
           '<img class="av-photo" src="' + esc(imgPath) + '" alt="" ' +
                'onerror="this.remove()" onload="this.previousElementSibling.style.visibility=\'hidden\'">' +
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

// ── Predator diff table ───────────────────────────────────────────
function renderPredDiffTable() {
  var el = document.getElementById('pred-diff');
  if (!el || typeof PRED_DIFF === 'undefined') return;
  var html = '<table class="sd-table"><thead><tr>' +
    '<th>Parameter</th><th>Symbol</th><th>Generalist</th><th>Specialist</th><th>Notes</th>' +
    '</tr></thead><tbody>';
  for (var i = 0; i < PRED_DIFF.length; i++) {
    var r = PRED_DIFF[i];
    html += '<tr><td>' + esc(r.param) + '</td><td class="mono">' + esc(r.symbol) + '</td>' +
            '<td class="val gen">' + esc(r.gen) + '</td><td class="val spec">' + esc(r.spec) + '</td>' +
            '<td class="muted">' + esc(r.note) + '</td></tr>';
  }
  html += '</tbody></table>';
  el.innerHTML = html;
}

// ── Rules grid ────────────────────────────────────────────────────
function renderRules() {
  var el = document.getElementById('rules-grid');
  if (!el || typeof RULES === 'undefined') return;
  var html = '<div class="sd-rule-grid">';
  for (var i = 0; i < RULES.length; i++) {
    var r = RULES[i];
    html += '<div class="sd-rule-card"><div class="sd-rule-num">' + (i + 1) + '</div>' +
            '<div><div class="sd-rule-title">' + esc(r.title) + '</div>' +
            '<p class="sd-rule-body">' + esc(r.rationale) + '</p></div></div>';
  }
  html += '</div>';
  el.innerHTML = html;
}

// ── Avatar Popover ────────────────────────────────────────────────
var _popoverId = null;

function buildPopoverHtml(person) {
  var imgPath = TEAM_IMG_PATH + person.id + '.jpg';
  var ICON_LI = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';
  var ICON_WB = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
  var html =
    '<div class="av-pop-close" onclick="hideAvatarPopover()" title="Close">✕</div>' +
    '<div class="av-pop-top">' +
      '<div class="av-pop-img" style="background-color:' + person.color + ';position:relative;overflow:hidden;">' +
        '<span class="av-initials">' + esc(person.initials) + '</span>' +
        '<img class="av-photo" src="' + esc(imgPath) + '" alt="" ' +
             'onerror="this.remove()" onload="this.previousElementSibling.style.visibility=\'hidden\'">' +
      '</div>' +
      '<div class="av-pop-info">' +
        '<div class="av-pop-name">' + esc(person.name) + '</div>' +
        (person.university ? '<div class="av-pop-meta">' + esc(person.university) + '</div>' : '') +
        (person.course     ? '<div class="av-pop-meta av-pop-course">' + esc(person.course.replace('\n',' · ')) + '</div>' : '') +
      '</div>' +
    '</div>';
  var links = [];
  if (person.linkedin) links.push('<a href="' + esc(person.linkedin) + '" target="_blank" class="av-pop-link av-pop-linkedin" title="LinkedIn">' + ICON_LI + '</a>');
  if (person.website)  links.push('<a href="' + esc(person.website)  + '" target="_blank" class="av-pop-link av-pop-website"  title="Website">'  + ICON_WB + '</a>');
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
  var rect = el.getBoundingClientRect(), pw = 248;
  var left = Math.max(8, Math.min(rect.left + rect.width / 2 - pw / 2, window.innerWidth - pw - 8));
  var top  = rect.bottom + 8;
  if (top + 240 > window.innerHeight) top = rect.top - 248;
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
  if (p && p.style.display === 'block' && !p.contains(e.target)) hideAvatarPopover();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var p = document.getElementById('avatar-popover');
    if (p && p.style.display === 'block') hideAvatarPopover();
  }
});

// ── Boot ──────────────────────────────────────────────────────────
window.addEventListener('load', function() {
  renderHeader();
  renderRules();
  renderPredDiffTable();
});
