// ===== Languages with color themes =====
const languages = {
  Spanish: { code: "es", flag: "🇪🇸", color: "#F94144" },    // Red
  Italian: { code: "it", flag: "🇮🇹", color: "#90BE6D" },    // Green
  Russian: { code: "ru", flag: "🇷🇺", color: "#577590" },    // Blue
  Chinese: { code: "zh-CN", flag: "🇨🇳", color: "#F3722C" }, // Orange
  Japanese: { code: "ja", flag: "🇯🇵", color: "#F9C74F" },  // Yellow
  Korean: { code: "ko", flag: "🇰🇷", color: "#43AA8B" },    // Teal
  French: { code: "fr", flag: "🇫🇷", color: "#277DA1" },    // Dark Blue
  Bengali: { code: "bn", flag: "🇧🇩", color: "#FF6D00" },   // Deep Orange
  German: { code: "de", flag: "🇩🇪", color: "#6A4C93" },    // Purple
  Hindi: { code: "hi", flag: "🇮🇳", color: "#F3722C" },     // Orange
  Portuguese: { code: "pt", flag: "🇵🇹", color: "#43AA8B" } // Teal
};

// ===== Questions =====
const questions = [
  "Hello,how are you?",
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
  "How was your Nepal stay? Do you like Nepal? ",
  "Who is sponsoring your visit?",
  "Do you have any feedback or complaint regarding your stay in  Nepal?"
];

const questionsContainer = document.getElementById("questions");
const utterances = {};          // Store speech utterances per question
const highlightIntervals = {};  // Store highlighting intervals

// ===== Populate questions dynamically =====
questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `
    <strong>${i + 1}. ${q}</strong>
    <div class="button-group">
      ${Object.entries(languages)
        .map(
          ([name, { code, flag, color }]) =>
            `<button 
              style="background-color: ${color}; color: white; border: none; padding: 5px 10px; margin: 2px; border-radius: 5px; cursor: pointer;"
              onclick="translateText('${q}', '${code}', 'output-${i}', 'translit-${i}')">
              ${flag} ${name}
            </button>`
        )
        .join('')}
    </div>
    <div class="translation-output" id="output-${i}"></div>
    <div class="transliteration-output" id="translit-${i}" style="color: gray; font-style: italic;"></div>
    <button id="playBtn-${i}" onclick="toggleSpeech('output-${i}', '${i}')">▶️ Play</button>
  `;
  questionsContainer.appendChild(div);
});

// ===== Custom input buttons =====
const customButtons = document.getElementById("customButtons");
Object.entries(languages).forEach(([name, { code, flag, color }]) => {
  const btn = document.createElement("button");
  btn.innerHTML = `${flag} ${name}`;
  btn.style.backgroundColor = color;
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.padding = "5px 10px";
  btn.style.margin = "2px";
  btn.style.borderRadius = "5px";
  btn.style.cursor = "pointer";
  btn.onclick = () => {
    const text = document.getElementById("customInput").value.trim();
    if (text) translateText(text, code, "customOutput", "customTranslit");
  };
  customButtons.appendChild(btn);
});

// ===== Translate text using Google Translate API =====
async function translateText(text, targetLang, outputId, translitId) {
  const encoded = encodeURIComponent(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encoded}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const translated = data[0][0][0];
    let transliteration = "";

    try { transliteration = data[0][0][3] || ""; } catch { transliteration = ""; }

    document.getElementById(outputId).innerText = translated;
    document.getElementById(translitId).innerText = transliteration;

    // Prepare utterance with TTS
    const utter = new SpeechSynthesisUtterance(translated);
    utter.lang = targetLang;
    utter.rate = 1;

    utter.onstart = () => highlightText(outputId);
    utter.onend = () => stopHighlight(outputId);

    utterances[outputId] = utter;

  } catch (err) {
    console.error("Translation failed:", err);
    document.getElementById(outputId).innerText = "Error translating text.";
    document.getElementById(translitId).innerText = "";
  }
}


// ===== Highlight translation word by word =====
function highlightText(outputId) {
  const el = document.getElementById(outputId);
  const words = el.innerText.split(" ");
  let i = 0;

  highlightIntervals[outputId] = setInterval(() => {
    el.innerHTML = words.map((w, idx) =>
      idx === i ? `<span style="background: yellow">${w}</span>` : w
    ).join(" ");
    i++;
    if (i > words.length) clearInterval(highlightIntervals[outputId]);
  }, 400); // Adjust speed as needed
}

// ===== Stop highlighting =====
function stopHighlight(outputId) {
  clearInterval(highlightIntervals[outputId]);
  const el = document.getElementById(outputId);
  el.innerHTML = el.innerText; // Remove span highlights
}

