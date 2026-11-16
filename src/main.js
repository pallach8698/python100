(function () {
  'use strict';

  var TASKS = window.TASKS;
  var STORE_KEY = 'py100-done';
  var LEVELS = { 1: 'лёгкая', 2: 'средняя', 3: 'сложная' };

  var state = { cat: 'all', q: '' };
  var done = loadDone();
  var currentId = null;

  function loadDone() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveDone() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(done));
    } catch (e) { /* приватный режим — прогресс живёт до закрытия вкладки */ }
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var TOKEN_RE = /(#[^\n]*)|('[^'\n]*'|"[^"\n]*")|\b(import|from|def|return|if|elif|else|while|for|in|not|and|or|break|continue|pass|True|False|None|with|as|try|except|lambda|print|input)\b|(\b\d+(?:\.\d+)?\b)/g;

  function highlight(code) {
    var escaped = escapeHtml(code);
    return escaped.replace(TOKEN_RE, function (m, comment, str, kw, num) {
      if (comment) return '<i class="tok-c">' + comment + '</i>';
      if (str) return '<i class="tok-s">' + str + '</i>';
      if (kw) return '<i class="tok-k">' + kw + '</i>';
      if (num) return '<i class="tok-n">' + num + '</i>';
      return m;
    });
  }

  function renderCode(el, code, maxLines) {
    var lines = highlight(code).split('\n');
    if (maxLines) lines = lines.slice(0, maxLines);
    el.innerHTML = lines.map(function (l) {
      return '<div class="code-line"><span>' + (l || ' ') + '</span></div>';
    }).join('');
  }

  // --- Сетка задач ---
  var grid = document.getElementById('task-grid');

  function filtered() {
    var q = state.q.trim().toLowerCase();
    return TASKS.filter(function (t) {
      if (state.cat !== 'all' && t.cat !== state.cat) return false;
      if (q && t.title.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
  }

  function lineCount(t) {
    return t.code.split('\n').length;
  }

  function renderGrid() {
    var list = filtered();
    if (!list.length) {
      grid.innerHTML = '<div class="empty">Ничего не найдено. Попробуй другое название или сбрось фильтр.</div>';
      return;
    }
    grid.innerHTML = list.map(function (t) {
      var isDone = done.indexOf(t.id) !== -1;
      return '<button class="task-card" type="button" data-id="' + t.id + '" aria-label="Задача ' + t.id + ': ' + escapeHtml(t.title) + '">' +
        '<span class="task-top"><span class="task-num">' + String(t.id).padStart(3, '0') + '</span>' +
        (isDone ? '<span class="task-done" aria-label="выполнено">✓</span>' : '') + '</span>' +
        '<h3>' + escapeHtml(t.title) + '</h3>' +
        '<span class="task-meta"><span class="tag">' + t.cat + '</span>' +
        '<span class="tag tag-level">' + LEVELS[t.level] + '</span>' +
        '<span class="tag">' + lineCount(t) + ' стр.</span></span>' +
        '</button>';
    }).join('');
  }

  function renderProgress() {
    var text = document.getElementById('progress-text');
    var fill = document.getElementById('progress-fill');
    text.textContent = done.length + ' из ' + TASKS.length;
    fill.style.width = (done.length / TASKS.length * 100) + '%';
  }

  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.task-card');
    if (card) openDialog(Number(card.getAttribute('data-id')));
  });

  // --- Фильтры и поиск ---
  document.getElementById('filters').addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    state.cat = chip.getAttribute('data-cat');
    var chips = this.querySelectorAll('.chip');
    for (var i = 0; i < chips.length; i++) chips[i].classList.remove('active');
    chip.classList.add('active');
    renderGrid();
  });

  document.getElementById('search').addEventListener('input', function () {
    state.q = this.value;
    renderGrid();
  });

  // --- Диалог задачи ---
  var overlay = document.getElementById('overlay');
  var closeBtn = document.getElementById('dialog-close');
  var doneBtn = document.getElementById('dialog-done');
  var prevBtn = document.getElementById('dialog-prev');
  var nextBtn = document.getElementById('dialog-next');

  function byId(id) {
    for (var i = 0; i < TASKS.length; i++) if (TASKS[i].id === id) return TASKS[i];
    return null;
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function openDialog(id) {
    var t = byId(id);
    if (!t) return;
    currentId = id;
    document.getElementById('dialog-num').textContent = 'ЗАДАЧА ' + String(t.id).padStart(3, '0') + ' · ' + t.cat.toUpperCase() + ' · ' + LEVELS[t.level].toUpperCase();
    document.getElementById('dialog-title').textContent = t.title;
    document.getElementById('dialog-desc').textContent = t.desc;
    document.getElementById('dialog-learn').innerHTML = 'Здесь ты потренируешь: <code>' + escapeHtml(t.learn) + '</code>';
    document.getElementById('dialog-file').textContent = 'zadacha_' + pad(t.id) + '.py';
    renderCode(document.getElementById('dialog-code'), t.code);
    prevBtn.disabled = id <= 1;
    nextBtn.disabled = id >= TASKS.length;
    renderDoneBtn();
    resetShareBtn();
    overlay.classList.add('open');
    document.body.classList.add('overlay-open');
    if (history.replaceState) history.replaceState(null, '', '#task-' + id);
    closeBtn.focus();
  }

  function closeDialog() {
    overlay.classList.remove('open');
    document.body.classList.remove('overlay-open');
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    currentId = null;
  }

  function renderDoneBtn() {
    var isDone = done.indexOf(currentId) !== -1;
    doneBtn.textContent = isDone ? '✓ Выполнено — отменить отметку' : 'Отметить выполненной';
  }

  doneBtn.addEventListener('click', function () {
    var idx = done.indexOf(currentId);
    if (idx === -1) done.push(currentId); else done.splice(idx, 1);
    saveDone();
    renderDoneBtn();
    renderGrid();
    renderProgress();
  });

  prevBtn.addEventListener('click', function () { if (currentId > 1) openDialog(currentId - 1); });
  nextBtn.addEventListener('click', function () { if (currentId < TASKS.length) openDialog(currentId + 1); });

  closeBtn.addEventListener('click', closeDialog);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeDialog();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeDialog();
  });

  // --- Кнопки «Поделиться» ---
  var SHARE_URL = 'https://pallach8698.github.io/python100/';

  function copyText(text, btn, label, copiedLabel) {
    function confirmCopy() {
      btn.textContent = copiedLabel;
      setTimeout(function () { btn.textContent = label; }, 2000);
    }
    function fallbackCopy() {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* не страшно */ }
      document.body.removeChild(ta);
      confirmCopy();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(confirmCopy, fallbackCopy);
    } else {
      fallbackCopy();
    }
  }

  var shareBtn = document.getElementById('share-btn');
  shareBtn.addEventListener('click', function () {
    copyText(SHARE_URL, shareBtn, 'Поделиться ссылкой', '✓ Ссылка скопирована');
  });

  var dialogShare = document.getElementById('dialog-share');
  function resetShareBtn() {
    dialogShare.textContent = 'Ссылка на задачу';
  }
  dialogShare.addEventListener('click', function () {
    copyText(SHARE_URL + '#task-' + currentId, dialogShare, 'Ссылка на задачу', '✓ Ссылка скопирована');
  });

  // --- Инициализация ---
  renderCode(document.getElementById('hero-code'), TASKS[0].code, 8);
  renderGrid();
  renderProgress();

  // Прямая ссылка на задачу: #task-25 открывает её карточку
  var hashMatch = location.hash.match(/^#task-(\d{1,3})$/);
  if (hashMatch) openDialog(Number(hashMatch[1]));
})();
