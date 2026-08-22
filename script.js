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
  "Give me your boarding pass please",
  "Is this your first time in Nepal for this visa year?",
  "Look at the camera please",
  "Which country are you coming from?",
  "Have you applied for a visa?",
  "Have you paid the visa fee?",
  "Please show me your visa application",
  "Welcome to Nepal, have a great time",
  "You can collect your luggage downstairs from the Customs area.",
  "At first you need to apply a visa, for that go to the left corner over there, there are kiosk machines to apply visa, apply your visa, take a photo of the application, then proceed to the visa fee collection counter on the right corner. Once you get your payment receipt, come back to the desk",
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

// ================== APP STATE ==================
let availableVoices = [];
let currentSpeechSpeed = 1.0;
let favorites = JSON.parse(localStorage.getItem("immigration_favorites")) || [];
const highlightIntervals = {};

// ================== SPEECH VOICES ==================
function loadVoices() {
  availableVoices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function getPreferredVoice(lang) {
  return availableVoices.find(v => v.lang.startsWith(lang)) || null;
}

// ================== RENDER UI ==================
function renderApp() {
  const questionsContainer = document.getElementById("questions");
  const pinnedContainer = document.getElementById("pinned-container");
  const pinnedSection = document.getElementById("pinned-section");

  questionsContainer.innerHTML = "";
  pinnedContainer.innerHTML = "";

  let hasPinned = false;

  questions.forEach((q, i) => {
    const isFav = favorites.includes(q);
    if (isFav) hasPinned = true;

    const createCardHTML = (uniqueId) => `
      <div class="question-header">
        <strong>${i + 1}. ${q}</strong>
        <button class="star-btn ${isFav ? 'favorited' : ''}" onclick="toggleFavorite('${q.replace(/'/g, "\\'")}')" title="Pin to Top">
          ${isFav ? '⭐' : '☆'}
        </button>
      </div>
      <div class="button-group">
        ${Object.entries(languages).map(([name, { code, flag, color }]) => `
          <button style="background:${color}"
            onclick="translateText('${q.replace(/'/g, "\\'")}', '${code}', 'output-${uniqueId}', 'translit-${uniqueId}')">
            ${flag} ${name}
          </button>
        `).join("")}
      </div>
      <div id="output-${uniqueId}" class="translation-output"></div>
      <div id="translit-${uniqueId}" class="transliteration-output"></div>
    `;

    const mainDiv = document.createElement("div");
    mainDiv.className = "question";
    mainDiv.innerHTML = createCardHTML(`main-${i}`);
    questionsContainer.appendChild(mainDiv);

    if (isFav) {
      const pinDiv = document.createElement("div");
      pinDiv.className = "question";
      pinDiv.innerHTML = createCardHTML(`pin-${i}`);
      pinnedContainer.appendChild(pinDiv);
    }
  });

  if (hasPinned) {
    pinnedSection.classList.remove("hidden");
  } else {
    pinnedSection.classList.add("hidden");
  }
}

// ================== FAVORITES / PIN LOGIC ==================
function toggleFavorite(questionText) {
  if (favorites.includes(questionText)) {
    favorites = favorites.filter(fav => fav !== questionText);
  } else {
    favorites.push(questionText);
  }
  localStorage.setItem("immigration_favorites", JSON.stringify(favorites));
  renderApp();
}

// ================== SETUP CUSTOM & REPLY DROPDOWNS ==================
function setupDropdowns() {
  const customButtons = document.getElementById("customButtons");
  const replyLangSelect = document.getElementById("replyLangSelect");
  
  customButtons.innerHTML = "";
  replyLangSelect.innerHTML = "";

  Object.entries(languages).forEach(([name, { code, flag }]) => {
    // Custom Input Buttons
    const btn = document.createElement("button");
    btn.textContent = `${flag} ${name}`;
    btn.style.background = languages[name].color;
    btn.onclick = () => {
      const text = document.getElementById("customInput").value.trim();
      if (text) translateText(text, code, "customOutput", "customTranslit");
    };
    customButtons.appendChild(btn);

    // Reply Mode Language Options
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${flag} ${name}`;
    replyLangSelect.appendChild(option);
  });
}

// ================== TRAVELER REPLY MODE (SPEECH RECOGNITION) ==================
function setupSpeechRecognition() {
  const micBtn = document.getElementById("micBtn");
  const micStatus = document.getElementById("micStatus");
  const replyLangSelect = document.getElementById("replyLangSelect");
  const replyOriginal = document.getElementById("replyOriginal");
  const replyEnglish = document.getElementById("replyEnglish");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    micBtn.disabled = true;
    micStatus.innerText = "Speech Recognition API not supported in this browser. Use Chrome or Edge.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.interimResults = false;

  let isListening = false;

  micBtn.addEventListener("click", () => {
    if (isListening) {
      recognition.stop();
      return;
    }

    recognition.lang = replyLangSelect.value;
    recognition.start();
  });

  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add("listening");
    micBtn.textContent = "🔴 Listening...";
    micStatus.innerText = "Listening to traveler... Speak now.";
    replyOriginal.classList.add("hidden");
    replyEnglish.classList.add("hidden");
  };

  recognition.onresult = async (event) => {
    const spokenText = event.results[0][0].transcript;
    const selectedLang = replyLangSelect.value;

    replyOriginal.innerText = `Original (${selectedLang}): "${spokenText}"`;
    replyOriginal.classList.remove("hidden");

    // Translate back to English using Google Translate endpoint (sl = source, tl = en)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${selectedLang}&tl=en&dt=t&q=${encodeURIComponent(spokenText)}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      const translatedEnglish = data[0][0][0];

      replyEnglish.innerText = `English Translation: "${translatedEnglish}"`;
      replyEnglish.classList.remove("hidden");
    } catch (err) {
      replyEnglish.innerText = "Failed to translate response to English.";
      replyEnglish.classList.remove("hidden");
    }
  };

  recognition.onerror = () => {
    micStatus.innerText = "Microphone error or speech not recognized. Try again.";
  };

  recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove("listening");
    micBtn.textContent = "🎙️ Start Listening";
    if (micStatus.innerText.includes("Listening")) {
      micStatus.innerText = "Microphone ready.";
    }
  };
}

// ================== TRANSLATION & SPEECH (WITH BENGALI SAFEGUARD) ==================
async function translateText(text, targetLang, outputId, translitId) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&dt=rm&q=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const translated = data[0][0][0];
    const translit = data[0][0][3] || "";

    document.getElementById(outputId).innerText = translated;
    document.getElementById(translitId).innerText = translit;

    const utter = new SpeechSynthesisUtterance(translated);
    utter.lang = targetLang;
    utter.rate = currentSpeechSpeed;

    const voice = getPreferredVoice(targetLang);
    
    if (voice) {
      utter.voice = voice;
    } else {
      console.warn(`Native speech voice pack not found locally for: ${targetLang}. Displaying visual text only.`);
    }

    utter.onstart = () => highlightText(outputId);
    utter.onend = () => stopHighlight(outputId);
    utter.onerror = () => stopHighlight(outputId);

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
  if (!el || !el.innerText) return;
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
  if (el) el.innerHTML = el.innerText;
}

// ================== INITIALIZATION ==================
document.addEventListener("DOMContentLoaded", () => {
  renderApp();
  setupDropdowns();
  setupSpeechRecognition();

  // Speed Control Logic
  const speedButtons = document.querySelectorAll(".speed-btn");
  speedButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      speedButtons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentSpeechSpeed = parseFloat(e.target.getAttribute("data-speed"));
    });
  });

  // Dark Mode Toggle Logic
  const darkToggle = document.getElementById("darkToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (darkToggle) darkToggle.checked = true;
  }

  if (darkToggle) {
    darkToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark", darkToggle.checked);
      localStorage.setItem("theme", darkToggle.checked ? "dark" : "light");
    });
  }
});
