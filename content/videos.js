/* Minda Tenang — VIDEO LIST (same for both languages). YouTube only.
   How it works: nothing loads from YouTube until the person taps "Play". Then YouTube's
   privacy-enhanced player (youtube-nocookie.com) opens, with captions switched on.

   Each video:  key: { yt: "YouTube ID", by: "publisher", lang: "en"|"ms", mins: "m:ss", title: { en, ms } }
   To REMOVE a video: delete its line here AND any { t: "video", v: "key" } that uses it in ms.js / en.js.

   Quality rule (22/09/2026): only high-quality videos — available in 1080p HD, embedding allowed,
   captions available, from a health service, university or recognised health organisation.
   Each video below was checked against this rule on 22/09/2026.
   CLINICAL APPROVAL IS STILL NEEDED for each one — record it in
   2026-09-22-daftar-kandungan-video-minda-tenang.xlsx (reviewer, date, next review). */
window.MT_VIDEOS = {
  /* ---- Breathing ---- */
  "breath-emm": { yt: "wfDTp2GogaQ", by: "Every Mind Matters (NHS England)", lang: "en", mins: "2:21",
    title: { en: "Mindful breathing exercise", ms: "Latihan pernafasan berkesedaran" } },
  "breath-box": { yt: "tEmt1Znux58", by: "Sunnybrook Hospital (Canada)", lang: "en", mins: "2:47",
    title: { en: "Box breathing: calming stress or anxiety", ms: "Pernafasan kotak: meredakan tekanan atau kebimbangan" } },
  "breath-belly": { yt: "7Ep5mKuRmAA", by: "Indiana University School of Medicine", lang: "en", mins: "8:45",
    title: { en: "Belly breathing: calming the body and mind", ms: "Pernafasan perut: menenangkan badan dan minda" } },
  "breath-htar": { yt: "lBJo8zjIU2o", by: "Jabatan Psikiatri, Hospital Tengku Ampuan Rahimah Klang (KKM)", lang: "ms", mins: "2:11",
    title: { en: "Stress & emotion management: breathing technique (in Malay)", ms: "Pengurusan Tekanan & Emosi: Teknik Pernafasan" } },

  /* ---- Grounding ---- */
  "ground-paho": { yt: "9wTTAQt6XC0", by: "Pan American Health Organization (WHO)", lang: "en", mins: "4:13",
    title: { en: "Ground yourself (Doing What Matters in Times of Stress)", ms: "Bumikan diri anda (Doing What Matters in Times of Stress)" } },

  /* ---- Muscle relaxation ---- */
  "pmr-therapistaid": { yt: "1nZEdqcGVzo", by: "Therapist Aid", lang: "en", mins: "6:33",
    title: { en: "How to do progressive muscle relaxation", ms: "Cara melakukan relaksasi otot progresif" } },
  "pmr-hss": { yt: "2IJUD-e14FY", by: "Hospital for Special Surgery (USA)", lang: "en", mins: "10:01",
    title: { en: "Guided progressive muscle relaxation", ms: "Relaksasi otot progresif berpandu" } },
  "pmr-emm": { yt: "9GURt2pvdAg", by: "Every Mind Matters (NHS England)", lang: "en", mins: "8:55",
    title: { en: "Progressive muscle relaxation (audio: listen with eyes closed)", ms: "Relaksasi otot progresif (audio: dengar sambil pejam mata)" } },

  /* ---- Mindfulness & stress ---- */
  "mind-nhs24": { yt: "yWuPJFAx3rA", by: "NHS 24 (Scotland)", lang: "en", mins: "6:10",
    title: { en: "An introduction to mindfulness", ms: "Pengenalan kepada kesedaran penuh (mindfulness)" } },
  "stress-who": { yt: "E3Cts45FNrk", by: "World Health Organization (WHO)", lang: "en", mins: "2:12",
    title: { en: "Doing What Matters in Times of Stress", ms: "Doing What Matters in Times of Stress (WHO)" } },

  /* ---- Sleep ---- */
  "sleep-emm": { yt: "OvQTjAlIvI8", by: "Every Mind Matters (NHS England)", lang: "en", mins: "2:28",
    title: { en: "Simple tips for better sleep", ms: "Tip mudah untuk tidur lebih lena" } },

  /* ---- Understanding ---- */
  "dep-who": { yt: "XiCrniLQGYc", by: "World Health Organization (WHO)", lang: "en", mins: "4:18",
    title: { en: "I had a black dog, his name was depression", ms: "\"I had a black dog\": memahami kemurungan (WHO)" } }
};
