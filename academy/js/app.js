/* Doofinder Academy — app logic (vanilla JS, no build step, no deps) */

const STORAGE_KEY = COURSE.storageKey || "dfa_progress_v1";
const TOTAL_SECTIONS = COURSE.sections.length;

/* ---------- Persisted progress ---------- */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completed: {} };
  } catch (e) {
    return { completed: {} };
  }
}
function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }

let progress = loadProgress();

/* ---------- Ephemeral runtime state ---------- */
const runtime = {
  view: "course",
  sectionId: 0,
  coursePage: "theory", // "theory" | "quiz" — which page of a section is showing
  activeAnchor: null,   // slug of the heading currently in view, for the doc-links scroll-spy
  quiz: {},         // sectionId -> { stage, index, selected, locked, results:[] }
  exercise: {},     // sectionId -> wizard-exercise runtime state (see ensureExerciseRuntime)
  theoryPage: {}    // sectionId -> index of the theory sub-page currently showing
};

/* ---------- Helpers ---------- */
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function slugify(str) {
  return String(str).replace(/<[^>]+>/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
const ZOOM_BADGE = `<span class="example-caption" title="Click the image to enlarge it" aria-label="Click the image to enlarge it"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="6.5" r="4.5"></circle><line x1="10" y1="10" x2="14" y2="14" stroke-linecap="round"></line></svg></span>`;
function renderWhatsappCard(wa) {
  const bubbles = wa.body.map((p, i) => `
    <div class="whatsapp-msg">
      <p>${p}</p>
      <span class="whatsapp-meta">${(wa.times && wa.times[i]) || ""} <span class="whatsapp-ticks">✓✓</span></span>
    </div>`).join("");
  return `
    <div class="whatsapp-card ${wa.outgoing ? "whatsapp-outgoing" : ""}">
      <div class="whatsapp-head">
        <div class="whatsapp-avatar">${wa.name.split(" ").map(w => w[0]).join("")}</div>
        <div class="whatsapp-name">${wa.name}</div>
      </div>
      <div class="whatsapp-thread">${bubbles}</div>
    </div>`;
}

function renderSlackCard(sl) {
  const msgs = sl.body.map((p, i) => `
    <div class="slack-msg">
      <div class="slack-avatar ${sl.self ? "slack-avatar-self" : ""}">${sl.name.split(" ").map(w => w[0]).join("")}</div>
      <div class="slack-msg-body">
        <div class="slack-msg-head"><span class="slack-msg-name">${sl.name}</span><span class="slack-msg-time">${(sl.times && sl.times[i]) || ""}</span></div>
        ${[].concat(p).map(t => `<p>${t}</p>`).join("")}
      </div>
    </div>`).join("");
  return `
    <div class="slack-card">
      <div class="slack-channel-bar">
        <span class="slack-hash">#</span>${sl.channel || "direct-message"}
      </div>
      <div class="slack-thread">${msgs}</div>
    </div>`;
}

function getSection(id) { return COURSE.sections.find(s => s.id === id); }
function completedCount() { return Object.keys(progress.completed).length; }
function progressPercent() { return Math.round((completedCount() / TOTAL_SECTIONS) * 100); }
function totalPoints() { return Object.values(progress.completed).reduce((sum, c) => sum + (c.points || 0), 0); }

function markSectionDone(sectionId, score, total, points) {
  const prev = progress.completed[sectionId];
  const bestScore = prev && typeof prev.score === "number" && typeof score === "number"
    ? Math.max(prev.score, score) : score;
  const bestPoints = prev && typeof prev.points === "number" && typeof points === "number"
    ? Math.max(prev.points, points) : points;
  progress.completed[sectionId] = { score: bestScore ?? null, total: total ?? null, points: bestPoints ?? 0 };
  saveProgress();
}

/* ---------- Top bar ---------- */
function renderTopbar() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === runtime.view);
  });
  document.getElementById("progress-fill").style.width = progressPercent() + "%";
  document.getElementById("progress-label").textContent = progressPercent() + "% complete";
  document.getElementById("xp-label").textContent = totalPoints() + " points";
}

/* ---------- Sidebar ---------- */
function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";
  COURSE.sections.forEach(section => {
    const group = document.createElement("div");
    group.className = "side-group";

    if (section.sideLabel) {
      const label = document.createElement("div");
      label.className = "side-group-label";
      label.textContent = section.sideLabel;
      group.appendChild(label);
    }

    const done = !!progress.completed[section.id];
    const active = runtime.view === "course" && runtime.sectionId === section.id;

    const item = el(`
      <div class="side-item ${done ? "done" : ""} ${active ? "active" : ""}" data-action="select-section" data-id="${section.id}">
        <span class="side-check">${done ? "✓" : ""}</span>
        <span>${section.navLabel}</span>
      </div>`);
    group.appendChild(item);
    sidebar.appendChild(group);
  });
}

/* ---------- Doc links sidebar ---------- */
function renderDocLinks() {
  const aside = document.getElementById("doclinks");
  if (!aside) return;
  aside.innerHTML = "";

  const labelActive = runtime.view === "course" && runtime.sectionId === 1;
  const label = el(`
    <div class="doclink-item ${labelActive ? "active" : ""}">
      <a href="https://support.doofinder.com" target="_blank" rel="noopener">Support documentation</a>
    </div>`);
  aside.appendChild(label);

  COURSE.sections.filter(s => s.docUrl && s.id !== 0).forEach(section => {
    const inSection = runtime.view === "course" && runtime.sectionId === section.id;

    const docs = [
      { label: section.navLabel, url: section.docUrl, anchor: null },
      ...(section.extraDocs || []).map(d => ({ label: d.label, url: d.url, anchor: slugify(d.fromHeading) }))
    ];
    const activeAnchor = inSection ? runtime.activeAnchor : null;
    const activeDoc = (activeAnchor && [...docs].reverse().find(d => d.anchor === activeAnchor)) || docs[0];

    docs.forEach((doc, i) => {
      const item = el(`
        <div class="doclink-item ${i > 0 ? "doclink-item-extra" : ""} ${inSection && doc === activeDoc ? "active" : ""}">
          <a href="${doc.url}" target="_blank" rel="noopener">${doc.label}</a>
        </div>`);
      aside.appendChild(item);
    });
  });
}

/* ---------- Doc-links scroll-spy ---------- */
let scrollSpyObserver = null;
function setupScrollSpy() {
  if (scrollSpyObserver) scrollSpyObserver.disconnect();
  const headings = document.querySelectorAll("#main-inner [data-anchor]");
  if (!headings.length) return;
  scrollSpyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runtime.activeAnchor = entry.target.dataset.anchor;
        renderDocLinks();
      }
    });
  }, { root: document.querySelector(".main"), rootMargin: "-10% 0px -70% 0px", threshold: 0 });
  headings.forEach(h => scrollSpyObserver.observe(h));
}

/* ---------- Theory rendering ----------
   A theory's blocks normally render as one continuous page. A block flagged
   `pageBreak: true` starts a new sub-page instead, shown behind a Continue
   button — used when a topic deserves its own page within the lesson. */
function splitTheoryPages(blocks) {
  const pages = [[]];
  (blocks || []).forEach(b => {
    if (b.pageBreak) pages.push([]);
    pages[pages.length - 1].push(b);
  });
  return pages;
}
function renderTheoryHTML(section, blocks, showLead) {
  const blocksHTML = (blocks || []).map(b => {
    const anchor = b.heading ? slugify(b.heading) : "";
    return `
    <div class="theory-block">
      ${b.heading ? `<h2 id="${anchor}" data-anchor="${anchor}">${b.heading}</h2>` : ""}
      ${b.html}
    </div>`;
  }).join("");
  return `
    <div class="card theory-card">
      ${showLead && section.theory.lead ? `<p class="theory-lead">${section.theory.lead}</p>` : ""}
      ${blocksHTML}
    </div>`;
}

/* ---------- Quiz rendering ---------- */
function quizNoun(section) { return section.quizLabel ? "Exercises" : "Quiz"; }

function ensureQuizRuntime(section) {
  if (!runtime.quiz[section.id]) {
    runtime.quiz[section.id] = { stage: "active", index: 0, selected: null, locked: false, results: [] };
  }
  return runtime.quiz[section.id];
}

function startQuiz(sectionId) {
  runtime.quiz[sectionId] = { stage: "active", index: 0, selected: null, locked: false, results: [] };
  renderMain();
}

function renderDocsLink(section) {
  return `
    <div class="quiz-docs-link">
      <a href="#" data-action="goto-theory" data-id="${section.id}">← Back to ${section.title}</a>
    </div>`;
}

function renderQuizArea(section) {
  const q = ensureQuizRuntime(section);
  const docsLink = renderDocsLink(section);

  if (q.stage === "active") {
    const total = section.quiz.length;
    const question = section.quiz[q.index];
    const dots = section.quiz.map((_, i) => {
      let cls = "quiz-dot";
      if (i === q.index) cls += " current";
      else if (q.results[i] === true) cls += " answered-correct";
      else if (q.results[i] === false) cls += " answered-wrong";
      return `<span class="${cls}"></span>`;
    }).join("");

    const letters = ["A", "B", "C", "D"];
    const options = question.options.map((opt, i) => {
      let cls = "quiz-option";
      if (q.locked) {
        cls += " locked";
        if (i === question.correct) cls += " correct";
        else if (i === q.selected) cls += " wrong";
      } else if (i === q.selected) {
        cls += " selected";
      }
      return `
        <div class="${cls}" data-action="${q.locked ? "" : "select-option"}" data-index="${i}">
          <span class="opt-letter">${letters[i]}</span>
          <span>${opt}</span>
        </div>`;
    }).join("");

    const pointsPerQuestion = Math.round(20 / total);
    const isCorrect = q.selected === question.correct;
    const feedback = q.locked ? `
      <div class="quiz-feedback ${isCorrect ? "ok" : "bad"}">
        <strong class="quiz-feedback-label">${isCorrect ? `Correct! +${pointsPerQuestion} points` : "Not quite."}</strong>
        ${question.explain}
      </div>` : "";

    const isLast = q.index === total - 1;
    const footer = q.locked ? `
      <div class="quiz-footer">
        <button class="btn btn-primary" data-action="next-question">${isLast ? "See Results" : "Next Question"}</button>
      </div>` : "";

    return `
      ${docsLink}
      <div class="card quiz-card">
        <p class="quiz-hint">Answer the questions correctly, using also the documentation to help you. If you get two or more wrong, you'll need to retake the quiz to move on to the next lesson.</p>
        <div class="quiz-header">
          <h2>Question ${q.index + 1} of ${total}</h2>
          <div class="quiz-dots">${dots}</div>
        </div>
        <div class="quiz-question">${question.q}</div>
        <div class="quiz-options">${options}</div>
        ${feedback}
        ${footer}
      </div>`;
  }

  if (q.stage === "done") {
    const total = section.quiz.length;
    const score = q.results.filter(Boolean).length;
    const wrong = total - score;
    const pass = wrong < 2;
    const rating = wrong === 0 ? "Excellent" : wrong === 1 ? "Very good" : "You didn't pass the quiz";
    const earnedPoints = wrong === 0 ? 20 : wrong === 1 ? 10 : 0;
    const nextSection = getSection(section.id + 1);
    return `
      ${docsLink}
      <div class="card quiz-card">
        <div class="quiz-result">
          <div class="score">${score}/${total}</div>
          <div class="score-sub">You scored ${Math.round((score / total) * 100)}% on this quiz</div>
          <span class="badge ${pass ? "pass" : "retry"}">${pass ? `${rating} · +${earnedPoints} points` : rating}</span>
          <div class="quiz-result-actions">
            <button class="btn btn-ghost" data-action="retake-quiz" data-id="${section.id}">Retake ${quizNoun(section)}</button>
            ${nextSection ? `<button class="btn btn-primary" data-action="select-section" data-id="${nextSection.id}">Continue →</button>` : ""}
          </div>
        </div>
      </div>`;
  }
}

/* ---------- Wizard exercise (multi-phase guided exercise, section 9) ---------- */
function genId(prefix) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${s.slice(0, 4)}-${s.slice(4)}`;
}

function ensureExerciseRuntime(section) {
  if (!runtime.exercise[section.id]) {
    runtime.exercise[section.id] = {
      stage: "intro",     // "intro" | phase index (0..n-1) | "done" | "reply"
      sub: "form",        // "form" | "reveal" — only used on phases with a `reveal` step
      values: {},         // phaseIndex -> { fieldKey: lastSubmittedValue }
      errors: {},         // phaseIndex -> { fieldKey: true if invalid on last submit }
      confirmErrors: {},  // phaseIndex -> { confirmFieldKey: true if invalid on last submit }
      attempts: {},        // phaseIndex -> number of submit attempts
      firstTry: {},        // phaseIndex -> true if solved on the very first attempt
      generated: {}         // genKey -> generated id (storeId, hashEN, hashES)
    };
  }
  return runtime.exercise[section.id];
}

function startExercise(sectionId) {
  runtime.exercise[sectionId] = {
    stage: 0, sub: "form", values: {}, errors: {}, confirmErrors: {}, attempts: {}, firstTry: {}, generated: {}
  };
  renderMain();
}

function validateExerciseField(field, value) {
  const v = (value || "").trim();
  if (field.freeform) return v.length > 0;
  if (field.acceptAny) return field.acceptAny.some(a => v.toLowerCase() === a.toLowerCase());
  if (field.type === "multi-choice") {
    const picked = v ? v.split("|").sort() : [];
    return picked.join("|") === [...field.correct].sort().join("|");
  }
  if (field.type === "text") return v.toLowerCase() === (field.correct || "").toLowerCase();
  return v === field.correct;
}

function handleExerciseSubmit(section, phaseIndex) {
  const ex = ensureExerciseRuntime(section);
  const phase = section.exercise.phases[phaseIndex];
  const values = {};
  const errors = {};
  let allValid = true;
  phase.fields.forEach(f => {
    const el = document.getElementById(`ex-f-${section.id}-${phaseIndex}-${f.key}`);
    const val = el ? el.value : "";
    values[f.key] = val;
    const ok = validateExerciseField(f, val);
    errors[f.key] = !ok;
    if (!ok) allValid = false;
  });
  ex.values[phaseIndex] = values;
  ex.errors[phaseIndex] = errors;
  ex.attempts[phaseIndex] = (ex.attempts[phaseIndex] || 0) + 1;

  if (phase.fields.length > 0 && ex.firstTry[phaseIndex] === undefined) ex.firstTry[phaseIndex] = allValid;

  if (phase.key === "store-ids" && allValid) {
    try { localStorage.setItem("dfa_demo_store_id", values.storeId.trim()); } catch (e) {}
    try { localStorage.setItem("dfa_demo_hash_en", values.hashEN.trim()); } catch (e) {}
  }

  if (phase.reveal) {
    phase.reveal.genFields.forEach(gk => {
      if (!ex.generated[gk]) {
        const prefix = gk === "storeId" ? "STR" : gk === "hashEN" ? "SE-EN" : gk === "hashES" ? "SE-ES" : "ID";
        ex.generated[gk] = genId(prefix);
      }
    });
    ex.sub = "reveal";
    renderMain();
    return;
  }

  if (phase.explain) {
    ex.sub = "explain";
    renderMain();
    return;
  }

  advanceExercise(section);
}

function handleExerciseAdvanceFromExplain(section) {
  const ex = ensureExerciseRuntime(section);
  ex.sub = "form";
  advanceExercise(section);
}

function handleExerciseSkip(section, phaseIndex) {
  const ex = ensureExerciseRuntime(section);
  const phase = section.exercise.phases[phaseIndex];
  if (phase.fields.length > 0 && ex.firstTry[phaseIndex] === undefined) ex.firstTry[phaseIndex] = false;
  ex.attempts[phaseIndex] = (ex.attempts[phaseIndex] || 0) + 1;
  ex.sub = "form";
  advanceExercise(section);
}


function handleExerciseConfirm(section, phaseIndex) {
  const ex = ensureExerciseRuntime(section);
  const phase = section.exercise.phases[phaseIndex];
  const r = phase.reveal;
  const confirmErrors = {};
  let allValid = true;
  r.confirmFields.forEach(cf => {
    const el = document.getElementById(`ex-c-${section.id}-${phaseIndex}-${cf.key}`);
    const val = el ? el.value.trim() : "";
    const ok = val === ex.generated[cf.matchGenKey];
    confirmErrors[cf.key] = !ok;
    if (!ok) allValid = false;
  });
  ex.confirmErrors[phaseIndex] = confirmErrors;
  ex.sub = "form";
  advanceExercise(section);
}

function scoreablePhaseCount(section) {
  return section.exercise.phases.filter(p => p.fields.length > 0).length;
}

function advanceExercise(section) {
  const ex = ensureExerciseRuntime(section);
  const total = section.exercise.phases.length;
  if (ex.stage + 1 < total) {
    ex.stage = ex.stage + 1;
  } else {
    const score = Object.values(ex.firstTry).filter(Boolean).length;
    const scoreTotal = scoreablePhaseCount(section);
    markSectionDone(section.id, score, scoreTotal, score * 10);
    ex.stage = "done";
  }
  renderMain();
}

/* Once a step has been answered (its explanation is showing), its options stay
   on screen, locked, and are marked the same way as in the quizzes: the correct
   option in green, the learner's wrong pick in red. */
function lockedChoiceClass(field, value, savedValue) {
  if (value === field.correct) return " locked correct";
  if (value === savedValue) return " locked wrong";
  return " locked";
}

function renderImageChoicePhase(sectionId, phaseIndex, phase, field, ex, locked) {
  const id = `ex-f-${sectionId}-${phaseIndex}-${field.key}`;
  const savedValue = (ex.values[phaseIndex] && ex.values[phaseIndex][field.key]) || "";
  const hasError = !!(ex.errors[phaseIndex] && ex.errors[phaseIndex][field.key]);
  const thumbs = field.options.map(o => `
    <div class="image-choice-thumb ${field.thumbAspect ? "fixed-ratio" : ""}" ${field.thumbAspect ? `style="aspect-ratio: ${field.thumbAspect};"` : ""}>
      <img src="${o.src}" alt="${o.alt || ""}" data-action="zoom-image-option" data-src="${o.src}" data-alt="${o.alt || ""}" class="exercise-scenario-img">
      ${ZOOM_BADGE}
      ${o.caption ? `<div class="image-choice-caption">${o.caption}</div>` : ""}
    </div>`).join("");
  const options = field.options.map(o => locked
    ? `<div class="choice-option${lockedChoiceClass(field, o.value, savedValue)}">${o.caption || o.value}</div>`
    : `
    <div class="choice-option ${savedValue === o.value ? "selected" : ""}" data-action="select-choice-option" data-field-id="${id}" data-value="${o.value}" data-section-id="${sectionId}" data-phase="${phaseIndex}">${o.caption || o.value}</div>`).join("");
  const rowStyle = field.thumbCols ? ` style="grid-template-columns: repeat(${field.thumbCols}, 1fr);"` : "";
  const mediaStyle = field.mediaWidth ? ` style="width: ${field.mediaWidth}px; max-width: 100%;"` : "";
  const remainder = field.thumbCols ? field.options.length % field.thumbCols : 0;
  const trailingNoteHTML = (field.trailingNote && remainder !== 0)
    ? `<div class="image-choice-note" style="grid-column: span ${field.thumbCols - remainder};">${field.trailingNote}</div>`
    : "";
  return `
    <div class="exercise-scenario-split ${field.stacked ? "stacked-media" : ""}">
      <div class="exercise-scenario-media image-choice-media"${mediaStyle}>
        <div class="image-choice-row ${field.thumbCols ? "image-choice-grid" : ""}"${rowStyle}>${thumbs}${trailingNoteHTML}</div>
      </div>
      <div class="exercise-scenario-side">
        ${phase.question ? `<p class="exercise-scenario-text">${phase.question}</p>` : ""}
        <div class="field-row">
          ${field.label ? `<label class="field-label">${field.label}</label>` : ""}
          <input type="hidden" id="${id}" value="${savedValue}" />
          <div class="choice-grid ${field.layout === "column" ? "choice-grid-column" : ""} ${hasError && !locked ? "error" : ""}">${options}</div>
          ${hasError && !locked ? `<div class="field-error-msg">Not quite — check your choice and try again.</div>` : ""}
        </div>
      </div>
    </div>`;
}

function renderExerciseField(sectionId, phaseIndex, field, ex, locked) {
  const id = `ex-f-${sectionId}-${phaseIndex}-${field.key}`;
  const savedValue = (ex.values[phaseIndex] && ex.values[phaseIndex][field.key]) || "";
  const hasError = !!(ex.errors[phaseIndex] && ex.errors[phaseIndex][field.key]);
  let inputHTML;
  if (field.type === "select") {
    const opts = [`<option value="">Choose…</option>`]
      .concat(field.options.map(o => `<option value="${o}" ${savedValue === o ? "selected" : ""}>${o}</option>`))
      .join("");
    inputHTML = locked
      ? `<select id="${id}" class="field-input locked ${hasError ? "field-wrong" : "field-correct"}" disabled>${opts}</select>
         ${hasError ? `<div class="field-correct-answer">Correct answer: <strong>${field.correct}</strong></div>` : ""}`
      : `<select id="${id}" class="field-input ${hasError ? "error" : ""}">${opts}</select>`;
  } else if (field.type === "choice") {
    const buttons = field.options.map(o => locked
      ? `<div class="choice-option${lockedChoiceClass(field, o, savedValue)}">${o}</div>`
      : `
      <div class="choice-option ${savedValue === o ? "selected" : ""}" data-action="select-choice-option" data-field-id="${id}" data-value="${o}" data-section-id="${sectionId}" data-phase="${phaseIndex}">${o}</div>`).join("");
    inputHTML = `
      <input type="hidden" id="${id}" value="${savedValue}" />
      <div class="choice-grid ${field.layout === "column" ? "choice-grid-column" : ""} ${hasError && !locked ? "error" : ""}">${buttons}</div>`;
  } else if (field.type === "multi-choice") {
    /* A row of toggle buttons: every right option has to be switched on. */
    const picked = savedValue ? savedValue.split("|") : [];
    const buttons = field.options.map(o => {
      if (locked) {
        const cls = field.correct.includes(o) ? " locked correct" : picked.includes(o) ? " locked wrong" : " locked";
        return `<div class="choice-option${cls}">${o}</div>`;
      }
      return `<div class="choice-option ${picked.includes(o) ? "selected" : ""}" data-action="toggle-multi-option" data-field-id="${id}" data-value="${o}" data-section-id="${sectionId}" data-phase="${phaseIndex}">${o}</div>`;
    }).join("");
    inputHTML = `
      <input type="hidden" id="${id}" value="${savedValue}" />
      <div class="choice-grid ${hasError && !locked ? "error" : ""}">${buttons}</div>`;
  } else {
    const safeVal = savedValue.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
    inputHTML = locked
      ? `<input id="${id}" class="field-input locked ${hasError ? "field-wrong" : "field-correct"}" type="text" value="${safeVal}" readonly />
         ${hasError && !field.freeform ? `<div class="field-correct-answer">Correct answer: <strong>${field.correct}</strong></div>` : ""}`
      : `<input id="${id}" class="field-input ${hasError ? "error" : ""}" type="text" placeholder="${field.placeholder || ""}" value="${safeVal}" autocomplete="off" />`;
  }
  return `
    <div class="field-row">
      ${field.label ? `<label class="field-label" for="${id}">${field.label}</label>` : ""}
      ${inputHTML}
      ${hasError && !locked ? `<div class="field-error-msg">Not quite — check ${field.type === "select" || field.type === "image-select" || field.type === "choice" ? "your choice" : "the value"} and try again.</div>` : ""}
    </div>`;
}

function renderExerciseStepper(section, ex, phaseIndex) {
  const total = section.exercise.phases.length;
  const dots = section.exercise.phases.map((p, i) => {
    let cls = "quiz-dot";
    if (i === phaseIndex) cls += " current";
    else if (i < phaseIndex) cls += " answered-correct";
    return `<span class="${cls}"></span>`;
  }).join("");
  return `
    <div class="exercise-stepper">
      <span class="exercise-step-label">Step ${phaseIndex + 1} of ${total}</span>
      <div class="quiz-dots">${dots}</div>
    </div>`;
}

function renderExerciseArea(section) {
  const ex = ensureExerciseRuntime(section);
  const docsLink = renderDocsLink(section);
  const total = section.exercise.phases.length;

  if (ex.stage === "intro") {
    const completed = progress.completed[section.id];
    return `
      ${docsLink}
      <div class="card quiz-card">
        <p class="theory-lead" style="margin-bottom:18px;">
          ${completed
            ? `You've already completed this exercise — score <strong>${completed.score}/${completed.total}</strong>.`
            : section.exercise.lead}
        </p>
        <div class="section-footer" style="justify-content:flex-start; gap:10px;">
          <button class="btn btn-primary" data-action="start-exercise" data-id="${section.id}">
            ${completed ? "Retake Exercise" : "Start Exercise"}
          </button>
        </div>
      </div>`;
  }

  if (ex.stage === "done") {
    const score = Object.values(ex.firstTry).filter(Boolean).length;
    const scoreTotal = scoreablePhaseCount(section);
    return `
      ${docsLink}
      <div class="card quiz-card">
        <div class="quiz-result">
          <div class="score">${score}/${scoreTotal}</div>
          <div class="score-sub">${section.exercise.doneNote || ""}</div>
          <span class="badge pass">Exercise complete · +${score * 10} points</span>
          <div class="quiz-result-actions">
            <button class="btn btn-primary" data-action="reply-to-john" data-id="${section.id}">${section.exercise.replyButtonLabel || "Reply"}</button>
            <button class="btn btn-ghost" data-action="retake-exercise" data-id="${section.id}">Retake Exercise</button>
          </div>
        </div>
      </div>`;
  }

  if (ex.stage === "reply") {
    const wa = section.exercise.replyWhatsapp;
    const sl = section.exercise.replySlack;
    const email = section.exercise.replyEmail;
    const messageHTML = wa ? renderWhatsappCard(wa) : sl ? renderSlackCard(sl) : `
        <div class="email-card">
          <div class="email-head">
            <div class="email-avatar">${email.name.split(" ").map(w => w[0]).join("")}</div>
            <div>
              <div class="email-name">${email.name}</div>
              <div class="email-addr">${email.address}</div>
              ${email.cc ? `<div class="email-addr">Cc: ${email.cc}</div>` : ""}
            </div>
          </div>
          <div class="email-subject">Subject: ${email.subject}</div>
          <div class="email-body">
            ${email.body.map(p => `<p>${p}</p>`).join("")}
          </div>
        </div>`;
    return `
      ${docsLink}
      <div class="card">
        ${messageHTML}
      </div>
      <div class="section-footer">
        <button class="btn btn-ghost" data-action="retake-exercise" data-id="${section.id}">Retake Exercise</button>
        ${COURSE.nextSection ? `<a class="btn btn-primary" href="${COURSE.nextSection.href}">${COURSE.nextSection.label}</a>` : ""}
      </div>`;
  }

  const phaseIndex = ex.stage;
  const phase = section.exercise.phases[phaseIndex];
  const stepper = renderExerciseStepper(section, ex, phaseIndex);

  const autoReveal = phase.fields.length === 0 && !!phase.reveal;
  if (autoReveal) {
    phase.reveal.genFields.forEach(gk => {
      if (!ex.generated[gk]) {
        const prefix = gk === "storeId" ? "STR" : gk === "hashEN" ? "SE-EN" : gk === "hashES" ? "SE-ES" : "ID";
        ex.generated[gk] = genId(prefix);
      }
    });
  }

  if (phase.reveal && (ex.sub === "reveal" || autoReveal)) {
    const r = phase.reveal;
    const summaryHTML = r.summaryLines.map(l => `
      <div class="id-reveal-row"><span>${l.label}</span><code>${ex.generated[l.genKey]}</code></div>`).join("");
    const confirmHTML = r.confirmFields.map(cf => {
      const id = `ex-c-${section.id}-${phaseIndex}-${cf.key}`;
      const hasError = !!(ex.confirmErrors[phaseIndex] && ex.confirmErrors[phaseIndex][cf.key]);
      return `
        <div class="field-row">
          <label class="field-label" for="${id}">${cf.label}</label>
          <input id="${id}" class="field-input ${hasError ? "error" : ""}" type="text" autocomplete="off" />
          ${hasError ? `<div class="field-error-msg">That doesn't match — copy it exactly from above.</div>` : ""}
        </div>`;
    }).join("");

    return `
      ${docsLink}
      <div class="card quiz-card">
        <div class="quiz-header"><h2>${phase.title}</h2>${stepper}</div>
        ${phase.question ? `<p class="theory-lead" style="margin-bottom:16px;">${phase.question}</p>` : ""}
        <div class="id-reveal-box">
          <div class="id-reveal-title">✓ Created</div>
          ${summaryHTML}
        </div>
        <p class="theory-lead" style="margin: 14px 0;">${r.note || "Copy the value(s) above, then paste them back in below — just like you would from the real Admin Panel."}</p>
        ${confirmHTML}
        <div class="section-footer">
          <button class="btn btn-primary" data-action="exercise-confirm" data-id="${section.id}" data-phase="${phaseIndex}">Continue →</button>
        </div>
      </div>`;
  }

  const locked = !!(phase.explain && ex.sub === "explain");
  const wasCorrect = locked && phase.fields.every(f => !(ex.errors[phaseIndex] || {})[f.key]);

  const imageChoiceField = phase.fields.find(f => f.type === "image-select");
  const fieldsHTML = phase.fields.map(f => renderExerciseField(section.id, phaseIndex, f, ex, locked)).join("");
  const hasScenarioImage = !!phase.scenarioImage;
  const hasScenarioVideo = !!phase.scenarioVideo;
  const hasScenarioFeed = !!phase.scenarioFeed;
  const hasScenarioMedia = hasScenarioImage || hasScenarioVideo || hasScenarioFeed;
  const scenarioHTML = (phase.scenario && !hasScenarioMedia) ? `
    <div class="exercise-scenario">
      <p>${phase.scenario}</p>
      ${phase.consoleLine ? `<pre class="console-line">${phase.consoleLine}</pre>` : ""}
    </div>` : "";
  const scenarioMediaInnerHTML = hasScenarioImage
    ? `<img src="${phase.scenarioImage.src}" alt="${phase.scenarioImage.alt || ""}" data-action="zoom-image" class="exercise-scenario-img ${phase.scenarioImage.imgClass || ""}">
       ${ZOOM_BADGE}`
    : hasScenarioVideo
    ? `<div class="exercise-scenario-video">
         <iframe src="${phase.scenarioVideo.embedUrl}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
       </div>
       <div class="video-enlarge-hint" data-action="zoom-video" data-embed="${phase.scenarioVideo.embedUrl}">⤢ Click to enlarge the video</div>`
    : hasScenarioFeed
    ? `<div class="feed-preview-card">
         <p class="feed-preview-label">${phase.scenarioFeed.label}</p>
         <img src="${phase.scenarioFeed.src}" alt="${phase.scenarioFeed.alt || ""}" data-action="zoom-image" class="feed-preview-img">
         <a href="${phase.scenarioFeed.href}" download class="btn btn-ghost feed-download-btn">${phase.scenarioFeed.downloadLabel}</a>
       </div>`
    : "";
  const scenarioSideHTML = `
    <div class="exercise-scenario-side">
      ${phase.scenario ? `<p class="exercise-scenario-text">${phase.scenario}</p>` : ""}
      ${phase.consoleLine ? `<pre class="console-line">${phase.consoleLine}</pre>` : ""}
      ${phase.fieldsRow ? `<div class="exercise-scenario-fields-row">${fieldsHTML}</div>` : fieldsHTML}
      ${hasScenarioMedia ? (phase.afterFields || "") : ""}
    </div>`;
  const scenarioMediaHTML = `
    <div class="exercise-scenario-media ${hasScenarioVideo ? "video-media" : ""} ${phase.smallMedia ? "small-media" : ""} ${phase.mediumMedia ? "medium-media" : ""}">
      ${scenarioMediaInnerHTML}
    </div>`;
  const scenarioWithMediaHTML = hasScenarioMedia ? `
    <div class="exercise-scenario-split ${phase.stackedMedia ? "stacked-media" : ""}">
      ${(hasScenarioVideo || phase.mediaRight) ? scenarioSideHTML + scenarioMediaHTML : scenarioMediaHTML + scenarioSideHTML}
    </div>` : "";
  const isAutoSubmit = !phase.reveal && phase.fields.length > 0 && isSelectionOnlyPhase(phase);

  return `
    ${docsLink}
    <div class="card quiz-card">
      <div class="quiz-header"><h2>${phase.title}</h2>${stepper}</div>
      ${imageChoiceField
        ? renderImageChoicePhase(section.id, phaseIndex, phase, imageChoiceField, ex, locked)
        : `${phase.question ? `<p class="theory-lead" style="margin-bottom:16px;">${phase.question}</p>` : ""}${hasScenarioMedia ? scenarioWithMediaHTML : `${scenarioHTML}${phase.beforeFields || ""}${fieldsHTML}${phase.afterFields || ""}`}`}
      ${locked ? `
      <div class="quiz-feedback ${wasCorrect ? "ok" : "bad"}">
        <strong class="quiz-feedback-label">${wasCorrect ? "Correct! +10 points" : "Not quite."}</strong>
        ${phase.explain}
      </div>
      <div class="section-footer">
        <button class="btn btn-primary" data-action="exercise-advance" data-id="${section.id}">Continue →</button>
      </div>` : `
      <div class="section-footer">
        ${isAutoSubmit ? "" : `
        <button class="btn btn-primary" id="ex-submit-${section.id}-${phaseIndex}" data-action="exercise-submit" data-id="${section.id}" data-phase="${phaseIndex}" ${phaseAllAnswered(section, phaseIndex, ex) ? "" : "disabled"}>
          ${phase.reveal ? "Create →" : "Continue →"}
        </button>`}
        <button class="btn btn-ghost" data-action="exercise-skip" data-id="${section.id}" data-phase="${phaseIndex}">Skip →</button>
      </div>`}
    </div>`;
}

function phaseAllAnswered(section, phaseIndex, ex) {
  const phase = section.exercise.phases[phaseIndex];
  const saved = ex.values[phaseIndex] || {};
  return phase.fields.every(f => (saved[f.key] || "").trim().length > 0);
}

function isSelectionOnlyPhase(phase) {
  return phase.fields.every(f => f.type === "select" || f.type === "choice" || f.type === "image-select");
}

function autoSubmitIfPhaseComplete(sectionId, phaseIndex) {
  const section = getSection(sectionId);
  const phase = section.exercise.phases[phaseIndex];
  if (phase.reveal || !isSelectionOnlyPhase(phase)) {
    refreshExerciseSubmitButton(section, phaseIndex);
    return;
  }
  const allAnswered = phase.fields.every(f => {
    const el = document.getElementById(`ex-f-${sectionId}-${phaseIndex}-${f.key}`);
    return el && el.value.trim().length > 0;
  });
  if (allAnswered) handleExerciseSubmit(section, phaseIndex);
}

function refreshExerciseSubmitButton(section, phaseIndex) {
  const btn = document.getElementById(`ex-submit-${section.id}-${phaseIndex}`);
  if (!btn) return;
  const phase = section.exercise.phases[phaseIndex];
  const allAnswered = phase.fields.every(f => {
    const el = document.getElementById(`ex-f-${section.id}-${phaseIndex}-${f.key}`);
    return el && el.value.trim().length > 0;
  });
  btn.disabled = !allAnswered;
}

/* ---------- Section 0/1: presentation (narrative intro pages) ---------- */
function renderPresentationPage(pageData) {
  const emailHTML = pageData.email ? `
      <div class="email-card">
        <div class="email-head">
          <div class="email-avatar">${pageData.email.name.split(" ").map(w => w[0]).join("")}</div>
          <div>
            <div class="email-name">${pageData.email.name}</div>
            <div class="email-addr">${pageData.email.address}</div>
            ${pageData.email.cc ? `<div class="email-addr">Cc: ${pageData.email.cc}</div>` : ""}
          </div>
        </div>
        <div class="email-subject">Subject: ${pageData.email.subject}</div>
        <div class="email-body">
          ${pageData.email.body.map(p => `<p>${p}</p>`).join("")}
        </div>
      </div>` : "";

  const whatsappCardHTML = pageData.whatsapp ? renderWhatsappCard(pageData.whatsapp) : "";

  const whatsappHTML = !pageData.whatsapp ? "" : pageData.whatsappNote ? `
      <div class="whatsapp-split">
        ${whatsappCardHTML}
        <div class="whatsapp-note">
          ${pageData.whatsappNote.map(p => `<p>${p}</p>`).join("")}
        </div>
      </div>` : whatsappCardHTML;

  const slackCardHTML = pageData.slack ? renderSlackCard(pageData.slack) : "";

  const slackIntroHTML = pageData.slackIntro ? `
      <div class="intro-text">
        ${pageData.slackIntro.map(p => `<p>${p}</p>`).join("")}
      </div>` : "";

  const slackNoteHTML = pageData.slackNote ? `
      <div class="intro-text">
        ${pageData.slackNote.map(p => `<p>${p}</p>`).join("")}
      </div>` : "";

  const slackHTML = !pageData.slack ? "" : `
      ${slackIntroHTML}
      <div class="slack-card-wide">${slackCardHTML}</div>
      ${slackNoteHTML}`;

  const outroHTML = pageData.outro ? `
      <div class="intro-text">
        ${pageData.outro.map(p => `<p>${p}</p>`).join("")}
      </div>` : "";

  const schemaHTML = pageData.schema ? pageData.schema : "";

  return `
    <div class="card">
      <div class="intro-text">
        ${pageData.intro.map(p => `<p>${p}</p>`).join("")}
      </div>
      ${schemaHTML}
      ${emailHTML}
      ${whatsappHTML}
      ${slackHTML}
      ${outroHTML}
    </div>`;
}

function renderPresentation(section) {
  const done = !!progress.completed[section.id];
  const pagesHTML = section.pages.map(renderPresentationPage).join("");

  const footerHTML = `
    <div class="section-footer">
      ${done
        ? `<button class="btn btn-primary" data-action="select-section" data-id="${section.id + 1}">Continue →</button>`
        : `<button class="btn btn-primary" data-action="mark-complete" data-id="${section.id}">Mark as Complete</button>`}
    </div>`;

  return `${pagesHTML}${footerHTML}`;
}

/* ---------- Course view ---------- */
function renderCourseView() {
  const section = getSection(runtime.sectionId) || getSection(0);
  const moduleBadge = section.moduleTag ? `<span class="module-badge">${section.moduleTag}</span>` : "";
  let body = `
    <div class="page-head">
      <div><div class="eyebrow">${section.eyebrow}</div><h1 class="page-title">${section.title}</h1></div>
      ${moduleBadge}
    </div>`;
  if (!section.hasQuiz) {
    body += renderPresentation(section);
  } else if (runtime.coursePage === "quiz") {
    body += section.exerciseType === "wizard" ? renderExerciseArea(section) : renderQuizArea(section);
  } else {
    const theoryPages = splitTheoryPages(section.theory.blocks);
    const pageIndex = Math.min(runtime.theoryPage[section.id] || 0, theoryPages.length - 1);
    const isLastTheoryPage = pageIndex === theoryPages.length - 1;
    body += renderTheoryHTML(section, theoryPages[pageIndex], pageIndex === 0);
    body += `
      <div class="section-footer">
        ${isLastTheoryPage
          ? `<button class="btn btn-primary" data-action="goto-quiz" data-id="${section.id}">Go to ${quizNoun(section)} →</button>`
          : `<button class="btn btn-primary" data-action="theory-continue" data-id="${section.id}">Continue →</button>`}
      </div>`;
  }
  return body;
}

/* ---------- Scores view ---------- */
function renderScoresView() {
  const scoredSections = COURSE.sections.filter(s => s.hasQuiz);
  const scored = scoredSections.filter(s => progress.completed[s.id] && typeof progress.completed[s.id].score === "number");
  const avg = scored.length
    ? Math.round(scored.reduce((sum, s) => sum + (progress.completed[s.id].score / progress.completed[s.id].total), 0) / scored.length * 100)
    : 0;

  const rows = COURSE.sections.map(s => {
    const c = progress.completed[s.id];
    const scoreLabel = s.hasQuiz ? (c && typeof c.score === "number" ? `${c.score}/${c.total}` : "—") : (c ? "—" : "—");
    return `
      <tr>
        <td class="name">${s.eyebrow.replace(/^\d+\.\s*/, "")}</td>
        <td>${scoreLabel}</td>
        <td>${c ? `<span class="status-pill complete">✓ Completed</span>` : `<span class="status-pill pending">Not started</span>`}</td>
        <td>${c ? c.points : 0} points</td>
      </tr>`;
  }).join("");

  return `
    <div class="eyebrow">YOUR PROGRESS</div>
    <h1 class="page-title">Scores</h1>
    <div class="scores-grid">
      <div class="stat-card">
        <div class="stat-label">Total Points</div>
        <div class="stat-value accent">${totalPoints()}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Sections Completed</div>
        <div class="stat-value">${completedCount()} / ${TOTAL_SECTIONS}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Average Quiz Score</div>
        <div class="stat-value">${avg}%</div>
      </div>
    </div>
    <div class="card">
      <table class="scores-table">
        <thead><tr><th>Lesson</th><th>Score</th><th>Status</th><th>Points</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

/* ---------- Main render dispatcher ---------- */
function renderMain() {
  const container = document.getElementById("main-inner");
  if (runtime.view === "course") container.innerHTML = renderCourseView();
  else if (runtime.view === "scores") container.innerHTML = renderScoresView();
  renderSidebar();
  renderTopbar();
  renderDocLinks();
  setupScrollSpy();
  syncLiveStoreId();
}

/* ---------- Event delegation ---------- */
document.addEventListener("click", e => {
  const target = e.target.closest("[data-action]");
  if (!target) {
    return;
  }
  const action = target.dataset.action;

  if (action === "zoom-image") {
    openLightbox(target.src, target.alt);
  } else if (action === "carousel-next") {
    const carousel = target.closest(".install-step-carousel");
    const imgs = [...carousel.querySelectorAll("img")];
    const activeIndex = imgs.findIndex(img => img.classList.contains("is-active"));
    imgs[activeIndex].classList.remove("is-active");
    imgs[(activeIndex + 1) % imgs.length].classList.add("is-active");
  } else if (action === "toggle-gif") {
    toggleGifPlayback(target);
  } else if (action === "zoom-video") {
    openVideoLightbox(target.dataset.embed);
  } else if (action === "zoom-image-option") {
    openLightbox(target.dataset.src, target.dataset.alt);
  } else if (action === "zoom-diagram") {
    const svg = target.closest(".theory-diagram").querySelector("svg");
    if (svg) openContentLightbox(svg.outerHTML);
  } else if (action === "select-choice-option") {
    const input = document.getElementById(target.dataset.fieldId);
    input.value = target.dataset.value;
    target.parentElement.querySelectorAll(".choice-option").forEach(el => el.classList.remove("selected"));
    target.classList.add("selected");
    autoSubmitIfPhaseComplete(Number(target.dataset.sectionId), Number(target.dataset.phase));
  } else if (action === "toggle-multi-option") {
    const input = document.getElementById(target.dataset.fieldId);
    const picked = new Set(input.value ? input.value.split("|") : []);
    if (picked.has(target.dataset.value)) picked.delete(target.dataset.value);
    else picked.add(target.dataset.value);
    input.value = [...picked].join("|");
    target.classList.toggle("selected");
    refreshExerciseSubmitButton(getSection(Number(target.dataset.sectionId)), Number(target.dataset.phase));
  } else if (action === "select-section") {
    runtime.view = "course";
    runtime.sectionId = Number(target.dataset.id);
    runtime.coursePage = "theory";
    runtime.activeAnchor = null;
    runtime.theoryPage[runtime.sectionId] = 0;
    renderMain();
  } else if (action === "theory-continue") {
    const id = Number(target.dataset.id);
    runtime.theoryPage[id] = (runtime.theoryPage[id] || 0) + 1;
    runtime.activeAnchor = null;
    renderMain();
    document.querySelector(".main").scrollTo(0, 0);
  } else if (action === "goto-quiz") {
    const id = Number(target.dataset.id);
    runtime.sectionId = id;
    runtime.coursePage = "quiz";
    const section = getSection(id);
    if (section.exerciseType === "wizard") startExercise(id);
    else renderMain();
  } else if (action === "goto-theory") {
    runtime.sectionId = Number(target.dataset.id);
    runtime.coursePage = "theory";
    runtime.activeAnchor = null;
    runtime.theoryPage[runtime.sectionId] = 0;
    renderMain();
  } else if (action === "mark-complete") {
    markSectionDone(Number(target.dataset.id), null, null, 0);
    renderMain();
  } else if (action === "retake-quiz") {
    startQuiz(Number(target.dataset.id));
  } else if (action === "select-option") {
    const section = getSection(runtime.sectionId);
    const q = runtime.quiz[section.id];
    if (q.locked) return;
    const idx = Number(target.dataset.index);
    const question = section.quiz[q.index];
    q.selected = idx;
    q.locked = true;
    q.results[q.index] = idx === question.correct;
    renderMain();
  } else if (action === "next-question") {
    const section = getSection(runtime.sectionId);
    const q = runtime.quiz[section.id];
    if (q.index < section.quiz.length - 1) {
      q.index++;
      q.selected = null;
      q.locked = false;
      renderMain();
    } else {
      const score = q.results.filter(Boolean).length;
      const wrong = section.quiz.length - score;
      const earnedPoints = wrong === 0 ? 20 : wrong === 1 ? 10 : 0;
      markSectionDone(section.id, score, section.quiz.length, earnedPoints);
      q.stage = "done";
      renderMain();
    }
  } else if (action === "start-exercise" || action === "retake-exercise") {
    startExercise(Number(target.dataset.id));
  } else if (action === "reply-to-john") {
    ensureExerciseRuntime(getSection(Number(target.dataset.id))).stage = "reply";
    renderMain();
  } else if (action === "exercise-submit") {
    handleExerciseSubmit(getSection(Number(target.dataset.id)), Number(target.dataset.phase));
  } else if (action === "exercise-confirm") {
    handleExerciseConfirm(getSection(Number(target.dataset.id)), Number(target.dataset.phase));
  } else if (action === "exercise-advance") {
    handleExerciseAdvanceFromExplain(getSection(Number(target.dataset.id)));
  } else if (action === "exercise-skip") {
    handleExerciseSkip(getSection(Number(target.dataset.id)), Number(target.dataset.phase));
  }
});

/* Any `.live-store-id` element (e.g. the installation script shown in an
   exercise step) mirrors whatever is typed into a Store ID field. */
function syncLiveStoreId() {
  const input = document.querySelector('input[id^="ex-f-"][id$="-storeId"]');
  const value = input && input.value.trim() ? input.value.trim() : "STORE_ID";
  document.querySelectorAll(".live-store-id").forEach(el => { el.textContent = value; });
  /* The English Search Engine's Hash ID saved in Section 1's final exercise,
     shown wherever a later section refers to it. */
  let hashEN = "";
  try { hashEN = localStorage.getItem("dfa_demo_hash_en") || ""; } catch (e) {}
  document.querySelectorAll(".live-hash-en").forEach(el => {
    el.innerHTML = hashEN ? `<code>${hashEN.replace(/</g, "&lt;")}</code>` : el.dataset.fallback || "";
  });
}

function handleExerciseFieldLiveChange(e) {
  const el = e.target;
  if (!el.id || !el.id.startsWith("ex-f-")) return;
  if (el.id.endsWith("-storeId")) syncLiveStoreId();
  const parts = el.id.split("-");
  autoSubmitIfPhaseComplete(Number(parts[2]), Number(parts[3]));
}
document.addEventListener("input", handleExerciseFieldLiveChange);
document.addEventListener("change", handleExerciseFieldLiveChange);

/* ---------- Gif pause/play ----------
   A raw <img> gif has no native pause, so "pausing" freezes the current
   frame onto an overlaid canvas; resuming can only restart the gif from
   its first frame, not from the frozen point. */
const GIF_ICON_PAUSE = `<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><rect x="3" y="2" width="3.4" height="12" rx="1"></rect><rect x="9.6" y="2" width="3.4" height="12" rx="1"></rect></svg>`;
const GIF_ICON_PLAY = `<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="M4 2.5v11l10-5.5-10-5.5z"></path></svg>`;
function toggleGifPlayback(btn) {
  const wrap = btn.closest(".gif-image");
  const img = wrap.querySelector("img");
  const canvas = wrap.querySelector(".gif-freeze-canvas");
  const isPaused = canvas.classList.contains("is-visible");
  if (!isPaused) {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.classList.add("is-visible");
    btn.innerHTML = GIF_ICON_PLAY;
    btn.setAttribute("aria-label", "Play animation");
  } else {
    canvas.classList.remove("is-visible");
    img.src = `${img.dataset.baseSrc}?r=${Date.now()}`;
    btn.innerHTML = GIF_ICON_PAUSE;
    btn.setAttribute("aria-label", "Pause animation");
  }
}

/* ---------- Lightbox ---------- */
function openLightbox(src, alt) {
  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightbox-img").style.display = "";
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-img").alt = alt || "";
  document.getElementById("lightbox-video").style.display = "none";
  document.getElementById("lightbox-video-iframe").src = "";
  document.getElementById("lightbox-content").style.display = "none";
  document.getElementById("lightbox-content").innerHTML = "";
  lightbox.classList.add("is-open");
}
function openVideoLightbox(embedUrl) {
  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightbox-img").style.display = "none";
  document.getElementById("lightbox-img").src = "";
  document.getElementById("lightbox-video").style.display = "block";
  document.getElementById("lightbox-video-iframe").src = embedUrl;
  document.getElementById("lightbox-content").style.display = "none";
  document.getElementById("lightbox-content").innerHTML = "";
  lightbox.classList.add("is-open");
}
function openContentLightbox(html) {
  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightbox-img").style.display = "none";
  document.getElementById("lightbox-img").src = "";
  document.getElementById("lightbox-video").style.display = "none";
  document.getElementById("lightbox-video-iframe").src = "";
  const content = document.getElementById("lightbox-content");
  content.style.display = "block";
  content.innerHTML = html;
  lightbox.classList.add("is-open");
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("is-open");
  document.getElementById("lightbox-video-iframe").src = "";
  document.getElementById("lightbox-content").innerHTML = "";
}
document.getElementById("lightbox").addEventListener("click", closeLightbox);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.view === "demo") {
      window.open("store/index.html", "_blank", "noopener");
      return;
    }
    runtime.view = btn.dataset.view;
    renderMain();
  });
});

document.getElementById("reset-btn").addEventListener("click", () => {
  if (confirm("Reset all course progress, quiz scores and points? This can't be undone.")) {
    progress = { completed: {} };
    saveProgress();
    runtime.quiz = {};
    runtime.exercise = {};
    runtime.sectionId = 0;
    runtime.view = "course";
    renderMain();
  }
});

/* ---------- Init ---------- */
renderMain();
