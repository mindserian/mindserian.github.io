/* Minda Tenang — app logic.
   Hash routes (#/urgent, #/calm …) so every page has its own link and the phone's Back button works.
   All wording lives in content/ms.js and content/en.js. The site itself makes no network requests
   (the phone's own text-to-speech service may behave differently; see About page). */
(function () {
  "use strict";

  var SITE = {
    version: "0.7",
    reviewed: "22/09/2026",
    draft: true            // set to false after HOD sign-off: hides the draft banner
  };

  // Phone numbers are the same in both languages. Checked 18/09/2026 (see Content Evidence Base §6).
  var LINES = [
    { key: "heal",   tel: "15555",       show: "15555" },
    { key: "bfkch",  tel: "082242800",   show: "082-242 800" },
    { key: "bfkl",   tel: "0376272929",  show: "03-7627 2929" },
    { key: "kasih",  tel: "15999",       show: "15999" },
    { key: "miasa",  tel: "1800180066",  show: "1800 180 066" },
    { key: "mhak",   tel: "082231459",   show: "082-231 459" }
  ];
  var DEPT = { tel: "0133362896", show: "013-336 2896" };

  // Anonymous suggestion form (Google Forms, owned by the unit). Opens in a new tab; nothing is sent from this site.
  var FEEDBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLScMLOH_tChxjNBxlmL39CdWqtF9_FIYZ2uqgoRFDm5vqwy2TA/viewform";

  // Colour of the rounded square behind each page's icon.
  var TONE = {
    calm: "teal", toolbox: "amber", learn: "blue", sleep: "purple", medicine: "emerald",
    appointment: "indigo", family: "sky", urgent: "rose", about: "teal",
    anxiety: "blue", panic: "orange", stress: "amber", depression: "violet", psychosis: "sky",
    manage: "emerald", plan: "teal", signs: "amber", videos: "indigo"
  };
  function tone(id) { return TONE[id] || "teal"; }
  function icTile(icon, id) {
    return '<span class="ic-tile t-' + tone(id) + '" aria-hidden="true">' + (icon || "") + "</span>";
  }

  document.documentElement.className += " js";   // CSS hides JS-only controls when scripts are off
  var C = window.MT_CONTENT;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var lang = store.get("mt-lang") === "ms" ? "ms" : "en";   // English is the default (v0.7); BM is one tap away
  var big = store.get("mt-big") === "1";
  // Colour theme: "auto" follows the phone's setting; the header button cycles auto → light → dark.
  var THEMES = ["auto", "light", "dark"];
  var theme = THEMES.indexOf(store.get("mt-theme")) > 0 ? store.get("mt-theme") : "auto";
  function applyTheme() {
    if (theme === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", theme);
  }
  applyTheme();
  var app = document.getElementById("app");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timer = null;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  // Tiny inline formatter: **bold**, *italic*, [label](#/route), [label](tel:…) or [label](https://…)
  function extTag() { return '<span class="sr-only"> ' + esc(U().ext) + '</span> <span aria-hidden="true">\u2197</span>'; }
  function fmt(s) {
    return esc(s)
      .replace(/\[(.+?)\]\((https:\/\/[^)\s]+)\)/g, function (m, t, u) {
        return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + extTag() + "</a>";
      })
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.+?)\*/g, "<i>$1</i>")
      .replace(/\[(.+?)\]\(((?:#\/|tel:)[^)\s]*)\)/g, '<a href="$2">$1</a>');
  }
  function U() { return C[lang].ui; }
  function P(id) { return C[lang].pages[id]; }

  /* ---------- voice guide ----------
     Uses a recorded MP3 if one is listed in ui.audio (content/*.js), otherwise the phone's own
     text-to-speech voice. Nothing is sent anywhere. */
  var voiceOn = store.get("mt-voice") !== "0";
  var curAudio = null;
  var hasTTS = "speechSynthesis" in window;
  // Softer voice: among voices for the language, prefer natural/neural and gentle (usually female)
  // voices; avoid robotic "compact"/eSpeak ones. Guide text only (no personal data) is spoken.
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
    if (voiceCache[lang]) return voiceCache[lang];
    var vs = speechSynthesis.getVoices() || [];
    var want = lang === "ms" ? ["ms", "id"] : ["en"];   // no Malay voice? Indonesian reads BM well
    for (var w = 0; w < want.length; w++) {
      var best = null, bs = -99;
      for (var i = 0; i < vs.length; i++) {
        if (vs[i].lang && vs[i].lang.toLowerCase().replace("_", "-").indexOf(want[w]) === 0) {
          var sc = vscore(vs[i]);
          if (sc > bs) { bs = sc; best = vs[i]; }
        }
      }
      if (best) { voiceCache[lang] = best; return best; }
    }
    return null;
  }
  var VOICE = { rate: 0.8, pitch: 0.95, volume: 0.9, gap: 600 };   // calm pace + a short pause between phrases
  var speakToken = 0;
  function phrases(text) {
    return String(text).split(/\n+/).reduce(function (a, line) {
      return a.concat(line.match(/[^.!?…]+[.!?…]*["”']?/g) || []);
    }, []).map(function (x) { return x.trim(); }).filter(function (x) { return /[0-9A-Za-zÀ-ÿ]/.test(x); });
  }
  // Speaks text one phrase at a time, with a gentle pause between. Returns a handle whose onend fires at the end.
  function tts(text, rate, gap) {
    if (!hasTTS) return null;
    var ctl = { onend: null }, my = ++speakToken, parts = phrases(text), i = 0, v = pickVoice();
    function next() {
      if (my !== speakToken) return;
      if (i >= parts.length) { if (ctl.onend) ctl.onend(); return; }
      var t = parts[i++], fired = false, safety;
      function done() { if (fired) return; fired = true; clearTimeout(safety); setTimeout(next, gap == null ? VOICE.gap : gap); }
      try {   // a voice problem must never stop the exercise itself
        var utt = new SpeechSynthesisUtterance(t);
        utt.lang = v ? v.lang : (lang === "ms" ? "ms-MY" : "en-GB");
        if (v) { try { utt.voice = v; } catch (e) {} }
        utt.rate = rate || VOICE.rate; utt.pitch = VOICE.pitch; utt.volume = VOICE.volume;
        utt.onend = done; utt.onerror = done;
        speechSynthesis.speak(utt);
        // some phones never fire onend: move on after a generous estimate (speak() queues, so no overlap)
        safety = setTimeout(done, 2500 + t.split(/\s+/).length * 650 / (rate || VOICE.rate));
      } catch (e) { done(); }
    }
    next();
    return ctl;
  }
  function hush() {
    speakToken++;
    if (curAudio) { try { curAudio.pause(); } catch (e) {} curAudio = null; }
    if (hasTTS) { try { speechSynthesis.cancel(); } catch (e) {} }
  }
  function say(text, key) {
    if (!voiceOn) return;
    hush();
    var file = (U().audio || {})[key];
    if (file) {
      try {
        curAudio = new Audio(file);
        curAudio.volume = 0.9;
        var pr = curAudio.play();
        if (pr && pr.catch) pr.catch(function () { tts(text); });
        return;
      } catch (e) {}
    }
    tts(text);
  }
  /* ---------- soft background sound + bell ----------
     Generated on the phone with Web Audio: no sound files, nothing downloaded or sent.
     Off by default; plays only while an exercise is running. */
  var AC = window.AudioContext || window.webkitAudioContext;
  var AMBS = ["off", "rain", "hum"];
  var amb = AMBS.indexOf(store.get("mt-amb")) > 0 ? store.get("mt-amb") : "off";
  var actx = null, ambNode = null, ambEnd = null;
  function ctx() {
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
    src.connect(hp); hp.connect(lp);
    src.start();
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
    if (amb === "off" || ambNode) return;
    var c = ctx(); if (!c) return;
    try {
      var n = amb === "rain" ? makeRain(c) : makeHum(c), g = c.createGain();
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.linearRampToValueAtTime(amb === "rain" ? 0.22 : 0.16, c.currentTime + 3);   // fade in
      n.out.connect(g); g.connect(c.destination);
      ambNode = { n: n, g: g };
    } catch (e) { ambNode = null; }
  }
  function ambStop() {
    if (!ambNode || !actx) { ambNode = null; return; }
    var a = ambNode, t = actx.currentTime; ambNode = null;
    try {
      a.g.gain.cancelScheduledValues(t); a.g.gain.setValueAtTime(a.g.gain.value, t);
      a.g.gain.linearRampToValueAtTime(0.0001, t + 1.5);   // fade out
      setTimeout(function () { a.n.stop(); try { a.g.disconnect(); } catch (e) {} }, 1700);
    } catch (e) { a.n.stop(); }
  }
  function bell() {   // one soft bell at the start and end of a meditation
    if (!voiceOn && amb === "off") return;
    var c = ctx(); if (!c) return;
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
  function ambBtn() {
    if (!AC) return "";
    var u = U();
    return '<button class="tbtn vbtn" type="button" id="atoggle" aria-pressed="' + (amb !== "off") + '">' +
      esc(u.amb[amb]) + "</button>";
  }

  function voiceBtn() {
    var u = U();
    if (!hasTTS && !Object.keys(u.audio || {}).length) return "";
    return '<button class="tbtn vbtn" type="button" id="vtoggle" aria-pressed="' + voiceOn + '">' +
      (voiceOn ? "🔈 " : "🔇 ") + esc(voiceOn ? u.voiceOn : u.voiceOff) + "</button>";
  }
  function voiceNote() {
    var u = U();
    if (!hasTTS) return '<p class="fine">' + esc(u.voiceNone) + "</p>";
    var vs = speechSynthesis.getVoices() || [];
    if (lang === "ms" && vs.length && !pickVoice()) return '<p class="fine" id="vnote">' + esc(u.voiceNoBM) + "</p>";
    return '<p class="fine" id="vnote"></p>';
  }

  /* ---------- block renderer ---------- */
  function blocks(list) { return (list || []).map(block).join(""); }
  function li(items) { return items.map(function (x) { return "<li>" + fmt(x) + "</li>"; }).join(""); }

  function block(b) {
    var u = U();
    switch (b.t) {
      case "h":  return "<h2>" + fmt(b.x) + "</h2>";
      case "h3": return "<h3>" + fmt(b.x) + "</h3>";
      case "p":  return "<p>" + fmt(b.x) + "</p>";
      case "ul": return "<ul>" + li(b.items) + "</ul>";
      case "ol": return "<ol>" + li(b.items) + "</ol>";
      case "box":
        return '<section class="box ' + (b.tone || "blue") + '">' +
          (b.title ? "<h2>" + fmt(b.title) + "</h2>" : "") + blocks(b.body) + "</section>";
      case "card":
        return '<section class="card">' + (b.title ? "<h2>" + fmt(b.title) + "</h2>" : "") + blocks(b.body) + "</section>";
      case "call999":
        return '<a class="call" href="tel:999">' + phoneIcon() + esc(u.call999) + "</a>";
      case "go":
        return '<a class="go ' + (b.tone || "") + '" href="' + esc(b.to) + '">' + esc(b.x) + "</a>";
      case "links":
        return '<div class="links">' + b.items.map(function (it) {
          var pg = P(it) || {};
          return '<a class="link" href="#/' + it + '">' + icTile(pg.icon, it) +
            "<div><b>" + esc(pg.title || it) + "</b>" + (pg.short ? "<small>" + esc(pg.short) + "</small>" : "") +
            '</div><span class="arr" aria-hidden="true">›</span></a>';
        }).join("") + "</div>";
      case "ex": return exercise(b);
      case "situations": return situations(b.items);
      case "helplines": return helplines();
      case "dept":
        return '<a class="line" href="tel:' + DEPT.tel + '"><div><b>' + esc(u.deptName) + "</b><small>" + esc(u.deptHours) +
          '</small></div><span class="num">' + DEPT.show + "</span></a>";
      case "checklist": return checklist(b.items);
      case "video": return video(b.v);
      case "videos": return '<div class="vids">' + b.items.map(video).join("") + "</div>";
      default: return "";
    }
  }

  function exercise(e) {
    var u = U();
    var tool = e.tool ? '<a class="go" href="#/' + e.tool + '">' + esc(e.toolLabel || u.startGuide) + "</a>" : "";
    return '<article class="card" id="ex-' + esc(e.id) + '"><h2>' + esc(e.name) + "</h2>" +
      '<div class="meta"><span class="chip">' + esc(e.time) + "</span></div>" +
      '<p><span class="lbl">' + esc(u.when) + "</span> " + fmt(e.when) + "</p>" +
      (e.steps ? "<ol>" + li(e.steps) + "</ol>" : "") +
      (e.body ? blocks(e.body) : "") +
      (e.notice ? '<p><span class="lbl">' + esc(u.notice) + "</span> " + fmt(e.notice) + "</p>" : "") +
      (e.care ? '<p class="caution"><span class="lbl">' + esc(u.care) + "</span> " + fmt(e.care) + "</p>" : "") +
      tool + (e.video ? video(e.video) : "") + "</article>";
  }

  var SIT_TONES = ["blue", "orange", "violet", "sky", "rose", "purple", "amber", "emerald"];
  function situations(items) {
    var u = U();
    return '<div class="stack">' + items.map(function (s, si) {
      return '<details class="sit"><summary><span class="ic-tile t-' + SIT_TONES[si % SIT_TONES.length] + '" aria-hidden="true">' + (s.icon || "") + "</span>" + esc(s.feel) +
        '</summary><div class="in">' +
        '<p><span class="lbl">' + esc(u.tryFirst) + "</span> " + fmt(s.first) + "</p>" +
        '<p><span class="lbl">' + esc(u.then) + "</span> " + fmt(s.then) + "</p>" +
        '<p class="caution"><span class="lbl">' + esc(u.care) + "</span> " + fmt(s.care) + "</p>" +
        "</div></details>";
    }).join("") + "</div>";
  }

  function helplines() {
    var u = U();
    return '<div class="links">' + LINES.map(function (l) {
      var d = u.lines[l.key] || [l.key, ""];
      return '<a class="line" href="tel:' + l.tel + '"><div><b>' + esc(d[0]) + "</b><small>" + esc(d[1]) +
        '</small></div><span class="num">' + esc(l.show) + "</span></a>";
    }).join("") + "</div>";
  }

  function checklist(items) {
    var u = U();
    return '<form class="card check" onsubmit="return false">' + items.map(function (q, i) {
      var id = "q" + i, inner = "";
      if (q.ticks) {
        inner = '<div class="ticks" role="group" aria-labelledby="' + id + '">' + q.ticks.map(function (o) {
          return '<label><input type="checkbox"> <span>' + fmt(o) + "</span></label>";
        }).join("") + "</div>";
      }
      if (q.opts) {
        inner = '<div class="opts" role="group" aria-labelledby="' + id + '">' + q.opts.map(function (o) {
          return '<label><input type="radio" name="' + id + '"> ' + esc(o) + "</label>";
        }).join("") + "</div>";
      }
      if (q.text !== false && !q.opts && !q.ticks || q.text) {
        inner += '<textarea aria-labelledby="' + id + '" rows="2"></textarea>';
      }
      return '<div class="q' + (q.zone ? " zone-" + q.zone : "") + '"><span class="qh" id="' + id + '">' + fmt(q.q) + "</span>" +
        (q.hint ? '<p class="hint">' + fmt(q.hint) + "</p>" : "") + inner + "</div>";
    }).join("") +
      '<p class="fine">' + esc(u.checkPrivacy) + "</p>" +
      '<div class="noprint btnrow">' +
      '<button class="go" type="button" id="doprint">' + esc(u.print) + "</button>" +
      '<button class="go ghost" type="button" id="doclear">' + esc(u.clear) + "</button></div></form>";
  }

  /* ---------- videos ----------
     Listed in content/videos.js. Nothing is loaded from YouTube until the person taps "Play":
     then the privacy-enhanced player (youtube-nocookie.com) opens, with captions on. */
  function video(key) {
    var u = U(), v = (window.MT_VIDEOS || {})[key];
    if (!v) return "";
    var title = v.title[lang] || v.title.en;
    var meta = esc(v.by) + (v.lang ? " · " + esc(u.vLang[v.lang] || v.lang) : "") + (v.mins ? " · " + esc(v.mins) : "");
    if (v.url) {   // external page (not YouTube)
      return '<div class="vid"><div class="vh"><span class="play" aria-hidden="true">\u25B6</span><div><b>' + esc(title) +
        "</b><small>" + meta + "</small></div></div>" +
        '<a class="go ghost sm" href="' + esc(v.url) + '" target="_blank" rel="noopener noreferrer">' + esc(u.vOpen) + extTag() + "</a>" +
        (v.note && v.note[lang] ? '<p class="vnote">' + esc(v.note[lang]) + "</p>" : "") + "</div>";
    }
    return '<div class="vid" data-yt="' + esc(v.yt) + '" data-title="' + esc(title) + '"><div class="vh"><span class="play" aria-hidden="true">\u25B6</span><div><b>' +
      esc(title) + "</b><small>" + meta + "</small></div></div>" +
      '<button class="go ghost sm vplay" type="button">' + esc(u.vPlay) + "</button>" +
      '<p class="vnote">' + esc(u.vNote) + ' <a href="https://www.youtube.com/watch?v=' + esc(v.yt) + '" target="_blank" rel="noopener noreferrer">' + esc(u.vYT) + extTag() + "</a></p></div>";
  }
  function playVideo(box) {
    var id = box.getAttribute("data-yt");
    var f = document.createElement("div"); f.className = "frame";
    var ifr = document.createElement("iframe");
    ifr.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?rel=0&autoplay=1&cc_load_policy=1&hl=" + lang;
    ifr.title = box.getAttribute("data-title");
    ifr.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen");
    ifr.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");   // YouTube needs the site address to play embeds
    f.appendChild(ifr);
    var btn = box.querySelector(".vplay"); if (btn) btn.replaceWith(f);
  }

  /* ---------- "How do you feel now?" after an exercise ----------
     Just a gentle next step. The answer is not saved or sent anywhere. */
  function reflectHTML() {
    var r = U().reflect;
    return '<section class="reflect" id="reflect" aria-live="polite"><h2>' + esc(r.q) + '</h2><div class="opts" role="group" aria-label="' + esc(r.q) + '">' +
      ["better", "same", "worse"].map(function (k) {
        return '<button type="button" aria-pressed="false" data-r="' + k + '">' + esc(r[k][0]) + "</button>";
      }).join("") + '</div><div class="ans" id="rans"></div><p class="fine">' + esc(r.priv) + "</p></section>";
  }
  function showReflect(after) {
    if (document.getElementById("reflect")) return;
    var host = after || app.querySelector(".breathe, .card.guide, .card[aria-live]");
    if (!host) return;
    host.insertAdjacentHTML("afterend", reflectHTML());
    var box = document.getElementById("reflect");
    Array.prototype.forEach.call(box.querySelectorAll("button[data-r]"), function (b) {
      b.onclick = function () {
        Array.prototype.forEach.call(box.querySelectorAll("button[data-r]"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        var a = U().reflect[b.getAttribute("data-r")];
        document.getElementById("rans").innerHTML = "<p>" + fmt(a[1]) + "</p>";
      };
    });
  }

  function phoneIcon() {
    return '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>';
  }

  /* ---------- views ---------- */
  function banners() {
    var u = U(), h = "";
    var parts = [];
    if (SITE.draft) parts.push(u.draftSite);
    if (lang === "ms" && u.draftBM) parts.push(u.draftBM);
    if (parts.length) h = '<p class="banner">' + esc(parts.join(" ")) + "</p>";
    return h;
  }

  function home() {
    var u = U();
    var mods = ["toolbox", "learn", "manage", "videos", "sleep", "medicine", "appointment", "family"];
    return banners() +
      '<section class="hero"><span class="tag">\ud83d\udccb ' + esc(u.unit) + '</span>' +
      "<h1>" + esc(u.hello) + '</h1><p class="tagline">' + esc(u.tagline) + "</p><p>" + esc(u.helloP) + "</p></section>" +
      '<section class="need" aria-labelledby="needh"><h2 id="needh">' + esc(u.needTitle) + '</h2><nav class="chips">' +
      u.need.map(function (n) {
        return '<a href="' + esc(n[2]) + '"' + (n[3] ? ' class="help"' : "") + '><span aria-hidden="true">' + n[0] + "</span>" + esc(n[1]) + "</a>";
      }).join("") + "</nav></section>" +
      '<div class="duo">' +
      '<a class="calm" href="#/calm"><span class="ic" aria-hidden="true">\ud83e\udec1</span><b>' +
      esc(P("calm").title) + "</b><small>" + esc(u.calmSub) + "</small></a>" +
      '<a class="crisis" href="#/urgent"><span class="ic" aria-hidden="true">\ud83d\udea8</span><b>' +
      esc(P("urgent").title) + "</b><small>" + esc(u.sosSub) + "</small></a></div>" +
      '<h2 class="seclbl">' + esc(u.sections) + "</h2>" +
      '<nav class="links" aria-label="' + esc(u.sections) + '">' +
      mods.map(function (id) {
        var pg = P(id);
        return '<a class="link" href="#/' + id + '">' + icTile(pg.icon, id) +
          "<div><b>" + esc(pg.tileTitle || pg.title) + "</b>" +
          (pg.short || pg.lead ? "<small>" + esc(pg.short || plain(pg.lead)) + "</small>" : "") +
          '</div><span class="arr" aria-hidden="true">\u203a</span></a>';
      }).join("") + "</nav>" +
      '<div class="note"><p>' + esc(u.disc) + "</p><p>" + esc(u.priv) + "</p><p>" +
      esc(u.reviewed) + " " + SITE.reviewed + " \u00b7 " + esc(u.version) + " " + SITE.version +
      '</p><p><a href="#/about">' + esc(P("about").title) + "</a></p></div>";
  }

  // strip **bold**/[links] and shorten a page lead so it fits one line under the title
  function plain(t) {
    var x = String(t || "").replace(/\*\*/g, "").replace(/\*/g, "").replace(/\[(.+?)\]\(.+?\)/g, "$1");
    return x.length > 74 ? x.slice(0, 71).replace(/[,;:\s]+\S*$/, "") + "\u2026" : x;
  }

  function page(id) {
    var pg = P(id), u = U();
    var parent = pg.parent || "";
    var h = banners() + '<section class="pagehead"><a class="back" href="#/' + parent + '">' + esc(u.back) + "</a>" +
      "<h1>" + (pg.icon ? '<span aria-hidden="true">' + pg.icon + " </span>" : "") + esc(pg.title) + "</h1>" +
      (pg.lead ? '<p class="lead">' + fmt(pg.lead) + "</p>" : "") + "</section>" +
      '<div class="flow">' + (pg.blocks && pg.blocks.length ? blocks(pg.blocks)
        : '<p class="banner">' + (lang === "ms" ? "Kandungan halaman ini sedang disediakan." : "This page's content is being prepared.") + "</p>") + "</div>";
    if (id !== "urgent" && id !== "about") {
      h += '<section class="box blue foot"><h2>' + esc(u.footTitle) + "</h2><p>" + fmt(u.footText) + "</p>" +
        (pg.edu ? "<p>" + fmt(u.footMeds) + "</p>" : "") +
        '<a class="go ghost" href="#/urgent">' + esc(u.footBtn) + "</a></section>";
    }
    return h;
  }

  function breatheView(mode) {
    var u = U(), ex = u.breath[mode], other = u.breath;
    var wide = window.innerWidth >= 600;
    var opts = voiceBtn() + ambBtn();
    return banners() + '<section class="pagehead"><a class="back" href="#/calm">' + esc(u.back) + "</a><h1>" + esc(ex.name) + "</h1></section>" +
      '<div class="breathe"><nav class="seg" aria-label="' + esc(u.pattern) + '">' +
      '<a href="#/breathe-46"' + (mode === "b46" ? ' aria-current="page"' : "") + "><b>4\u20136</b><small>" + esc(other.b46.tag) + "</small></a>" +
      '<a href="#/breathe-box"' + (mode === "box" ? ' aria-current="page"' : "") + "><b>4\u20134\u20134\u20134</b><small>" + esc(other.box.tag) + "</small></a></nav>" +
      '<p class="cycle">' + fmt(ex.cycle) + "</p>" +
      '<div class="stage" aria-hidden="true"><div class="halo"></div><div class="ball" id="ball"></div><div class="count" id="count"></div></div>' +
      '<p class="phase" id="phase" aria-live="polite">' + esc(u.ready) + "</p>" +
      '<div class="row"><button class="go" type="button" id="bone">' + esc(u.startOne) + "</button>" +
      '<button class="go ghost" type="button" id="bloop">' + esc(u.startLoop) + "</button>" +
      '<button class="go" type="button" id="bstop" hidden>' + esc(u.stop) + "</button></div>" +
      '<section class="safe"><p><span class="lbl">' + esc(u.care) + "</span> " + fmt(ex.care) + '</p><div class="row">' +
      (mode === "box" ? '<a class="go ghost sm" href="#/breathe-46">' + esc(u.switch46) + "</a>" : "") +
      '<button class="go ghost sm" type="button" id="bquit">' + esc(u.quit) + "</button></div></section>" +
      '<p class="cycles" id="cycles">' + esc(u.rounds) + ": 0</p>" +
      (opts ? '<details class="optpanel"' + (wide ? " open" : "") + "><summary>" + esc(u.guideOpts) + '</summary><div class="row">' + opts + "</div>" + voiceNote() + "</details>" : "") +
      "</div>";
  }

  function groundView(step) {
    var u = U(), g = u.ground, body;
    if (step < 5) {
      body = '<div class="gstep"><div class="pips" aria-hidden="true">' + [0, 1, 2, 3, 4].map(function (i) {
        return '<i class="' + (i <= step ? "on" : "") + '"></i>';
      }).join("") + '</div><div class="gnum">' + (5 - step) + "</div><h2>" + esc(g.titles[step]) + "</h2><p>" +
        esc(g.texts[step]) + '</p><button class="go" type="button" id="gnext">' + esc(u.next) + "</button></div>";
    } else {
      body = '<div class="gstep"><h2>' + esc(g.done) + '</h2><button class="go ghost" type="button" id="gagain">' +
        esc(u.again) + "</button></div>";
    }
    return banners() + '<section class="pagehead"><a class="back" href="#/calm">' + esc(u.back) + "</a><h1>" + esc(g.name) +
      '</h1></section><article class="card" aria-live="polite">' + body + "</article>" +
      '<div class="row mt12">' + voiceBtn() + "</div>" + voiceNote();
  }

  /* ---------- timed voice-guided exercises (muscle relaxation, 1-minute pause) ---------- */
  function guideView(id) {
    var u = U(), g = u.guides[id];
    var top = g.med
      ? '<div class="orb" aria-hidden="true"><i></i></div><div class="gbar" aria-hidden="true"><i id="gbar"></i></div>'
      : '<div class="pips" aria-hidden="true">' + g.steps.map(function () { return "<i></i>"; }).join("") + "</div>";
    return banners() + '<section class="pagehead"><a class="back" href="#/calm/' + g.from + '">' + esc(u.back) + "</a><h1>" + esc(g.name) + "</h1>" +
      '<p class="lead">' + fmt(g.lead) + "</p></section>" +
      '<article class="card guide' + (g.med ? " med" : "") + '" id="gcard">' + top +
      '<p class="gtext" id="gtext" aria-live="polite">' + esc(u.ready) + "</p>" +
      '<div class="gnum' + (g.med ? " gleft" : "") + '" id="gcount" aria-hidden="true"></div>' +
      '<div class="row"><button class="go" type="button" id="gstart">' + esc(u.start) + "</button>" + voiceBtn() + ambBtn() + "</div>" +
      voiceNote() + "</article>" +
      '<p class="caution mt12"><span class="lbl">' + esc(u.care) + "</span> " + fmt(g.care) + "</p>";
  }
  function mmss(t) { return Math.floor(t / 60) + ":" + ("0" + (t % 60)).slice(-2); }
  function runGuide(id, onEnd) {
    var g = U().guides[id], i = 0, sec = 0, gone = 0;
    var total = g.steps.reduce(function (a, st) { return a + st[1]; }, 0);
    var tx = document.getElementById("gtext"), cn = document.getElementById("gcount"),
      bar = document.getElementById("gbar"), card = document.getElementById("gcard"),
      pips = app.querySelectorAll(".guide .pips i");
    if (card) card.classList.add("on");
    ambStart();
    if (g.med) bell();
    function step() {
      if (i >= g.steps.length) {
        tx.textContent = g.done; cn.textContent = ""; if (card) card.classList.remove("on");
        if (g.med) bell();
        setTimeout(function () { say(g.done, id + "-done"); }, g.med ? 1200 : 0);
        timer = null; ambEnd = setTimeout(ambStop, 6000);   // let the sound fade after the last words
        onEnd(); return;
      }
      for (var k = 0; k < pips.length; k++) pips[k].className = k <= i ? "on" : "";
      tx.textContent = g.steps[i][0];
      say(g.steps[i][0], id + "-" + (i + 1));
      sec = g.steps[i][1]; tick();
    }
    function tick() {
      if (g.med) { cn.textContent = mmss(total - gone) + " " + U().left; if (bar) bar.style.width = (100 * gone / total) + "%"; }
      else cn.textContent = sec;
      timer = setTimeout(function () { sec--; gone++; if (sec > 0) tick(); else { i++; step(); } }, 1000);
    }
    if (g.med) timer = setTimeout(step, 1500);   // let the bell ring first
    else step();
  }

  /* ---------- breathing guide ---------- */
  function stopBreath() { if (timer) { clearTimeout(timer); timer = null; } }
  function runBreath(mode, max, onEnd) {
    var u = U();
    var seq = mode === "box"
      ? [["inhale", 4, 2.2], ["hold", 4, 2.2], ["exhale", 4, 1], ["hold", 4, 1]]
      : [["inhale", 4, 2.2], ["exhale", 6, 1]];
    var ball = document.getElementById("ball"), c = document.getElementById("count"),
      p = document.getElementById("phase"), cy = document.getElementById("cycles");
    var i = 0, sec = 0, rounds = 0;
    ambStart();
    function phaseStart() {
      var k = seq[i][0], dur = seq[i][1], scale = seq[i][2];
      p.textContent = u[k];
      say(u.voice[k], "breath-" + k);
      ball.style.transition = (reduce || k === "hold") ? "none" : "transform " + dur + "s ease-in-out";
      ball.style.transform = "scale(" + scale + ")";
      sec = dur; tick();
    }
    function tick() {
      c.textContent = sec;
      timer = setTimeout(function () {
        sec--;
        if (sec > 0) tick();
        else {
          i = (i + 1) % seq.length;
          if (i === 0) {
            rounds++; cy.textContent = u.rounds + ": " + rounds;
            if (max && rounds >= max) {   // finite mode: finish gently after the set number of rounds
              timer = null; c.textContent = "";
              ball.style.transition = reduce ? "none" : "transform 1s ease"; ball.style.transform = "scale(1)";
              p.textContent = u.oneDone; say(u.oneDone, "breath-done");
              ambEnd = setTimeout(ambStop, 3000);
              if (onEnd) onEnd();
              return;
            }
          }
          phaseStart();
        }
      }, 1000);
    }
    phaseStart();
  }
  function resetBall() {
    var ball = document.getElementById("ball"), c = document.getElementById("count"), p = document.getElementById("phase");
    if (ball) { ball.style.transition = "transform .6s ease"; ball.style.transform = "scale(1)"; }
    if (c) c.textContent = "";
    if (p) p.textContent = U().ready;
  }

  /* ---------- router ---------- */
  var groundStep = 0;
  function route() {
    return (location.hash || "").replace(/^#\/?/, "").split("?")[0].split("/")[0];
  }
  function render(keepScroll) {
    stopBreath();
    document.body.classList.remove("exercising");
    stopSpeech();
    ambStop();
    var u = U(), r = route(), html;
    document.documentElement.lang = lang;
    document.documentElement.style.setProperty("--fs", big ? "21px" : "18px");
    headerText();

    if (r === "" || r === "home") html = home();
    else if (r === "breathe-46") html = breatheView("b46");
    else if (r === "breathe-box") html = breatheView("box");
    else if (r === "ground") html = groundView(groundStep);
    else if (u.guides[r]) html = guideView(r);
    else if (P(r)) html = page(r);
    else { html = home(); r = ""; }

    html += '<footer class="sitefoot"><p>' + esc(u.fbAsk) + '</p>' +
      '<a href="' + FEEDBACK_URL + '" target="_blank" rel="noopener noreferrer">' + esc(u.fbLink) + extTag() + "</a>" +
      '<small>' + esc(u.fbNote) + "</small></footer>";
    // Opened from a clinic card/QR (…?from=clinic): a short note linking clinic and home practice.
    if (/[?&]from=clinic/.test(location.hash) && r) {
      html = html.replace('</section>', '</section><p class="rx">' + esc(u.rxNote) + "</p>");
    }
    app.innerHTML = html;
    var pg = P(r);
    var tname = pg ? pg.title : r.indexOf("breathe") === 0 ? u.breath[r === "breathe-box" ? "box" : "b46"].name
      : r === "ground" ? u.ground.name : u.guides[r] ? u.guides[r].name : "";
    document.title = (tname ? tname + " · " : "") + "Minda Tenang";
    // #/calm/pause → open the Calm page at the "pause" exercise card
    var anchor = (location.hash || "").split("/")[2];
    var target = anchor && document.getElementById("ex-" + anchor);
    if (target && !keepScroll) {
      app.focus({ preventScroll: true });
      var y = target.getBoundingClientRect().top + window.pageYOffset - document.querySelector(".top").offsetHeight - 8;
      window.scrollTo(0, y);
    } else if (!keepScroll) { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
    bind(r);
    if (r === "ground" && !keepScroll) speakGround();   // read out the first step when the page opens
  }

  function bind(r) {
    var b1 = document.getElementById("bone"), bl = document.getElementById("bloop"),
      bst = document.getElementById("bstop"), bq = document.getElementById("bquit");
    if (b1) {
      var bm = r === "breathe-box" ? "box" : "b46";
      var running = function (on) {
        b1.hidden = on; bl.hidden = on; bst.hidden = !on;
        document.body.classList.toggle("exercising", on);   // slimmer (still one-tap) urgent-help bar while breathing
        if (on) { var st = app.querySelector(".stage"); if (st && st.scrollIntoView) st.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }); }
      };
      var endBreath = function () { var was = !!timer; stopBreath(); hush(); ambStop(); resetBall(); running(false); if (was) showReflect(app.querySelector(".stage")); };
      b1.onclick = function () {
        running(true); bst.focus();
        runBreath(bm, 1, function () { running(false); b1.textContent = U().again1; b1.focus(); showReflect(app.querySelector(".stage")); });
      };
      bl.onclick = function () { running(true); bst.focus(); runBreath(bm, 0); };
      bst.onclick = function () { endBreath(); b1.focus(); };
      bq.onclick = function () {
        endBreath();
        document.getElementById("phase").textContent = U().quitMsg;
        say(U().quitMsg, "breath-quit");
      };
    }
    var gn = document.getElementById("gnext");
    if (gn) gn.onclick = function () { groundStep++; render(true); speakGround(); if (groundStep >= 5) showReflect(app.querySelector(".card[aria-live]")); };
    var ga = document.getElementById("gagain");
    if (ga) ga.onclick = function () { groundStep = 0; render(true); speakGround(); };
    var vt = document.getElementById("vtoggle");
    if (vt) vt.onclick = function () {
      voiceOn = !voiceOn; store.set("mt-voice", voiceOn ? "1" : "0");
      if (!voiceOn) hush();
      vt.setAttribute("aria-pressed", voiceOn ? "true" : "false");
      vt.textContent = (voiceOn ? "🔈 " : "🔇 ") + (voiceOn ? U().voiceOn : U().voiceOff);
      if (voiceOn && r === "ground") speakGround();
    };
    var at = document.getElementById("atoggle");
    if (at) at.onclick = function () {
      amb = AMBS[(AMBS.indexOf(amb) + 1) % AMBS.length]; store.set("mt-amb", amb);
      at.setAttribute("aria-pressed", amb !== "off" ? "true" : "false");
      at.textContent = U().amb[amb];
      var running = timer && (document.getElementById("gcard") || document.getElementById("ball"));
      if (ambNode) { var old = ambNode; ambNode = null; try { old.g.gain.setValueAtTime(0.0001, actx.currentTime); } catch (e) {} setTimeout(function () { old.n.stop(); }, 50); }
      if (running) ambStart();
      else if (amb !== "off") { ambStart(); setTimeout(ambStop, 2500); }   // short preview of the sound
    };
    var gs = document.getElementById("gstart");
    if (gs) gs.onclick = function () {
      if (timer) { stopBreath(); hush(); ambStop(); var gc = document.getElementById("gcard"); if (gc) gc.classList.remove("on"); gs.textContent = U().start; document.getElementById("gtext").textContent = U().ready; document.getElementById("gcount").textContent = ""; }
      else { gs.textContent = U().stop; runGuide(r, function () { gs.textContent = U().again; showReflect(document.getElementById("gcard")); }); }
    };
    var pr = document.getElementById("doprint");
    if (pr) pr.onclick = function () { window.print(); };
    var cl = document.getElementById("doclear");
    if (cl) cl.onclick = function () { var f = app.querySelector("form"); if (f) f.reset(); };
  }

  function speakGround() {
    var g = U().ground;
    if (groundStep < 5) say(g.titles[groundStep] + ". " + g.texts[groundStep], "ground-" + (groundStep + 1));
    else say(g.done, "ground-done");
  }

  function headerText() {
    var u = U();
    document.getElementById("unit").textContent = u.unit;
    var sp = document.getElementById("speak"), bg = document.getElementById("bigger");
    sp.setAttribute("aria-label", u.readAloud); sp.title = u.readAloud;
    bg.setAttribute("aria-label", u.textSize); bg.title = u.textSize;
    bg.setAttribute("aria-pressed", big ? "true" : "false");
    ["ms", "en"].forEach(function (l) {   // radio group: only the chosen language is in the Tab order
      var btn = document.getElementById("lang-" + l);
      btn.setAttribute("aria-checked", lang === l ? "true" : "false");
      btn.tabIndex = lang === l ? 0 : -1;
    });
    document.getElementById("sos").innerHTML = phoneIcon() + esc(u.sos) + " <span>· " + esc(u.sosSub) + "</span>";
    document.getElementById("skip").textContent = u.skip;
    if (tb) themeLabel();
  }

  /* ---------- read aloud (phone's own text-to-speech; nothing is sent) ---------- */
  var sp = document.getElementById("speak");
  function stopSpeech() {
    hush();
    sp.setAttribute("aria-pressed", "false");
  }
  if (!("speechSynthesis" in window)) sp.hidden = true;
  sp.onclick = function () {
    if (sp.getAttribute("aria-pressed") === "true") { stopSpeech(); return; }
    var utt = tts(app.innerText.replace(/[‹›🔈🔇🌧🎵]/g, ""), 0.88, 300);
    if (!utt) return;
    utt.onend = function () { sp.setAttribute("aria-pressed", "false"); };
    sp.setAttribute("aria-pressed", "true");
  };

  app.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".vplay");
    if (b) playVideo(b.closest(".vid"));
  });
  var tb = document.getElementById("theme");
  function themeLabel() {
    var u = U();
    tb.textContent = theme === "dark" ? "\u263E" : theme === "light" ? "\u2600" : "\u25D1";
    tb.setAttribute("aria-label", u.themeLabel + ": " + u.themes[theme]); tb.title = tb.getAttribute("aria-label");
  }
  tb.onclick = function () {
    theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]; store.set("mt-theme", theme);
    applyTheme(); themeLabel();
  };
  document.getElementById("bigger").onclick = function () { big = !big; store.set("mt-big", big ? "1" : "0"); render(true); };
  function setLang(l, focus) {
    if (l !== lang) { lang = l; store.set("mt-lang", l); render(true); }
    if (focus) document.getElementById("lang-" + l).focus();
  }
  document.getElementById("lang-ms").onclick = function () { setLang("ms"); };
  document.getElementById("lang-en").onclick = function () { setLang("en"); };
  document.querySelector(".lang").addEventListener("keydown", function (e) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(e.key) < 0) return;
    e.preventDefault(); setLang(lang === "ms" ? "en" : "ms", true);
  });
  if (hasTTS && speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", function () {
    voiceCache = {};
    var n = document.getElementById("vnote");
    if (n) n.textContent = (lang === "ms" && !pickVoice()) ? U().voiceNoBM : "";
  });
  window.addEventListener("hashchange", function () { if (route() !== "ground") groundStep = 0; render(false); });
  render(false);
})();
