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

// ================== QUESTIONS WITH CATEGORIES ==================
const questions = [
  { text: "Hello, how are you?", category: "General" },
  { text: "Give me your passport and boarding pass please", category: "Visa & Docs" },
  { text: "Give me your boarding pass please", category: "Visa & Docs" },
  { text: "Is this your first time in Nepal for this visa year?", category: "Visa & Docs" },
  { text: "Look at the camera please", category: "Security" },
  { text: "Which country are you coming from?", category: "Travel Details" },
  { text: "Have you applied for a visa?", category: "Visa & Docs" },
  { text: "Have you paid the visa fee?", category: "Visa & Docs" },
  { text: "Please show me your visa application", category: "Visa & Docs" },
  { text: "Welcome to Nepal, have a great time", category: "General" },
  { text: "You can collect your luggage downstairs from the Customs area.", category: "Security" },
  { text: "At first you need to apply a visa, for that go to the left corner over there, there are kiosk machines to apply visa, apply your visa, take a photo of the application, then proceed to the visa fee collection counter on the right corner. Once you get your payment receipt, come back to the desk", category: "Visa & Docs" },
  { text: "How long are you planning to stay?", category: "Travel Details" },
  { text: "Where will you be staying during your visit?", category: "Travel Details" },
  { text: "Have you visited Nepal before?", category: "Travel Details" },
  { text: "Are you traveling alone or with someone?", category: "Travel Details" },
  { text: "Do you have sufficient funds for your stay?", category: "Travel Details" },
  { text: "Thank you for visiting Nepal. Have a safe flight.", category: "Farewell" },
  { text: "What is your occupation?", category: "Travel Details" },
  { text: "Are you carrying any restricted items?", category: "Security" },
  { text: "Are you visiting for tourism, business, or other reasons?", category: "Travel Details" },
  { text: "Do you have travel insurance?", category: "Travel Details" },
  { text: "How was your Nepal stay? Do you like Nepal?", category: "Farewell" },
  { text: "Who is sponsoring your visit?", category: "Travel Details" },
  { text: "Do you have any feedback or complaint regarding your stay in Nepal?", category: "Farewell" }
];

// ================== APP STATE ==================
let availableVoices = [];
let currentSpeechSpeed = 1.0;
let currentFilter = "All";
let favorites = JSON.parse(localStorage.getItem("immigration_favorites")) || [];
const highlightIntervals = {};

// ================== SPEECH VOICES ==================
function loadVoices() {
  availableVoices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function getPreferredVoice(lang) {
  const lowerLang = lang.toLowerCase();
  return availableVoices.find(v => 
    v.lang.toLowerCase().startsWith(lowerLang) || 
    v.lang.toLowerCase().includes(lowerLang)
  ) || null;
}

// ================== RENDER UI ==================
function renderApp() {
  const questionsContainer = document.getElementById("questions");
  const pinnedContainer = document.getElementById("pinned-container");
  const pinnedSection = document.getElementById("pinned-section");
  const filterContainer = document.getElementById("filterContainer");

  questionsContainer.innerHTML = "";
  pinnedContainer.innerHTML = "";
  filterContainer.innerHTML = "";

  // 1. Render Filter Chips
  const categories = ["All", "General", "Visa & Docs", "Travel Details", "Security", "Farewell"];
  categories.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = `filter-chip ${currentFilter === cat ? 'active' : ''}`;
    chip.textContent = cat;
    chip.onclick = () => {
      currentFilter = cat;
      renderApp();
    };
    filterContainer.appendChild(chip);
  });

  let hasPinned = false;

  questions.forEach((item, i) => {
    const q = item.text;
    const cat = item.category;
    const isFav = favorites.includes(q);
    if (isFav) hasPinned = true;

    const createCardHTML = (uniqueId) => `
      <div class="question-header">
        <div>
          <span class="badge">${cat}</span>
          <strong>${i + 1}. ${q}</strong>
        </div>
        <button class="star-btn ${isFav ? 'favorited' : ''}" onclick="toggleFavorite('${q.replace(/'/g, "\\'")}')" title="Pin to Top">
          ${isFav ? '⭐' : '☆'}
        </button>
      </div>
      <div class="button-group">
        ${Object.entries(languages).map(([name, { code, flag, color }]) => `
          <button style="background:${color}"
            onclick="translateText('${q.replace(/'/g, "\\'")}', '${code}', 'output-${uniqueId}', 'translit-${uniqueId}')">
            ${flag}${name}
          </button>
        `).join("")}
      </div>
      <div id="output-${uniqueId}" class="translation-output"></div>
      <div id="translit-${uniqueId}" class="transliteration-output"></div>
    `;

    if (isFav) {
      const pinDiv = document.createElement("div");
      pinDiv.className = "question";
      pinDiv.innerHTML = createCardHTML(`pin-${i}`);
      pinnedContainer.appendChild(pinDiv);
    }

    if (currentFilter === "All" || cat === currentFilter) {
      const mainDiv = document.createElement("div");
      mainDiv.className = "question";
      mainDiv.innerHTML = createCardHTML(`main-${i}`);
      questionsContainer.appendChild(mainDiv);
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
  const replyTranslit = document.getElementById("replyTranslit");
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
    replyTranslit.classList.add("hidden");
    replyEnglish.classList.add("hidden");
  };

  recognition.onresult = async (event) => {
    const spokenText = event.results[0][0].transcript;
    const selectedLang = replyLangSelect.value;

    replyOriginal.innerText = `Original (${selectedLang}): "${spokenText}"`;
    replyOriginal.classList.remove("hidden");

    // Translate back to English and fetch romanization (dt=rm)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${selectedLang}&tl=en&dt=t&dt=rm&q=${encodeURIComponent(spokenText)}`;
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      const translatedEnglish = data[0][0][0];

      let translitText = "";
      if (data[0]) {
        translitText = data[0].map(item => item[3]).filter(Boolean).join(" ");
      }

      if (translitText) {
        replyTranslit.innerText = `Phonetic / Transliteration: "${translitText.toUpperCase()}"`;
        replyTranslit.classList.remove("hidden");
      } else {
        replyTranslit.classList.add("hidden");
      }

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

// ================== TRANSLATION & SPEECH ==================
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
    
    // Map codes to locale tags for speech stability (fixes Bengali)
    let speechLang = targetLang;
    if (targetLang === "bn") speechLang = "bn-BD";
    else if (targetLang === "hi") speechLang = "hi-IN";
    else if (targetLang === "es") speechLang = "es-ES";
    else if (targetLang === "fr") speechLang = "fr-FR";
    else if (targetLang === "de") speechLang = "de-DE";
    else if (targetLang === "it") speechLang = "it-IT";
    else if (targetLang === "ru") speechLang = "ru-RU";
    else if (targetLang === "pt") speechLang = "pt-PT";

    utter.lang = speechLang;
    utter.rate = currentSpeechSpeed;

    const voice = getPreferredVoice(targetLang);
    
    if (voice) {
      utter.voice = voice;
    } else {
      console.warn(`Native speech voice pack not found locally for: ${targetLang}. Using default.`);
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
