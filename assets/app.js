/* Laman Minda — shared script. Everything stays on this device. No tracking. */
(function () {
  "use strict";
  var root = document.documentElement;
  var PREFIX = "lm-";

  /* ---------- safe storage (may be blocked in private mode) ---------- */
  var store = {
    get: function (k) { try { return window.localStorage.getItem(PREFIX + k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(PREFIX + k, v); return true; } catch (e) { return false; } },
    clearAll: function () {
      try {
        var ls = window.localStorage, keys = [];
        for (var i = 0; i < ls.length; i++) { var k = ls.key(i); if (k && k.indexOf(PREFIX) === 0) keys.push(k); }
        keys.forEach(function (k) { ls.removeItem(k); });
      } catch (e) {}
    }
  };

  /* ---------- language ---------- */
  function lang() { return root.getAttribute("data-lang") === "en" ? "en" : "ms"; }
  function setLang(l, remember) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l === "en" ? "en" : "ms");
    var t = root.getAttribute("data-title-" + l); if (t) document.title = t;
    document.querySelectorAll("[data-ph-" + l + "]").forEach(function (el) { el.setAttribute("placeholder", el.getAttribute("data-ph-" + l)); });
    if (remember) store.set("lang", l);
    document.dispatchEvent(new CustomEvent("lm:lang"));
  }
  var qp = /[?&]lang=(ms|en)\b/.exec(location.search);
  setLang(qp ? qp[1] : (store.get("lang") || lang()), !!qp);
  document.querySelectorAll("[data-action='lang']").forEach(function (b) {
    b.addEventListener("click", function () { setLang(lang() === "ms" ? "en" : "ms", true); });
  });
  function T(ms, en) { return lang() === "en" ? en : ms; }

  /* ---------- quick exit ---------- */
  document.querySelectorAll("[data-action='exit']").forEach(function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); location.replace("https://www.google.com/search?q=cuaca+hari+ini"); });
  });

  /* ---------- delete all my data (two taps, no pop-up) ---------- */
  document.querySelectorAll("[data-action='delete-all']").forEach(function (b) {
    var armed = false, out = document.getElementById(b.getAttribute("aria-controls") || "");
    b.addEventListener("click", function () {
      if (!armed) { armed = true; b.classList.add("armed");
        if (out) out.textContent = T("Tekan butang sekali lagi untuk padam semua. Ini tidak boleh dibatalkan.", "Tap the button again to delete everything. This cannot be undone.");
        setTimeout(function () { armed = false; if (out && !b.dataset.done) out.textContent = ""; }, 8000); return; }
      store.clearAll(); b.dataset.done = "1";
      document.querySelectorAll("form[data-plan]").forEach(function (f) { f.reset(); });
      if (out) out.textContent = T("Semua data Laman Minda di telefon ini telah dipadam.", "All Laman Minda data on this phone has been deleted.");
    });
  });

  /* ---------- share a page link ---------- */
  document.querySelectorAll("[data-action='share-page']").forEach(function (b) {
    b.addEventListener("click", function () {
      var url = location.href.split("#")[0].split("?")[0] + "?lang=" + lang();
      var h = document.querySelector("main h1:not([hidden])"), ttl = "Laman Minda";
      document.querySelectorAll("main h1").forEach(function (x) { if (x.offsetParent) ttl = "Laman Minda — " + x.textContent.trim(); });
      if (navigator.share) navigator.share({ title: ttl, url: url }).catch(function () {});
      else window.open("https://wa.me/?text=" + encodeURIComponent(ttl + "\n" + url), "_blank", "noopener");
    });
  });

  /* ---------- crisis page: what is open right now (Malaysia time) ---------- */
  function myTime() { var d = new Date(); var m = (d.getUTCHours() * 60 + d.getUTCMinutes() + 8 * 60) % 1440; return m; }
  function renderStatus() {
    var m = myTime();
    document.querySelectorAll("[data-open]").forEach(function (el) {
      var p = el.getAttribute("data-open").split("-"), a = toMin(p[0]), z = toMin(p[1]);
      var isOpen = z > a ? (m >= a && m < z) : (m >= a || m < z);
      el.className = "status-now " + (isOpen ? "open" : "closed");
      el.textContent = isOpen ? T("Dibuka sekarang", "Open now") : T("Ditutup sekarang", "Closed now");
    });
    var night = document.getElementById("night-note");
    if (night) night.hidden = !(m < 8 * 60);
  }
  function toMin(s) { var x = s.split(":"); return (+x[0]) * 60 + (+x[1] || 0); }
  if (document.querySelector("[data-open]") || document.getElementById("night-note")) {
    renderStatus(); document.addEventListener("lm:lang", renderStatus); setInterval(renderStatus, 60000);
  }

  /* ---------- plans (Safety Plan, Relapse Plan): autosave on this phone ---------- */
  document.querySelectorAll("form[data-plan]").forEach(function (form) {
    var key = "plan-" + form.getAttribute("data-plan");
    var note = form.querySelector(".saved-note");
    var data = {};
    try { data = JSON.parse(store.get(key) || "{}") || {}; } catch (e) { data = {}; }
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      if (el.type === "checkbox") el.checked = !!data[el.name];
      else if (el.type === "radio") el.checked = data[el.name] === el.value;
      else if (data[el.name] != null) el.value = data[el.name];
    });
    var timer;
    form.addEventListener("input", function () {
      var d = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name) return;
        if (el.type === "checkbox") { if (el.checked) d[el.name] = true; }
        else if (el.type === "radio") { if (el.checked) d[el.name] = el.value; }
        else if (el.value.trim()) d[el.name] = el.value;
      });
      d._updated = new Date().toISOString();
      var ok = store.set(key, JSON.stringify(d));
      if (note) { clearTimeout(timer); note.textContent = ok ? T("Disimpan di telefon ini", "Saved on this phone") : T("Tidak dapat simpan — pelayar anda menyekat storan. Cetak atau simpan sebagai gambar.", "Could not save — your browser blocks storage. Print or save as an image instead."); timer = setTimeout(function () { note.textContent = ""; }, 2500); }
    });
    form.addEventListener("submit", function (e) { e.preventDefault(); });

    function summary() {
      var out = [];
      form.querySelectorAll("[data-sum]").forEach(function (sec) {
        var h = sec.querySelector("[data-h] [lang='" + lang() + "']") || sec.querySelector("[data-h]");
        var lines = [];
        sec.querySelectorAll(".sum-fixed[lang='" + lang() + "'] li").forEach(function (li) { lines.push(li.textContent.trim()); });
        sec.querySelectorAll("input,textarea").forEach(function (el) {
          if (el.type === "checkbox" || el.type === "radio") {
            if (el.checked) { var l = el.closest("label").querySelector("[lang='" + lang() + "']"); lines.push((el.type === "radio" ? "" : "• ") + (l ? l.textContent : el.value).trim()); }
          } else if (el.value.trim()) {
            var lab = el.getAttribute("data-label-" + lang());
            lines.push((lab ? lab + ": " : "") + el.value.trim());
          }
        });
        out.push({ h: h ? h.textContent.trim() : "", lines: lines });
      });
      return out;
    }
    function title() { return form.getAttribute("data-title-" + lang()); }
    function asText() {
      var s = title() + "\n\n";
      summary().forEach(function (x) { if (x.lines.length) s += x.h + "\n" + x.lines.join("\n") + "\n\n"; });
      return s + T("Kecemasan: 999 · Talian HEAL 15555", "Emergency: 999 · Talian HEAL 15555");
    }

    function after(sel) {   // the action bar / print sheet that belongs to this form
      for (var n = form.nextElementSibling; n; n = n.nextElementSibling) { if (n.matches(sel)) return n; if (n.matches("form[data-plan]")) break; }
      return form.parentNode.querySelector(sel);
    }
    /* safety alert on "thoughts of self-harm" answers (Prepare for my appointment) */
    function alerts() {
      form.querySelectorAll(".popts[data-alert]").forEach(function (g) {
        var from = +g.getAttribute("data-alert"), c = g.querySelector("input:checked"), box = g.parentNode.querySelector(".p-alert");
        if (box) box.hidden = !(c && +c.value >= from);
      });
    }
    form.addEventListener("change", alerts); alerts();
    var sheet = after(".print-sheet");
    function fillSheet() {
      if (!sheet) return;
      sheet.innerHTML = "";
      var h1 = document.createElement("h1"); h1.textContent = title(); sheet.appendChild(h1);
      var sub = document.createElement("p"); sub.textContent = "Laman Minda · Hospital Serian · " + new Date().toLocaleDateString("en-GB"); sheet.appendChild(sub);
      summary().forEach(function (x) {
        var h2 = document.createElement("h2"); h2.textContent = x.h; sheet.appendChild(h2);
        var p = document.createElement("p"); p.textContent = x.lines.length ? x.lines.join("\n") : "—"; sheet.appendChild(p);
      });
      var e = document.createElement("p"); e.style.marginTop = "12pt"; e.textContent = T("Kecemasan: 999 · Talian HEAL 15555 (8 pagi–12 malam) · Unit Psikiatri Hospital Serian 013-336 2896", "Emergency: 999 · Talian HEAL 15555 (8 am–midnight) · Psychiatry Unit Hospital Serian 013-336 2896"); sheet.appendChild(e);
    }
    window.addEventListener("beforeprint", fillSheet);

    var bar = after("[data-plan-actions]");
    if (!bar) return;
    var clr = bar.querySelector("[data-do='clear']");
    if (clr) clr.addEventListener("click", function () {
      form.reset(); try { localStorage.removeItem("lm-" + key); } catch (e) {} alerts();
      if (note) note.textContent = T("Dikosongkan.", "Cleared.");
    });
    bar.querySelector("[data-do='print']").addEventListener("click", function () { fillSheet(); window.print(); });
    bar.querySelector("[data-do='share']").addEventListener("click", function () {
      var txt = asText();
      if (navigator.share) { navigator.share({ title: title(), text: txt }).catch(function () {}); }
      else { window.open("https://wa.me/?text=" + encodeURIComponent(txt), "_blank", "noopener"); }
    });
    bar.querySelector("[data-do='image']").addEventListener("click", function () { saveImage(title(), summary()); });
  });

  /* Draw the plan onto a phone-sized image (works as a wallet/lock-screen card). */
  function saveImage(ttl, secs) {
    var W = 1080, pad = 64, c = document.createElement("canvas"), x = c.getContext("2d");
    var font = "system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif";
    function wrap(text, size, weight) {
      x.font = weight + " " + size + "px " + font;
      var words = text.split(/\s+/), lines = [], cur = "";
      words.forEach(function (w) { var t = cur ? cur + " " + w : w; if (x.measureText(t).width > W - pad * 2 && cur) { lines.push(cur); cur = w; } else cur = t; });
      if (cur) lines.push(cur); return lines;
    }
    var blocks = [];
    blocks.push({ lines: wrap(ttl, 56, "700"), size: 56, w: "700", color: "#1E2B29", gap: 12 });
    blocks.push({ lines: wrap("Laman Minda · Hospital Serian", 30, "400"), size: 30, w: "400", color: "#51625F", gap: 36 });
    secs.forEach(function (s) {
      if (!s.lines.length) return;
      blocks.push({ lines: wrap(s.h, 36, "700"), size: 36, w: "700", color: "#2B6F6C", gap: 8 });
      s.lines.forEach(function (l) { l.split("\n").forEach(function (p) { blocks.push({ lines: wrap(p, 32, "400"), size: 32, w: "400", color: "#1E2B29", gap: 4 }); }); });
      blocks[blocks.length - 1].gap = 28;
    });
    blocks.push({ lines: wrap(T("Kecemasan: 999  ·  Talian HEAL 15555", "Emergency: 999  ·  Talian HEAL 15555"), 34, "700"), size: 34, w: "700", color: "#FFFFFF", gap: 0, band: true });
    var H = pad; blocks.forEach(function (b) { H += b.lines.length * b.size * 1.35 + b.gap; }); H += pad + 40;
    c.width = W; c.height = Math.max(H, 1400);
    x.fillStyle = "#F5F8F7"; x.fillRect(0, 0, W, c.height);
    x.fillStyle = "#2B6F6C"; x.fillRect(0, 0, W, 16);
    var y = pad + 20;
    blocks.forEach(function (b) {
      if (b.band) { y += 10; x.fillStyle = "#B42318"; x.fillRect(0, y - 8, W, b.lines.length * b.size * 1.35 + 40); y += 12; }
      x.font = b.w + " " + b.size + "px " + font; x.fillStyle = b.color; x.textBaseline = "top";
      b.lines.forEach(function (l) { x.fillText(l, pad, y); y += b.size * 1.35; });
      y += b.gap;
    });
    var a = document.createElement("a");
    a.download = ttl.replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-").toLowerCase() + ".png";
    a.href = c.toDataURL("image/png"); document.body.appendChild(a); a.click(); a.remove();
  }

  /* ---------- breathing guide ---------- */
  var bg = document.querySelector("[data-breath]");
  if (bg) {
    var orb = bg.querySelector(".orb"), cue = bg.querySelector(".cue"), tm = bg.querySelector(".timer");
    var startBtns = bg.querySelectorAll("[data-mins]"), stopBtn = bg.querySelector("[data-do='stop']");
    var run = null;
    function stop(done) {
      if (run) { clearTimeout(run.t); clearInterval(run.clock); }
      run = null; orb.className = "orb"; stopBtn.hidden = true;
      cue.textContent = done ? T("Selesai. Perhatikan bagaimana badan anda rasa sekarang.", "Done. Notice how your body feels now.") : "";
      tm.textContent = "";
    }
    function phase(inhale) {
      if (!run) return;
      orb.className = "orb " + (inhale ? "in" : "out");
      cue.textContent = inhale ? T("Tarik nafas… perlahan", "Breathe in… gently") : T("Hembus… perlahan-lahan", "Breathe out… slowly");
      run.t = setTimeout(function () { phase(!inhale); }, inhale ? 4000 : 6000);
    }
    startBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        stop(false); var end = Date.now() + (+b.getAttribute("data-mins")) * 60000;
        run = { t: null, clock: setInterval(function () {
          var left = Math.max(0, Math.round((end - Date.now()) / 1000));
          tm.textContent = Math.floor(left / 60) + ":" + ("0" + (left % 60)).slice(-2);
          if (left <= 0) stop(true);
        }, 500) };
        stopBtn.hidden = false; phase(true);
      });
    });
    stopBtn.addEventListener("click", function () { stop(false); });
  }

  /* ---------- "How do you feel now?" after an exercise ---------- */
  document.querySelectorAll(".reflect").forEach(function (box) {
    var out = box.querySelector(".reflect-out"), picked = null;
    function paint() { if (picked) out.innerHTML = picked.getAttribute("data-msg-" + lang()); }
    box.querySelectorAll("[data-reflect]").forEach(function (b) {
      b.addEventListener("click", function () {
        picked = b;
        box.querySelectorAll("[data-reflect]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        paint();
      });
    });
    document.addEventListener("lm:lang", paint);
  });

  /* ---------- videos: nothing loads from YouTube until Play is tapped ---------- */
  document.querySelectorAll(".video .vplay").forEach(function (b) {
    b.addEventListener("click", function () {
      var fig = b.closest(".video"), f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + fig.getAttribute("data-yt") + "?autoplay=1&rel=0&hl=" + lang();
      f.title = fig.querySelector("figcaption b").textContent.trim();
      f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true;
      var box = b.parentNode; box.querySelectorAll(".vbadge,.vdur").forEach(function (x) { x.remove(); });
      box.replaceChild(f, b);
    });
  });

  /* ---------- exercise suggested by the care team (QR cards: ?from=clinic) ---------- */
  if (/[?&]from=clinic\b/.test(location.search)) {
    var m = document.querySelector("main");
    if (m) { var rx = document.createElement("p"); rx.className = "rx"; rx.setAttribute("role", "note");
      rx.innerHTML = '<span lang="ms">Pasukan rawatan anda mencadangkan latihan ini. Amalkan di rumah, dan beritahu mereka bagaimana hasilnya pada temu janji seterusnya.</span><span lang="en">Your care team suggested this for you. Practise it at home, and tell them how it went at your next visit.</span>';
      m.insertBefore(rx, m.firstChild); }
  }

  /* ---------- offline support ---------- */
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();
