/******************************************/
/* 1) Tarot card definitions come first   */
/******************************************/
const tarotCards = [
    { id: 1, name: "The Fool", description: "The Fool is a card of new beginnings, opportunities, and adventures.", imagePath: "images/Fool.jpeg", fileName: "full_descriptions/1_0TheFoolMajorArcana.txt" },
    { id: 2, name: "The Magician", description: "The Magician represents power, skill, and creativity.", imagePath: "images/Magician.jpeg", fileName: "full_descriptions/2_1TheMagicianMajorArcana.txt" },
    { id: 3, name: "The High Priestess", description: "The High Priestess symbolizes intuition, mystery, and inner knowledge.", imagePath: "images/High_Priestess.jpeg", fileName: "full_descriptions/3_2TheHighPriestessMajorArcana.txt" },
    { id: 4, name: "The Empress", description: "The Empress represents femininity, beauty, nature, and abundance.", imagePath: "images/Empress.jpeg", fileName: "full_descriptions/4_3TheEmperessMajorArcana.txt" },
    { id: 5, name: "The Emperor", description: "The Emperor symbolizes authority, structure, and control.", imagePath: "images/Emperor.jpeg", fileName: "full_descriptions/5_4TheEmperorMajorArcana.txt" },
    { id: 6, name: "The Hierophant", description: "The Hierophant stands for tradition, conformity, and spiritual wisdom.", imagePath: "images/Hierophant.jpeg", fileName: "full_descriptions/6_5TheHierophantMajorArcana.txt" },
    { id: 7, name: "The Lovers", description: "The Lovers card represents love, harmony, and relationships.", imagePath: "images/Lovers.jpeg", fileName: "full_descriptions/7_6TheLoversMajorArcana.txt" },
    { id: 8, name: "The Chariot", description: "The Chariot symbolizes willpower, determination, and success through control.", imagePath: "images/Chariot.jpeg", fileName: "full_descriptions/8_7TheChariotMajorArcana.txt" },
    { id: 9, name: "Strength", description: "Strength represents courage, persuasion, and influence.", imagePath: "images/Strength.jpeg", fileName: "full_descriptions/9_8StrengthMajorArcana.txt" },
    { id: 10, name: "The Hermit", description: "The Hermit symbolizes introspection, solitude, and inner guidance.", imagePath: "images/Hermit.jpeg", fileName: "full_descriptions/10_9TheHermitMajorArcana.txt" },
    { id: 11, name: "Wheel of Fortune", description: "The Wheel of Fortune represents cycles, change, and destiny.", imagePath: "images/Wheel_of_Fortune.jpeg", fileName: "full_descriptions/11_10TheWheelofFortuneMajorArcana.txt" },
    { id: 12, name: "Justice", description: "Justice stands for fairness, truth, and the law.", imagePath: "images/Justice.jpeg", fileName: "full_descriptions/12_11JusticeMajorArcana.txt" },
    { id: 13, name: "The Hanged Man", description: "The Hanged Man represents suspension, letting go, and new perspectives.", imagePath: "images/Hanged_Man.jpeg", fileName: "full_descriptions/13_12TheHangedManMajorArcana.txt" },
    { id: 14, name: "Death", description: "Death symbolizes transformation, endings, and new beginnings.", imagePath: "images/Death.jpeg", fileName: "full_descriptions/14_13DeathMajorArcana.txt" },
    { id: 15, name: "Temperance", description: "Temperance stands for balance, moderation, and patience.", imagePath: "images/Temperance.jpeg", fileName: "full_descriptions/15_14TemperanceMajorArcana.txt" },
    { id: 16, name: "The Devil", description: "The Devil represents bondage, addiction, and materialism.", imagePath: "images/Devil.jpeg", fileName: "full_descriptions/16_15TheDevilMajorArcana.txt" },
    { id: 17, name: "The Tower", description: "The Tower symbolizes sudden upheaval, chaos, and revelation.", imagePath: "images/Tower.jpeg", fileName: "full_descriptions/17_16TheTowerMajorArcana.txt" },
    { id: 18, name: "The Star", description: "The Star represents hope, inspiration, and serenity.", imagePath: "images/Star.jpeg", fileName: "full_descriptions/18_17TheStarMajorArcana.txt" },
    { id: 19, name: "The Moon", description: "The Moon symbolizes illusion, fear, and the subconscious mind.", imagePath: "images/Moon.jpeg", fileName: "full_descriptions/19_18TheMoonMajorArcana.txt" },
    { id: 20, name: "The Sun", description: "The Sun stands for positivity, vitality, and success.", imagePath: "images/Sun.jpeg", fileName: "full_descriptions/20_19TheSunMajorArcana.txt" },
    { id: 21, name: "Judgement", description: "Judgement represents reflection, reckoning, and awakening.", imagePath: "images/Judgement.jpeg", fileName: "full_descriptions/21_20JudgementMajorArcana.txt" },
    { id: 22, name: "The World", description: "The World symbolizes completion, achievement, and wholeness.", imagePath: "images/World.jpeg", fileName: "full_descriptions/22_21TheWorldMajorArcana.txt" },

    // Wands cards
    { id: 23, name: "Ace of Wands", description: "The Ace of Wands represents inspiration, new opportunities, growth, and potential.", imagePath: "images/Ace_of_Wands.jpeg", fileName: "full_descriptions/23_1AceofWandsMinorArcana.txt" },
    { id: 24, name: "2 of Wands", description: "The 2 (Two) of Wands symbolizes future planning, progress, and discovery.", imagePath: "images/2_of_Wands.jpeg", fileName: "full_descriptions/24_2ofWandsMinorArcana.txt" },
    { id: 25, name: "3 of Wands", description: "The 3 (Three) of Wands represents expansion, foresight, and long-term plans.", imagePath: "images/3_of_Wands.jpeg", fileName: "full_descriptions/25_3ofWandsMinorArcana.txt" },
    { id: 26, name: "4 of Wands", description: "The 4 (Four) of Wands signifies celebration, harmony, and homecoming.", imagePath: "images/4_of_Wands.jpeg", fileName: "full_descriptions/26_4ofWandsMinorArcana.txt" },
    { id: 27, name: "5 of Wands", description: "The 5 (Five) of Wands represents conflict, competition, and tension.", imagePath: "images/5_of_Wands.jpeg", fileName: "full_descriptions/27_5ofWandsMinorArcana.txt" },
    { id: 28, name: "6 of Wands", description: "The 6 (Six) of Wands symbolizes victory, success, and public recognition.", imagePath: "images/6_of_Wands.jpeg", fileName: "full_descriptions/28_6ofWandsMinorArcana.txt" },
    { id: 29, name: "7 of Wands", description: "The 7 (Seven) of Wands represents challenge, competition, and perseverance.", imagePath: "images/7_of_Wands.jpeg", fileName: "full_descriptions/29_7ofWandsMinorArcana.txt" },
    { id: 30, name: "8 of Wands", description: "The 8 (Eight) of Wands signifies speed, action, and swift change.", imagePath: "images/8_of_Wands.jpeg", fileName: "full_descriptions/30_8ofWandsMinorArcana.txt" },
    { id: 31, name: "9 of Wands", description: "The 9 (Nine) of Wands represents resilience, courage, and persistence.", imagePath: "images/9_of_Wands.jpeg", fileName: "full_descriptions/31_9ofWandsMinorArcana.txt" },
    { id: 32, name: "10 of Wands", description: "The 10 (Ten) of Wands symbolizes burden, responsibility, and hard work.", imagePath: "images/10_of_Wands.jpeg", fileName: "full_descriptions/32_10ofWandsMinorArcana.txt" },
    { id: 33, name: "Page of Wands", description: "The Page of Wands represents enthusiasm, exploration, and free spirit.", imagePath: "images/Page_of_Wands.jpeg", fileName: "full_descriptions/33_11PageofWandsMinorArcana.txt" },
    { id: 34, name: "Knight of Wands", description: "The Knight of Wands symbolizes action, adventure, and impulsiveness.", imagePath: "images/Knight_of_Wands.jpeg", fileName: "full_descriptions/34_12KnightofWandsMinorArcana.txt" },
    { id: 35, name: "Queen of Wands", description: "The Queen of Wands represents confidence, determination, and charisma.", imagePath: "images/Queen_of_Wands.jpeg", fileName: "full_descriptions/35_13QueenofWandsMinorArcana.txt" },
    { id: 36, name: "King of Wands", description: "The King of Wands symbolizes leadership, vision, and entrepreneurship.", imagePath: "images/King_of_Wands.jpeg", fileName: "full_descriptions/36_14KingofWandsMinorArcana.txt" },

    // Cups cards
    { id: 37, name: "Ace of Cups", description: "The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.", imagePath: "images/Ace_of_Cups.jpeg", fileName: "full_descriptions/37_1AceofCupsMinorArcana.txt" },
    { id: 38, name: "2 of Cups", description: "The 2 (Two) of Cups symbolizes partnership, unity, and mutual attraction.", imagePath: "images/2_of_Cups.jpeg", fileName: "full_descriptions/38_2ofCupsMinorArcana.txt" },
    { id: 39, name: "3 of Cups", description: "The 3 (Three) of Cups represents celebration, friendship, and social gatherings.", imagePath: "images/3_of_Cups.jpeg", fileName: "full_descriptions/39_3ofCupsMinorArcana.txt" },
    { id: 40, name: "4 of Cups", description: "The 4 (Four) of Cups signifies contemplation, reevaluation, and apathy.", imagePath: "images/4_of_Cups.jpeg", fileName: "full_descriptions/40_4ofCupsMinorArcana.txt" },
    { id: 41, name: "5 of Cups", description: "The 5 (Five) of Cups represents loss, regret, and focusing on the negative.", imagePath: "images/5_of_Cups.jpeg", fileName: "full_descriptions/41_5ofCupsMinorArcana.txt" },
    { id: 42, name: "6 of Cups", description: "The 6 (Six) of Cups symbolizes nostalgia, childhood memories, and innocence.", imagePath: "images/6_of_Cups.jpeg", fileName: "full_descriptions/42_6ofCupsMinorArcana.txt" },
    { id: 43, name: "7 of Cups", description: "The 7 (Seven) of Cups represents choices, illusions, and wishful thinking.", imagePath: "images/7_of_Cups.jpeg", fileName: "full_descriptions/43_7ofCupsMinorArcana.txt" },
    { id: 44, name: "8 of Cups", description: "The 8 (Eight) of Cups signifies walking away, abandonment, and seeking deeper meaning.", imagePath: "images/8_of_Cups.jpeg", fileName: "full_descriptions/44_8ofCupsMinorArcana.txt" },
    { id: 45, name: "9 of Cups", description: "The 9 (Nine) of Cups symbolizes contentment, satisfaction, and emotional fulfillment.", imagePath: "images/9_of_Cups.jpeg", fileName: "full_descriptions/45_9ofCupsMinorArcana.txt" },
    { id: 46, name: "10 of Cups", description: "The 10 (Ten) of Cups represents happiness, family harmony, and lasting love.", imagePath: "images/10_of_Cups.jpeg", fileName: "full_descriptions/46_10ofCupsMinorArcana.txt" },
    { id: 47, name: "Page of Cups", description: "The Page of Cups symbolizes creativity, new emotions, and intuitive insights.", imagePath: "images/Page_of_Cups.jpeg", fileName: "full_descriptions/47_11PageofCupsMinorArcana.txt" },
    { id: 48, name: "Knight of Cups", description: "The Knight of Cups represents romance, charm, and pursuing the heart's desires.", imagePath: "images/Knight_of_Cups.jpeg", fileName: "full_descriptions/48_12KnightofCupsMinorArcana.txt" },
    { id: 49, name: "Queen of Cups", description: "The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.", imagePath: "images/Queen_of_Cups.jpeg", fileName: "full_descriptions/49_13QueenofCupsMinorArcana.txt" },
    { id: 50, name: "King of Cups", description: "The King of Cups represents emotional balance, leadership, and control over one's feelings.", imagePath: "images/King_of_Cups.jpeg", fileName: "full_descriptions/50_14KingofCupsMinorArcana.txt" },

    // Swords cards
    { id: 51, name: "Ace of Swords", description: "The Ace of Swords represents clarity, truth, and a breakthrough.", imagePath: "images/Ace_of_Swords.jpeg", fileName: "full_descriptions/51_1AceofSwordsMinorArcana.txt" },
    { id: 52, name: "2 of Swords", description: "The 2 (Two) of Swords symbolizes difficult decisions, stalemate, and balance.", imagePath: "images/2_of_Swords.jpeg", fileName: "full_descriptions/52_2ofSwordsMinorArcana.txt" },
    { id: 53, name: "3 of Swords", description: "The 3 (Three) of Swords represents heartbreak, sorrow, and emotional pain.", imagePath: "images/3_of_Swords.jpeg", fileName: "full_descriptions/53_3ofSwordsMinorArcana.txt" },
    { id: 54, name: "4 of Swords", description: "The 4 (Four) of Swords signifies rest, recuperation, and contemplation.", imagePath: "images/4_of_Swords.jpeg", fileName: "full_descriptions/54_4ofSwordsMinorArcana.txt" },
    { id: 55, name: "5 of Swords", description: "The 5 (Five) of Swords represents conflict, defeat, and tension.", imagePath: "images/5_of_Swords.jpeg", fileName: "full_descriptions/55_5ofSwordsMinorArcana.txt" },
    { id: 56, name: "6 of Swords", description: "The 6 (Six) of Swords symbolizes transition, change, and moving on.", imagePath: "images/6_of_Swords.jpeg", fileName: "full_descriptions/56_6ofSwordsMinorArcana.txt" },
    { id: 57, name: "7 of Swords", description: "The 7 (Seven) of Swords represents deception, trickery, and strategy.", imagePath: "images/7_of_Swords.jpeg", fileName: "full_descriptions/57_7ofSwordsMinorArcana.txt" },
    { id: 58, name: "8 of Swords", description: "The 8 (Eight) of Swords signifies restriction, fear, and feeling trapped.", imagePath: "images/8_of_Swords.jpeg", fileName: "full_descriptions/58_8ofSwordsMinorArcana.txt" },
    { id: 59, name: "9 of Swords", description: "The 9 (Nine) of Swords represents anxiety, worry, and nightmares.", imagePath: "images/9_of_Swords.jpeg", fileName: "full_descriptions/59_9ofSwordsMinorArcana.txt" },
    { id: 60, name: "10 of Swords", description: "The 10 (Ten) of Swords symbolizes betrayal, defeat, and painful endings.", imagePath: "images/10_of_Swords.jpeg", fileName: "full_descriptions/60_10ofSwordsMinorArcana.txt" },
    { id: 61, name: "Page of Swords", description: "The Page of Swords represents curiosity, communication, and vigilance.", imagePath: "images/Page_of_Swords.jpeg", fileName: "full_descriptions/61_11PageofSwordsMinorArcana.txt" },
    { id: 62, name: "Knight of Swords", description: "The Knight of Swords symbolizes action, ambition, and impulsiveness.", imagePath: "images/Knight_of_Swords.jpeg", fileName: "full_descriptions/62_12KnightofSwordsMinorArcana.txt" },
    { id: 63, name: "Queen of Swords", description: "The Queen of Swords represents independence, perceptiveness, and clear thinking.", imagePath: "images/Queen_of_Swords.jpeg", fileName: "full_descriptions/63_QueenofSwordsMinorArcana.txt" },
    { id: 64, name: "King of Swords", description: "The King of Swords symbolizes intellect, authority, and truth.", imagePath: "images/King_of_Swords.jpeg", fileName: "full_descriptions/64_14KingofSwordsMinorArcana.txt" },

    // Pentacles cards
    { id: 65, name: "Ace of Pentacles", description: "The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.", imagePath: "images/Ace_of_Pentacles.jpeg", fileName: "full_descriptions/65_1AceofPentaclesMinorArcana.txt" },
    { id: 66, name: "2 of Pentacles", description: "The 2 (Two) of Pentacles symbolizes balance, adaptability, and time management.", imagePath: "images/2_of_Pentacles.jpeg", fileName: "full_descriptions/66_2ofPentaclesMinorArcana.txt" },
    { id: 67, name: "3 of Pentacles", description: "The 3 (Three) of Pentacles represents teamwork, collaboration, and building something together.", imagePath: "images/3_of_Pentacles.jpeg", fileName: "full_descriptions/67_3ofPentaclesMinorArcana.txt" },
    { id: 68, name: "4 of Pentacles", description: "The 4 (Four) of Pentacles signifies control, stability, and material security.", imagePath: "images/4_of_Pentacles.jpeg", fileName: "full_descriptions/68_4ofPentaclesMinorArcana.txt" },
    { id: 69, name: "5 of Pentacles", description: "The 5 (Five) of Pentacles represents financial loss, poverty, and feeling isolated.", imagePath: "images/5_of_Pentacles.jpeg", fileName: "full_descriptions/69_5ofPentaclesMinorArcana.txt" },
    { id: 70, name: "6 of Pentacles", description: "The 6 (Six) of Pentacles symbolizes generosity, sharing wealth, and helping others.", imagePath: "images/6_of_Pentacles.jpeg", fileName: "full_descriptions/70_6ofPentaclesMinorArcana.txt" },
    { id: 71, name: "7 of Pentacles", description: "The 7 (Seven) of Pentacles represents long-term investment, patience, and reward for hard work.", imagePath: "images/7_of_Pentacles.jpeg", fileName: "full_descriptions/71_7ofPentaclesMinorArcana.txt" },
    { id: 72, name: "8 of Pentacles", description: "The 8 (Eight) of Pentacles signifies diligence, skill development, and craftsmanship.", imagePath: "images/8_of_Pentacles.jpeg", fileName: "full_descriptions/72_8ofPentaclesMinorArcana.txt" },
    { id: 73, name: "9 of Pentacles", description: "The 9 (Nine) of Pentacles represents luxury, self-sufficiency, and financial independence.", imagePath: "images/9_of_Pentacles.jpeg", fileName: "full_descriptions/73_9ofPentaclesMinorArcana.txt" },
    { id: 74, name: "10 of Pentacles", description: "The 10 (Ten) of Pentacles symbolizes wealth, legacy, and family traditions.", imagePath: "images/10_of_Pentacles.jpeg", fileName: "full_descriptions/74_10ofPentaclesMinorArcana.txt" },
    { id: 75, name: "Page of Pentacles", description: "The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.", imagePath: "images/Page_of_Pentacles.jpeg", fileName: "full_descriptions/75_PageofPentaclesMinorArcana.txt" },
    { id: 76, name: "Knight of Pentacles", description: "The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.", imagePath: "images/Knight_of_Pentacles.jpeg", fileName: "full_descriptions/76_KnightofPentaclesMinorArcana.txt" },
    { id: 77, name: "Queen of Pentacles", description: "The Queen of Pentacles represents nurturing, practicality, and financial security.", imagePath: "images/Queen_of_Pentacles.jpeg", fileName: "full_descriptions/77_QueenofPentaclesMinorArcana.txt" },
    { id: 78, name: "King of Pentacles", description: "The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.", imagePath: "images/King_of_Pentacles.jpeg", fileName: "full_descriptions/78_KingofPentaclesMinorArcana.txt" }
];

/************************************************/
/* 2) Preload function for all card images      */
/************************************************/
function preloadImages(cards) {
    const promises = cards.map(card => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = card.imagePath;
            img.onload = () => resolve(card.imagePath);
            img.onerror = () => reject(card.imagePath);
        });
    });
    return Promise.all(promises);
}

/****************************************************/
/* 3) Main logic runs after DOM content is loaded   */
/****************************************************/
document.addEventListener("DOMContentLoaded", () => {
    // First, preload all Tarot images
    preloadImages(tarotCards)
      .then((loadedPaths) => {
        console.log("All images preloaded successfully:", loadedPaths);
        // At this point, all images are cached in memory.
        // The user can now click "Pull Tarot" or do voice commands with no delay on image load.
      })
      .catch(error => {
        console.error("Some images failed to preload:", error);
      });

    // Start our background WebGL effect
    startNeuroCanvasAnimation();
});

/**********************************/
/* 4) WebGL background animation  */
/**********************************/
function startNeuroCanvasAnimation() {
    const canvas = document.getElementById('neuro');
    const gl = canvas.getContext('webgl');

    const vertexShaderSource = document.getElementById('vertShader').text;
    const fragmentShaderSource = document.getElementById('fragShader').text;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            return program;
        }
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    function resizeCanvasToDisplaySize(canvas) {
        const displayWidth  = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width  = displayWidth;
            canvas.height = displayHeight;
        }
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const ratioLocation = gl.getUniformLocation(program, 'u_ratio');
    const pointerPositionLocation = gl.getUniformLocation(program, 'u_pointer_position');
    const scrollProgressLocation = gl.getUniformLocation(program, 'u_scroll_progress');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    function render(time) {
        resizeCanvasToDisplaySize(canvas);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);

        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1f(timeLocation, time);
        gl.uniform1f(ratioLocation, canvas.clientWidth / canvas.clientHeight);
        gl.uniform2f(pointerPositionLocation, 0.5, 0.5);
        gl.uniform1f(scrollProgressLocation, 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

/************************************************************/
/* 5) Tarot App Logic + Voice Recognition + Music Handling  */
/************************************************************/
const tarotCardDiv       = document.getElementById('tarot-card');
const overlayDescription = document.getElementById('overlay-description');
const descriptionDiv     = document.getElementById('description');
const backgroundMusic    = document.getElementById('background-music');
const musicButton        = document.getElementById('music-btn');

let currentCard      = null;
let recognition      = null;
let listening        = false;
let musicPlayed      = false;
let audioUnlocked    = false;
let descriptionState = 'short'; // 'short' -> 'full' -> 'audio' -> 'stopAudio'
const speechSynthesisRef = window.speechSynthesis; // Speech Synthesis API

// Simple function to toggle music playback
function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(err => console.log("Music play blocked:", err));
        musicButton.innerText = 'Stop Music';
    } else {
        backgroundMusic.pause();
        musicButton.innerText = 'Resume Music';
    }
}
musicButton.addEventListener('click', toggleMusic);

// If the music ends naturally, reset button text
backgroundMusic.addEventListener('ended', () => {
    musicButton.innerText = 'Play Music';
});

// Ensure speech synthesis plays
function ensureSpeechSynthesis(textToRead) {
    if (speechSynthesisRef.speaking || speechSynthesisRef.pending) {
        speechSynthesisRef.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate  = 1;
    utterance.pitch = 1;
    speechSynthesisRef.speak(utterance);
    utterance.onstart = () => console.log("Speech synthesis started.");
    utterance.onend   = () => console.log("Speech synthesis ended.");
}

// Utility for showing short status text
function appendStatusMessage(newMessage, className) {
    const output = document.getElementById('output');
    if (!output) return;
    output.classList.remove('hidden', 'listening', 'error', 'stopped');
    if (output.innerText.trim()) {
        output.innerText += "\n";
    }
    output.innerText += newMessage;
    if (className) output.classList.add(className);
    setTimeout(() => {
        output.classList.add('hidden');
    }, 3000);
}

// Pull a random tarot card
function pullTarot() {
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    currentCard = tarotCards[randomIndex];

    // Set the card image
    tarotCardDiv.style.backgroundImage = `url(${currentCard.imagePath})`;

    // Reset & hide overlays
    overlayDescription.style.display = 'none';
    overlayDescription.textContent   = '';
    descriptionDiv.style.display     = 'none';
    descriptionDiv.textContent       = '';
    descriptionState = 'short';

    // Update button text
    const descButton = document.getElementById('show-description-btn');
    descButton.innerText = 'Show Short Description';

    // Start music only on first card pull (if we want that)
    if (!musicPlayed) {
        backgroundMusic.play().catch(err => console.log("Music play blocked by browser:", err));
        musicPlayed = true;
    }
}

async function showDescription() {
    if (!currentCard) {
        alert("Please pull a card first.");
        return;
    }
    const button = document.getElementById('show-description-btn');

    if (descriptionState === 'short') {
        // Show short overlay
        overlayDescription.textContent = currentCard.description;
        overlayDescription.style.display = 'block';
        button.innerText = 'Show Full Description';
        descriptionState = 'full';

    } else if (descriptionState === 'full') {
        // Fetch the full text
        try {
            const response = await fetch(currentCard.fileName);
            const data = await response.text();
            // Hide overlay, show full text
            overlayDescription.style.display = 'none';
            descriptionDiv.textContent = data;
            descriptionDiv.style.display = 'block';

            button.innerText = 'Play Audio Description';
            descriptionState = 'audio';
        } catch (err) {
            descriptionDiv.textContent = "Error loading full description.";
            descriptionDiv.style.display = 'block';
        }

    } else if (descriptionState === 'audio') {
        // Use speech synthesis
        const textToRead = descriptionDiv.textContent;
        if (textToRead) {
            ensureSpeechSynthesis(textToRead);
            button.innerText = 'Stop Audio';
            descriptionState = 'stopAudio';
        }

    } else if (descriptionState === 'stopAudio') {
        speechSynthesisRef.cancel();
        button.innerText = 'Play Audio Description';
        descriptionState = 'audio';
    }
}

// Voice command logic
function isWebSpeechSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}
if (!isWebSpeechSupported()) {
    alert("Your browser doesn't support the Web Speech API. Please use Chrome for best results.");
} else {
    recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    const output = document.getElementById('output');
    const startStopButton = document.getElementById('start-stop-btn');
    const pullCardButton  = document.getElementById('randomize-btn');
    const showDescButton  = document.getElementById('show-description-btn');

    let keepListening = false;

    startStopButton.addEventListener('click', () => {
        if (!keepListening) {
            startListening();
        } else {
            stopListening();
        }
    });

    function startListening() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                // Unlock audio if not done
                if (!audioUnlocked) {
                    unlockAudioContext();
                    audioUnlocked = true;
                }
                keepListening = true;
                recognition.start();
                listening = true;
                startStopButton.innerText = 'Stop Listening';
            })
            .catch((error) => {
                console.log('Microphone access denied.', error);
                alert('Microphone access is required for voice commands.');
            });
    }

    function unlockAudioContext() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
        console.log("Audio context unlocked.");
    }

    function stopListening() {
        keepListening = false;
        recognition.stop();
        listening = false;
        startStopButton.innerText = 'Start Listening';
    }

    recognition.onstart = () => {
        if (output) {
            output.className = 'listening';
            output.innerText = "Listening...";
        }
    };

    recognition.onresult = (event) => {
        const speechResult = event.results[event.results.length - 1][0].transcript.toLowerCase();
        if (output) {
            output.className = 'listening';
            output.innerText = `You said: ${speechResult}`;
        }
        handleCommand(speechResult);
    };

    recognition.onerror = (event) => {
        if (output) {
            output.className = 'error';
            output.innerText = `Error occurred: ${event.error}`;
        }
    };

    recognition.onend = () => {
        if (keepListening) {
            recognition.start();
        } else {
            if (output) {
                output.className = 'stopped';
                output.innerText += "\nStopped listening.";
            }
            listening = false;
            startStopButton.innerText = 'Start Listening';
        }
    };

    function handleCommand(transcription) {
        // Pull a card
        if (
            transcription.includes('pull card')     ||
            transcription.includes('pull a card')   ||
            transcription.includes('pull')          ||
            transcription.includes('draw card')     ||
            transcription.includes('draw a card')   ||
            transcription.includes('draw')          ||
            transcription.includes('new card')      ||
            transcription.includes('another card')  ||
            transcription.includes('another')
        ) {
            pullTarotButtonClick();
        }
        // Show short/full description
        else if (
            transcription.includes('show description') ||
            transcription.includes('show me description') ||
            transcription.includes('full description') ||
            transcription.includes('full')
        ) {
            if (descriptionState === 'short' || showDescButton.innerText === 'Show Full Description') {
                showDescButton.click();
            }
        }
        // Play audio description
        else if (
            transcription.includes('play description') ||
            transcription.includes('audio description') ||
            transcription.includes('read full description') ||
            transcription.includes('read description') ||
            transcription.includes('play') ||
            transcription.includes('read')
        ) {
            if (descriptionState === 'full') {
                showDescButton.click(); // fetch full text
                setTimeout(() => {
                    if (descriptionState === 'audio') {
                        showDescButton.click(); // play audio
                    }
                }, 1500);
            } else if (descriptionState === 'audio') {
                showDescButton.click();
            }
        }
        // Stop reading
        else if (
            transcription.includes('stop reading') ||
            transcription.includes('stop audio') ||
            transcription.includes('mute') ||
            transcription.includes('quiet') ||
            transcription.includes('stop description') ||
            transcription.includes('silent')
        ) {
            window.speechSynthesis.cancel();
            if (showDescButton.innerText === 'Stop Audio') {
                showDescButton.innerText = 'Play Audio Description';
                descriptionState = 'audio';
            }
        }
        // Stop music
        else if (
            transcription.includes('stop music') ||
            transcription.includes('pause music') ||
            transcription.includes('mute music')
        ) {
            appendStatusMessage("Command recognized: Stopping music!", "listening");
            if (!backgroundMusic.paused) {
                backgroundMusic.pause();
                musicButton.innerText = 'Resume Music';
            }
        }
        // Resume music
        else if (
            transcription.includes('resume music') ||
            transcription.includes('play music') ||
            transcription.includes('continue music')
        ) {
            appendStatusMessage("Command recognized: Resuming music!", "listening");
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    musicButton.innerText = 'Stop Music';
                }).catch(error => {
                    console.log("Failed to resume music:", error);
                });
            }
        }
        // Stop mic
        else if (
            transcription.includes('stop mic')        ||
            transcription.includes('stop microphone') ||
            transcription.includes('stop listening')  ||
            transcription.includes('quit listening')  ||
            transcription.includes('no listen')       ||
            transcription.includes('no listening')    ||
            transcription.includes('stop listen')
        ) {
            appendStatusMessage("Command recognized: Stopping microphone!", "listening");
            stopListening();
        }
        else {
            if (output) output.innerText += "\nCommand not recognized.";
        }
    }

    function pullTarotButtonClick() {
        pullTarot();
    }
}

// Hook up the Pull Tarot and Show Description button events
document.getElementById('randomize-btn').addEventListener('click', pullTarot);
document.getElementById('show-description-btn').addEventListener('click', showDescription);

/************************************************/
/* 6) Nav Script (toggle submenus)             */
/************************************************/