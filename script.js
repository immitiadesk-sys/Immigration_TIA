// ===== Languages with colors =====
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

// ===== Questions =====
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
  "Thank you for visiting Nepal. Have a safe flight."
];

const questionsContainer = document.getElementById("questions");
const highlightIntervals = {};

// ===== Populate Questions with colored buttons =====
questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.className = "question";

  div.innerHTML = `
    <strong>${i + 1}. ${q}</strong>
    <div class="button-group">
      ${Object.entries(languages).map(
        ([name, { code, flag, color }]) =>
          `<button 
            style="background-color:${color}"
            onclick="translateText('${q}', '${code}', 'output-${i}', 'translit-${i}')">
            ${flag} ${name}
          </button>`
      ).join("")}
    </div>
    <div class="translation-output" id="output-${i}"></div>
    <div class="transliteration-output" id="translit-${i}"></div>
  `;
  questionsContainer.appendChild(div);
});

// ===== Custom Buttons =====
const customButtons = document.getElementById("customButtons");
Object.entries(languages).forEach(([name, { code, flag, color }]) => {
  const btn = document.createElement("button");
  btn.innerHTML = `${flag} ${name}`;
  btn.style.backgroundColor = color;
  btn.onclick = () => {
    const text = document.getElementById("customInput").value.trim();
    if (text) translateText(text, code, "customOutput", "customTranslit");
  };
  customButtons.appendChild(btn);
});

// ===== Voice selector =====
let availableVoices = [];
const voiceSelect = document.getElementById("voiceGender");

function loadVoices() {
  availableVoices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Restore saved voice preference
const savedGender = localStorage.getItem("voiceGender");
if (savedGender) voiceSelect.value = savedGender;

voiceSelect.addEventListener("change", () => {
  localStorage.setItem("voiceGender", voiceSelect.value);
});

// ===== Get preferred voice =====
function getPreferredVoice(lang) {
  const gender = voiceSelect.value;
  const matches = availableVoices.filter(v => v.lang.startsWith(lang));
  if (!matches.length) return null;

  if (gender === "female") {
    return matches.find(v =>
      /female|woman|zira|susan|samantha|karen/i.test(v.name)
    ) || matches[0];
  }
  return matches.find(v =>
    /male|man|david|mark|alex|daniel/i.test(v.name)
  ) || matches[0];
}

// ===== Translate + Auto TTS =====
async function translateText(text, targetLang, outputId, translitId) {
  const encoded = encodeURIComponent(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encoded}`;

  const res = await fetch(url);
  const data = await res.json();

  const translated = data[0][0][0];
  const translit = data[0][0][3] || "";

  document.getElementById(outputId).innerText = translated;
  document.getElementById(translitId).innerText = translit;

  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(translated);
  utter.lang = targetLang;

  const selectedVoice = getPreferredVoice(targetLang);
  if (selectedVoice) utter.voice = selectedVoice;

  utter.onstart = () => highlightText(outputId);
  utter.onend = () => stopHighlight(outputId);

  speechSynthesis.speak(utter);
}

// ===== Highlight =====
function highlightText(id) {
  const el = document.getElementById(id);
  const words = el.innerText.split(" ");
  let i = 0;

  highlightIntervals[id] = setInterval(() => {
    el.innerHTML = words.map((w, idx) =>
      idx === i ? `<span>${w}</span>` : w
    ).join(" ");
    i++;
    if (i > words.length) clearInterval(highlightIntervals[id]);
  }, 400);
}

function stopHighlight(id) {
  clearInterval(highlightIntervals[id]);
  const el = document.getElementById(id);
  el.innerHTML = el.innerText;
}

// ===== Dark Mode Logic =====
const toggle = document.getElementById("darkToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});
