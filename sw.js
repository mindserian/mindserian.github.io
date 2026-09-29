/* Laman Minda offline support. Pages are saved on the phone so the help page works without signal. */
var CACHE = "laman-minda-v0.2";
var FILES = [
 "./",
 "index.html",
 "bantuan.html",
 "pelan-keselamatan.html",
 "pelan-relaps.html",
 "modul-psikosis-tanda-awal.html",
 "belajar.html",
 "kemahiran.html",
 "penjaga.html",
 "alat.html",
 "psikosis.html",
 "kemurungan.html",
 "kebimbangan.html",
 "tidur.html",
 "bahan.html",
 "ubat.html",
 "keluarga.html",
 "temu-janji.html",
 "mitos.html",
 "modul-pernafasan-perlahan.html",
 "grounding.html",
 "relaksasi-otot.html",
 "jeda-1-minit.html",
 "meditasi-nafas.html",
 "imbasan-badan.html",
 "tempat-tenang.html",
 "meditasi-kasih.html",
 "rutin-tidur.html",
 "emosi-kuat.html",
 "video.html",
 "privasi.html",
 "tentang.html",
 "offline.html",
 "assets/style.css",
 "assets/app.js",
 "assets/tools.js",
 "assets/tools-data.js",
 "manifest.webmanifest",
 "icons/icon.svg",
 "icons/icon-192.png"
];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("laman-minda-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
/* Show the saved copy at once, then refresh it in the background when online. */
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(function (c) {
    return c.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) { if (res && res.ok) c.put(req, res.clone()); return res; })
        .catch(function () { return hit || (req.mode === "navigate" ? c.match("offline.html") : undefined); });
      return hit || net;
    });
  }));
});
