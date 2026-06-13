/**
 * Food4Thoth Navigation JS
 * Nav toggle · Submenu expand · Pull A Card (tarot) · Animate popup · Random tool
 */
(function () {
    'use strict';

    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    /* =============================================
       NAV TOGGLE
       ============================================= */
    const toggleBtn = $('#toggle-nav');
    const nav       = $('#navigation');

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', function () {
            const isHidden = nav.classList.toggle('hidden');
            toggleBtn.setAttribute('aria-expanded', String(!isHidden));
        });
        document.addEventListener('click', function (e) {
            if (!nav.classList.contains('hidden') &&
                !nav.contains(e.target) &&
                e.target !== toggleBtn) {
                nav.classList.add('hidden');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* =============================================
       SUBMENU EXPAND / COLLAPSE
       ============================================= */
    $$('[data-expand]').forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            const id      = tab.getAttribute('data-expand');
            const submenu = document.getElementById(id);
            if (!submenu) return;
            const isOpen = !submenu.classList.contains('hidden');
            $$('.submenu:not(.hidden)').forEach(function (sm) {
                if (sm !== submenu) sm.classList.add('hidden');
            });
            submenu.classList.toggle('hidden', isOpen);
        });
    });

    /* =============================================
       TAROT CARD DATA — 22 Major Arcana
       ============================================= */
    const tarotDeck = [
        { num: '0',     name: 'The Fool',          keywords: 'New beginnings · Innocence · Leap of faith',      meaning: 'A fresh start awaits. Trust the journey even without a map. The universe supports your next step.',          color: '#9b59b6' },
        { num: 'I',     name: 'The Magician',       keywords: 'Manifestation · Willpower · Skill',              meaning: 'You have all the tools you need. Channel your focus and transform intention into reality.',              color: '#e74c3c' },
        { num: 'II',    name: 'The High Priestess', keywords: 'Intuition · Mystery · Inner knowing',            meaning: 'The answers you seek are within. Be still, listen to your gut, and trust what cannot be seen.',          color: '#2980b9' },
        { num: 'III',   name: 'The Empress',        keywords: 'Abundance · Fertility · Nurturing · Nature',     meaning: 'Creation flows through you. Nurture your projects and relationships — growth is abundant now.',           color: '#27ae60' },
        { num: 'IV',    name: 'The Emperor',        keywords: 'Authority · Structure · Stability',              meaning: 'Build on solid ground. Discipline and clear boundaries create the foundation for lasting success.',       color: '#c0392b' },
        { num: 'V',     name: 'The Hierophant',     keywords: 'Tradition · Wisdom · Spiritual guidance',       meaning: 'Seek wisdom from established paths. A teacher or tradition holds the key to your current question.',      color: '#8e44ad' },
        { num: 'VI',    name: 'The Lovers',         keywords: 'Love · Harmony · Alignment · Choice',            meaning: 'A meaningful choice stands before you. Align with your deepest values — the heart already knows.',        color: '#e67e22' },
        { num: 'VII',   name: 'The Chariot',        keywords: 'Victory · Control · Determination',             meaning: 'Harness opposing forces and move forward with confidence. Will power steers you to triumph.',            color: '#16a085' },
        { num: 'VIII',  name: 'Strength',           keywords: 'Courage · Patience · Inner power',              meaning: 'True strength is gentle. Tame your inner beast with compassion rather than force.',                      color: '#f39c12' },
        { num: 'IX',    name: 'The Hermit',         keywords: 'Solitude · Introspection · Inner guidance',     meaning: 'Withdraw to go deeper. The lantern you carry illuminates the path for both yourself and others.',         color: '#7f8c8d' },
        { num: 'X',     name: 'Wheel of Fortune',   keywords: 'Cycles · Destiny · Turning point · Luck',       meaning: 'The wheel turns. Embrace the change — what rises must fall, and what falls will rise again.',             color: '#f1c40f' },
        { num: 'XI',    name: 'Justice',            keywords: 'Truth · Fairness · Cause & effect',             meaning: 'What you put out returns to you. Act with integrity and the scales will tip in your favor.',              color: '#1abc9c' },
        { num: 'XII',   name: 'The Hanged Man',     keywords: 'Suspension · Surrender · New perspective',     meaning: 'Pause and see from a different angle. Surrender control — the breakthrough comes through stillness.',      color: '#3498db' },
        { num: 'XIII',  name: 'Death',              keywords: 'Transformation · Endings · Renewal',            meaning: 'One chapter ends so another may begin. Release what no longer serves — transformation is liberation.',   color: '#2c3e50' },
        { num: 'XIV',   name: 'Temperance',         keywords: 'Balance · Patience · Purpose · Flow',           meaning: 'Blend opposing forces with grace. Moderation and patience now alchemize something extraordinary.',         color: '#00ff99' },
        { num: 'XV',    name: 'The Devil',          keywords: 'Shadow self · Chains · Liberation awaits',      meaning: 'You are not as trapped as you feel. The chains are loose — examine what you believe binds you.',          color: '#8e44ad' },
        { num: 'XVI',   name: 'The Tower',          keywords: 'Sudden change · Upheaval · Revelation',         meaning: 'What is built on false ground must fall. The chaos clears the way for authentic rebuilding.',             color: '#e74c3c' },
        { num: 'XVII',  name: 'The Star',           keywords: 'Hope · Renewal · Inspiration · Healing',        meaning: 'After the storm, the stars emerge. Trust in renewal — you are guided and deeply supported.',             color: '#3498db' },
        { num: 'XVIII', name: 'The Moon',           keywords: 'Illusion · Dreams · The subconscious',          meaning: 'Not all is as it appears. Navigate by feel through uncertainty — the moon reveals by revealing nothing.', color: '#9b59b6' },
        { num: 'XIX',   name: 'The Sun',            keywords: 'Joy · Vitality · Success · Clarity',            meaning: 'Step into the light. Radiance, confidence, and playful success mark this moment.',                       color: '#f39c12' },
        { num: 'XX',    name: 'Judgement',          keywords: 'Awakening · Reckoning · Second chances',        meaning: 'A call to rise. Evaluate your path honestly — forgiveness and fresh purpose await those who answer.',      color: '#1abc9c' },
        { num: 'XXI',   name: 'The World',          keywords: 'Completion · Achievement · Integration',        meaning: 'You have come full circle. Celebrate mastery and wholeness — the world opens its arms to you.',          color: '#27ae60' },
    ];

    /* =============================================
       ANIMATIONS LIST (logo + psychedelic)
       ============================================= */
    const animations = [
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO1.1.html',
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO2.1.html',
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO3.2.html',
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO4.html',
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO5.html',
        'https://www.food4thoth.com/spiral/',
        'https://www.food4thoth.com/psychedelic-waves/',
        'https://www.food4thoth.com/neuro-noise/',
        'https://www.food4thoth.com/webgl-fluid-simulation/',
        'https://www.food4thoth.com/behind-the-fold/',
        'https://www.food4thoth.com/MindMelt/',
    ];

    /* =============================================
       RANDOM TOOL LIST (for RANDOM button)
       ============================================= */
    const randomTools = [
        'https://www.food4thoth.com/CelticCrossTarot/',
        'https://www.food4thoth.com/TarotSacredGeometry/',
        'https://www.food4thoth.com/LoopStationHiFi/',
        'https://www.food4thoth.com/IchingFractal/',
        'https://www.food4thoth.com/webgl-fluid-simulation/',
        'https://www.food4thoth.com/bergs-of-life/',
        'https://www.food4thoth.com/DrawingFractals/',
        'https://www.food4thoth.com/AkashicThothDeep/',
        'https://www.food4thoth.com/ArpAppWithVisual/',
        'https://www.food4thoth.com/psychedelic-waves/',
        'https://www.food4thoth.com/GloCalculato/',
        'https://www.food4thoth.com/claw-machineGame/',
        'https://www.food4thoth.com/PrayerForLove/',
        'https://www.food4thoth.com/RainbowGenerator/',
        'https://www.food4thoth.com/TrentStorybook1stMobile/',
        'https://www.food4thoth.com/MajixTarotAll/',
        'https://www.food4thoth.com/AnarchyTAZ/',
        'https://www.food4thoth.com/OldSchoolGameDesktop/',
        'https://www.food4thoth.com/ThreeCardTarot/',
        'https://www.food4thoth.com/TideApp/indexOregon.html',
        'https://www.food4thoth.com/EyeSPY3/',
        'https://www.food4thoth.com/FractalTrees/',
        'https://www.food4thoth.com/ChooseYourOwnAdventure/prologue.html',
        'https://www.food4thoth.com/AkashicEmeraldDeep/',
        'https://www.food4thoth.com/ArpAppNoVisualHighFi/',
        'https://www.food4thoth.com/MindMelt/',
        'https://www.food4thoth.com/HakimBey/',
        'https://www.food4thoth.com/SoundActivatedVisualizor/',
        'https://www.food4thoth.com/TarotJungian/',
        'https://www.food4thoth.com/NewSchoolGameKid/',
    ];

    /* =============================================
       POPUP HELPERS
       ============================================= */
    function openPopup(id) {
        var popup = document.getElementById(id);
        if (popup) {
            popup.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    function closeAllPopups() {
        $$('.popup.active').forEach(function (p) {
            p.classList.remove('active');
            // Reset iframe src to stop audio/video
            var iframe = p.querySelector('iframe');
            if (iframe) { var s = iframe.src; iframe.src = ''; iframe.src = s; }
        });
        document.body.classList.remove('no-scroll');
    }

    $$('.close-btn').forEach(function (btn) {
        btn.addEventListener('click', closeAllPopups);
    });
    $$('.popup').forEach(function (p) {
        p.addEventListener('click', function (e) {
            if (e.target === p) closeAllPopups();
        });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeAllPopups();
    });

    /* =============================================
       BUTTON 1: PULL A CARD — shows Major Arcana card
       ============================================= */
    var btnCard = $('#btn-pull-card');
    if (btnCard) {
        btnCard.addEventListener('click', function () {
            var card     = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
            var reversed = Math.random() < 0.3; // 30% chance reversed

            var popup = document.getElementById('cardPopup');
            if (!popup) return;

            // Build styled card display
            popup.querySelector('.popup-content').innerHTML =
                '<button class="close-btn" aria-label="Close">&times;</button>' +
                '<div class="tarot-card-display">' +
                    '<div class="tarot-card-inner" style="border-color:' + card.color + ';box-shadow:0 0 30px ' + card.color + '88;">' +
                        '<div class="tarot-card-num" style="color:' + card.color + ';">' + card.num + '</div>' +
                        '<div class="tarot-card-name">' + (reversed ? '🔄 ' : '') + card.name + (reversed ? ' (Reversed)' : '') + '</div>' +
                        '<div class="tarot-card-divider" style="background:' + card.color + ';"></div>' +
                        '<div class="tarot-card-keywords">' + card.keywords + '</div>' +
                        '<div class="tarot-card-meaning">' + card.meaning + '</div>' +
                    '</div>' +
                    '<div style="text-align:center;margin-top:16px;display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">' +
                        '<a href="https://www.food4thoth.com/ThreeCardTarot/" target="_blank" rel="noopener" class="neumorphic-button" style="padding:8px 20px;font-size:0.9rem;">🃏 Three Card Reading</a>' +
                        '<a href="https://www.food4thoth.com/CelticCrossTarot/" target="_blank" rel="noopener" class="neumorphic-button" style="padding:8px 20px;font-size:0.9rem;">✦ Celtic Cross</a>' +
                        '<a href="https://www.food4thoth.com/TarotLanding/" target="_blank" rel="noopener" class="neumorphic-button" style="padding:8px 20px;font-size:0.9rem;">📖 All Tarot Tools</a>' +
                    '</div>' +
                '</div>';

            // Re-attach close button listener
            var newClose = popup.querySelector('.close-btn');
            if (newClose) newClose.addEventListener('click', closeAllPopups);

            openPopup('cardPopup');
        });
    }

    /* =============================================
       BUTTON 2: ANIMATE — loads animation in popup iframe
       ============================================= */
    var btnAnimate = $('#btn-animate');
    if (btnAnimate) {
        btnAnimate.addEventListener('click', function () {
            var url    = animations[Math.floor(Math.random() * animations.length)];
            var popup  = document.getElementById('animationPopup');
            var iframe = document.getElementById('animationIframe');
            if (!popup || !iframe) return;

            // Remove lazy loading and set src before opening
            iframe.removeAttribute('loading');
            iframe.src = url;

            // Update the external link
            var extLink = popup.querySelector('.popup-ext-link');
            if (extLink) extLink.href = url;

            openPopup('animationPopup');
        });
    }

    /* =============================================
       BUTTON 3: RANDOM — opens random tool in new tab
       ============================================= */
    var btnRandom = $('#btn-random');
    if (btnRandom) {
        btnRandom.addEventListener('click', function () {
            var url = randomTools[Math.floor(Math.random() * randomTools.length)];
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    }

})();
