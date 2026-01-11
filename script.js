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
  "Have you booked your accommodation?",
  "What is your occupation?",
  "Are you carrying any restricted items?",
  "Are you visiting for tourism, business, or other reasons?",
  "Do you have travel insurance?",
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
        .map(
          ([name, { code, flag }]) =>
            `<button onclick="translateText('${q}', '${code}', 'output-${i}')">${flag} ${name}</button>`
        )
        .join("")}
    </div>
    <div class="translation-output" id="output-${i}"></div>
  `;
  questionsContainer.appendChild(div);
});

// Custom input buttons
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

    // Call backend TTS
    speak(translated, targetLang);
  } catch (err) {
    console.error("Translation failed:", err);
    document.getElementById(outputId).innerText = "Error translating text.";
  }
}

// 🔊 Backend TTS
async function speak(text, langCode) {
  try {
    const res = await fetch("/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, langCode })
    });

    const data = await res.json();
    if (!data.audioContent) {
      console.error("No audio returned from backend TTS");
      return;
    }

    const audio = document.getElementById("cloudTtsAudio");
    audio.src = "data:audio/mp3;base64," + data.audioContent;
    audio.currentTime = 0;
    audio.play();

  } catch (err) {
    console.error("TTS request failed:", err);
  }
}
