/* ═══════════════════════════════════════════════════
   99Test — Motor compartido (tema, menú, quiz, datos)
   ═══════════════════════════════════════════════════ */

/* ─── MANIFIESTO DE TESTS ── */
const TEST_MANIFEST = [
  { id: 0, title: "Ciencias Puras",              folder: "ciencias-puras",              emojis: "🔬🧪📐",      day: "Lunes" },
  { id: 1, title: "Arte y Creatividad",          folder: "arte-y-creatividad",          emojis: "🎨📖🎭",      day: "Martes" },
  { id: 2, title: "Ciencias Sociales",           folder: "ciencias-sociales",           emojis: "🌍📜🏛️",      day: "Miércoles" },
  { id: 3, title: "Tecnología e Innovación",     folder: "tecnologia-e-innovacion",     emojis: "💻🔧🚀",     day: "Jueves" },
  { id: 4, title: "Entretenimiento y Ocio",      folder: "entretenimiento-y-ocio",      emojis: "⚽🍿🎮",      day: "Viernes" },
  { id: 5, title: "Mezcla Explosiva",            folder: "mezcla-explosiva",            emojis: "🔥🧩✨",      day: "Sábado" },
  { id: 6, title: "Mezcla Explosiva",            folder: "mezcla-explosiva",            emojis: "🔥🧩✨",      day: "Domingo" },
];

const STORAGE_KEY = '99test_results';
const EPOCH = new Date(2026, 5, 15); // 15 jun = primer test disponible

/* ─── FECHA ── */
function dateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getTodaysTestId() {
  const today = new Date(); today.setHours(0,0,0,0);
  const e = new Date(EPOCH); e.setHours(0,0,0,0);
  return Math.floor((today - e) / (1000*60*60*24)) % TEST_MANIFEST.length;
}

function formatDateEs(d) {
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const dias = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  return `${dias[d.getDay()]}, ${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── TEMA (claro por defecto) ── */
function initTheme() {
  const saved = localStorage.getItem('99test_theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '🌙';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('99test_theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

/* ─── HEADER ── */
function renderHeader() {
  const h = document.getElementById('headerPlaceholder');
  if (!h) return;
  h.innerHTML = `
    <header class="header">
      <div class="header-logo" id="logoBtn">99Test</div>
      <div class="header-right">
        <button class="theme-btn" id="themeToggle" onclick="toggleTheme()">🌙</button>
        <div class="hamburger" id="hamburgerBtn" onclick="toggleMenu()">
          <span></span><span></span><span></span>
        </div>
      </div>
    </header>
    <div class="nav-overlay" id="navOverlay" onclick="closeMenu()"></div>
    <nav class="side-menu" id="sideMenu">
      <div class="menu-section">Navegación</div>
      <button class="menu-item${isHubPage() ? ' active' : ''}" onclick="goToPage('')">
        <span class="emoji">🏠</span> Inicio
      </button>
      <button class="menu-item" onclick="goToPage('archivo.html')">
        <span class="emoji">📚</span> Tests anteriores
      </button>
      <button class="menu-item" onclick="goToPage('categorias.html')">
        <span class="emoji">🏷️</span> Categorías
      </button>
      <button class="menu-item" onclick="goToPage('tests/especiales/')">
        <span class="emoji">⭐</span> Tests especiales
      </button>
      <button class="menu-item" onclick="goToPage('sobre.html')">
        <span class="emoji">ℹ️</span> Sobre 99Test
      </button>
      <div class="menu-spacer"></div>
      <div class="menu-footer" id="menuFooter">
        🔥 Racha: <strong id="menuStreak">0</strong> días<br>
        <span style="font-size:0.72rem;opacity:0.6">Completados: <span id="menuDone">0</span></span>
      </div>
    </nav>`;

  // Logo click
  document.getElementById('logoBtn').addEventListener('click', () => goToPage(''));

  initTheme();
  updateMenuStats();
}

function isHubPage() {
  return !document.getElementById('isTestPage');
}

function goToPage(path) {
  closeMenu();
  const base = document.querySelector('meta[name="base-path"]')?.content || '.';
  const separator = base === '.' ? '/' : '/';
  location.href = base + separator + path;
}

function updateMenuStats() {
  const r = getResults();
  let streak = calcStreak();
  const s = document.getElementById('menuStreak');
  const d = document.getElementById('menuDone');
  if (s) s.textContent = streak;
  if (d) d.textContent = Object.keys(r).length;
}

/* ─── MENÚ ── */
function closeMenu() {
  document.getElementById('sideMenu')?.classList.remove('open');
  document.getElementById('navOverlay')?.classList.remove('open');
  document.getElementById('hamburgerBtn')?.classList.remove('open');
}

function toggleMenu() {
  ['sideMenu','navOverlay','hamburgerBtn'].forEach(id => {
    document.getElementById(id)?.classList.toggle('open');
  });
}

/* ─── FOOTER ── */
function renderFooter() {
  const el = document.getElementById('footerPlaceholder');
  if (!el) return;
  el.innerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <a class="donate-btn" href="#" id="donateBtn" target="_blank" rel="noopener">
          <span>💛</span> Donar con PayPal
        </a>
        <div class="credit">Desarrollado por <strong>20leunam</strong> © 2026</div>
      </div>
    </footer>`;
  // Donate URL
  const db = document.getElementById('donateBtn');
  if (db) db.href = 'https://paypal.me/20leunam';
}

/* ─── RESULTADOS ── */
function getResults() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}

function saveResult(key, data) {
  const r = getResults();
  r[key] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
}

function calcStreak() {
  const r = getResults();
  const d = new Date(); d.setHours(0,0,0,0);
  const todayKey = dateStr(d);
  if (!r[todayKey]) return 0;
  let streak = 1;
  for (let i = 1; i < 366; i++) {
    const prev = new Date(d); prev.setDate(prev.getDate() - i);
    const k = dateStr(prev);
    if (r[k] && r[k].pct >= 50) streak++;
    else break;
  }
  return streak;
}

/* ═══════════════════════════════════════════════════
   QUIZ ENGINE
   ═══════════════════════════════════════════════════ */

let quizState = null;

function initQuiz(questions, opts = {}) {
  const pool = [...questions];
  const selected = shuffle(pool).slice(0, 10);
  quizState = {
    questions: selected,
    poolSize: pool.length,
    currentIdx: 0,
    score: 0,
    wrong: 0,
    selectedOpt: null,
    revealed: false,
    history: [],
    title: opts.title || 'Test',
    testId: opts.testId !== undefined ? opts.testId : getTodaysTestId(),
  };
  renderQuestion();
}

/* ─── MODO TEST (página individual) ── */
function startTestFromPage() {
  if (typeof QUESTIONS === 'undefined' || !QUESTIONS.length) {
    document.getElementById('app') && (document.getElementById('app').innerHTML =
      '<div class="card"><p style="color:var(--red);text-align:center">Error: no hay preguntas definidas.</p></div>');
    return;
  }
  // Get test info from meta or manifest
  const testId = parseInt(document.querySelector('meta[name="test-id"]')?.content || '0');
  const testTitle = document.querySelector('meta[name="test-title"]')?.content || 'Test';
  const test = TEST_MANIFEST.find(t => t.id === testId);
  const isTodaysTest = testId === getTodaysTestId();

  // Check if already answered today
  if (isTodaysTest) {
    const results = getResults();
    const todayKey = dateStr(new Date());
    if (results[todayKey]) {
      // Already done today
      showDoneToday(results[todayKey], test, testId, QUESTIONS);
      return;
    }
  }

  // Start quiz
  showQuizScreen(testTitle, testId);
  initQuiz(QUESTIONS, { title: testTitle, testId });
}

function showDoneToday(result, test, testId, questions) {
  const app = document.getElementById('app');
  if (!app) return;
  const pct = Math.round((result.correct / result.total) * 100);
  app.innerHTML = `
    <div class="card" style="text-align:center">
      <div class="done-badge" style="display:inline-flex">✅ Completado hoy</div>
      <div class="home-title" style="font-size:1.6rem">${test?.title || 'Test del Día'}</div>
      <div class="home-subtitle">${formatDateEs(new Date())}</div>
      <div style="margin:20px 0">
        <div class="big-num" style="font-family:'Playfair Display';font-size:2.6rem;font-weight:900;
             background:var(--gold-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
          ${result.correct}/${result.total}
        </div>
        <div style="color:var(--text-secondary)">${pct}% — ${result.correct >= 7 ? '¡Buen trabajo!' : 'Sigue practicando'}</div>
        <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:4px">📚 ${questions.length} preguntas en el banco · 10 por partida</div>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary" onclick="location.reload()">🔁 Repetir test</button>
        <button class="btn btn-secondary" onclick="goToPage('')">🏠 Inicio</button>
      </div>
      ${result.correct >= 7 ? '<div style="margin-top:16px;font-size:0.85rem;color:var(--text-secondary)">🔥 Racha: ' + calcStreak() + ' días</div>' : ''}
    </div>`;
}

function showQuizScreen(title, testId) {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    <div class="card" id="quizCard">
      <div class="quiz-header">
        <div class="quiz-progress">
          <span class="quiz-cat-badge" id="qCatBadge">📝</span>
          <span class="quiz-counter" id="qCounter"><strong>1</strong> / <strong>10</strong></span>
        </div>
        <span class="quiz-score-live">🎯 <strong id="qScore">0</strong></span>
      </div>
      <div class="progress-track"><div class="progress-fill" id="qProgress" style="width:0%"></div></div>
      <div class="q-number" id="qNum">PREGUNTA 1</div>
      <div class="q-text" id="qText">—</div>
      <div class="opts" id="qOpts"></div>
      <div class="fb" id="qFb"></div>
      <div class="exp-box" id="qExp" style="display:none"><strong id="qExpCat"></strong> <span id="qExpText"></span></div>
      <div class="btn-row">
        <button class="btn btn-primary" id="qBtn" disabled onclick="handleQAction()">Comprobar</button>
      </div>
    </div>`;
}

function renderQuestion() {
  if (!quizState) return;
  const qs = quizState.questions;
  if (quizState.currentIdx >= qs.length) { showQuizResults(); return; }
  const q = qs[quizState.currentIdx];

  quizState.revealed = false;
  quizState.selectedOpt = null;

  byId('qCatBadge').textContent = q.cat;
  byId('qCounter').innerHTML = `<strong>${quizState.currentIdx+1}</strong> / <strong>${qs.length}</strong> <span style="font-weight:400;opacity:0.6;font-size:0.75rem">· ${quizState.poolSize} en banco</span>`;
  byId('qScore').textContent = quizState.score;
  byId('qProgress').style.width = ((quizState.currentIdx / qs.length) * 100) + '%';
  byId('qNum').textContent = 'PREGUNTA ' + (quizState.currentIdx+1);
  byId('qText').textContent = q.q;
  byId('qFb').textContent = '';
  byId('qFb').className = 'fb';
  byId('qExp').style.display = 'none';

  const letters = ['A','B','C','D'];
  const order = shuffle([0,1,2,3]);
  const container = byId('qOpts');
  container.innerHTML = order.map((oi, i) => `
    <button class="opt-btn" data-idx="${oi}">
      <span class="opt-letter">${letters[i]}</span>
      <span>${q.opts[oi]}</span>
    </button>
  `).join('');

  container.querySelectorAll('.opt-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (quizState.revealed) return;
      container.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      quizState.selectedOpt = parseInt(this.dataset.idx);
      byId('qBtn').disabled = false;
    });
  });

  const btn = byId('qBtn');
  btn.textContent = 'Comprobar';
  btn.disabled = true;
  btn.onclick = handleQAction;
}

function handleQAction() {
  if (!quizState.revealed) { checkQ(); return; }
  quizState.currentIdx++;
  if (quizState.currentIdx >= quizState.questions.length) { showQuizResults(); return; }
  renderQuestion();
}

function checkQ() {
  if (quizState.selectedOpt === null) return;
  const q = quizState.questions[quizState.currentIdx];
  const isCorrect = (quizState.selectedOpt === q.correct);
  quizState.revealed = true;

  if (isCorrect) quizState.score++;
  else quizState.wrong++;
  quizState.history.push({ cat: q.cat, correct: isCorrect });

  // Highlight
  document.querySelectorAll('.opt-btn').forEach(btn => {
    btn.classList.add('locked');
    const idx = parseInt(btn.dataset.idx);
    if (idx === q.correct) btn.classList.add('correct');
    else if (idx === quizState.selectedOpt && !isCorrect) btn.classList.add('incorrect');
  });

  const fb = byId('qFb');
  if (isCorrect) { fb.textContent = '✅ ¡Correcto!'; fb.className = 'fb correct'; }
  else { fb.textContent = '❌ La respuesta era: ' + q.opts[q.correct]; fb.className = 'fb incorrect'; }

  byId('qExpCat').textContent = q.cat;
  byId('qExpText').textContent = q.exp;
  byId('qExp').style.display = 'block';
  byId('qScore').textContent = quizState.score;

  const btn = byId('qBtn');
  btn.textContent = quizState.currentIdx >= quizState.questions.length - 1 ? 'Ver resultados →' : 'Siguiente  →';
  btn.disabled = false;
}

function showQuizResults() {
  const total = quizState.questions.length;
  const correct = quizState.score;
  const pct = Math.round((correct / total) * 100);

  // Save if today's test
  const isTodaysTest = (quizState.testId === getTodaysTestId());
  if (isTodaysTest) {
    saveResult(dateStr(new Date()), { correct, total, pct, testId: quizState.testId });
    updateMenuStats();
  }

  // Grade
  let grade, gColor;
  if (pct >= 90) { grade = '🏆 ¡Excelente! Dominas el tema.'; gColor = 'var(--accent)'; }
  else if (pct >= 70) { grade = '🥇 Muy bien. Sólido conocimiento.'; gColor = 'var(--green)'; }
  else if (pct >= 50) { grade = '🥈 Bien. Un poco más de práctica.'; gColor = '#8b9dc3'; }
  else if (pct >= 30) { grade = '🥉 Hay que repasar. ¡Ánimo!'; gColor = 'var(--red)'; }
  else { grade = '📚 Toca estudiar. ¡Vuelve a intentarlo!'; gColor = 'var(--red)'; }

  // Breakdown
  const breakdown = {};
  quizState.history.forEach(h => {
    if (!breakdown[h.cat]) breakdown[h.cat] = { cat: h.cat, correct: 0, total: 0, emoji: h.cat.split(' ')[0] };
    breakdown[h.cat].total++;
    if (h.correct) breakdown[h.cat].correct++;
  });

  const barColors = {
    '🌍 Geografía':'#5ba0b9','📜 Historia':'#8b9dc3','🔬 Ciencia':'#4caf91',
    '📖 Lengua':'#b491c8','🧠 Curiosidades':'#d4856b','🎨 Arte':'#c9a96e','🧮 Lógica':'#e2c88a'
  };

  const bars = Object.values(breakdown).map(c => {
    const color = barColors[c.cat] || 'var(--accent)';
    const pw = c.total > 0 ? (c.correct/c.total)*100 : 0;
    return `<div class="bar-row">
      <span class="lbl">${c.emoji}</span>
      <div class="track"><div class="fill" style="width:${pw}%;background:${color}"><span>${c.correct}/${c.total}</span></div></div>
    </div>`;
  }).join('');

  const app = byId('app');
  if (!app) return;
  app.innerHTML = `
    <div class="card">
      <div class="results-hero">
        <h2>${isTodaysTest ? '📅 Test del Día' : '📝 ' + quizState.title}</h2>
        <p style="color:${gColor}">${grade}</p>
      </div>
      <div class="score-ring">
        <div class="big-num" style="font-size:2.8rem">${correct}/${total}</div>
        <div class="label">${pct}% de aciertos</div>
        <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px">📚 ${quizState.poolSize} preguntas en banco · 10 por partida</div>
      </div>
      <div class="stats-row">
        <div class="stat-box"><div class="num green">${correct}</div><div class="lbl">Aciertos</div></div>
        <div class="stat-box"><div class="num red">${quizState.wrong}</div><div class="lbl">Fallos</div></div>
        <div class="stat-box"><div class="num gold">${pct}%</div><div class="lbl">Precisión</div></div>
        <div class="stat-box"><div class="num white">${calcStreak()}</div><div class="lbl">Racha 🔥</div></div>
      </div>
      ${bars ? `<div class="breakdown"><h3>📊 Por categoría</h3>${bars}</div>` : ''}
      <div class="btn-row">
        <button class="btn btn-primary" onclick="location.reload()">🔁 Repetir test</button>
        <button class="btn btn-secondary" onclick="goToPage('')">🏠 Inicio</button>
      </div>
    </div>`;

  if (pct >= 70) spawnConfetti();
}

/* ─── CONFETTI ── */
function spawnConfetti() {
  const c = document.getElementById('confettiContainer') || (() => {
    const el = document.createElement('div');
    el.className = 'confetti-container';
    el.id = 'confettiContainer';
    document.body.appendChild(el);
    return el;
  })();
  const colors = ['#c9a96e','#e2c88a','#4caf91','#8b9dc3','#b491c8','#d4856b','#5ba0b9','#e0556a'];
  const pieces = [];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = -(Math.random() * 40 + 10) + 'px';
    el.style.width = (Math.random() * 8 + 4) + 'px';
    el.style.height = (Math.random() * 8 + 4) + 'px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = (Math.random() * 2 + 2) + 's';
    el.style.animationDelay = Math.random() * 1.5 + 's';
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.appendChild(el);
    pieces.push(el);
  }
  setTimeout(() => pieces.forEach(el => el.remove()), 4500);
}

/* ─── UTIL ── */
function byId(id) { return document.getElementById(id); }

/* ─── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();

  // If this is a test page, start the test
  if (document.getElementById('isTestPage')) {
    startTestFromPage();
  }
});
