/**
 * Food4Thoth Navigation JS
 * Handles hamburger toggle, submenu expand/collapse, and random tool popup.
 */
(function () {
    'use strict';

    /* ---- DOM helpers ---- */
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    /* =============================================
       NAVIGATION TOGGLE
       ============================================= */
    const toggleBtn = $('#toggle-nav');
    const nav       = $('#navigation');

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', function () {
            const isHidden = nav.classList.toggle('hidden');
            toggleBtn.setAttribute('aria-expanded', String(!isHidden));
        });

        // Close nav when clicking outside
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
            const targetId  = tab.getAttribute('data-expand');
            const submenu   = document.getElementById(targetId);
            if (!submenu) return;

            const isOpen = !submenu.classList.contains('hidden');

            // Close all other open submenus
            $$('.submenu:not(.hidden)').forEach(function (sm) {
                if (sm !== submenu) sm.classList.add('hidden');
            });

            submenu.classList.toggle('hidden', isOpen);
        });
    });

    /* =============================================
       RANDOM TOOL CARDS DATA
       ============================================= */
    const toolCards = [
        { name: 'Celtic Cross Tarot',     url: 'https://www.food4thoth.com/CelticCrossTarot/',     desc: 'A full Celtic Cross tarot spread with rich imagery.' },
        { name: 'Sacred Geometry Tarot',  url: 'https://www.food4thoth.com/TarotSacredGeometry/',  desc: 'Tarot fused with sacred geometry art.' },
        { name: 'Loop Station HiFi',      url: 'https://www.food4thoth.com/LoopStationHiFi/',      desc: 'Advanced loop station with effects and high-fidelity audio.' },
        { name: 'I Ching Fractal',        url: 'https://www.food4thoth.com/IchingFractal/',        desc: 'I Ching readings with fractal visualizations.' },
        { name: 'WebGL Fluid Simulation', url: 'https://www.food4thoth.com/webgl-fluid-simulation/', desc: 'Interactive fluid simulation powered by WebGL.' },
        { name: 'Bergs of Life',          url: 'https://www.food4thoth.com/bergs-of-life/',        desc: 'Conway\'s Game of Life – Berg style.' },
        { name: 'Drawing Fractals',       url: 'https://www.food4thoth.com/DrawingFractals/',      desc: 'Draw with mathematical fractal tools.' },
        { name: 'Akashic Thoth Deep',     url: 'https://www.food4thoth.com/AkashicThothDeep/',     desc: 'Deep exploration of Thoth texts from the Akashic Records.' },
        { name: 'ARP Synth (Visual)',     url: 'https://www.food4thoth.com/ArpAppWithVisual/',     desc: 'Arpeggiator synthesizer with reactive visual display.' },
        { name: 'Psychedelic Waves',      url: 'https://www.food4thoth.com/psychedelic-waves/',    desc: 'Mesmerizing CSS animated psychedelic wave patterns.' },
        { name: 'Glo-Calculato',          url: 'https://www.food4thoth.com/GloCalculato/',         desc: 'A fully functional calculator wrapped in glowing rainbow magic.' },
        { name: 'Claw Machine Enhanced',  url: 'https://www.food4thoth.com/claw-machineGame/',     desc: 'Enhanced claw machine game – can you grab the prize?' },
        { name: 'Prayer For Love',        url: 'https://www.food4thoth.com/PrayerForLove/',        desc: 'A digital space for love, prayer, and reflection.' },
        { name: 'Rainbow Shape Generator',url: 'https://www.food4thoth.com/RainbowGenerator/',    desc: 'Generate stunning rainbow geometric shapes.' },
        { name: 'Trent Storybook',        url: 'https://www.food4thoth.com/TrentStorybook1stMobile/', desc: 'An illustrated storybook starring Trent the dog.' },
        { name: 'Majix Tarot (Cups)',     url: 'https://www.food4thoth.com/MajixTarotCups/',      desc: 'The Cups suit of the Majix Tarot deck.' },
        { name: 'Anarchy TAZ',            url: 'https://www.food4thoth.com/AnarchyTAZ/',           desc: 'Hakim Bey\'s Temporary Autonomous Zones – digital edition.' },
        { name: 'Old School Game',        url: 'https://www.food4thoth.com/OldSchoolGameDesktop/', desc: 'An old-school style video game – desktop edition.' },
        { name: 'Mescalito Reveal',       url: 'https://www.food4thoth.com/Mescalito/Reveal1.html', desc: 'A Mescalito-themed reveal animation.' },
        { name: 'Tide Walk Oregon',       url: 'https://www.food4thoth.com/TideApp/indexOregon.html', desc: 'Oregon coastal tide charts and walk planner.' },
    ];

    const animations = [
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO1.1.html',
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO2.1.html',
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO3.2.html',
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO4.html',
        'https://www.food4thoth.com/Artabillies4ThothAnimate/F4TLOGO5.html',
        'https://www.food4thoth.com/spiral/',
        'https://www.food4thoth.com/psychedelic-waves/',
        'https://www.food4thoth.com/neuro-noise/',
    ];

    /* =============================================
       POPUP HELPERS
       ============================================= */
    function openPopup(id) {
        const popup = document.getElementById(id);
        if (popup) {
            popup.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    function closePopup(id) {
        const popup = document.getElementById(id);
        if (popup) {
            popup.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    // Close popups via close buttons
    $$('.close-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const popup = btn.closest('.popup');
            if (popup) {
                popup.classList.remove('active');
                document.body.classList.remove('no-scroll');
                // Stop iframe audio/video
                const iframe = popup.querySelector('iframe');
                if (iframe) { const src = iframe.src; iframe.src = ''; iframe.src = src; }
            }
        });
    });

    // Close popups clicking backdrop
    $$('.popup').forEach(function (popup) {
        popup.addEventListener('click', function (e) {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    /* =============================================
       PULL A CARD (random tool as "card")
       ============================================= */
    const btnCard = $('#btn-pull-card');
    if (btnCard) {
        btnCard.addEventListener('click', function () {
            const card = toolCards[Math.floor(Math.random() * toolCards.length)];
            const nameEl = $('#cardName');
            const imgEl  = $('#cardImage');
            const descEl = $('#cardDescription');
            const linkEl = $('#cardWebsite');

            if (nameEl) nameEl.textContent = card.name;
            if (imgEl)  { imgEl.src = ''; imgEl.style.display = 'none'; } // no images needed
            if (descEl) descEl.textContent = card.desc;
            if (linkEl) { linkEl.href = card.url; linkEl.textContent = 'Explore → ' + card.name; }

            openPopup('cardPopup');
        });
    }

    /* =============================================
       ANIMATE BUTTON (random logo / visual)
       ============================================= */
    const btnAnimate = $('#btn-animate');
    if (btnAnimate) {
        btnAnimate.addEventListener('click', function () {
            const url    = animations[Math.floor(Math.random() * animations.length)];
            const iframe = $('#animationIframe');
            if (iframe) iframe.src = url;
            openPopup('animationPopup');
        });
    }

    /* =============================================
       RANDOM BUTTON (random tool full embed)
       ============================================= */
    const btnRandom = $('#btn-random');
    if (btnRandom) {
        btnRandom.addEventListener('click', function () {
            const tool = toolCards[Math.floor(Math.random() * toolCards.length)];
            // Open directly in new tab — preserves full functionality
            window.open(tool.url, '_blank', 'noopener,noreferrer');
        });
    }

    /* =============================================
       KEYBOARD: ESC closes popups
       ============================================= */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            $$('.popup.active').forEach(function (popup) {
                popup.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }
    });

})();
