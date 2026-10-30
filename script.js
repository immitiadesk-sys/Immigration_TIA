// ================== LANGUAGE CONFIG ==================
const languages = {

  Arabic:     { code: "ar",  flag: "🇸🇦", color: "#2D6A4F" },
  Bengali:    { code: "bn",  flag: "🇧🇩", color: "#FF6D00" },
  Burmese:    { code: "my",  flag: "🇲🇲", color: "#FFC107" },
  Chinese:    { code: "zh-CN", flag: "🇨🇳", color: "#F3722C" },
  Czech:      { code: "cs",  flag: "🇨🇿", color: "#11457E" },
  Dutch:      { code: "nl",  flag: "🇳🇱", color: "#F77F00" },
  English:    { code: "en",  flag: "🇬🇧", color: "#4361EE" },
  Filipino:   { code: "fil", flag: "🇵🇭", color: "#0038A8" },
  French:     { code: "fr",  flag: "🇫🇷", color: "#277DA1" },
  German:     { code: "de",  flag: "🇩🇪", color: "#6A4C93" },
  Greek:      { code: "el",  flag: "🇬🇷", color: "#1D3557" },
  Hebrew:     { code: "he",  flag: "🇮🇱", color: "#005EB8" },
  Hindi:      { code: "hi",  flag: "🇮🇳", color: "#F3722C" },
  Indonesian: { code: "id",  flag: "🇮🇩", color: "#E63946" },
  Italian:    { code: "it",  flag: "🇮🇹", color: "#90BE6D" },
  Japanese:   { code: "ja",  flag: "🇯🇵", color: "#F9C74F" },
  Korean:     { code: "ko",  flag: "🇰🇷", color: "#43AA8B" },
  Malay:      { code: "ms",  flag: "🇲🇾", color: "#F4A261" },
  Nepali:     { code: "ne",  flag: "🇳🇵", color: "#DC143C" },
  Persian:    { code: "fa",  flag: "🇮🇷", color: "#198754" },
  Filipino:   { code: "fil", flag: "🇵🇭", color: "#0038A8" },
  Polish:     { code: "pl",  flag: "🇵🇱", color: "#DC143C" },
  Portuguese: { code: "pt",  flag: "🇵🇹", color: "#43AA8B" },
  Russian:    { code: "ru",  flag: "🇷🇺", color: "#577590" },
  Sinhala:    { code: "si",  flag: "🇱🇰", color: "#8D5524" },
  Spanish:    { code: "es",  flag: "🇪🇸", color: "#F94144" },
  Swedish:    { code: "sv",  flag: "🇸🇪", color: "#0077B6" },
  Thai:       { code: "th",  flag: "🇹🇭", color: "#7B2CBF" },
  Turkish:    { code: "tr",  flag: "🇹🇷", color: "#E63946" },
  Ukrainian:  { code: "uk",  flag: "🇺🇦", color: "#3399FF" },
  Urdu:       { code: "ur",  flag: "🇵🇰", color: "#006400" },
  Vietnamese: { code: "vi",  flag: "🇻🇳", color: "#DA251D" }

};

// ================== QUESTIONS WITH CATEGORIES ==================
const questions = [

  // 1. General Communication
  { text: "Hello. How are you today?", category: "General" },
  { text: "Welcome to Nepal.", category: "General" },
  { text: "How may I assist you?", category: "General" },
  { text: "Please wait a moment while I verify your documents.", category: "General" },
  { text: "Thank you for your patience and cooperation.", category: "General" },
  { text: "Please listen carefully to the instructions provided by the immigration officer.", category: "General" },
  { text: "If you do not understand a question, please let me know.", category: "General" },
  { text: "Would you like assistance in another language?", category: "General" },

  // 2. Visa and Travel Documents
  { text: "May I please see your passport and boarding pass?", category: "Visa & Docs" },
  { text: "May I please see your passport?", category: "Visa & Docs" },
  { text: "May I please see your boarding pass?", category: "Visa & Docs" },
  { text: "May I see your visa, please?", category: "Visa & Docs" },
  { text: "Have you applied for a visa to enter Nepal?", category: "Visa & Docs" },
  { text: "Have you completed your visa application?", category: "Visa & Docs" },
  { text: "Have you paid the applicable visa fee?", category: "Visa & Docs" },
  { text: "Could you please show me your visa application confirmation?", category: "Visa & Docs" },
  { text: "Could you please show me your visa payment receipt?", category: "Visa & Docs" },
  { text: "Please provide your hotel booking or accommodation details.", category: "Visa & Docs" },
  { text: "Could you please provide your return or onward travel ticket?", category: "Visa & Docs" },
  { text: "Please keep your passport and other travel documents ready for inspection.", category: "Visa & Docs" },
  { text: "Please ensure that the information in your visa application is accurate and complete.", category: "Visa & Docs" },
  { text: "Your visa application appears to be incomplete. Please provide the missing information.", category: "Visa & Docs" },
  { text: "The information on your visa does not appear to match your passport details. We need to verify this discrepancy.", category: "Visa & Docs" },
  { text: "Could you please explain the discrepancy in your travel documents?", category: "Visa & Docs" },
  { text: "Please wait while I verify the validity and conditions of your visa.", category: "Visa & Docs" },
  { text: "Your travel documents require further verification. Please wait for further instructions.", category: "Visa & Docs" },
  { text: "Your passport appears to have expired. We need to verify whether it meets the applicable travel document requirements.", category: "Visa & Docs" },
  { text: "Your passport must meet the applicable validity requirements for entry into Nepal.", category: "Visa & Docs" },
  { text: "Please provide any additional documents required to support your visa application.", category: "Visa & Docs" },
  { text: "Please show me your previous Nepal visa, if you have one.", category: "Visa & Docs" },
  { text: "Is this your first visit to Nepal during the current visa year?", category: "Visa & Docs" },
  { text: "Have you checked the validity of your visa before traveling?", category: "Visa & Docs" },
  { text: "Please confirm that your visa is valid for the purpose of your visit.", category: "Visa & Docs" },

  // 3. Visa Application Procedures
  { text: "Please proceed to the designated visa application kiosk to complete your application.", category: "Visa Application" },
  { text: "Please select the appropriate visa category for your intended visit.", category: "Visa Application" },
  { text: "Please enter your personal details accurately in the visa application.", category: "Visa Application" },
  { text: "Please review your application carefully before submitting it.", category: "Visa Application" },
  { text: "After completing your application, please save or photograph the application confirmation for reference.", category: "Visa Application" },
  { text: "Please proceed to the designated visa fee payment counter.", category: "Visa Application" },
  { text: "Once you have paid the applicable fee, please retain your payment receipt.", category: "Visa Application" },
  { text: "Please return to this counter with your application details and payment receipt.", category: "Visa Application" },
  { text: "Your visa application is being processed. Please wait for further instructions.", category: "Visa Application" },
  { text: "Please note that submitting a visa application does not guarantee visa issuance.", category: "Visa Application" },
  { text: "Your application requires additional information before it can be processed.", category: "Visa Application" },
  { text: "Please provide the missing information so that we can proceed with your application.", category: "Visa Application" },
  { text: "Please ensure that you have selected the correct visa category before proceeding.", category: "Visa Application" },
  { text: "Please contact the designated visa counter if you need assistance with the application process.", category: "Visa Application" },

  // 4. Visa Validity, Extension and Overstay
  { text: "Your visa has expired. Please follow the applicable immigration procedures to obtain a valid visa, if eligible.", category: "Visa Compliance" },
  { text: "Your visa is no longer valid. We need to review your current immigration status.", category: "Visa Compliance" },
  { text: "Your authorized period of stay has expired. We need to review your immigration status and determine the appropriate next steps.", category: "Visa Compliance" },
  { text: "Our records indicate a possible overstay. Please wait while we verify the details.", category: "Visa Compliance" },
  { text: "Please explain the circumstances that led to your overstay.", category: "Visa Compliance" },
  { text: "You may be required to pay an applicable overstay fine in accordance with Nepal's immigration regulations.", category: "Visa Compliance" },
  { text: "Please contact the competent immigration authority for guidance on regularizing your immigration status.", category: "Visa Compliance" },
  { text: "If you wish to remain in Nepal beyond your authorized period of stay, please follow the applicable visa extension procedures.", category: "Visa Compliance" },
  { text: "Please note that your visa extension must be approved by the competent immigration authority.", category: "Visa Compliance" },
  { text: "Please provide your visa extension approval or application receipt, if available.", category: "Visa Compliance" },
  { text: "Submitting a visa extension application does not necessarily mean that the extension has been approved.", category: "Visa Compliance" },
  { text: "Please do not assume that your visa has been extended until you receive official confirmation.", category: "Visa Compliance" },
  { text: "You must comply with the conditions and duration specified in your visa.", category: "Visa Compliance" },
  { text: "Please visit the designated immigration office to resolve your visa-related issue.", category: "Visa Compliance" },
  { text: "Your visa category may not permit the activities you intend to undertake in Nepal. Please provide further clarification.", category: "Visa Compliance" },
  { text: "You may need to obtain the appropriate visa category before undertaking your intended activities in Nepal.", category: "Visa Compliance" },
  { text: "Please provide any documents relating to a previous visa extension or change of visa category.", category: "Visa Compliance" },
  { text: "You may be required to complete additional immigration procedures before departing Nepal.", category: "Visa Compliance" },
  { text: "Please clarify whether you have received any official approval to extend your stay.", category: "Visa Compliance" },

  // 5. Immigration History and Procedures
  { text: "Please proceed to the immigration counter for document verification.", category: "Immigration Procedures" },
  { text: "Please place your passport on the counter.", category: "Immigration Procedures" },
  { text: "Please confirm that the personal details in your passport are correct.", category: "Immigration Procedures" },
  { text: "When did you last enter Nepal?", category: "Immigration Procedures" },
  { text: "When did you last leave Nepal?", category: "Immigration Procedures" },
  { text: "How many times have you visited Nepal?", category: "Immigration Procedures" },
  { text: "How many times have you entered Nepal during the current visa year?", category: "Immigration Procedures" },
  { text: "Have you previously overstayed your authorized period of stay in Nepal?", category: "Immigration Procedures" },
  { text: "Have you ever been refused entry into Nepal or another country?", category: "Immigration Procedures" },
  { text: "Have you ever been deported or removed from Nepal or another country?", category: "Immigration Procedures" },
  { text: "Have you previously been subject to any immigration restrictions in Nepal?", category: "Immigration Procedures" },
  { text: "Have you ever had a visa application refused by Nepal or another country?", category: "Immigration Procedures" },
  { text: "Please wait while I check your immigration history.", category: "Immigration Procedures" },
  { text: "We need to conduct additional checks before proceeding with your immigration clearance.", category: "Immigration Procedures" },
  { text: "Please proceed to the designated immigration office for further verification.", category: "Immigration Procedures" },
  { text: "Your entry is subject to verification and compliance with Nepal's applicable immigration laws and regulations.", category: "Immigration Procedures" },
  { text: "Please follow the instructions provided by the immigration officer.", category: "Immigration Procedures" },
  { text: "Please remain at the designated area until the verification process is complete.", category: "Immigration Procedures" },
  { text: "Your immigration records require further examination. Please wait for further instructions.", category: "Immigration Procedures" },

  // 6. Travel Details and Purpose of Visit
  { text: "Which country are you arriving from?", category: "Travel Details" },
  { text: "What is the purpose of your visit to Nepal?", category: "Travel Details" },
  { text: "Are you visiting Nepal for tourism, business, employment, study, or another purpose?", category: "Travel Details" },
  { text: "How long do you intend to stay in Nepal?", category: "Travel Details" },
  { text: "Where will you be staying during your visit?", category: "Travel Details" },
  { text: "Have you visited Nepal before?", category: "Travel Details" },
  { text: "Are you traveling alone or with other passengers?", category: "Travel Details" },
  { text: "Do you have sufficient funds to cover your expenses during your stay?", category: "Travel Details" },
  { text: "What is your current occupation?", category: "Travel Details" },
  { text: "Who is sponsoring your visit to Nepal?", category: "Travel Details" },
  { text: "Who will be responsible for your expenses during your stay?", category: "Travel Details" },
  { text: "Do you have a confirmed accommodation booking?", category: "Travel Details" },
  { text: "Do you have a return or onward travel ticket?", category: "Travel Details" },
  { text: "Do you have any relatives, friends, or business contacts in Nepal?", category: "Travel Details" },
  { text: "Which places do you intend to visit in Nepal?", category: "Travel Details" },
  { text: "What is the intended duration of your business or professional activities in Nepal?", category: "Travel Details" },
  { text: "Which organization or company will you be visiting in Nepal?", category: "Travel Details" },
  { text: "Can you provide supporting documents for the purpose of your visit?", category: "Travel Details" },
  { text: "Do you have travel insurance for your visit?", category: "Travel Details" },
  { text: "What is your intended date of departure from Nepal?", category: "Travel Details" },
  { text: "Has your travel itinerary changed since you applied for your visa?", category: "Travel Details" },
  { text: "Could you please explain any differences between your stated purpose of travel and your supporting documents?", category: "Travel Details" },

  // 7. Security and Identity Verification
  { text: "Please look directly at the camera.", category: "Security" },
  { text: "Please remain still while your photograph is being taken.", category: "Security" },
  { text: "Please place your fingers on the fingerprint scanner as instructed.", category: "Security" },
  { text: "Please remove your glasses for the photograph, if requested.", category: "Security" },
  { text: "Are you carrying any restricted or prohibited items?", category: "Security" },
  { text: "Do you have any goods that must be declared to Customs?", category: "Security" },
  { text: "Please answer all questions truthfully and accurately.", category: "Security" },
  { text: "We need to verify the authenticity of your travel documents.", category: "Security" },
  { text: "Please wait while we complete the necessary security checks.", category: "Security" },
  { text: "Your documents require further examination. Please follow the officer's instructions.", category: "Security" },
  { text: "Please provide any additional identification documents requested by the immigration officer.", category: "Security" },
  { text: "Please cooperate with the identity verification process.", category: "Security" },
  { text: "We need to confirm that the passport belongs to the person presenting it.", category: "Security" },
  { text: "Please explain any differences between your appearance and the photograph in your passport.", category: "Security" },

  // 8. Additional Examination and Immigration Decisions
  { text: "We need some additional information before making an immigration decision.", category: "Immigration Decisions" },
  { text: "Please provide supporting documents to substantiate the purpose of your visit.", category: "Immigration Decisions" },
  { text: "Your case requires further review by the competent immigration authority.", category: "Immigration Decisions" },
  { text: "Please wait while the relevant immigration checks are completed.", category: "Immigration Decisions" },
  { text: "We are unable to complete your immigration clearance at this stage.", category: "Immigration Decisions" },
  { text: "Your eligibility for entry is being assessed in accordance with the applicable immigration requirements.", category: "Immigration Decisions" },
  { text: "The final decision regarding your entry will be made by the competent immigration authority.", category: "Immigration Decisions" },
  { text: "Based on the information currently available, your case requires further assessment before a decision can be made.", category: "Immigration Decisions" },
  { text: "Please remain in the designated area until the immigration review is complete.", category: "Immigration Decisions" },
  { text: "Your entry has not been authorized at this stage. Please wait for further instructions from the immigration officer.", category: "Immigration Decisions" },
  { text: "Your entry has been refused in accordance with the applicable immigration provisions. The reasons and any further procedures will be explained to you.", category: "Immigration Decisions" },
  { text: "Please contact the competent immigration authority for information about any applicable review or appeal procedures.", category: "Immigration Decisions" },
  { text: "Please provide any additional information that may assist in assessing your eligibility for entry.", category: "Immigration Decisions" },
  { text: "Your case has been referred for further examination. Please follow the instructions provided by the immigration officer.", category: "Immigration Decisions" },
  { text: "Please note that possession of a visa does not automatically guarantee admission into Nepal.", category: "Immigration Decisions" },
  { text: "Your visa application or entry request is subject to the applicable legal requirements and immigration assessment.", category: "Immigration Decisions" },
  { text: "We will inform you of the next steps once the assessment is complete.", category: "Immigration Decisions" },

  // 9. Passenger Assistance and Farewell
  { text: "Welcome to Nepal. We hope you enjoy your stay.", category: "Farewell" },
  { text: "You may collect your luggage from the designated baggage claim area near Customs.", category: "Farewell" },
  { text: "Please proceed to the designated baggage claim area to collect your luggage.", category: "Farewell" },
  { text: "Thank you for visiting Nepal. Have a safe journey.", category: "Farewell" },
  { text: "How was your stay in Nepal? We hope you enjoyed your visit.", category: "Farewell" },
  { text: "Do you have any feedback or complaints regarding your stay in Nepal?", category: "Farewell" },
  { text: "Is there anything else you need assistance with?", category: "Farewell" },
  { text: "Thank you for your cooperation. Have a pleasant journey.", category: "Farewell" },
  { text: "Have a pleasant stay in Nepal.", category: "Farewell" },
  { text: "We appreciate your cooperation with the immigration procedures.", category: "Farewell" }
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

// ================== TRANSLATION & SPEECH (WITH SAFEGUARD) ==================
async function translateText(text, targetLang, outputId, translitId) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&dt=rm&q=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const translated = data[0][0][0];
    const translit = data[0][0][3] || "";

    document.getElementById(outputId).innerText = translated;
    document.getElementById(translitId).innerText = translit;

    if (!('speechSynthesis' in window)) {
      console.warn("Speech Synthesis API not supported.");
      return;
    }

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
      console.warn(`System voice pack not found for ${targetLang}. Attempting default synthesis.`);
      utter.voice = null; 
    }

    utter.onstart = () => highlightText(outputId);
    utter.onend = () => stopHighlight(outputId);
    utter.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      stopHighlight(outputId);
    };

    speechSynthesis.cancel();
    setTimeout(() => {
      speechSynthesis.speak(utter);
    }, 50);

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
