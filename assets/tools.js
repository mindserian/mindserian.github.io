/* Laman Minda — interactive exercises (breathing circle, step-by-step guides, meditations).
   Ported from Minda Tenang v1.0 (Hospital Serian). Voice uses the phone's own text-to-speech;
   background sound and bell are generated on the phone. Nothing is recorded or sent anywhere. */
(function () {
  "use strict";
  var DATA = window.LM_TOOLS; if (!DATA) return;
  var root = document.documentElement;
  function curLang() { return root.getAttribute("data-lang") === "en" ? "en" : "ms"; }
  var LANG = curLang();
  var CFG = { audio: DATA.audio || {} };
  var cleanup = [], routeArg = null;
  function C() { return DATA[LANG]; }
  function U() { return DATA[LANG].ui; }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem("lm-" + k); localStorage.setItem("lm-" + k, v); } catch (e) { return null; }
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmt(s) {
    var t = esc(s);
    t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<em>$2</em>");
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, label, href) {
      if (/^https?:\/\//.test(href)) return '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
      var r = (DATA.routes || {})[href.replace(/^#\//, "")];
      return r ? '<a href="' + r + '">' + label + "</a>" : label;
    });
    return t;
  }
  /* ---------- voice (ported from v0.7) ----------
     Uses a recorded MP3 if one is listed in CFG.audio[LANG] (content/config.js), otherwise the
     phone's own text-to-speech voice. Only guide text is spoken; nothing is sent anywhere. */
  var hasTTS = "speechSynthesis" in window;
  var SOFT = /yasmin|amira|damayanti|gadis|siti|nurul|samantha|karen|moira|tessa|serena|fiona|victoria|susan|zira|hazel|libby|sonia|maisie|aria|jenny|natasha|clara|emma|ava|allison|female|wanita/;
  var HARD = /osman|rizwan|ardi|david|mark|george|daniel|alex|fred|ryan|guy|thomas|william|male/;
  var voiceCache = {};
  function vscore(v) {
    var n = (v.name || "").toLowerCase(), sc = 0;
    if (/natural|neural|enhanced|premium|siri/.test(n)) sc += 4;
    if (SOFT.test(n)) sc += 3; else if (HARD.test(n)) sc -= 2;
    if (/compact|espeak|robot/.test(n)) sc -= 4;
    if (v.localService) sc += 1;
    return sc;
  }
  function pickVoice() {
    if (!hasTTS) return null;
    if (voiceCache[LANG]) return voiceCache[LANG];
    var vs = speechSynthesis.getVoices() || [];
    var want = LANG === "ms" ? ["ms", "id"] : ["en"];   // no Malay voice? Indonesian reads BM well
    for (var w = 0; w < want.length; w++) {
      var best = null, bs = -99;
      for (var i = 0; i < vs.length; i++) {
        if (vs[i].lang && vs[i].lang.toLowerCase().replace("_", "-").indexOf(want[w]) === 0) {
          var sc = vscore(vs[i]);
          if (sc > bs) { bs = sc; best = vs[i]; }
        }
      }
      if (best) { voiceCache[LANG] = best; return best; }
    }
    return null;
  }
  function voiceOn() { return store("mt-voice") !== "0"; }        // on by default, as in v0.7
  function setVoice(on) { store("mt-voice", on ? "1" : "0"); if (!on) hush(); }
  var VOICE = { rate: 0.8, pitch: 0.95, volume: 0.9, gap: 600 };   // calm pace, short pause between phrases
  var speakToken = 0, curAudio = null;
  function phrases(text) {
    return String(text).split(/\n+/).reduce(function (a, line) {
      return a.concat(line.match(/[^.!?…]+[.!?…]*["”']?/g) || []);
    }, []).map(function (x) { return x.trim(); }).filter(function (x) { return /[0-9A-Za-zÀ-ÿ]/.test(x); });
  }
  function plainText(s) { return String(s).replace(/\*\*|\*/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1"); }
  function tts(text) {
    if (!hasTTS) return;
    var my = ++speakToken, parts = phrases(plainText(text)), i = 0, v = pickVoice();
    function next() {
      if (my !== speakToken || i >= parts.length) return;
      var t = parts[i++], fired = false, safety;
      function done() { if (fired) return; fired = true; clearTimeout(safety); setTimeout(next, VOICE.gap); }
      try {   // a voice problem must never stop the exercise itself
        var utt = new SpeechSynthesisUtterance(t);
        utt.lang = v ? v.lang : (LANG === "ms" ? "ms-MY" : "en-GB");
        if (v) { try { utt.voice = v; } catch (e) {} }
        utt.rate = VOICE.rate; utt.pitch = VOICE.pitch; utt.volume = VOICE.volume;
        utt.onend = done; utt.onerror = done;
        speechSynthesis.speak(utt);
        safety = setTimeout(done, 2500 + t.split(/\s+/).length * 650 / VOICE.rate);   // some phones never fire onend
      } catch (e) { done(); }
    }
    next();
  }
  function hush() {
    speakToken++;
    if (curAudio) { try { curAudio.pause(); } catch (e) {} curAudio = null; }
    if (hasTTS) { try { speechSynthesis.cancel(); } catch (e) {} }
  }
  function guideSay(text, key) {       // spoken guide line: recorded file if available, else TTS
    if (!voiceOn()) return;
    hush();
    var file = ((CFG.audio || {})[LANG] || {})[key];
    if (file) {
      try {
        curAudio = new Audio(file); curAudio.volume = 0.9;
        var pr = curAudio.play();
        if (pr && pr.catch) pr.catch(function () { tts(text); });
        return;
      } catch (e) {}
    }
    tts(text);
  }
  function say(text, onend) {          // plain reading (Read this page aloud)
    if (!hasTTS) { if (onend) onend(); return; }
    var ut = new SpeechSynthesisUtterance(text), v = pickVoice();
    if (v) { try { ut.voice = v; } catch (e) {} }
    ut.lang = v ? v.lang : (LANG === "ms" ? "ms-MY" : "en-GB");
    ut.rate = 0.92;
    if (onend) { ut.onend = onend; ut.onerror = onend; }
    speechSynthesis.speak(ut);
  }

  /* ---------- soft background sound + bell (ported from v0.7) ----------
     Generated on the phone with Web Audio: no sound files, nothing downloaded or sent.
     Off by default; plays only while an exercise is running. */
  var AC = window.AudioContext || window.webkitAudioContext;
  var AMBS = ["off", "rain", "hum"];
  var actx = null, ambNode = null, ambEnd = null;
  function amb() { var a = store("mt-amb"); return AMBS.indexOf(a) > 0 ? a : "off"; }
  function actxGet() {
    if (!AC) return null;
    try { if (!actx) actx = new AC(); if (actx.state === "suspended") actx.resume(); } catch (e) { actx = null; }
    return actx;
  }
  function makeRain(c) {
    var len = c.sampleRate * 4, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    var b0 = 0, b1 = 0, b2 = 0;
    for (var i = 0; i < len; i++) {   // pink-ish noise
      var w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.0990460; b1 = 0.96300 * b1 + w * 0.2965164; b2 = 0.57000 * b2 + w * 1.0526913;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.18;
    }
    var src = c.createBufferSource(); src.buffer = buf; src.loop = true;
    var lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1100;
    var hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 180;
    src.connect(hp); hp.connect(lp); src.start();
    return { out: lp, stop: function () { try { src.stop(); } catch (e) {} } };
  }
  function makeHum(c) {
    var mix = c.createGain(); mix.gain.value = 0.35;
    var lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 700;
    var oscs = [[110, 0.5], [164.81, 0.3], [220.4, 0.18], [329.6, 0.06]].map(function (f) {
      var o = c.createOscillator(), g = c.createGain();
      o.type = "sine"; o.frequency.value = f[0]; g.gain.value = f[1];
      o.connect(g); g.connect(mix); o.start(); return o;
    });
    var lfo = c.createOscillator(), lg = c.createGain();   // slow swell, like breathing
    lfo.frequency.value = 0.09; lg.gain.value = 0.12; lfo.connect(lg); lg.connect(mix.gain); lfo.start();
    mix.connect(lp);
    return { out: lp, stop: function () { oscs.concat([lfo]).forEach(function (o) { try { o.stop(); } catch (e) {} }); } };
  }
  function ambStart() {
    clearTimeout(ambEnd);
    var a = amb();
    if (a === "off" || ambNode) return;
    var c = actxGet(); if (!c) return;
    try {
      var n = a === "rain" ? makeRain(c) : makeHum(c), g = c.createGain();
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.linearRampToValueAtTime(a === "rain" ? 0.22 : 0.16, c.currentTime + 3);   // fade in
      n.out.connect(g); g.connect(c.destination);
      ambNode = { n: n, g: g };
    } catch (e) { ambNode = null; }
  }
  function ambStop() {
    clearTimeout(ambEnd);
    if (!ambNode || !actx) { ambNode = null; return; }
    var a = ambNode, t = actx.currentTime; ambNode = null;
    try {
      a.g.gain.cancelScheduledValues(t); a.g.gain.setValueAtTime(a.g.gain.value, t);
      a.g.gain.linearRampToValueAtTime(0.0001, t + 1.5);   // fade out
      setTimeout(function () { a.n.stop(); try { a.g.disconnect(); } catch (e) {} }, 1700);
    } catch (e) { a.n.stop(); }
  }
  function bell() {   // one soft bell at the start and end of a meditation
    if (!voiceOn() && amb() === "off") return;
    var c = actxGet(); if (!c) return;
    try {
      var t = c.currentTime, out = c.createGain();
      out.gain.setValueAtTime(0.0001, t); out.gain.linearRampToValueAtTime(0.18, t + 0.02);
      out.gain.exponentialRampToValueAtTime(0.0001, t + 4.5);
      out.connect(c.destination);
      [[528, 1], [1056, 0.25], [1584, 0.08]].forEach(function (f) {
        var o = c.createOscillator(), g = c.createGain();
        o.type = "sine"; o.frequency.value = f[0]; g.gain.value = f[1];
        o.connect(g); g.connect(out); o.start(t); o.stop(t + 4.6);
      });
    } catch (e) {}
  }

  /* shared option row for tools: voice on/off + background sound */
  function optsRow(id, withAmb) {
    var u = U(), html = "";
    if (hasTTS || Object.keys((CFG.audio || {})[LANG] || {}).length) {
      html += '<label class="toggle" for="' + id + '-voice"><input type="checkbox" id="' + id + '-voice"' + (voiceOn() ? " checked" : "") + "> " + esc(u.voiceGuide) + "</label>";
    }
    if (withAmb && AC) {
      html += '<label class="sel" for="' + id + '-amb"><span>' + esc(u.ambLabel) + '</span><select id="' + id + '-amb">' +
        AMBS.map(function (a) { return '<option value="' + a + '"' + (a === amb() ? " selected" : "") + ">" + esc(u.amb[a]) + "</option>"; }).join("") +
        "</select></label>";
    }
    return html ? '<div class="row center opts-row">' + html + "</div>" : "";
  }
  function wireOpts(slot, id) {
    var v = slot.querySelector("#" + id + "-voice"), a = slot.querySelector("#" + id + "-amb");
    if (v) v.addEventListener("change", function () { setVoice(v.checked); });
    if (a) a.addEventListener("change", function () {
      var running = !!ambNode;
      store("mt-amb", a.value); ambStop();
      if (running) ambStart();
    });
  }
  function voiceNote() {
    var u = U();
    if (!hasTTS) return '<p class="small">' + esc(u.noVoice) + "</p>";
    var v = pickVoice();
    if (LANG === "ms" && v && v.lang.toLowerCase().indexOf("ms") !== 0) return '<p class="small">' + esc(u.noBmVoice) + "</p>";
    return "";
  }

  /* 1. Breathing circle ------------------------------------------------ */
  function toolBreathe(slot, arg) {
    var u = U(), t = u.tools.breathe;
    var patterns = {
      calm: [["in", 4], ["out", 6]],
      box: [["in", 5], ["hold", 5], ["out", 6], ["hold", 5]]
    };
    var mode = "box";   // MO decision 23/09/2026: one pattern only (5-5-6-5)
    slot.innerHTML =
      '<div class="breathe" data-noread>' +
      
      '<div class="orb-wrap"><div class="orb" id="orb"><span class="orb-word" id="orb-word">' + esc(t.ready) + '</span><span class="orb-count" id="orb-count"></span></div></div>' +
      '<p class="orb-status" id="orb-status" role="status">' + esc(t.readyNote) + "</p>" +
      '<div class="row center"><button type="button" class="btn" id="br-start">' + esc(t.start1) + '</button>' +
      '<button type="button" class="btn ghost" id="br-loop">' + esc(t.keepGoing) + '</button>' +
      '<button type="button" class="btn ghost" id="br-stop" hidden>' + esc(u.stop) + "</button></div>" +
      optsRow("br", true) + voiceNote() +
      '<p class="small">' + fmt(t.care) + "</p></div>";

    var orb = slot.querySelector("#orb"), word = slot.querySelector("#orb-word"), cnt = slot.querySelector("#orb-count"),
      status = slot.querySelector("#orb-status"), bStart = slot.querySelector("#br-start"), bLoop = slot.querySelector("#br-loop"),
      bStop = slot.querySelector("#br-stop");
    var timer = null, phase = 0, left = 0, rounds = 0, elapsed = 0, finite = true;
    wireOpts(slot, "br");

    Array.prototype.forEach.call(slot.querySelectorAll("[data-mode]"), function (b) {
      b.addEventListener("click", function () {
        mode = b.getAttribute("data-mode");
        Array.prototype.forEach.call(slot.querySelectorAll("[data-mode]"), function (x) { x.setAttribute("aria-checked", x === b); });
        stop(true);
      });
    });
    function statusText() {
      if (finite && mode === "calm") return t.calmLeft.replace("{s}", Math.max(0, 60 - elapsed));
      if (finite) return t.roundsOf.replace("{n}", rounds).replace("{m}", 3);
      return t.rounds.replace("{n}", rounds) + " · " + t.minutes.replace("{m}", Math.floor(elapsed / 60)).replace("{s}", ("0" + elapsed % 60).slice(-2));
    }
    function setPhase() {
      var ph = patterns[mode][phase];
      left = ph[1];
      word.textContent = t.words[ph[0]];
      orb.className = "orb " + ph[0];
      orb.style.transitionDuration = ph[1] + "s";
      cnt.textContent = left;
      guideSay(u.tools.breathe.voice[ph[0]], "breath-" + { in: "inhale", out: "exhale", hold: "hold" }[ph[0]]);
    }
    function tick() {
      left--; elapsed++;
      if (left <= 0) {
        phase = (phase + 1) % patterns[mode].length;
        if (phase === 0) {
          rounds++;
          // finite: 1 minute of 4-6 (6 rounds), or 3 rounds of box (~63 s)
          if (finite && ((mode === "calm" && elapsed >= 60) || (mode === "box" && rounds >= 3))) { finish(); return; }
        }
        setPhase();
      } else cnt.textContent = left;
      status.textContent = statusText();
    }
    function start(loop) {
      stop(true);
      finite = !loop; phase = 0; rounds = 0; elapsed = 0;
      bStart.hidden = true; bLoop.hidden = true; bStop.hidden = false;
      ambStart();
      setPhase();
      status.textContent = statusText();
      timer = setInterval(tick, 1000);
    }
    function finish() {
      clearInterval(timer); timer = null;
      orb.className = "orb done"; word.textContent = t.doneWord; cnt.textContent = "";
      status.textContent = mode === "calm" ? t.done : t.doneBox;
      guideSay(status.textContent, "breath-done");
      ambEnd = setTimeout(ambStop, 3000);
      bStart.hidden = false; bStart.textContent = t.again; bLoop.hidden = false; bStop.hidden = true;
    }
    function stop(silent) {
      if (timer) clearInterval(timer);
      timer = null;
      orb.className = "orb"; orb.style.transitionDuration = "1.2s"; word.textContent = t.ready; cnt.textContent = "";
      bStart.hidden = false; bStart.textContent = t.start1; bLoop.hidden = false; bStop.hidden = true;
      status.textContent = silent === true ? t.readyNote : t.stopped;
      hush(); ambStop();
    }
    bStart.addEventListener("click", function () { start(false); });
    bLoop.addEventListener("click", function () { start(true); });
    bStop.addEventListener("click", function () { stop(false); });
    cleanup.push(function () { if (timer) clearInterval(timer); });
  }

  /* 2. Step-by-step guide (grounding, relaxation, meditations, resets) */
  function mmss(s) { return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
  // audio keys follow v0.7 and the recording script (2026-09-18-skrip-rakaman-suara.docx)
  var AUDIO_ID = { medbreath: "med-breath-guide", bodyscan: "med-body-guide", medplace: "med-place-guide",
    medkind: "med-kind-guide", pmr: "pmr-guide", pause: "pause-guide" };
  function toolGuide(slot, key) {
    var u = U(), g = C().guides[key], aid = AUDIO_ID[key] || key;
    if (!g) return;
    var i = -1, left = 0, timer = null, paused = false, gone = 0;
    var total = g.steps.reduce(function (a, s) { return a + (s[1] || 0); }, 0);
    slot.innerHTML =
      '<div class="guide' + (g.med ? " med" : "") + '" data-noread>' +
      '<div class="guide-top"><b>' + esc(g.name) + '</b><small>' + esc(g.time) + "</small></div>" +
      '<div class="gbar" aria-hidden="true"><i id="g-bar"></i></div>' +
      '<div class="gcard" id="g-card" aria-live="polite">' +
      (g.med ? '<div class="gorb" aria-hidden="true"><i></i></div>' : "") +
      '<p class="gstep" id="g-step">' + esc(u.stepOf.replace("{i}", 0).replace("{n}", g.steps.length)) + "</p>" +
      '<p class="gbig" id="g-big" hidden></p>' +
      '<p class="gtext" id="g-text">' + fmt(g.intro) + "</p>" +
      '<p class="gcount" id="g-count" aria-hidden="true"></p></div>' +
      '<div class="row center">' +
      '<button type="button" class="btn ghost" id="g-back" hidden>' + esc(u.back) + "</button>" +
      '<button type="button" class="btn" id="g-next">' + esc(u.start) + "</button>" +
      '<button type="button" class="btn ghost" id="g-pause" hidden>' + esc(u.pause) + "</button>" +
      '<button type="button" class="btn ghost" id="g-stop" hidden>' + esc(u.stop) + "</button></div>" +
      optsRow("g-" + key, !!g.med) + voiceNote() +
      (g.care ? '<p class="small">' + fmt(g.care) + "</p>" : "") + "</div>";

    var bar = slot.querySelector("#g-bar"), stepEl = slot.querySelector("#g-step"), big = slot.querySelector("#g-big"),
      text = slot.querySelector("#g-text"), count = slot.querySelector("#g-count"), card = slot.querySelector(".guide"),
      bBack = slot.querySelector("#g-back"), bNext = slot.querySelector("#g-next"), bPause = slot.querySelector("#g-pause"),
      bStop = slot.querySelector("#g-stop");
    wireOpts(slot, "g-" + key);

    function clear() { if (timer) clearInterval(timer); timer = null; }
    function goneBefore(n) { var s = 0; for (var k = 0; k < n; k++) s += g.steps[k][1] || 0; return s; }
    function finish() {
      clear();
      stepEl.textContent = u.finished; big.hidden = true; count.textContent = "";
      text.innerHTML = fmt(g.done); bar.style.width = "100%";
      bNext.textContent = u.again; bBack.hidden = true; bPause.hidden = true; bStop.hidden = true;
      card.classList.remove("on");
      if (g.med) bell();
      setTimeout(function () { guideSay(g.done, aid + "-done"); }, g.med ? 1200 : 0);
      ambEnd = setTimeout(ambStop, 6000);
      i = -2;
    }
    function show() {
      clear();
      if (i >= g.steps.length) { finish(); return; }
      var s = g.steps[i];  // [text, seconds, bigLabel]
      stepEl.textContent = u.stepOf.replace("{i}", i + 1).replace("{n}", g.steps.length);
      if (s[2]) { big.hidden = false; big.textContent = s[2]; } else big.hidden = true;
      text.innerHTML = fmt(s[0]);
      gone = goneBefore(i);
      bar.style.width = Math.round((total ? gone / total : i / g.steps.length) * 100) + "%";
      bNext.textContent = i === g.steps.length - 1 ? u.finish : u.next;
      bBack.hidden = i === 0; bStop.hidden = false;
      left = s[1] || 0;
      bPause.hidden = !left; paused = false; bPause.textContent = u.pause;
      function paint() { count.textContent = left ? (g.med ? mmss(Math.max(0, total - gone)) + " " + u.timeLeft : left + " s") : ""; }
      paint();
      guideSay(s[0], aid + "-" + (i + 1));
      if (left) timer = setInterval(function () {
        if (paused) return;
        left--; gone++;
        if (total) bar.style.width = Math.round(gone / total * 100) + "%";
        paint();
        if (left <= 0) { i++; show(); }
      }, 1000);
    }
    function begin() {
      i = 0; card.classList.add("on"); ambStart();
      if (g.med) { bell(); text.textContent = "…"; timer = setTimeout(function () { timer = null; show(); }, 1500); }
      else show();
    }
    bNext.addEventListener("click", function () {
      if (i === -1 || i === -2) { begin(); return; }
      i++; show();
    });
    bBack.addEventListener("click", function () { if (i > 0) { i--; show(); } });
    bPause.addEventListener("click", function () {
      paused = !paused; bPause.textContent = paused ? u.resume : u.pause;
      if (paused) hush();
    });
    bStop.addEventListener("click", function () {
      clear(); hush(); ambStop(); card.classList.remove("on");
      i = -1; stepEl.textContent = u.stopped; big.hidden = true; count.textContent = "";
      text.innerHTML = fmt(g.intro); bar.style.width = "0%";
      bNext.textContent = u.start; bBack.hidden = true; bPause.hidden = true; bStop.hidden = true;
    });
    cleanup.push(function () { clear(); });
  }


  var TOOLS = { breathe: toolBreathe, guide: toolGuide };
  function stopAll() {
    cleanup.forEach(function (f) { try { f(); } catch (e) {} });
    cleanup = []; hush(); ambStop();
  }
  function renderAll() {
    stopAll(); LANG = curLang();
    Array.prototype.forEach.call(document.querySelectorAll(".tool-slot"), function (slot) {
      var f = TOOLS[slot.getAttribute("data-tool")];
      if (f) f(slot, slot.getAttribute("data-arg") || null);
    });
  }
  if ("speechSynthesis" in window) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = function () {}; } catch (e) {} }
  document.addEventListener("lm:lang", renderAll);
  window.addEventListener("pagehide", stopAll);
  renderAll();
})();
