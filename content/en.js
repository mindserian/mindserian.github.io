/* Minda Tenang — ENGLISH content (source text).
   Based on the Content Evidence Base (Tier 1), 18/09/2026. Clinical content awaits HOD approval.
   Formatting: **bold**, *italic*, [label](#/page). Block types are explained in README. */
window.MT_CONTENT = window.MT_CONTENT || {};
window.MT_CONTENT.en = {
  ui: {
    unit: "Psychiatry & Mental Health Unit, Hospital Serian",
    skip: "Skip to content",
    readAloud: "Read aloud", textSize: "Larger text",
    draftSite: "Draft for Head of Department review. Content not yet clinically approved.",
    draftBM: "",
    hello: "Welcome. You are not alone.",
    tagline: "Learn at the clinic. Practise at home.",
    needTitle: "What do you need right now?",
    need: [
      ["🌀", "I feel anxious", "#/breathe-46"],
      ["🌊", "I feel overwhelmed", "#/pause-guide"],
      ["🍃", "Calm my mind", "#/med-breath-guide"],
      ["💪", "I feel tense", "#/pmr-guide"],
      ["🌙", "I can't sleep", "#/sleep"],
      ["🆘", "I need help now", "#/urgent", true]
    ],
    rxNote: "Your care team suggested this for you. Practise it at home, and tell them how it went at your next visit.",
    vPlay: "▶ Play video",
    vNote: "Plays from YouTube (uses mobile data). Nothing loads until you tap Play.",
    vYT: "Open in YouTube",
    vOpen: "Open video page",
    vLang: { en: "English, captions", ms: "Bahasa Melayu" },
    reflect: {
      q: "How do you feel now?",
      better: ["Better", "Good. Remember what helped. Practise it again tomorrow, and tell your team about it at your next visit. You can add it to [my coping plan](#/plan)."],
      same: ["About the same", "That's okay. Exercises get easier with practice, and not every one suits everyone. Try another: [5-4-3-2-1 grounding](#/ground), [muscle relaxation](#/pmr-guide), or [How am I feeling?](#/toolbox)"],
      worse: ["Worse", "Stop the exercise and breathe normally. Sit somewhere safe. If you feel unsafe or very unwell, go to [Urgent Help](#/urgent) now. Otherwise, tell your team at your next visit, or call the unit during office hours."],
      priv: "Your answer is not saved or sent anywhere."
    },
    themeLabel: "Colour theme",
    themes: { auto: "same as phone", light: "light", dark: "dark" },
    helloP: "Simple information and calming exercises for you and your family, to use between clinic visits.",
    calmSub: "Breathing, calming & meditation, 1–5 minutes",
    sections: "Sections",
    disc: "This site supports, but does not replace, care from your doctor and team.",
    priv: "We collect no information about you. No login needed.",
    reviewed: "Last reviewed:", version: "Version",
    fbAsk: "Have an idea to improve this site?",
    fbLink: "Share a suggestion (anonymous)",
    fbNote: "For general suggestions only. Do not include names, phone numbers, health details or emergencies. This form opens in Google Forms.",
    ext: "(external site, opens in a new tab)",
    sos: "URGENT HELP", sosSub: "Emergencies & helplines",
    back: "‹ Back",
    when: "When to use:", notice: "You may notice:", care: "Take care:",
    tryFirst: "Try first:", then: "Then:",
    startGuide: "Start with guide",
    footTitle: "Need help now?",
    footText: "If you or someone else may be in danger, call **999** or go to the nearest Emergency Department.",
    footMeds: "Don't stop or change your medicine without talking to your doctor.",
    footBtn: "Go to Urgent Help",
    call999: "Call 999",
    deptName: "Psychiatry & Mental Health Unit, Hospital Serian",
    deptHours: "Office hours",
    lines: {
      heal:  ["Talian HEAL (Ministry of Health)", "8 am – midnight, every day"],
      bfkch: ["Befrienders Kuching", "6.30 – 9.30 pm, every day"],
      bfkl:  ["Befrienders Kuala Lumpur", "24 hours"],
      kasih: ["Talian Kasih", "24 hours · WhatsApp 019-261 5999"],
      miasa: ["MIASA crisis line", "WhatsApp 03-9765 6088"],
      mhak:  ["Mental Health Association of Sarawak (Kuching)", "Call for hours"]
    },
    pattern: "Breathing pattern",
    inhale: "Breathe in…", exhale: "Breathe out…", hold: "Hold…", ready: "Sit comfortably. Press Start when ready.",
    start: "Start", stop: "Stop", rounds: "Rounds completed",
    startOne: "Start 1 round", startLoop: "Keep going", again1: "Repeat 1 round",
    switch46: "Switch to 4–6", quit: "Stop & breathe normally",
    quitMsg: "You have stopped. Breathe normally, slowly.",
    oneDone: "One round done. Well done. Repeat if you like.",
    guideOpts: "Guide options: voice & background sound", next: "Next", again: "Again",
    breath: {
      b46: { name: "Slow Breathing 4-6", tag: "in 4, out 6",
        cycle: "One round takes **10 seconds**: breathe in for 4, out for 6.",
        care: "Breathe gently. Don't force big breaths. If you feel dizzy or uncomfortable, stop and breathe normally." },
      box: { name: "Box Breathing", tag: "includes breath-holds",
        cycle: "One round takes **16 seconds**: in 4, hold 4, out 4, hold 4.",
        care: "Don't force or hold your breath if it feels uncomfortable. If you feel dizzy, short of breath or unsure, stop and go back to breathing normally. You can choose 4–6, which has no breath-holds." }
    },
    ground: {
      name: "5-4-3-2-1 Grounding",
      titles: ["See", "Touch", "Hear", "Smell", "Taste"],
      texts: [
        "Look around. Name 5 things you can see.",
        "Name 4 things you can touch. Notice how they feel.",
        "Be still for a moment. Name 3 sounds you can hear.",
        "Name 2 things you can smell, or a smell you like.",
        "Name 1 thing you can taste, or take a sip of water."
      ],
      done: "Done. Well done. Take one more slow breath out."
    },
    voiceOn: "Voice on", voiceOff: "Voice off",
    voiceNoBM: "",
    voiceNone: "This browser can't play the voice guide. Follow the words on screen instead.",
    voice: { inhale: "Breathe in, gently", exhale: "And breathe out, slowly", hold: "Hold, softly" },
    amb: { off: "🎵 Background: off", rain: "🌧 Background: rain", hum: "🎵 Background: soft tone" },
    left: "left",
    /* Recorded voice (optional). Put MP3 files in site/audio/en/ and list them here, e.g.
       "breath-inhale": "audio/en/breath-inhale.mp3". Any key not listed uses the phone's voice.
       Keys are listed in the recording script (2026-09-18-skrip-rakaman-suara.docx). */
    audio: {},
    guides: {
      /* ---- Guided meditation (med: true = calm view, bell, progress bar) ---- */
      "med-breath-guide": {
        name: "Mindful Breathing", from: "med-breath", med: true,
        lead: "Follow the voice. About 3 minutes. You can open your eyes at any time.",
        care: "If upsetting memories or confusing thoughts come up, open your eyes, stop, and use [5-4-3-2-1](#/ground) instead.",
        steps: [
          ["Sit comfortably. Let your shoulders drop. Close your eyes, or rest your gaze softly on the floor.", 12],
          ["Breathe normally. There is nothing to change.", 12],
          ["Notice the air coming in through your nose, and going out again.", 15],
          ["Feel your chest or belly rise gently, and fall gently.", 18],
          ["Choose one place to rest your attention. The tip of your nose, your chest, or your belly.", 18],
          ["Your mind will wander. That is normal.", 12],
          ["When you notice your mind has wandered, gently bring your attention back to your breath.", 22],
          ["Breathe in. And breathe out.", 15],
          ["Each time you come back to the breath, that is the practice. You are doing well.", 22],
          ["Keep breathing calmly, at your own pace.", 25],
          ["Now, slowly, notice the sounds around you.", 10]
        ],
        done: "Done. Open your eyes slowly when you are ready."
      },
      "med-body-guide": {
        name: "Body Scan", from: "med-body", med: true,
        lead: "Follow the voice. About 5 minutes. Also good before sleep.",
        care: "If a part of your body is painful or injured, just notice it from a distance, or skip it. If upsetting memories come up, open your eyes and use [5-4-3-2-1](#/ground).",
        steps: [
          ["Lie down or sit comfortably. Close your eyes if you like.", 12],
          ["Breathe in slowly, and breathe out long. Let your body feel heavy.", 15],
          ["Bring your attention to the soles of your feet. Notice whatever you feel. Warmth, coolness, or nothing at all.", 25],
          ["Move up to your ankles and calves. If there is tension, let it soften with each breath out.", 25],
          ["Now your knees and thighs. Feel the weight of your legs being supported.", 22],
          ["Your hips and lower back. Breathe out, and let them loosen.", 22],
          ["Your belly. Feel it rise and fall with your breath.", 22],
          ["Your chest and upper back. Nothing needs to change. Just notice.", 22],
          ["Your hands and fingers. Let your hands rest, heavy and soft.", 22],
          ["Your arms and shoulders. Let your shoulders drop, away from your ears.", 22],
          ["Your neck and jaw. Loosen your jaw. Let your teeth part a little.", 22],
          ["Your face. Forehead, eyes and cheeks. Let your face be calm.", 22],
          ["Now feel your whole body, from your toes to the top of your head, breathing calmly.", 30],
          ["Slowly, move your fingers and toes.", 12]
        ],
        done: "Done. Take your time before you get up."
      },
      "med-place-guide": {
        name: "Calm Place", from: "med-place", med: true,
        lead: "Follow the voice. About 5 minutes. Picture a place where you feel calm and safe.",
        care: "If no place feels safe, imagine a made-up one. If upsetting memories come up, open your eyes, feel your feet on the floor, and use [5-4-3-2-1](#/ground).",
        steps: [
          ["Sit or lie down comfortably. Close your eyes, or look softly downwards.", 12],
          ["Take a few slow breaths. Let each breath out be longer than the breath in.", 18],
          ["Picture a place where you feel calm and safe. It can be a real place, like a village, a riverside or a garden. Or a place you make up.", 30],
          ["Look around this place. What colours do you see? What is the light like?", 25],
          ["Listen. Perhaps water, wind, birds, or just quiet.", 25],
          ["Feel. Perhaps a cool breeze on your skin, the ground under your feet, or warm sunlight.", 25],
          ["Smell. Perhaps rain, flowers, or your favourite food.", 22],
          ["Here, there is nothing you need to do. You can rest.", 25],
          ["Feel your body becoming calmer, and lighter.", 25],
          ["If you like, give this place one word, like calm, or home. You can remember this word any time to come back here.", 30],
          ["Enjoy this place a little longer.", 25],
          ["Now, slowly come back to the room. Feel your feet on the floor.", 15]
        ],
        done: "Done. This place is always there for you. Open your eyes slowly."
      },
      "med-kind-guide": {
        name: "Kindness Meditation", from: "med-kind", med: true,
        lead: "Follow the voice. About 4 minutes. Sending good wishes to yourself and others.",
        care: "You don't need to feel anything special. If it feels hard or sad, that is normal. You can use words or prayers from your own faith.",
        steps: [
          ["Sit comfortably. Place a hand on your chest if you like.", 12],
          ["Breathe slowly. Think of someone who is easy to love. Family, a friend, or a pet.", 22],
          ["In your heart, say to them. May you be safe. May you be well. May you be at peace.", 25],
          ["Notice what you feel. Maybe warmth, maybe nothing. Both are okay.", 20],
          ["Now, say to yourself. May I be safe. May I be well. May I be at peace.", 25],
          ["If this feels hard, that is normal. Just repeat it slowly.", 18],
          ["Think of someone you know a little, like a neighbour or a colleague. May you be safe, well, and at peace.", 25],
          ["Now, think of everyone in your home, your village, and everywhere. May everyone be safe, well, and at peace.", 28],
          ["Breathe calmly, and feel this kindness.", 25],
          ["Slowly, open your eyes when you are ready.", 10]
        ],
        done: "Done. Take a little of this kindness with you today."
      },
      "pmr-guide": {
        name: "Muscle Relaxation", from: "pmr",
        lead: "Follow the voice. About 2 minutes. Repeat if you like.",
        care: "Tense gently, never to the point of pain. Skip any sore or injured part.",
        steps: [
          ["Sit or lie down comfortably. Close your eyes if you like.", 6],
          ["Hands. Make gentle fists, and hold.", 5],
          ["Let go. Notice the difference.", 10],
          ["Shoulders. Lift them gently towards your ears, and hold.", 5],
          ["Let go. Let them drop.", 10],
          ["Face. Scrunch up your face gently, and hold.", 5],
          ["Let go. Let your face go soft.", 10],
          ["Stomach. Tighten your stomach muscles, and hold.", 5],
          ["Let go. Breathe out slowly.", 10],
          ["Legs. Press your feet into the floor, and hold.", 5],
          ["Let go. Feel your legs grow heavy.", 10],
          ["Breathe slowly, and notice how your whole body feels.", 15]
        ],
        done: "Done. Well done. Take your time before you get up."
      },
      "pause-guide": {
        name: "1-Minute Pause", from: "pause",
        lead: "Follow the voice. About 1 minute.",
        care: "If upsetting memories or confusing thoughts come up, stop and use [5-4-3-2-1](#/ground) instead.",
        steps: [
          ["Stop what you are doing.", 6],
          ["Feel your feet on the floor.", 12],
          ["Notice one sound you can hear.", 12],
          ["Notice one smell.", 10],
          ["Notice one thing you can see.", 10],
          ["Take one slow breath out.", 10]
        ],
        done: "Done. Carry on gently."
      }
    },
    print: "Print or save as PDF", clear: "Clear",
    checkPrivacy: "What you tick or type here stays on this phone and is not sent anywhere. It is cleared when you close the page."
  },

  pages: {

    /* ================= URGENT HELP ================= */
    urgent: {
      title: "Urgent Help", icon: "🚨",
      blocks: [
        { t: "box", tone: "red", title: "If a life may be in danger now", body: [
          { t: "p", x: "Call **999** or go to the nearest Emergency Department (Hospital Serian Emergency Unit) if someone:" },
          { t: "ul", items: [
            "has a plan to end their life, or has hurt themselves",
            "has taken too much medicine, a pesticide or another poison, **even if they seem okay**. Some poisons cause no symptoms for many hours while damage is happening inside.",
            "may hurt another person",
            "is very agitated, confused or unusually drowsy",
            "hears voices or believes things that put them or others in danger",
            "has chest pain, serious trouble breathing, has fainted or had a fit"
          ] },
          { t: "call999" }
        ] },
        { t: "box", tone: "amber", title: "While you wait", body: [
          { t: "ul", items: [
            "Stay with them. Don't leave them alone.",
            "If you can do it safely, move medicines, sharp objects, ropes, pesticides and other poisons away.",
            "Speak calmly. You don't need perfect words; being there helps."
          ] }
        ] },
        { t: "box", tone: "teal", body: [
          { t: "p", x: "**Attempting suicide is no longer a crime in Malaysia.** Getting help, for yourself or someone else, will not get anyone into trouble with the police." }
        ] },
        { t: "h", x: "Need to talk to someone now?" },
        { t: "p", x: "You don't have to explain everything; just say you need to talk. Each service has its own privacy policy. If there is immediate danger, call **999**." },
        { t: "helplines" },
        { t: "box", tone: "blue", title: "Not an emergency?", body: [
          { t: "p", x: "For example: mild side effects, running low on medicine, symptoms slowly getting worse, or questions about your appointment." },
          { t: "dept" },
          { t: "ul", items: [
            "Or come to your next appointment and bring your appointment book.",
            "Or visit your nearest Klinik Kesihatan."
          ] }
        ] },
        { t: "box", tone: "amber", title: "Keep pesticides safe at home", body: [
          { t: "p", x: "Store farm chemicals locked away, outside the house, in their original containers. This protects children, and anyone going through a hard time." }
        ] },
        { t: "p", x: "*This website cannot receive messages. In a crisis, use the numbers above or 999. Numbers last checked: 18/09/2026.*" }
      ]
    },

    /* ================= CALM DOWN NOW ================= */
    calm: {
      title: "Calm Down Now", icon: "🫁",
      lead: "Choose one exercise. Most can be done sitting down, without anyone noticing.",
      blocks: [
        { t: "box", tone: "amber", body: [
          { t: "p", x: "**Before you start:** these exercises help with everyday stress, worry and panic. They do not replace your treatment. If you have a heart or lung condition, are pregnant, or are unsure, ask your doctor or nurse before trying breath-holding or cold water on your face." }
        ] },
        { t: "ex", id: "b46", name: "Slow Breathing (4-6)", time: "2–5 min",
          when: "Anxious, worried, heart racing, or before sleep.",
          steps: [
            "Sit comfortably. Loosen tight clothing.",
            "Breathe in gently through your nose for 4.",
            "Breathe out slowly through your mouth for 6.",
            "Keep the out-breath longer than the in-breath. Repeat for 2–5 minutes."
          ],
          notice: "Your heart slows and you feel calmer or sleepy.",
          care: "Breathe gently and don't force big breaths. Stop if you feel dizzy.",
          tool: "breathe-46", video: "breath-emm" },
        { t: "ex", id: "box", name: "Box Breathing", time: "2–4 min",
          when: "You want a steady rhythm to follow.",
          steps: ["Breathe in for 4.", "Hold for 4.", "Breathe out for 4.", "Hold for 4, then repeat."],
          care: "Don't force or hold your breath if it feels uncomfortable. If you feel dizzy, short of breath or unsure, stop and go back to breathing normally. You can choose 4–6, which has no breath-holds.",
          tool: "breathe-box", video: "breath-box" },
        { t: "ex", id: "g54321", name: "5-4-3-2-1 Grounding", time: "2–3 min",
          when: "Panic, racing thoughts, or feeling far away or unreal.",
          body: [{ t: "p", x: "Name 5 things you **see**, 4 you can **touch**, 3 you **hear**, 2 you **smell**, and 1 you **taste**." }],
          notice: "You feel more \"here and now\".",
          care: "There is no wrong way. Go at your own pace.",
          tool: "ground", toolLabel: "Do it step by step", video: "ground-paho" },
        { t: "ex", id: "cool", name: "Cool Water & Touch", time: "1–3 min",
          when: "Strong feelings, or feeling disconnected.",
          steps: [
            "Run cool water over your hands and wrists, hold a warm drink, or hold something with texture.",
            "Focus on how it feels: the temperature, the weight, the surface."
          ],
          care: "Cool water on your hands is safe for almost everyone." },
        { t: "ex", id: "face", name: "Cold on the Face (stronger option)", time: "about 30 sec",
          when: "A very intense panic attack.",
          steps: [
            "Splash cold water on your face, or hold a cold wet cloth or an ice pack wrapped in cloth to your cheeks.",
            "Keep it there for about 30 seconds, breathing slowly."
          ],
          notice: "Your heart slows quickly. This is expected.",
          care: "**Ask your doctor first** if you have a heart condition, take heart or blood-pressure medicine, are pregnant, or have had an eating disorder. Never put ice directly on your skin." },
        { t: "ex", id: "pmr", name: "Muscle Relaxation", time: "3–5 min",
          when: "Tense, overwhelmed, or before sleep.",
          steps: [
            "Gently tense one area (hands, shoulders, face, stomach or legs) for 5 seconds.",
            "Let go for 10 seconds and notice the difference.",
            "Move to the next area."
          ],
          care: "Tense gently, never to the point of pain. Skip any sore or injured part.",
          tool: "pmr-guide", toolLabel: "Start with voice guide", video: "pmr-therapistaid" },
        { t: "ex", id: "pause", name: "1-Minute Pause", time: "1 min",
          when: "A busy or stressful moment.",
          steps: ["Stop.", "Feel your feet on the floor.", "Notice one sound, one smell and one thing you see.", "Take one slow breath out."],
          care: "If upsetting memories or confusing thoughts come up, stop and use 5-4-3-2-1 instead.",
          tool: "pause-guide", toolLabel: "Start with voice guide" },
        { t: "ex", id: "count", name: "Counting Games", time: "1–3 min",
          when: "Worry won't stop.",
          steps: ["Count back from 100 in sevens, or count everything red around you."],
          care: "This is a distraction to settle your mind, not a treatment." },
        { t: "h", x: "🧘 Guided Meditation" },
        { t: "p", x: "Find a quiet spot. Use earphones if you have them, and tap **Background** for soft rain or a gentle tone. You can open your eyes and stop at any time." },
        { t: "ex", id: "med-breath", name: "Mindful Breathing", time: "3 min",
          when: "A busy mind; you want to feel calmer and more focused.",
          steps: ["Rest your attention on your breath.", "When your mind wanders, gently bring it back."],
          care: "If upsetting memories come up, open your eyes and use 5-4-3-2-1.",
          tool: "med-breath-guide", toolLabel: "Start guided meditation", video: "mind-nhs24" },
        { t: "ex", id: "med-body", name: "Body Scan", time: "5 min",
          when: "Tense or tired body, or before sleep.",
          steps: ["Move your attention slowly from your feet to your head.", "Notice, and let each part soften."],
          care: "Skip any part that is painful or injured.",
          tool: "med-body-guide", toolLabel: "Start guided meditation" },
        { t: "ex", id: "med-place", name: "Calm Place", time: "5 min",
          when: "Worried, stressed, or needing a short rest from your thoughts.",
          steps: ["Picture a calm, safe place.", "Use all your senses: see, hear, feel and smell."],
          care: "If no place feels safe, imagine a made-up one.",
          tool: "med-place-guide", toolLabel: "Start guided meditation" },
        { t: "ex", id: "med-kind", name: "Kindness Meditation", time: "4 min",
          when: "Feeling angry, lonely, or very hard on yourself.",
          steps: ["Send good wishes to someone you love, to yourself, and to others."],
          care: "You can use words or prayers from your own faith.",
          tool: "med-kind-guide", toolLabel: "Start guided meditation" },
        { t: "p", x: "For many people, prayer or quiet reflection also brings calm. Use what helps you." },
        { t: "go", to: "#/videos", x: "▶ More videos to watch", tone: "ghost" },
        { t: "card", title: "Still not better?", body: [
          { t: "p", x: "These exercises help, but they are not treatment. If this happens often, tell your team at your next appointment. If you feel unsafe, go to [Urgent Help](#/urgent)." }
        ] }
      ]
    },

    /* ================= COPING TOOLBOX ================= */
    toolbox: {
      title: "How am I feeling?", icon: "🧰",
      lead: "Tap the feeling closest to yours for what to try first.",
      blocks: [
        { t: "situations", items: [
          { icon: "🌀", feel: "I'm feeling anxious",
            first: "[Slow breathing 4-6](#/breathe-46)",
            then: "[1-minute pause](#/calm/pause)",
            care: "Stop if you feel dizzy." },
          { icon: "⚡", feel: "I'm having a panic attack",
            first: "Breathe out slowly, then [5-4-3-2-1 grounding](#/ground).",
            then: "[Cold on the face](#/calm/face) for about 30 seconds.",
            care: "Check the heart caution before using cold on the face. If this is your **first** attack, or you have chest pain, read the warning signs on the [Panic attacks](#/panic) page." },
          { icon: "💭", feel: "I can't stop worrying",
            first: "Write the worry down and save it for your daily 15-minute \"worry time\".",
            then: "A [counting game](#/calm/count).",
            care: "Distraction is not a fix. Tell your team if worry fills most of your days." },
          { icon: "🌊", feel: "I'm feeling overwhelmed",
            first: "A [1-minute pause](#/calm/pause), then pick one small next step.",
            then: "[Muscle relaxation](#/calm/pmr).",
            care: "Ask someone to help you with one task." },
          { icon: "🔥", feel: "I'm angry",
            first: "Step away and say: \"I'll come back in 20 minutes to talk.\"",
            then: "[Slow breathing](#/breathe-46), a walk, or cool water on your hands.",
            care: "Delay messages and decisions. Keep away from anything that could hurt." },
          { icon: "🌙", feel: "I can't sleep",
            first: "If you've been awake for about 20 minutes, get up and do something calm.",
            then: "[Muscle relaxation](#/calm/pmr) in dim light. See also [Sleep](#/sleep).",
            care: "No phone, and no clock-watching." },
          { icon: "🌫️", feel: "I feel disconnected or unreal",
            first: "[Cool water & touch](#/calm/cool).",
            then: "[5-4-3-2-1 grounding](#/ground). Say today's date and \"I am safe.\"",
            care: "Here, use grounding before breathing exercises." }
        ] }
      ]
    },

    /* ================= UNDERSTAND ================= */
    learn: {
      title: "Understand my mental health", icon: "🧠",
      lead: "Mental health problems are common and treatable. Asking for help is a sign of strength.",
      blocks: [
        { t: "links", items: ["anxiety", "panic", "stress", "depression", "psychosis", "sleep"] }
      ]
    },

    anxiety: {
      title: "Anxiety", short: "Worry, tension and a body on alert", icon: "🌀", parent: "learn", edu: true,
      blocks: [
        { t: "h", x: "What is it?" },
        { t: "p", x: "Anxiety is your body's alarm system. Sometimes the alarm goes off when there is no real danger, or it doesn't switch off." },
        { t: "ul", items: [
          "**Body:** racing heart, tight chest, sweating, shaking, upset stomach, tense muscles, poor sleep.",
          "**Mind:** \"something bad will happen\", trouble focusing, feeling on edge."
        ] },
        { t: "h", x: "What makes it worse?" },
        { t: "ul", items: [
          "Avoiding things that scare you",
          "A lot of coffee, tea or energy drinks",
          "Poor sleep",
          "Alcohol, including tuak (it calms at first, then makes anxiety worse)",
          "Asking \"are you sure I'm okay?\" again and again",
          "Scrolling frightening news"
        ] },
        { t: "h", x: "What can I do?" },
        { t: "ul", items: [
          "[Slow breathing 4-6](#/breathe-46)",
          "Write worries down as they come. Look at them only in a 15-minute \"worry time\" each day.",
          "Take small steps towards things you avoid",
          "Keep active",
          "Talk to someone you trust",
          "Keep to your treatment"
        ] },
        { t: "box", tone: "blue", title: "When should I get help?", body: [
          { t: "p", x: "Tell your team if:" },
          { t: "ul", items: [
            "anxiety stops you working, sleeping or caring for your family",
            "it lasts most days for several weeks",
            "you use alcohol or pills to cope"
          ] },
          { t: "p", x: "Thoughts of harming yourself → [Urgent Help](#/urgent)." }
        ] }
      ]
    },

    panic: {
      title: "Panic attacks", short: "A sudden wave of fear that passes", icon: "⚡", parent: "learn", edu: true,
      blocks: [
        { t: "h", x: "What is it?" },
        { t: "p", x: "A sudden, strong wave of fear. It is frightening, but on its own it is not dangerous. It is usually worst within about 10 minutes, then eases over the next 20–30 minutes." },
        { t: "h", x: "During an attack" },
        { t: "ol", items: [
          "Sit somewhere safe.",
          "Breathe out slowly, making the out-breath longer than the in-breath.",
          "Use [5-4-3-2-1](#/ground).",
          "Tell yourself: \"This is panic. It will pass.\"",
          "Let the feeling rise and fall like a wave."
        ] },
        { t: "box", tone: "red", title: "Don't assume it is \"just anxiety\"", body: [
          { t: "p", x: "Call **999** or go to the Emergency Department if:" },
          { t: "ul", items: [
            "it is the **first time** you have had these symptoms",
            "chest pain or pressure spreads to your arm, jaw, neck or back",
            "chest pain comes with sweating, nausea or vomiting",
            "pain starts with effort, or doesn't ease with rest",
            "you faint, or have severe breathlessness, or blue or grey lips",
            "you are older, or have heart disease, diabetes, high blood pressure or high cholesterol, or you smoke",
            "the symptoms are different from your usual attacks",
            "**Women:** a heart attack may show as unusual tiredness, breathlessness, nausea, or back or jaw discomfort, without strong chest pain"
          ] },
          { t: "p", x: "**Feeling anxious does not rule out a heart problem. If in doubt, get checked.**" },
          { t: "p", x: "**Stroke signs are a separate emergency.** Call 999 for a face drooping, weakness on one side, or slurred speech." },
          { t: "call999" }
        ] },
        { t: "h", x: "In the long term" },
        { t: "p", x: "Practise [slow breathing](#/breathe-46) daily, not only during attacks. Avoiding places makes panic stronger over time. Ask your team about talking therapy or medicine." }
      ]
    },

    stress: {
      title: "Stress", short: "When life's pressures pile up", icon: "🪨", parent: "learn", edu: true,
      blocks: [
        { t: "h", x: "Signs of stress" },
        { t: "p", x: "Tension, irritability, tiredness, headaches, poor sleep, eating more or less than usual." },
        { t: "h", x: "Common causes" },
        { t: "p", x: "Money, farm or harvest worries, family pressure, caring for a sick relative." },
        { t: "h", x: "Five pillars" },
        { t: "ul", items: [
          "**Sleep:** keep regular times.",
          "**Move:** walk 20–30 minutes, garden or do housework.",
          "**Relax:** breathing, prayer, quiet time.",
          "**Solve:** use the five steps below.",
          "**Connect:** talk to family, friends, or a religious or community leader."
        ] },
        { t: "h", x: "Five-step problem solving" },
        { t: "ol", items: [
          "Say clearly what the problem is.",
          "List every possible solution.",
          "Weigh the good and bad of each.",
          "Pick one and make a small plan.",
          "Try it, check how it went, and try another idea if needed."
        ] },
        { t: "h", x: "Avoid" },
        { t: "p", x: "Alcohol or tuak, gambling, and sleeping pills not prescribed for you." },
        { t: "video", v: "stress-who" },
        { t: "box", tone: "blue", title: "When should I get help?", body: [
          { t: "ul", items: [
            "Stress has affected your sleep, work or relationships for more than 2 weeks",
            "You use alcohol or pills to cope",
            "You feel hopeless (go to [Urgent Help](#/urgent) if you have thoughts of ending your life)"
          ] }
        ] }
      ]
    },

    depression: {
      title: "Low mood & depression", short: "More than feeling sad", icon: "🌧️", parent: "learn", edu: true,
      blocks: [
        { t: "h", x: "What does it feel like?" },
        { t: "p", x: "Depression is more than sadness. You may feel tired all the time, lose interest in things you enjoyed, or become irritable. It can show in the body too: aches, poor appetite, or feeling slowed down. These are real symptoms." },
        { t: "h", x: "Is it depression?" },
        { t: "p", x: "If several of these last most of the day, most days, for **2 weeks or more**, get checked by your team." },
        { t: "h", x: "What can I do alongside my treatment?" },
        { t: "ul", items: [
          "Do **one small thing** today. Doing comes before feeling better, so don't wait until you feel like it.",
          "Each day, plan one thing you enjoy and one useful task.",
          "**Walk every day**, starting with 10 minutes. It is one of the best-supported things you can do.",
          "Get outside in the morning light.",
          "Eat regular meals.",
          "Stay in touch with family or friends, even briefly.",
          "Avoid alcohol."
        ] },
        { t: "h", x: "About medicine" },
        { t: "ul", items: [
          "Antidepressants take time. Some people notice small changes in 1–2 weeks; the full effect can take up to 6 weeks.",
          "Don't stop because you feel no change yet. Talk to your doctor first.",
          "After you feel better, treatment usually continues for **at least 6 months**, and longer if you have had depression before. Your doctor will guide you."
        ] },
        { t: "video", v: "dep-who" },
        { t: "box", tone: "blue", title: "When should I get help?", body: [
          { t: "ul", items: [
            "Symptoms last more than 2 weeks, or are getting worse",
            "You feel hopeless",
            "Tiredness or aches don't improve and have no other cause"
          ] },
          { t: "p", x: "Thoughts of harming yourself or ending your life → [Urgent Help](#/urgent) now." }
        ] }
      ]
    },

    psychosis: {
      title: "Psychosis", short: "When the mind loses touch with what is real", icon: "🌫️", parent: "learn", edu: true,
      blocks: [
        { t: "h", x: "What is it?" },
        { t: "p", x: "Psychosis means the mind loses some contact with what is real. A person may:" },
        { t: "ul", items: [
          "hear, see or feel things that other people don't (for example, hearing voices)",
          "strongly believe things that others don't share, such as being watched, followed or harmed",
          "have muddled thinking or speech that is hard to follow"
        ] },
        { t: "p", x: "To the person, these experiences feel completely real. That is why arguing rarely helps." },
        { t: "h", x: "What can cause it?" },
        { t: "p", x: "Psychosis is a sign, not a diagnosis. It can happen with conditions such as schizophrenia, bipolar disorder or severe depression, and also with drugs (for example syabu/methamphetamine or cannabis), stopping alcohol suddenly, some physical illnesses, very poor sleep, or after childbirth. Your doctor will look for the cause." },
        { t: "box", tone: "teal", body: [
          { t: "p", x: "**Psychosis is treatable.** Many people recover well, especially when treatment starts early and continues." }
        ] },
        { t: "h", x: "Early signs to watch for" },
        { t: "ul", items: [
          "Sleeping much less, or much more",
          "Pulling away from family and friends",
          "Becoming suspicious or fearful",
          "Odd ideas, or talking in a way that is hard to follow",
          "Stopping work, study or self-care",
          "Stopping medicine"
        ] },
        { t: "p", x: "Each person has their own pattern. Write yours down in [my early warning signs plan](#/signs)." },
        { t: "h", x: "What helps alongside treatment?" },
        { t: "ul", items: [
          "Keep taking your medicine, even when you feel well. Talk to your doctor before any change.",
          "Keep regular sleep and meal times.",
          "Avoid alcohol, tuak and drugs. They can bring psychosis back.",
          "Lower stress where you can, and keep a simple daily routine.",
          "Stay close to people who support you.",
          "Come to every appointment, and bring a family member if that helps."
        ] },
        { t: "h", x: "For family" },
        { t: "p", x: "You don't need to agree or argue with unusual beliefs. Respond to the feeling: *\"That sounds frightening. I'm here with you.\"* See [Family & caregivers](#/family) for more." },
        { t: "box", tone: "blue", title: "When should I get help?", body: [
          { t: "ul", items: [
            "Early warning signs are coming back",
            "Medicine has been stopped or missed",
            "Voices or beliefs are getting stronger or more upsetting"
          ] },
          { t: "dept" },
          { t: "p", x: "If voices tell the person to harm themselves or others, or they may act on frightening beliefs → [Urgent Help](#/urgent) now." }
        ] }
      ]
    },

    /* ================= MANAGE (self-management) ================= */
    manage: {
      title: "Look after myself", short: "My coping plan, warning signs & daily routine", icon: "🌱",
      lead: "Simple plans you make yourself, with your team and family. Fill them in, then print or save them as PDF. Nothing is stored on this site.",
      blocks: [
        { t: "links", items: ["plan", "signs", "appointment"] },
        { t: "h", x: "Daily routine" },
        { t: "ul", items: [
          "Get up and go to bed at about the same time each day.",
          "Eat regular meals, and move your body every day, even a 10-minute walk.",
          "Do one thing you enjoy and one useful task each day.",
          "Practise one calming exercise daily, when you are calm, not only in a crisis: [Calm Down Now](#/calm)."
        ] },
        { t: "h", x: "Medicine and appointments" },
        { t: "ul", items: [
          "Set a daily alarm on your phone for your medicine. A weekly pill box helps too.",
          "Put your next appointment or injection date in your phone calendar, and set a reminder the day before.",
          "Running low on medicine? Contact the unit before it runs out.",
          "Don't stop or change your medicine without talking to your doctor."
        ] },
        { t: "dept" }
      ]
    },

    plan: {
      title: "My coping plan", short: "What helps me when things get hard", icon: "📝", parent: "manage",
      lead: "Fill this in when you feel calm, ideally with your team or someone you trust. Keep a printed copy somewhere easy to find.",
      blocks: [
        { t: "checklist", items: [
          { q: "When I start to struggle, I notice:", hint: "Thoughts, feelings, body signs, or things I do." },
          { q: "Things that help me calm down:", ticks: [
            "[Slow breathing](#/breathe-46)",
            "[5-4-3-2-1 grounding](#/ground)",
            "[Muscle relaxation](#/pmr-guide)",
            "Prayer or quiet reflection",
            "A walk or gardening",
            "Talking to someone",
            "Music",
            "Cool water on my hands"
          ], text: true },
          { q: "People I can talk to (name and phone number):" },
          { q: "Places where I feel calm and safe:" },
          { q: "Things to avoid when I'm struggling:", ticks: [
            "Alcohol or tuak",
            "Staying up late",
            "Being alone all day",
            "Missing my medicine",
            "Scrolling upsetting news or social media"
          ], text: true },
          { q: "My reasons to keep going (people, faith, hopes):" },
          { q: "My team's number:", hint: "Psychiatry & Mental Health Unit, Hospital Serian: 013-336 2896 (office hours)." , text: false }
        ] },
        { t: "box", tone: "red", title: "If I feel unsafe", body: [
          { t: "p", x: "Call **999** or go to the nearest Emergency Department. You can also call a helpline on the [Urgent Help](#/urgent) page." },
          { t: "call999" }
        ] }
      ]
    },

    signs: {
      title: "My early warning signs", short: "Spot a relapse early, and know what to do", icon: "🚦", parent: "manage",
      lead: "Before a relapse there are often small changes, days or weeks earlier. Knowing your own signs helps you act early. Make this plan with your team and family.",
      blocks: [
        { t: "checklist", items: [
          { q: "🟢 When I am well, I am usually like this:", hint: "For example: sleep, work, mood, how I spend my day.", zone: "g" },
          { q: "My early warning signs (tick the ones that fit me):", ticks: [
            "Sleeping less, or much more",
            "Feeling tense, irritable or on edge",
            "Losing interest in things",
            "Pulling away from people",
            "Feeling suspicious or fearful",
            "Hearing or seeing things others don't",
            "Racing thoughts, or unusually high energy",
            "Missing medicine",
            "More alcohol, tuak or drugs",
            "Not eating or washing",
            "Trouble concentrating"
          ], text: true },
          { q: "🟡 If I notice these signs, I will:", ticks: [
            "Use [my coping plan](#/plan)",
            "Tell a family member or friend",
            "Keep taking my medicine as prescribed",
            "Keep a regular sleep routine",
            "Avoid alcohol and drugs",
            "Call the unit, or ask for an earlier appointment"
          ], text: true, zone: "a" },
          { q: "🔴 If things get much worse, or I feel unsafe:", hint: "Call **999** or go to the Emergency Department. Tell someone you trust.", zone: "r" },
          { q: "Things that have triggered a relapse before:" },
          { q: "The person who will help me watch for these signs:" }
        ] },
        { t: "box", tone: "teal", body: [
          { t: "p", x: "**Share this plan** with your team at your next visit, and with someone you trust. Look at it again after any relapse or big change." }
        ] }
      ]
    },

    /* ================= VIDEOS ================= */
    videos: {
      title: "Watch & listen", short: "Short videos from trusted health organisations", icon: "▶️",
      lead: "Short, high-quality YouTube videos from trusted health organisations, such as WHO and the NHS. Most are in English with captions; one is in Malay. Nothing loads from YouTube until you tap Play, and videos use mobile data.",
      blocks: [
        { t: "h", x: "Breathing" },
        { t: "videos", items: ["breath-emm", "breath-box", "breath-belly", "breath-htar"] },
        { t: "h", x: "Grounding" },
        { t: "videos", items: ["ground-paho"] },
        { t: "h", x: "Muscle relaxation" },
        { t: "videos", items: ["pmr-therapistaid", "pmr-hss", "pmr-emm"] },
        { t: "h", x: "Mindfulness & stress" },
        { t: "videos", items: ["mind-nhs24", "stress-who"] },
        { t: "h", x: "Sleep" },
        { t: "videos", items: ["sleep-emm"] },
        { t: "h", x: "Understanding depression" },
        { t: "videos", items: ["dep-who"] },
        { t: "p", x: "*These videos are chosen by the unit, but they are made by other organisations. They support, but do not replace, advice from your own team.*" }
      ]
    },

    sleep: {
      title: "Sleep & mental health", tileTitle: "Sleep", short: "Habits that help, and warning signs", icon: "😴", edu: true,
      blocks: [
        { t: "h", x: "Why it matters" },
        { t: "p", x: "Poor sleep worsens mood, and low mood worsens sleep. For some conditions, such as bipolar disorder or psychosis, a sudden change is an early warning sign. That means **much less sleep while feeling full of energy**, or **much more sleep than usual**. Tell your team, even if you feel fine." },
        { t: "h", x: "These habits help alongside your treatment" },
        { t: "ul", items: [
          "Wake up at the same time every day, including weekends.",
          "Use your bed for sleep only, not for your phone or for worrying.",
          "Stop coffee, tea, cola and energy drinks **at least 8 hours before bed**. For a 10 pm bedtime, that means none after 2 pm.",
          "No screens for 30–60 minutes before bed.",
          "Keep the room cool, dark and quiet.",
          "Avoid heavy meals, alcohol and smoking close to bedtime.",
          "If you nap, keep it under 30 minutes and before 3 pm."
        ] },
        { t: "h", x: "My wind-down routine for tonight" },
        { t: "checklist", items: [
          { q: "Tick what you will try tonight:", ticks: [
            "Last coffee, tea or cola before 2 pm",
            "Phone and TV off 30–60 minutes before bed",
            "A warm wash or shower",
            "Dim the lights",
            "10 minutes of [slow breathing](#/breathe-46) or [body scan](#/med-body-guide)",
            "Write tomorrow's worries on paper, then put it away",
            "Wake-up alarm set for the same time as usual"
          ] }
        ] },
        { t: "video", v: "sleep-emm" },
        { t: "h", x: "Can't sleep?" },
        { t: "p", x: "If you have been awake for about 20 minutes, get up. Do something calm in dim light, such as [muscle relaxation](#/calm/pmr), and go back to bed when sleepy." },
        { t: "box", tone: "amber", title: "Sleeping-pill safety", body: [
          { t: "p", x: "Never take extra or borrowed pills, and never mix them with alcohol. If your dose isn't working, tell your team." }
        ] },
        { t: "box", tone: "blue", title: "When should I get help?", body: [
          { t: "ul", items: [
            "Sleep doesn't improve after trying these habits for a few weeks",
            "There is a sudden big change in how much you sleep",
            "Poor sleep is affecting your mood or daily life"
          ] }
        ] }
      ]
    },

    /* ================= MEDICINE ================= */
    medicine: {
      title: "My medicine", icon: "💊", edu: true,
      lead: "General information only. Your doctor and pharmacist will advise on your own medicine.",
      blocks: [
        { t: "h", x: "Why medicine helps" },
        { t: "p", x: "Medicine can ease symptoms and help stop them coming back. It works best alongside support from your team and family, and healthy routines. It does not change who you are." },
        { t: "h", x: "Taking it" },
        { t: "ul", items: [
          "Take it the way your doctor or pharmacist told you, at the same time each day.",
          "A phone alarm or a weekly pill box helps.",
          "A family member can help you remember."
        ] },
        { t: "h", x: "Missed a dose?" },
        { t: "p", x: "The right action depends on your medicine. Check the label or ask the pharmacy. **Never take two doses together to catch up**, unless your doctor or pharmacist tells you to." },
        { t: "h", x: "Side effects" },
        { t: "p", x: "Many are mild and settle in 1–2 weeks, such as sleepiness, a dry mouth or mild nausea. Tell your team about anything that bothers you. They can often help." },
        { t: "box", tone: "red", title: "Get help the same day, or go to the Emergency Department, if you have:", body: [
          { t: "ol", items: [
            "A rash with fever, blisters, or sores in the mouth or eyes",
            "Very stiff muscles with fever or confusion",
            "High fever, sweating, shaking and confusion soon after starting or increasing a medicine",
            "Fever with a sore throat or mouth ulcers",
            "A fast heartbeat at rest, chest pain, or breathlessness",
            "Shaking, unsteadiness, vomiting or diarrhoea, blurred vision or confusion together",
            "Swelling of the face, lips, tongue or throat, or trouble breathing",
            "Yellow eyes or skin, dark urine, or severe stomach pain",
            "Severe constipation (no bowel movement for several days), a swollen stomach or vomiting",
            "A fit (seizure) or fainting",
            "Severe restlessness, unable to sit still, especially with thoughts of self-harm",
            "A painful erection lasting more than 4 hours"
          ] },
          { t: "p", x: "**New or worse thoughts of suicide**, especially in young people in the first weeks of a new medicine or after a dose change → [Urgent Help](#/urgent)." },
          { t: "p", x: "These are rare. If in doubt, call or come in. We would rather check." }
        ] },
        { t: "h", x: "Don't stop suddenly" },
        { t: "p", x: "Stopping suddenly can bring symptoms back or cause withdrawal. For some conditions, relapse is more than twice as likely after stopping. If you want to reduce or stop, plan it with your team; it is usually done slowly." },
        { t: "h", x: "Tell your team about" },
        { t: "ul", items: [
          "Other medicines, vitamins and supplements",
          "Herbal or traditional remedies (jamu, ubat kampung, ketum), because some change how your medicine works",
          "Alcohol",
          "Pregnancy, breastfeeding, or plans for pregnancy. Never stop or change your medicine on your own."
        ] },
        { t: "h", x: "Injections" },
        { t: "p", x: "Write your next injection date where you will see it. If you can't come, call before the date." },
        { t: "h", x: "Safety at home" },
        { t: "p", x: "Keep medicine away from children. If anyone is worried about safety, a trusted family member can keep the medicine and hand out each dose. Ask us for help with this." },
        { t: "box", tone: "blue", title: "Contact us if", body: [
          { t: "ul", items: ["You are running low on medicine", "Side effects worry you", "You feel the medicine isn't working"] },
          { t: "dept" }
        ] }
      ]
    },

    /* ================= APPOINTMENT ================= */
    appointment: {
      title: "Prepare for my appointment", icon: "📅",
      lead: "Fill this in before your visit, then print it or show it on your phone.",
      blocks: [
        { t: "checklist", items: [
          { q: "Since my last visit I feel:", opts: ["Better", "The same", "Worse"] },
          { q: "New or changed symptoms:" },
          { q: "Sleep:" },
          { q: "Appetite and weight:" },
          { q: "Medicine taken as prescribed:", opts: ["Yes", "Mostly", "Often missed"] },
          { q: "Side effects:" },
          { q: "New physical problems:", hint: "For example fever, rash, swelling, stomach pain, fast heartbeat." },
          { q: "Alcohol, smoking or other substances:" },
          { q: "What helped me:" },
          { q: "What made things worse:" },
          { q: "Big events (work, family, money, health):" },
          { q: "Thoughts of self-harm:", opts: ["None", "Some", "Strong, or a plan"],
            hint: "If some or strong: **tell staff as soon as you arrive**. If you feel unsafe now, see [Urgent Help](#/urgent).", text: false },
          { q: "My top 3 questions for the doctor:" }
        ] },
        { t: "box", tone: "blue", title: "Bring with you", body: [
          { t: "ul", items: [
            "Your appointment book",
            "All your medicines, in their packets",
            "Your MyKad",
            "This checklist",
            "A family member, if that helps you"
          ] }
        ] }
      ]
    },

    /* ================= FAMILY ================= */
    family: {
      title: "Family & caregivers", icon: "👨‍👩‍👧",
      lead: "You are one of the most important parts of your loved one's care. This page gives simple ways to help, and to look after yourself too.",
      blocks: [
        { t: "h", x: "How can I help?" },
        { t: "ul", items: [
          "Listen without rushing to fix things.",
          "Keep home life calm and predictable. A calm home helps recovery.",
          "Encourage treatment gently. Remind, don't nag.",
          "Help with routines: meals, sleep, simple activities.",
          "Include your loved one in decisions about their care.",
          "Many families also use prayer, traditional or spiritual help. That's okay. Please keep the medicine going, and tell the team about anything else you try."
        ] },
        { t: "h", x: "What to say, and what to avoid" },
        { t: "ul", items: [
          "**Helpful:** \"I'm here for you.\" \"This isn't your fault.\" \"Take your time.\" \"What would help right now?\"",
          "**Avoid:** \"Just snap out of it.\" \"It's all in your head.\" \"You don't have enough faith.\" Comparisons with others, and threats."
        ] },
        { t: "p", x: "If they believe something that seems untrue (for example, that someone is watching them), you don't need to argue. Respond to the feeling: *\"That sounds frightening. I'm here with you.\"*" },
        { t: "p", x: "Worry often comes out as criticism. Try to say what you feel (\"I'm worried about you\") rather than what they did wrong." },
        { t: "h", x: "Warning signs" },
        { t: "ul", items: [
          "Big changes in sleep",
          "Pulling away from people",
          "Skipping medicine",
          "Becoming suspicious",
          "Hearing or seeing things others don't",
          "Being easily angered",
          "Not washing or eating",
          "Talking about death"
        ] },
        { t: "box", tone: "teal", body: [
          { t: "p", x: "**Each person has their own pattern.** As a family, write down what happened in the weeks before the last relapse, so you spot it sooner next time. Contact the team early; don't wait for things to get worse." }
        ] },
        { t: "h", x: "Helping with medicine" },
        { t: "ul", items: [
          "Make it part of the daily routine, and use a pill box.",
          "Notice side effects and tell the team. Don't just stop the medicine.",
          "Don't force. Talk calmly about any worries.",
          "If doses are refused, tell the team. Don't hide it."
        ] },
        { t: "box", tone: "red", title: "If things get worse at home", body: [
          { t: "ul", items: [
            "Stay calm. Speak slowly and softly. Give space; don't corner them.",
            "If safe, quietly remove knives, pesticides, ropes and extra medicines.",
            "If you are worried about suicide, **ask directly**: *\"Are you thinking of ending your life?\"* Asking does not put the idea in their head. It opens the door to help.",
            "Don't leave them alone.",
            "Call **999** in an emergency. Call the team during office hours.",
            "If your loved one urgently needs help but refuses to come, the hospital team can guide you through the proper steps. Call them, or bring them to the Emergency Department."
          ] },
          { t: "call999" }
        ] },
        { t: "h", x: "Looking after yourself" },
        { t: "ul", items: [
          "Many carers feel tired, worried or low. It is common, not a failure.",
          "Keep up your own sleep, meals and health checks.",
          "Share the load within the family, and take breaks.",
          "Talk to someone, or use the helplines on the [Urgent Help](#/urgent) page."
        ] }
      ]
    },

    /* ================= ABOUT ================= */
    about: {
      title: "About this site", icon: "ℹ️",
      blocks: [
        { t: "p", x: "This site gives you and your family simple, trusted information and calming exercises to use between clinic visits." },
        { t: "p", x: "It supports, but does not replace, the care from your doctor and team. It cannot give you personal medical advice." },
        { t: "h", x: "Your privacy" },
        { t: "p", x: "We do not collect, store or share any information about you. We use no cookies. There is no login. Anything you tick or type stays on your phone." },
        { t: "p", x: "The site only remembers your language, text-size, colour-theme and voice settings, on your own phone." },
        { t: "p", x: "**Videos:** nothing loads from YouTube until you tap Play. Then the video plays from YouTube (Google) in its privacy-enhanced mode, and YouTube's own privacy policy applies." },
        { t: "p", x: "The voice guide uses the voice built into your phone or browser. The site itself sends nothing, but some phones or browsers may use their own online speech service. If unsure, turn the voice off and follow the text on screen." },
        { t: "h", x: "Who prepared it" },
        { t: "p", x: "Psychiatry & Mental Health Unit, Hospital Serian, Sarawak." },
        { t: "p", x: "The content is based on Malaysian Ministry of Health clinical practice guidelines where they exist, and on international guidance (WHO, NICE) and research." },
        { t: "h", x: "Main sources" },
        { t: "ul", items: [
          "MOH Malaysia. [Clinical Practice Guidelines: Management of Major Depressive Disorder, 2nd ed. (2019)](https://www.moh.gov.my/images/04-penerbitan/penerbitan-klinikal/panduan-amalan-klinikal/CPG_Management_of_MDD_Second_Edition_04092020.pdf)",
          "NHS. [Breathing exercises for stress](https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/)",
          "NICE. CG113 (generalised anxiety and panic); NG222 (depression); NG215 (medicine withdrawal).",
          "WHO. *Doing What Matters in Times of Stress* (2020); *Preventing suicide: a resource for media professionals* (2023).",
          "Fincham et al. (2023), breathwork meta-analysis, *Scientific Reports*; Balban et al. (2023), *Cell Reports Medicine*.",
          "MOH Malaysia. Clinical Practice Guidelines: Management of Schizophrenia in Adults (2009). NICE CG178 (psychosis and schizophrenia in adults).",
          "Videos (YouTube, HD): WHO, PAHO, NHS 24, Every Mind Matters (NHS England), Sunnybrook Hospital, Hospital for Special Surgery, Indiana University School of Medicine, Therapist Aid, and the Psychiatry Department of Hospital Tengku Ampuan Rahimah Klang (MOH Malaysia). Each is listed with its publisher.",
          "Helpline numbers: each service's official website (Talian HEAL, Befrienders Kuching & KL, Talian Kasih, MIASA, Mental Health Association of Sarawak)."
        ] },
        { t: "p", x: "Malaysia has no MOH clinical practice guideline for anxiety or panic disorder; those pages rest on NICE, WHO and research evidence." },
        { t: "h", x: "Review" },
        { t: "p", x: "Version 0.7 · Status: **draft**, awaiting clinical approval." },
        { t: "p", x: "Clinical reviewer: Consultant Psychiatrist (Head of Department) · not yet approved." },
        { t: "p", x: "Content last reviewed: 22/09/2026. Helpline numbers last checked: 21/09/2026. Videos checked: 22/09/2026. Next review: 21/12/2026." },
        { t: "h", x: "Emergency" },
        { t: "p", x: "This website cannot receive messages or respond to emergencies. In an emergency, call **999** or see [Urgent Help](#/urgent)." }
      ]
    }
  }
};
