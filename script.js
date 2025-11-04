const languages = {
  Spanish: { code: "es", flag: "🇪🇸" },
  Italian: { code: "it", flag: "🇮🇹" },
  Russian: { code: "ru", flag: "🇷🇺" },
  Chinese: { code: "zh-CN", flag: "🇨🇳" },
  Japanese: { code: "ja", flag: "🇯🇵" },
  Korean: { code: "ko", flag: "🇰🇷" },
  French: { code: "fr", flag: "🇫🇷" },
  Arabic: { code: "ar", flag: "🇸🇦" },
  German: { code: "de", flag: "🇩🇪" },
  Hindi: { code: "hi", flag: "🇮🇳" }
};

const questions = [
  "What is the purpose of your visit to Nepal?",
  "How long are you planning to stay?",
  "Where will you be staying during your visit?",
  "Do you have a return ticket?",
  "Have you visited Nepal before?",
  "Are you traveling alone or with someone?",
  "Do you have sufficient funds for your stay?",
  "Have you booked your accommodation?",
  "What is your occupation?",
  "Which country are you coming from?",
  "Are you carrying any restricted items?",
  "Do you have any goods to declare?",
  "Are you visiting for tourism, business, or other reasons?",
  "Can I see your passport, please?",
  "Do you have travel insurance?",
  "Are you carrying any food, plants, or animals?",
  "Have you received any vaccinations before travel?",
  "Do you plan to travel outside Kathmandu?",
  "Who is sponsoring your visit?",
  "Do you have any relatives or friends in Nepal?"
];

const questionsContainer = document.getElementById("questions");

// Populate questions dynamically
questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `
    <strong>${i + 1}. ${q}</strong>
    <div class="button-group">
      ${Object.entries(languages)
        .map(([name, { code, flag }]) => 
          `<button onclick="translateText('${q}', '${code}', 'output-${i}')">${flag} ${name}</button>`
        )
        .join('')}
    </div>
    <div class="translation-output" id="output-${i}"></div>
  `;
  questionsContainer.appendChild(div);
});

// Add custom buttons
const customButtons = document.getElementById("customButtons");
Object.entries(languages).forEach(([name, { code, flag }]) => {
  const btn = document.createElement("button");
  btn.innerHTML = `${flag} ${name}`;
  btn.onclick = () => {
    const text = document.getElementById("customInput").value.trim();
    if (text) translateText(text, code, "customOutput");
  };
  customButtons.appendChild(btn);
});

// Translate text using Google Translate API
async function translateText(text, targetLang, outputId) {
  const encoded = encodeURIComponent(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encoded}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const translated = data[0][0][0];

    document.getElementById(outputId).innerText = translated;

    // Auto TTS
    speak(translated, targetLang);
  } catch (err) {
    console.error("Translation failed:", err);
    document.getElementById(outputId).innerText = "Error translating text.";
  }
}

// Text-to-speech
function speak(text, langCode) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langCode;
  utter.rate = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}
