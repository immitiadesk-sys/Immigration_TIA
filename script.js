// ================== LANGUAGE CONFIG ==================
const languages = {
  Spanish: { code: "es", flag: "🇪🇸", color: "#F94144" },
  Italian: { code: "it", flag: "🇮🇹", color: "#90BE6D" },
  Russian: { code: "ru", flag: "🇷🇺", color: "#577590" },
  Chinese: { code: "zh-CN", flag: "🇨🇳", color: "#F3722C" },
  Japanese: { code: "ja", flag: "🇯🇵", color: "#F9C74F" },
  Korean: { code: "ko", flag: "🇰🇷", color: "#43AA8B" },
  French: { code: "fr", flag: "🇫🇷", color: "#277DA1" },
  Bengali: { code: "bn", flag: "🇧🇩", color: "#FF6D00" },
  German: { code: "de", flag: "🇩🇪", color: "#6A4C93" },
  Hindi: { code: "hi", flag: "🇮🇳", color: "#F3722C" },
  Portuguese: { code: "pt", flag: "🇵🇹", color: "#43AA8B" }
};

// ================== QUESTIONS ==================
const questions = [
  "Hello, how are you?",
  "Give me your passport and boarding pass please",
  "Look at the camera please",
  "Which country are you coming from?",
  "Have you applied for a visa?",
  "Have you paid the visa fee?",
  "Welcome to Nepal, have a great time",
  "You can collect your luggage downstairs from the Customs area.",
  "How long are you planning to stay?",
  "Where will you be staying during your visit?",
  "Have you visited Nepal before?",
  "Are you traveling alone or with someone?",
  "Do you have sufficient funds for your stay?",
  "Thank you for visiting Nepal. Have a safe flight.",
  "What is your occupation?",
  "Are you carrying any restricted items?",
  "Are you visiting for tourism, business, or other reasons?",
  "Do you have travel insurance?",
  "How was your Nepal stay? Do you like Nepal?",
  "Who is sponsoring your visit?",
  "Do you have any feedback or complaint regarding your stay in Nepal?"
];

// ================== DOM REFERENCES ==================
const questionsContainer = document.getElementById("questions");
const customButtons = document.getElementById("customButtons");

const utterances = {};
const highlightIntervals = {};
let availableVoices = [];

// ================== SPEECH VOICES ==================
function loadVoices() {
  availableVoices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function getPreferredVoice(lang) {
  return availableVoices.find(v => v.lang.startsWith(lang)) || null;
}

// ================== POPULATE QUESTIONS ==================
questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.className = "question";

  div.innerHTML = `
    <strong>${i + 1}. ${q}</strong>
    <div class="button-group">
      ${Object.entries(languages).map(([name, { code, flag, color }]) => `
        <button style="background:${color}"
          onclick="translateText('${q}', '${code}', 'output-${i}', 'translit-${i}')">
          ${flag} ${name}
        </button>
      `).join("")}
    </div>
    <div id="output-${i}" class="translation-output"></div>
    <div id="translit-${i}" class="transliteration-output"></div>
  `;
  questionsContainer.appendChild(div);
});

// ================== CUSTOM INPUT BUTTONS ==================
Object.entries(languages).forEach(([name, { code, flag, color }]) => {
  const btn = document.createElement("button");
  btn.textContent = `${flag} ${name}`;
  btn.style.background = color;

  btn.onclick = () => {
    const text = document.getElementById("customInput").value.trim();
    if (text) translateText(text, code, "customOutput", "customTranslit");
  };

  customButtons.appendChild(btn);
});

// ================== TRANSLATION ==================
async function translateText(text, targetLang, outputId, translitId) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const translated = data[0][0][0];
    const translit = data[0][0][3] || "";

    document.getElementById(outputId).innerText = translated;
    document.getElementById(translitId).innerText = translit;

    const utter = new SpeechSynthesisUtterance(translated);
    utter.lang = targetLang;

    const voice = getPreferredVoice(targetLang);
    if (voice) utter.voice = voice;

    utter.onstart = () => highlightText(outputId);
    utter.onend = () => stopHighlight(outputId);

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);

  } catch (err) {
    document.getElementById(outputId).innerText = "Translation failed";
    document.getElementById(translitId).innerText = "";
  }
}

// ================== HIGHLIGHTING ==================
function highlightText(id) {
  const el = document.getElementById(id);
  const words = el.innerText.split(" ");
  let i = 0;

  highlightIntervals[id] = setInterval(() => {
    el.innerHTML = words.map((w, idx) =>
      idx === i ? `<span>${w}</span>` : w
    ).join(" ");

    if (++i >= words.length) clearInterval(highlightIntervals[id]);
  }, 400);
}

function stopHighlight(id) {
  clearInterval(highlightIntervals[id]);
  const el = document.getElementById(id);
  el.innerHTML = el.innerText;
}

// ================== DARK MODE (FINAL) ==================
document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkToggle");
  if (!darkToggle) return;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }

  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkToggle.checked);
    localStorage.setItem("theme", darkToggle.checked ? "dark" : "light");
  });
});
