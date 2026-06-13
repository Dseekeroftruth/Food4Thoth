/**
 * Food4Thoth Navigation JS
 * Nav toggle · Submenu expand · Pull A Card · Animate popup · Random popup
 */
(function () {
    'use strict';

    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
    const BASE = 'https://www.food4thoth.com/';

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
       DECK LOOKUP
       ============================================= */
    const deckInfo = {
        'website-1': { name: 'SACRED GEOMETRY',  url: BASE + 'TarotSacredGeometry/' },
        'website-2': { name: 'CYBER-MELO',        url: BASE + 'TarotCyberPunkMelo/'  },
        'website-3': { name: 'CYBER-DARK',        url: BASE + 'TarotCyberPunkDark/'  },
        'website-4': { name: 'OG TRADITIONAL',    url: BASE + 'TarotOG/'             }
    };

    /* =============================================
       FULL 312-CARD TAROT DECK
       ============================================= */
    var tarotDeck = [
        // ── WEBSITE 1: SACRED GEOMETRY ──
        // Major Arcana
        { name:'The Fool',          description:'The Fool is a card of new beginnings, opportunities, and adventures.',                                  img:BASE+'TarotSacredGeometry/images/FOOL.PNG',            deck:'website-1' },
        { name:'The Magician',      description:'The Magician represents power, skill, and creativity.',                                                 img:BASE+'TarotSacredGeometry/images/MAGICIAN.PNG',        deck:'website-1' },
        { name:'The High Priestess',description:'The High Priestess symbolizes intuition, mystery, and inner knowledge.',                               img:BASE+'TarotSacredGeometry/images/HIGHPRIESTESS.PNG',   deck:'website-1' },
        { name:'The Empress',       description:'The Empress represents femininity, beauty, nature, and abundance.',                                     img:BASE+'TarotSacredGeometry/images/EMPRESS.PNG',         deck:'website-1' },
        { name:'The Emperor',       description:'The Emperor symbolizes authority, structure, and control.',                                             img:BASE+'TarotSacredGeometry/images/EMPEROR.PNG',         deck:'website-1' },
        { name:'The Hierophant',    description:'The Hierophant stands for tradition, conformity, and spiritual wisdom.',                                img:BASE+'TarotSacredGeometry/images/HIEROPHANT.PNG',      deck:'website-1' },
        { name:'The Lovers',        description:'The Lovers card represents love, harmony, and relationships.',                                          img:BASE+'TarotSacredGeometry/images/LOVERS.PNG',          deck:'website-1' },
        { name:'The Chariot',       description:'The Chariot symbolizes willpower, determination, and success through control.',                         img:BASE+'TarotSacredGeometry/images/CHARIOT.PNG',         deck:'website-1' },
        { name:'Strength',          description:'Strength represents courage, persuasion, and influence.',                                               img:BASE+'TarotSacredGeometry/images/STRENGTH.PNG',        deck:'website-1' },
        { name:'The Hermit',        description:'The Hermit symbolizes introspection, solitude, and inner guidance.',                                   img:BASE+'TarotSacredGeometry/images/HERMIT.PNG',          deck:'website-1' },
        { name:'Wheel of Fortune',  description:'The Wheel of Fortune represents cycles, change, and destiny.',                                          img:BASE+'TarotSacredGeometry/images/WHEEL_OF_FORTUNE.PNG',deck:'website-1' },
        { name:'Justice',           description:'Justice stands for fairness, truth, and the law.',                                                      img:BASE+'TarotSacredGeometry/images/JUSTICE.PNG',         deck:'website-1' },
        { name:'The Hanged Man',    description:'The Hanged Man represents suspension, letting go, and new perspectives.',                               img:BASE+'TarotSacredGeometry/images/HANGEDMAN.PNG',       deck:'website-1' },
        { name:'Death',             description:'Death symbolizes transformation, endings, and new beginnings.',                                         img:BASE+'TarotSacredGeometry/images/DEATH.PNG',           deck:'website-1' },
        { name:'Temperance',        description:'Temperance stands for balance, moderation, and patience.',                                              img:BASE+'TarotSacredGeometry/images/TEMPERANCE.PNG',      deck:'website-1' },
        { name:'The Devil',         description:'The Devil represents bondage, addiction, and materialism.',                                             img:BASE+'TarotSacredGeometry/images/DEVIL.PNG',           deck:'website-1' },
        { name:'The Tower',         description:'The Tower symbolizes sudden upheaval, chaos, and revelation.',                                          img:BASE+'TarotSacredGeometry/images/TOWER.PNG',           deck:'website-1' },
        { name:'The Star',          description:'The Star represents hope, inspiration, and serenity.',                                                  img:BASE+'TarotSacredGeometry/images/STAR.PNG',            deck:'website-1' },
        { name:'The Moon',          description:'The Moon symbolizes illusion, fear, and the subconscious mind.',                                        img:BASE+'TarotSacredGeometry/images/MOON.PNG',            deck:'website-1' },
        { name:'The Sun',           description:'The Sun stands for positivity, vitality, and success.',                                                 img:BASE+'TarotSacredGeometry/images/SUN.PNG',             deck:'website-1' },
        { name:'Judgement',         description:'Judgement represents reflection, reckoning, and awakening.',                                            img:BASE+'TarotSacredGeometry/images/JUDGEMENT.PNG',       deck:'website-1' },
        { name:'The World',         description:'The World symbolizes completion, achievement, and wholeness.',                                           img:BASE+'TarotSacredGeometry/images/WORLD.PNG',           deck:'website-1' },
        // Wands
        { name:'Ace of Wands',      description:'The Ace of Wands represents inspiration, new opportunities, growth, and potential.',                    img:BASE+'TarotSacredGeometry/images/ACEWANDS.PNG',        deck:'website-1' },
        { name:'2 of Wands',        description:'The 2 of Wands symbolizes future planning, progress, and discovery.',                                   img:BASE+'TarotSacredGeometry/images/2WANDS.PNG',          deck:'website-1' },
        { name:'3 of Wands',        description:'The 3 of Wands represents expansion, foresight, and long-term plans.',                                  img:BASE+'TarotSacredGeometry/images/3WANDS.PNG',          deck:'website-1' },
        { name:'4 of Wands',        description:'The 4 of Wands signifies celebration, harmony, and homecoming.',                                        img:BASE+'TarotSacredGeometry/images/4WANDS.PNG',          deck:'website-1' },
        { name:'5 of Wands',        description:'The 5 of Wands represents conflict, competition, and tension.',                                         img:BASE+'TarotSacredGeometry/images/5WANDS.PNG',          deck:'website-1' },
        { name:'6 of Wands',        description:'The 6 of Wands symbolizes victory, success, and public recognition.',                                   img:BASE+'TarotSacredGeometry/images/6WANDS.PNG',          deck:'website-1' },
        { name:'7 of Wands',        description:'The 7 of Wands represents challenge, competition, and perseverance.',                                   img:BASE+'TarotSacredGeometry/images/7WANDS.PNG',          deck:'website-1' },
        { name:'8 of Wands',        description:'The 8 of Wands signifies speed, action, and swift change.',                                             img:BASE+'TarotSacredGeometry/images/8WANDS.PNG',          deck:'website-1' },
        { name:'9 of Wands',        description:'The 9 of Wands represents resilience, courage, and persistence.',                                       img:BASE+'TarotSacredGeometry/images/9WANDS.PNG',          deck:'website-1' },
        { name:'10 of Wands',       description:'The 10 of Wands symbolizes burden, responsibility, and hard work.',                                     img:BASE+'TarotSacredGeometry/images/10WANDS.PNG',         deck:'website-1' },
        { name:'Page of Wands',     description:'The Page of Wands represents enthusiasm, exploration, and free spirit.',                                img:BASE+'TarotSacredGeometry/images/PAGEWANDS.PNG',       deck:'website-1' },
        { name:'Knight of Wands',   description:'The Knight of Wands symbolizes action, adventure, and impulsiveness.',                                  img:BASE+'TarotSacredGeometry/images/KNIGHTWANDS.PNG',     deck:'website-1' },
        { name:'Queen of Wands',    description:'The Queen of Wands represents confidence, determination, and charisma.',                                img:BASE+'TarotSacredGeometry/images/QUEENWANDS.PNG',      deck:'website-1' },
        { name:'King of Wands',     description:'The King of Wands symbolizes leadership, vision, and entrepreneurship.',                                img:BASE+'TarotSacredGeometry/images/KINGWANDS.PNG',       deck:'website-1' },
        // Cups
        { name:'Ace of Cups',       description:'The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.',             img:BASE+'TarotSacredGeometry/images/ACECUPS.PNG',         deck:'website-1' },
        { name:'2 of Cups',         description:'The 2 of Cups symbolizes partnership, unity, and mutual attraction.',                                   img:BASE+'TarotSacredGeometry/images/2CUPS.PNG',           deck:'website-1' },
        { name:'3 of Cups',         description:'The 3 of Cups represents celebration, friendship, and social gatherings.',                              img:BASE+'TarotSacredGeometry/images/3CUPS.PNG',           deck:'website-1' },
        { name:'4 of Cups',         description:'The 4 of Cups signifies contemplation, reevaluation, and apathy.',                                      img:BASE+'TarotSacredGeometry/images/4CUPS.PNG',           deck:'website-1' },
        { name:'5 of Cups',         description:'The 5 of Cups represents loss, regret, and focusing on the negative.',                                  img:BASE+'TarotSacredGeometry/images/5CUPS.PNG',           deck:'website-1' },
        { name:'6 of Cups',         description:'The 6 of Cups symbolizes nostalgia, childhood memories, and innocence.',                                img:BASE+'TarotSacredGeometry/images/6CUPS.PNG',           deck:'website-1' },
        { name:'7 of Cups',         description:'The 7 of Cups represents choices, illusions, and wishful thinking.',                                    img:BASE+'TarotSacredGeometry/images/7CUPS.PNG',           deck:'website-1' },
        { name:'8 of Cups',         description:'The 8 of Cups signifies walking away, abandonment, and seeking deeper meaning.',                        img:BASE+'TarotSacredGeometry/images/8CUPS.PNG',           deck:'website-1' },
        { name:'9 of Cups',         description:'The 9 of Cups symbolizes contentment, satisfaction, and emotional fulfillment.',                        img:BASE+'TarotSacredGeometry/images/9CUPS.PNG',           deck:'website-1' },
        { name:'10 of Cups',        description:'The 10 of Cups represents happiness, family harmony, and lasting love.',                                img:BASE+'TarotSacredGeometry/images/10CUPS.PNG',          deck:'website-1' },
        { name:'Page of Cups',      description:'The Page of Cups symbolizes creativity, new emotions, and intuitive insights.',                         img:BASE+'TarotSacredGeometry/images/PAGECUPS.PNG',        deck:'website-1' },
        { name:'Knight of Cups',    description:'The Knight of Cups represents romance, charm, and pursuing the heart\'s desires.',                      img:BASE+'TarotSacredGeometry/images/KNIGHTCUPS.PNG',      deck:'website-1' },
        { name:'Queen of Cups',     description:'The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.',                    img:BASE+'TarotSacredGeometry/images/QUEENCUPS.PNG',       deck:'website-1' },
        { name:'King of Cups',      description:'The King of Cups represents emotional balance, leadership, and control over one\'s feelings.',          img:BASE+'TarotSacredGeometry/images/KINGCUPS.PNG',        deck:'website-1' },
        // Swords
        { name:'Ace of Swords',     description:'The Ace of Swords represents clarity, truth, and a breakthrough.',                                      img:BASE+'TarotSacredGeometry/images/ACESWORDS.PNG',       deck:'website-1' },
        { name:'2 of Swords',       description:'The 2 of Swords symbolizes difficult decisions, stalemate, and balance.',                               img:BASE+'TarotSacredGeometry/images/2SWORDS.PNG',         deck:'website-1' },
        { name:'3 of Swords',       description:'The 3 of Swords represents heartbreak, sorrow, and emotional pain.',                                    img:BASE+'TarotSacredGeometry/images/3SWORDS.PNG',         deck:'website-1' },
        { name:'4 of Swords',       description:'The 4 of Swords signifies rest, recuperation, and contemplation.',                                      img:BASE+'TarotSacredGeometry/images/4SWORDS.PNG',         deck:'website-1' },
        { name:'5 of Swords',       description:'The 5 of Swords represents conflict, defeat, and tension.',                                             img:BASE+'TarotSacredGeometry/images/5SWORDS.PNG',         deck:'website-1' },
        { name:'6 of Swords',       description:'The 6 of Swords symbolizes transition, change, and moving on.',                                         img:BASE+'TarotSacredGeometry/images/6SWORDS.PNG',         deck:'website-1' },
        { name:'7 of Swords',       description:'The 7 of Swords represents deception, trickery, and strategy.',                                        img:BASE+'TarotSacredGeometry/images/7SWORDS.PNG',         deck:'website-1' },
        { name:'8 of Swords',       description:'The 8 of Swords signifies restriction, fear, and feeling trapped.',                                     img:BASE+'TarotSacredGeometry/images/8SWORDS.PNG',         deck:'website-1' },
        { name:'9 of Swords',       description:'The 9 of Swords represents anxiety, worry, and nightmares.',                                            img:BASE+'TarotSacredGeometry/images/9SWORDS.PNG',         deck:'website-1' },
        { name:'10 of Swords',      description:'The 10 of Swords symbolizes betrayal, defeat, and painful endings.',                                    img:BASE+'TarotSacredGeometry/images/10SWORDS.PNG',        deck:'website-1' },
        { name:'Page of Swords',    description:'The Page of Swords represents curiosity, communication, and vigilance.',                                img:BASE+'TarotSacredGeometry/images/PAGESWORDS.PNG',      deck:'website-1' },
        { name:'Knight of Swords',  description:'The Knight of Swords symbolizes action, ambition, and impulsiveness.',                                  img:BASE+'TarotSacredGeometry/images/KNIGHTSWORDS.PNG',    deck:'website-1' },
        { name:'Queen of Swords',   description:'The Queen of Swords represents independence, perceptiveness, and clear thinking.',                      img:BASE+'TarotSacredGeometry/images/QUEENSWORDS.PNG',     deck:'website-1' },
        { name:'King of Swords',    description:'The King of Swords symbolizes intellect, authority, and truth.',                                        img:BASE+'TarotSacredGeometry/images/KINGSWORDS.PNG',      deck:'website-1' },
        // Pentacles
        { name:'Ace of Pentacles',  description:'The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.', img:BASE+'TarotSacredGeometry/images/ACEPENTACLES.PNG',    deck:'website-1' },
        { name:'2 of Pentacles',    description:'The 2 of Pentacles symbolizes balance, adaptability, and time management.',                             img:BASE+'TarotSacredGeometry/images/2PENTACLES.PNG',      deck:'website-1' },
        { name:'3 of Pentacles',    description:'The 3 of Pentacles represents teamwork, collaboration, and building something together.',               img:BASE+'TarotSacredGeometry/images/3PENTACLES.PNG',      deck:'website-1' },
        { name:'4 of Pentacles',    description:'The 4 of Pentacles signifies control, stability, and material security.',                               img:BASE+'TarotSacredGeometry/images/4PENTACLES.PNG',      deck:'website-1' },
        { name:'5 of Pentacles',    description:'The 5 of Pentacles represents financial loss, poverty, and feeling isolated.',                          img:BASE+'TarotSacredGeometry/images/5PENTACLES.PNG',      deck:'website-1' },
        { name:'6 of Pentacles',    description:'The 6 of Pentacles symbolizes generosity, sharing wealth, and helping others.',                         img:BASE+'TarotSacredGeometry/images/6PENTACLES.PNG',      deck:'website-1' },
        { name:'7 of Pentacles',    description:'The 7 of Pentacles represents long-term investment, patience, and reward for hard work.',               img:BASE+'TarotSacredGeometry/images/7PENTACLES.PNG',      deck:'website-1' },
        { name:'8 of Pentacles',    description:'The 8 of Pentacles signifies diligence, skill development, and craftsmanship.',                         img:BASE+'TarotSacredGeometry/images/8PENTACLES.PNG',      deck:'website-1' },
        { name:'9 of Pentacles',    description:'The 9 of Pentacles represents luxury, self-sufficiency, and financial independence.',                   img:BASE+'TarotSacredGeometry/images/9PENTACLES.PNG',      deck:'website-1' },
        { name:'10 of Pentacles',   description:'The 10 of Pentacles symbolizes wealth, legacy, and family traditions.',                                 img:BASE+'TarotSacredGeometry/images/10PENTACLES.PNG',     deck:'website-1' },
        { name:'Page of Pentacles', description:'The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.',    img:BASE+'TarotSacredGeometry/images/PAGEPENTACLES.PNG',   deck:'website-1' },
        { name:'Knight of Pentacles',description:'The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.',                      img:BASE+'TarotSacredGeometry/images/KNIGHTPENTACLES.PNG', deck:'website-1' },
        { name:'Queen of Pentacles',description:'The Queen of Pentacles represents nurturing, practicality, and financial security.',                    img:BASE+'TarotSacredGeometry/images/QUEENPENTACLES.PNG',  deck:'website-1' },
        { name:'King of Pentacles', description:'The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.',             img:BASE+'TarotSacredGeometry/images/KINGPENTACLES.PNG',   deck:'website-1' },

        // ── WEBSITE 2: CYBER-MELO ──
        // Major Arcana
        { name:'The Fool',          description:'The Fool is a card of new beginnings, opportunities, and adventures.',                                  img:BASE+'TarotCyberPunkMelo/images/00_FOOL.PNG',          deck:'website-2' },
        { name:'The Magician',      description:'The Magician represents power, skill, and creativity.',                                                 img:BASE+'TarotCyberPunkMelo/images/01_MAGICIAN.PNG',      deck:'website-2' },
        { name:'The High Priestess',description:'The High Priestess symbolizes intuition, mystery, and inner knowledge.',                               img:BASE+'TarotCyberPunkMelo/images/02_HIGHPRIESTESS.PNG', deck:'website-2' },
        { name:'The Empress',       description:'The Empress represents femininity, beauty, nature, and abundance.',                                     img:BASE+'TarotCyberPunkMelo/images/03_EMPRESS.PNG',       deck:'website-2' },
        { name:'The Emperor',       description:'The Emperor symbolizes authority, structure, and control.',                                             img:BASE+'TarotCyberPunkMelo/images/04_EMPEROR.PNG',       deck:'website-2' },
        { name:'The Hierophant',    description:'The Hierophant stands for tradition, conformity, and spiritual wisdom.',                                img:BASE+'TarotCyberPunkMelo/images/05_HIEROPHANT.PNG',    deck:'website-2' },
        { name:'The Lovers',        description:'The Lovers card represents love, harmony, and relationships.',                                          img:BASE+'TarotCyberPunkMelo/images/06_LOVERS.PNG',        deck:'website-2' },
        { name:'The Chariot',       description:'The Chariot symbolizes willpower, determination, and success through control.',                         img:BASE+'TarotCyberPunkMelo/images/07_CHARIOT.PNG',       deck:'website-2' },
        { name:'Strength',          description:'Strength represents courage, persuasion, and influence.',                                               img:BASE+'TarotCyberPunkMelo/images/08_STRENGTH.PNG',      deck:'website-2' },
        { name:'The Hermit',        description:'The Hermit symbolizes introspection, solitude, and inner guidance.',                                   img:BASE+'TarotCyberPunkMelo/images/09_HERMIT.PNG',        deck:'website-2' },
        { name:'Wheel of Fortune',  description:'The Wheel of Fortune represents cycles, change, and destiny.',                                          img:BASE+'TarotCyberPunkMelo/images/10_WHEEL_OF_FORTUNE.PNG',deck:'website-2' },
        { name:'Justice',           description:'Justice stands for fairness, truth, and the law.',                                                      img:BASE+'TarotCyberPunkMelo/images/11_JUSTICE.PNG',       deck:'website-2' },
        { name:'The Hanged Man',    description:'The Hanged Man represents suspension, letting go, and new perspectives.',                               img:BASE+'TarotCyberPunkMelo/images/12_HANGEDMAN.PNG',     deck:'website-2' },
        { name:'Death',             description:'Death symbolizes transformation, endings, and new beginnings.',                                         img:BASE+'TarotCyberPunkMelo/images/13_DEATH.PNG',         deck:'website-2' },
        { name:'Temperance',        description:'Temperance stands for balance, moderation, and patience.',                                              img:BASE+'TarotCyberPunkMelo/images/14_TEMPERANCE.PNG',    deck:'website-2' },
        { name:'The Devil',         description:'The Devil represents bondage, addiction, and materialism.',                                             img:BASE+'TarotCyberPunkMelo/images/15_DEVIL.PNG',         deck:'website-2' },
        { name:'The Tower',         description:'The Tower symbolizes sudden upheaval, chaos, and revelation.',                                          img:BASE+'TarotCyberPunkMelo/images/16_TOWER.PNG',         deck:'website-2' },
        { name:'The Star',          description:'The Star represents hope, inspiration, and serenity.',                                                  img:BASE+'TarotCyberPunkMelo/images/17_STAR.PNG',          deck:'website-2' },
        { name:'The Moon',          description:'The Moon symbolizes illusion, fear, and the subconscious mind.',                                        img:BASE+'TarotCyberPunkMelo/images/18_MOON.PNG',          deck:'website-2' },
        { name:'The Sun',           description:'The Sun stands for positivity, vitality, and success.',                                                 img:BASE+'TarotCyberPunkMelo/images/19_SUN.PNG',           deck:'website-2' },
        { name:'Judgement',         description:'Judgement represents reflection, reckoning, and awakening.',                                            img:BASE+'TarotCyberPunkMelo/images/20_JUDGEMENT.PNG',     deck:'website-2' },
        { name:'The World',         description:'The World symbolizes completion, achievement, and wholeness.',                                           img:BASE+'TarotCyberPunkMelo/images/21_WORLD.PNG',         deck:'website-2' },
        // Wands
        { name:'Ace of Wands',      description:'The Ace of Wands represents inspiration, new opportunities, growth, and potential.',                    img:BASE+'TarotCyberPunkMelo/images/WANDS_01.PNG',         deck:'website-2' },
        { name:'2 of Wands',        description:'The 2 of Wands symbolizes future planning, progress, and discovery.',                                   img:BASE+'TarotCyberPunkMelo/images/WANDS_02.PNG',         deck:'website-2' },
        { name:'3 of Wands',        description:'The 3 of Wands represents expansion, foresight, and long-term plans.',                                  img:BASE+'TarotCyberPunkMelo/images/WANDS_03.PNG',         deck:'website-2' },
        { name:'4 of Wands',        description:'The 4 of Wands signifies celebration, harmony, and homecoming.',                                        img:BASE+'TarotCyberPunkMelo/images/WANDS_04.PNG',         deck:'website-2' },
        { name:'5 of Wands',        description:'The 5 of Wands represents conflict, competition, and tension.',                                         img:BASE+'TarotCyberPunkMelo/images/WANDS_05.PNG',         deck:'website-2' },
        { name:'6 of Wands',        description:'The 6 of Wands symbolizes victory, success, and public recognition.',                                   img:BASE+'TarotCyberPunkMelo/images/WANDS_06.PNG',         deck:'website-2' },
        { name:'7 of Wands',        description:'The 7 of Wands represents challenge, competition, and perseverance.',                                   img:BASE+'TarotCyberPunkMelo/images/WANDS_07.PNG',         deck:'website-2' },
        { name:'8 of Wands',        description:'The 8 of Wands signifies speed, action, and swift change.',                                             img:BASE+'TarotCyberPunkMelo/images/WANDS_08.PNG',         deck:'website-2' },
        { name:'9 of Wands',        description:'The 9 of Wands represents resilience, courage, and persistence.',                                       img:BASE+'TarotCyberPunkMelo/images/WANDS_09.PNG',         deck:'website-2' },
        { name:'10 of Wands',       description:'The 10 of Wands symbolizes burden, responsibility, and hard work.',                                     img:BASE+'TarotCyberPunkMelo/images/WANDS_10.PNG',         deck:'website-2' },
        { name:'Page of Wands',     description:'The Page of Wands represents enthusiasm, exploration, and free spirit.',                                img:BASE+'TarotCyberPunkMelo/images/WANDS_11.PNG',         deck:'website-2' },
        { name:'Knight of Wands',   description:'The Knight of Wands symbolizes action, adventure, and impulsiveness.',                                  img:BASE+'TarotCyberPunkMelo/images/WANDS_12.PNG',         deck:'website-2' },
        { name:'Queen of Wands',    description:'The Queen of Wands represents confidence, determination, and charisma.',                                img:BASE+'TarotCyberPunkMelo/images/WANDS_13.PNG',         deck:'website-2' },
        { name:'King of Wands',     description:'The King of Wands symbolizes leadership, vision, and entrepreneurship.',                                img:BASE+'TarotCyberPunkMelo/images/WANDS_14.PNG',         deck:'website-2' },
        // Cups
        { name:'Ace of Cups',       description:'The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.',             img:BASE+'TarotCyberPunkMelo/images/CUPS_01.PNG',          deck:'website-2' },
        { name:'2 of Cups',         description:'The 2 of Cups symbolizes partnership, unity, and mutual attraction.',                                   img:BASE+'TarotCyberPunkMelo/images/CUPS_02.PNG',          deck:'website-2' },
        { name:'3 of Cups',         description:'The 3 of Cups represents celebration, friendship, and social gatherings.',                              img:BASE+'TarotCyberPunkMelo/images/CUPS_03.PNG',          deck:'website-2' },
        { name:'4 of Cups',         description:'The 4 of Cups signifies contemplation, reevaluation, and apathy.',                                      img:BASE+'TarotCyberPunkMelo/images/CUPS_04.PNG',          deck:'website-2' },
        { name:'5 of Cups',         description:'The 5 of Cups represents loss, regret, and focusing on the negative.',                                  img:BASE+'TarotCyberPunkMelo/images/CUPS_05.PNG',          deck:'website-2' },
        { name:'6 of Cups',         description:'The 6 of Cups symbolizes nostalgia, childhood memories, and innocence.',                                img:BASE+'TarotCyberPunkMelo/images/CUPS_06.PNG',          deck:'website-2' },
        { name:'7 of Cups',         description:'The 7 of Cups represents choices, illusions, and wishful thinking.',                                    img:BASE+'TarotCyberPunkMelo/images/CUPS_07.PNG',          deck:'website-2' },
        { name:'8 of Cups',         description:'The 8 of Cups signifies walking away, abandonment, and seeking deeper meaning.',                        img:BASE+'TarotCyberPunkMelo/images/CUPS_08.PNG',          deck:'website-2' },
        { name:'9 of Cups',         description:'The 9 of Cups symbolizes contentment, satisfaction, and emotional fulfillment.',                        img:BASE+'TarotCyberPunkMelo/images/CUPS_09.PNG',          deck:'website-2' },
        { name:'10 of Cups',        description:'The 10 of Cups represents happiness, family harmony, and lasting love.',                                img:BASE+'TarotCyberPunkMelo/images/CUPS_10.PNG',          deck:'website-2' },
        { name:'Page of Cups',      description:'The Page of Cups symbolizes creativity, new emotions, and intuitive insights.',                         img:BASE+'TarotCyberPunkMelo/images/CUPS_11.PNG',          deck:'website-2' },
        { name:'Knight of Cups',    description:'The Knight of Cups represents romance, charm, and pursuing the heart\'s desires.',                      img:BASE+'TarotCyberPunkMelo/images/CUPS_12.PNG',          deck:'website-2' },
        { name:'Queen of Cups',     description:'The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.',                    img:BASE+'TarotCyberPunkMelo/images/CUPS_13.PNG',          deck:'website-2' },
        { name:'King of Cups',      description:'The King of Cups represents emotional balance, leadership, and control over one\'s feelings.',          img:BASE+'TarotCyberPunkMelo/images/CUPS_14.PNG',          deck:'website-2' },
        // Swords
        { name:'Ace of Swords',     description:'The Ace of Swords represents clarity, truth, and a breakthrough.',                                      img:BASE+'TarotCyberPunkMelo/images/SWORDS_01.PNG',        deck:'website-2' },
        { name:'2 of Swords',       description:'The 2 of Swords symbolizes difficult decisions, stalemate, and balance.',                               img:BASE+'TarotCyberPunkMelo/images/SWORDS_02.PNG',        deck:'website-2' },
        { name:'3 of Swords',       description:'The 3 of Swords represents heartbreak, sorrow, and emotional pain.',                                    img:BASE+'TarotCyberPunkMelo/images/SWORDS_03.PNG',        deck:'website-2' },
        { name:'4 of Swords',       description:'The 4 of Swords signifies rest, recuperation, and contemplation.',                                      img:BASE+'TarotCyberPunkMelo/images/SWORDS_04.PNG',        deck:'website-2' },
        { name:'5 of Swords',       description:'The 5 of Swords represents conflict, defeat, and tension.',                                             img:BASE+'TarotCyberPunkMelo/images/SWORDS_05.PNG',        deck:'website-2' },
        { name:'6 of Swords',       description:'The 6 of Swords symbolizes transition, change, and moving on.',                                         img:BASE+'TarotCyberPunkMelo/images/SWORDS_06.PNG',        deck:'website-2' },
        { name:'7 of Swords',       description:'The 7 of Swords represents deception, trickery, and strategy.',                                        img:BASE+'TarotCyberPunkMelo/images/SWORDS_07.PNG',        deck:'website-2' },
        { name:'8 of Swords',       description:'The 8 of Swords signifies restriction, fear, and feeling trapped.',                                     img:BASE+'TarotCyberPunkMelo/images/SWORDS_08.PNG',        deck:'website-2' },
        { name:'9 of Swords',       description:'The 9 of Swords represents anxiety, worry, and nightmares.',                                            img:BASE+'TarotCyberPunkMelo/images/SWORDS_09.PNG',        deck:'website-2' },
        { name:'10 of Swords',      description:'The 10 of Swords symbolizes betrayal, defeat, and painful endings.',                                    img:BASE+'TarotCyberPunkMelo/images/SWORDS_10.PNG',        deck:'website-2' },
        { name:'Page of Swords',    description:'The Page of Swords represents curiosity, communication, and vigilance.',                                img:BASE+'TarotCyberPunkMelo/images/SWORDS_11.PNG',        deck:'website-2' },
        { name:'Knight of Swords',  description:'The Knight of Swords symbolizes action, ambition, and impulsiveness.',                                  img:BASE+'TarotCyberPunkMelo/images/SWORDS_12.PNG',        deck:'website-2' },
        { name:'Queen of Swords',   description:'The Queen of Swords represents independence, perceptiveness, and clear thinking.',                      img:BASE+'TarotCyberPunkMelo/images/SWORDS_13.PNG',        deck:'website-2' },
        { name:'King of Swords',    description:'The King of Swords symbolizes intellect, authority, and truth.',                                        img:BASE+'TarotCyberPunkMelo/images/SWORDS_14.PNG',        deck:'website-2' },
        // Pentacles
        { name:'Ace of Pentacles',  description:'The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.', img:BASE+'TarotCyberPunkMelo/images/PENTACLES_01.PNG',     deck:'website-2' },
        { name:'2 of Pentacles',    description:'The 2 of Pentacles symbolizes balance, adaptability, and time management.',                             img:BASE+'TarotCyberPunkMelo/images/PENTACLES_02.PNG',     deck:'website-2' },
        { name:'3 of Pentacles',    description:'The 3 of Pentacles represents teamwork, collaboration, and building something together.',               img:BASE+'TarotCyberPunkMelo/images/PENTACLES_03.PNG',     deck:'website-2' },
        { name:'4 of Pentacles',    description:'The 4 of Pentacles signifies control, stability, and material security.',                               img:BASE+'TarotCyberPunkMelo/images/PENTACLES_04.PNG',     deck:'website-2' },
        { name:'5 of Pentacles',    description:'The 5 of Pentacles represents financial loss, poverty, and feeling isolated.',                          img:BASE+'TarotCyberPunkMelo/images/PENTACLES_05.PNG',     deck:'website-2' },
        { name:'6 of Pentacles',    description:'The 6 of Pentacles symbolizes generosity, sharing wealth, and helping others.',                         img:BASE+'TarotCyberPunkMelo/images/PENTACLES_06.PNG',     deck:'website-2' },
        { name:'7 of Pentacles',    description:'The 7 of Pentacles represents long-term investment, patience, and reward for hard work.',               img:BASE+'TarotCyberPunkMelo/images/PENTACLES_07.PNG',     deck:'website-2' },
        { name:'8 of Pentacles',    description:'The 8 of Pentacles signifies diligence, skill development, and craftsmanship.',                         img:BASE+'TarotCyberPunkMelo/images/PENTACLES_08.PNG',     deck:'website-2' },
        { name:'9 of Pentacles',    description:'The 9 of Pentacles represents luxury, self-sufficiency, and financial independence.',                   img:BASE+'TarotCyberPunkMelo/images/PENTACLES_09.PNG',     deck:'website-2' },
        { name:'10 of Pentacles',   description:'The 10 of Pentacles symbolizes wealth, legacy, and family traditions.',                                 img:BASE+'TarotCyberPunkMelo/images/PENTACLES_10.PNG',     deck:'website-2' },
        { name:'Page of Pentacles', description:'The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.',    img:BASE+'TarotCyberPunkMelo/images/PENTACLES_11.PNG',     deck:'website-2' },
        { name:'Knight of Pentacles',description:'The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.',                      img:BASE+'TarotCyberPunkMelo/images/PENTACLES_12.PNG',     deck:'website-2' },
        { name:'Queen of Pentacles',description:'The Queen of Pentacles represents nurturing, practicality, and financial security.',                    img:BASE+'TarotCyberPunkMelo/images/PENTACLES_13.PNG',     deck:'website-2' },
        { name:'King of Pentacles', description:'The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.',             img:BASE+'TarotCyberPunkMelo/images/PENTACLES_14.PNG',     deck:'website-2' },

        // ── WEBSITE 3: CYBER-DARK ──
        // Major Arcana
        { name:'The Fool',          description:'The Fool is a card of new beginnings, opportunities, and adventures.',                                  img:BASE+'TarotCyberPunkDark/images/00_FOOL.PNG',          deck:'website-3' },
        { name:'The Magician',      description:'The Magician represents power, skill, and creativity.',                                                 img:BASE+'TarotCyberPunkDark/images/01_MAGICIAN.PNG',      deck:'website-3' },
        { name:'The High Priestess',description:'The High Priestess symbolizes intuition, mystery, and inner knowledge.',                               img:BASE+'TarotCyberPunkDark/images/02_HIGHPRIESTESS.PNG', deck:'website-3' },
        { name:'The Empress',       description:'The Empress represents femininity, beauty, nature, and abundance.',                                     img:BASE+'TarotCyberPunkDark/images/03_EMPRESS.PNG',       deck:'website-3' },
        { name:'The Emperor',       description:'The Emperor symbolizes authority, structure, and control.',                                             img:BASE+'TarotCyberPunkDark/images/04_EMPEROR.PNG',       deck:'website-3' },
        { name:'The Hierophant',    description:'The Hierophant stands for tradition, conformity, and spiritual wisdom.',                                img:BASE+'TarotCyberPunkDark/images/05_HIEROPHANT.PNG',    deck:'website-3' },
        { name:'The Lovers',        description:'The Lovers card represents love, harmony, and relationships.',                                          img:BASE+'TarotCyberPunkDark/images/06_LOVERS.PNG',        deck:'website-3' },
        { name:'The Chariot',       description:'The Chariot symbolizes willpower, determination, and success through control.',                         img:BASE+'TarotCyberPunkDark/images/07_CHARIOT.PNG',       deck:'website-3' },
        { name:'Strength',          description:'Strength represents courage, persuasion, and influence.',                                               img:BASE+'TarotCyberPunkDark/images/08_STRENGTH.PNG',      deck:'website-3' },
        { name:'The Hermit',        description:'The Hermit symbolizes introspection, solitude, and inner guidance.',                                   img:BASE+'TarotCyberPunkDark/images/09_HERMIT.PNG',        deck:'website-3' },
        { name:'Wheel of Fortune',  description:'The Wheel of Fortune represents cycles, change, and destiny.',                                          img:BASE+'TarotCyberPunkDark/images/10_WHEEL_OF_FORTUNE.PNG',deck:'website-3' },
        { name:'Justice',           description:'Justice stands for fairness, truth, and the law.',                                                      img:BASE+'TarotCyberPunkDark/images/11_JUSTICE.PNG',       deck:'website-3' },
        { name:'The Hanged Man',    description:'The Hanged Man represents suspension, letting go, and new perspectives.',                               img:BASE+'TarotCyberPunkDark/images/12_HANGEDMAN.PNG',     deck:'website-3' },
        { name:'Death',             description:'Death symbolizes transformation, endings, and new beginnings.',                                         img:BASE+'TarotCyberPunkDark/images/13_DEATH.PNG',         deck:'website-3' },
        { name:'Temperance',        description:'Temperance stands for balance, moderation, and patience.',                                              img:BASE+'TarotCyberPunkDark/images/14_TEMPERANCE.PNG',    deck:'website-3' },
        { name:'The Devil',         description:'The Devil represents bondage, addiction, and materialism.',                                             img:BASE+'TarotCyberPunkDark/images/15_DEVIL.PNG',         deck:'website-3' },
        { name:'The Tower',         description:'The Tower symbolizes sudden upheaval, chaos, and revelation.',                                          img:BASE+'TarotCyberPunkDark/images/16_TOWER.PNG',         deck:'website-3' },
        { name:'The Star',          description:'The Star represents hope, inspiration, and serenity.',                                                  img:BASE+'TarotCyberPunkDark/images/17_STAR.PNG',          deck:'website-3' },
        { name:'The Moon',          description:'The Moon symbolizes illusion, fear, and the subconscious mind.',                                        img:BASE+'TarotCyberPunkDark/images/18_MOON.PNG',          deck:'website-3' },
        { name:'The Sun',           description:'The Sun stands for positivity, vitality, and success.',                                                 img:BASE+'TarotCyberPunkDark/images/19_SUN.PNG',           deck:'website-3' },
        { name:'Judgement',         description:'Judgement represents reflection, reckoning, and awakening.',                                            img:BASE+'TarotCyberPunkDark/images/20_JUDGEMENT.PNG',     deck:'website-3' },
        { name:'The World',         description:'The World symbolizes completion, achievement, and wholeness.',                                           img:BASE+'TarotCyberPunkDark/images/21_WORLD.PNG',         deck:'website-3' },
        // Wands
        { name:'Ace of Wands',      description:'The Ace of Wands represents inspiration, new opportunities, growth, and potential.',                    img:BASE+'TarotCyberPunkDark/images/WANDS_01.PNG',         deck:'website-3' },
        { name:'2 of Wands',        description:'The 2 of Wands symbolizes future planning, progress, and discovery.',                                   img:BASE+'TarotCyberPunkDark/images/WANDS_02.PNG',         deck:'website-3' },
        { name:'3 of Wands',        description:'The 3 of Wands represents expansion, foresight, and long-term plans.',                                  img:BASE+'TarotCyberPunkDark/images/WANDS_03.PNG',         deck:'website-3' },
        { name:'4 of Wands',        description:'The 4 of Wands signifies celebration, harmony, and homecoming.',                                        img:BASE+'TarotCyberPunkDark/images/WANDS_04.PNG',         deck:'website-3' },
        { name:'5 of Wands',        description:'The 5 of Wands represents conflict, competition, and tension.',                                         img:BASE+'TarotCyberPunkDark/images/WANDS_05.PNG',         deck:'website-3' },
        { name:'6 of Wands',        description:'The 6 of Wands symbolizes victory, success, and public recognition.',                                   img:BASE+'TarotCyberPunkDark/images/WANDS_06.PNG',         deck:'website-3' },
        { name:'7 of Wands',        description:'The 7 of Wands represents challenge, competition, and perseverance.',                                   img:BASE+'TarotCyberPunkDark/images/WANDS_07.PNG',         deck:'website-3' },
        { name:'8 of Wands',        description:'The 8 of Wands signifies speed, action, and swift change.',                                             img:BASE+'TarotCyberPunkDark/images/WANDS_08.PNG',         deck:'website-3' },
        { name:'9 of Wands',        description:'The 9 of Wands represents resilience, courage, and persistence.',                                       img:BASE+'TarotCyberPunkDark/images/WANDS_09.PNG',         deck:'website-3' },
        { name:'10 of Wands',       description:'The 10 of Wands symbolizes burden, responsibility, and hard work.',                                     img:BASE+'TarotCyberPunkDark/images/WANDS_10.PNG',         deck:'website-3' },
        { name:'Page of Wands',     description:'The Page of Wands represents enthusiasm, exploration, and free spirit.',                                img:BASE+'TarotCyberPunkDark/images/WANDS_11.PNG',         deck:'website-3' },
        { name:'Knight of Wands',   description:'The Knight of Wands symbolizes action, adventure, and impulsiveness.',                                  img:BASE+'TarotCyberPunkDark/images/WANDS_12.PNG',         deck:'website-3' },
        { name:'Queen of Wands',    description:'The Queen of Wands represents confidence, determination, and charisma.',                                img:BASE+'TarotCyberPunkDark/images/WANDS_13.PNG',         deck:'website-3' },
        { name:'King of Wands',     description:'The King of Wands symbolizes leadership, vision, and entrepreneurship.',                                img:BASE+'TarotCyberPunkDark/images/WANDS_14.PNG',         deck:'website-3' },
        // Cups
        { name:'Ace of Cups',       description:'The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.',             img:BASE+'TarotCyberPunkDark/images/CUPS_01.PNG',          deck:'website-3' },
        { name:'2 of Cups',         description:'The 2 of Cups symbolizes partnership, unity, and mutual attraction.',                                   img:BASE+'TarotCyberPunkDark/images/CUPS_02.PNG',          deck:'website-3' },
        { name:'3 of Cups',         description:'The 3 of Cups represents celebration, friendship, and social gatherings.',                              img:BASE+'TarotCyberPunkDark/images/CUPS_03.PNG',          deck:'website-3' },
        { name:'4 of Cups',         description:'The 4 of Cups signifies contemplation, reevaluation, and apathy.',                                      img:BASE+'TarotCyberPunkDark/images/CUPS_04.PNG',          deck:'website-3' },
        { name:'5 of Cups',         description:'The 5 of Cups represents loss, regret, and focusing on the negative.',                                  img:BASE+'TarotCyberPunkDark/images/CUPS_05.PNG',          deck:'website-3' },
        { name:'6 of Cups',         description:'The 6 of Cups symbolizes nostalgia, childhood memories, and innocence.',                                img:BASE+'TarotCyberPunkDark/images/CUPS_06.PNG',          deck:'website-3' },
        { name:'7 of Cups',         description:'The 7 of Cups represents choices, illusions, and wishful thinking.',                                    img:BASE+'TarotCyberPunkDark/images/CUPS_07.PNG',          deck:'website-3' },
        { name:'8 of Cups',         description:'The 8 of Cups signifies walking away, abandonment, and seeking deeper meaning.',                        img:BASE+'TarotCyberPunkDark/images/CUPS_08.PNG',          deck:'website-3' },
        { name:'9 of Cups',         description:'The 9 of Cups symbolizes contentment, satisfaction, and emotional fulfillment.',                        img:BASE+'TarotCyberPunkDark/images/CUPS_09.PNG',          deck:'website-3' },
        { name:'10 of Cups',        description:'The 10 of Cups represents happiness, family harmony, and lasting love.',                                img:BASE+'TarotCyberPunkDark/images/CUPS_10.PNG',          deck:'website-3' },
        { name:'Page of Cups',      description:'The Page of Cups symbolizes creativity, new emotions, and intuitive insights.',                         img:BASE+'TarotCyberPunkDark/images/CUPS_11.PNG',          deck:'website-3' },
        { name:'Knight of Cups',    description:'The Knight of Cups represents romance, charm, and pursuing the heart\'s desires.',                      img:BASE+'TarotCyberPunkDark/images/CUPS_12.PNG',          deck:'website-3' },
        { name:'Queen of Cups',     description:'The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.',                    img:BASE+'TarotCyberPunkDark/images/CUPS_13.PNG',          deck:'website-3' },
        { name:'King of Cups',      description:'The King of Cups represents emotional balance, leadership, and control over one\'s feelings.',          img:BASE+'TarotCyberPunkDark/images/CUPS_14.PNG',          deck:'website-3' },
        // Swords
        { name:'Ace of Swords',     description:'The Ace of Swords represents clarity, truth, and a breakthrough.',                                      img:BASE+'TarotCyberPunkDark/images/SWORDS_01.PNG',        deck:'website-3' },
        { name:'2 of Swords',       description:'The 2 of Swords symbolizes difficult decisions, stalemate, and balance.',                               img:BASE+'TarotCyberPunkDark/images/SWORDS_02.PNG',        deck:'website-3' },
        { name:'3 of Swords',       description:'The 3 of Swords represents heartbreak, sorrow, and emotional pain.',                                    img:BASE+'TarotCyberPunkDark/images/SWORDS_03.PNG',        deck:'website-3' },
        { name:'4 of Swords',       description:'The 4 of Swords signifies rest, recuperation, and contemplation.',                                      img:BASE+'TarotCyberPunkDark/images/SWORDS_04.PNG',        deck:'website-3' },
        { name:'5 of Swords',       description:'The 5 of Swords represents conflict, defeat, and tension.',                                             img:BASE+'TarotCyberPunkDark/images/SWORDS_05.PNG',        deck:'website-3' },
        { name:'6 of Swords',       description:'The 6 of Swords symbolizes transition, change, and moving on.',                                         img:BASE+'TarotCyberPunkDark/images/SWORDS_06.PNG',        deck:'website-3' },
        { name:'7 of Swords',       description:'The 7 of Swords represents deception, trickery, and strategy.',                                        img:BASE+'TarotCyberPunkDark/images/SWORDS_07.PNG',        deck:'website-3' },
        { name:'8 of Swords',       description:'The 8 of Swords signifies restriction, fear, and feeling trapped.',                                     img:BASE+'TarotCyberPunkDark/images/SWORDS_08.PNG',        deck:'website-3' },
        { name:'9 of Swords',       description:'The 9 of Swords represents anxiety, worry, and nightmares.',                                            img:BASE+'TarotCyberPunkDark/images/SWORDS_09.PNG',        deck:'website-3' },
        { name:'10 of Swords',      description:'The 10 of Swords symbolizes betrayal, defeat, and painful endings.',                                    img:BASE+'TarotCyberPunkDark/images/SWORDS_10.PNG',        deck:'website-3' },
        { name:'Page of Swords',    description:'The Page of Swords represents curiosity, communication, and vigilance.',                                img:BASE+'TarotCyberPunkDark/images/SWORDS_11.PNG',        deck:'website-3' },
        { name:'Knight of Swords',  description:'The Knight of Swords symbolizes action, ambition, and impulsiveness.',                                  img:BASE+'TarotCyberPunkDark/images/SWORDS_12.PNG',        deck:'website-3' },
        { name:'Queen of Swords',   description:'The Queen of Swords represents independence, perceptiveness, and clear thinking.',                      img:BASE+'TarotCyberPunkDark/images/SWORDS_13.PNG',        deck:'website-3' },
        { name:'King of Swords',    description:'The King of Swords symbolizes intellect, authority, and truth.',                                        img:BASE+'TarotCyberPunkDark/images/SWORDS_14.PNG',        deck:'website-3' },
        // Pentacles
        { name:'Ace of Pentacles',  description:'The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.', img:BASE+'TarotCyberPunkDark/images/PENTACLES_01.PNG',     deck:'website-3' },
        { name:'2 of Pentacles',    description:'The 2 of Pentacles symbolizes balance, adaptability, and time management.',                             img:BASE+'TarotCyberPunkDark/images/PENTACLES_02.PNG',     deck:'website-3' },
        { name:'3 of Pentacles',    description:'The 3 of Pentacles represents teamwork, collaboration, and building something together.',               img:BASE+'TarotCyberPunkDark/images/PENTACLES_03.PNG',     deck:'website-3' },
        { name:'4 of Pentacles',    description:'The 4 of Pentacles signifies control, stability, and material security.',                               img:BASE+'TarotCyberPunkDark/images/PENTACLES_04.PNG',     deck:'website-3' },
        { name:'5 of Pentacles',    description:'The 5 of Pentacles represents financial loss, poverty, and feeling isolated.',                          img:BASE+'TarotCyberPunkDark/images/PENTACLES_05.PNG',     deck:'website-3' },
        { name:'6 of Pentacles',    description:'The 6 of Pentacles symbolizes generosity, sharing wealth, and helping others.',                         img:BASE+'TarotCyberPunkDark/images/PENTACLES_06.PNG',     deck:'website-3' },
        { name:'7 of Pentacles',    description:'The 7 of Pentacles represents long-term investment, patience, and reward for hard work.',               img:BASE+'TarotCyberPunkDark/images/PENTACLES_07.PNG',     deck:'website-3' },
        { name:'8 of Pentacles',    description:'The 8 of Pentacles signifies diligence, skill development, and craftsmanship.',                         img:BASE+'TarotCyberPunkDark/images/PENTACLES_08.PNG',     deck:'website-3' },
        { name:'9 of Pentacles',    description:'The 9 of Pentacles represents luxury, self-sufficiency, and financial independence.',                   img:BASE+'TarotCyberPunkDark/images/PENTACLES_09.PNG',     deck:'website-3' },
        { name:'10 of Pentacles',   description:'The 10 of Pentacles symbolizes wealth, legacy, and family traditions.',                                 img:BASE+'TarotCyberPunkDark/images/PENTACLES_10.PNG',     deck:'website-3' },
        { name:'Page of Pentacles', description:'The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.',    img:BASE+'TarotCyberPunkDark/images/PENTACLES_11.PNG',     deck:'website-3' },
        { name:'Knight of Pentacles',description:'The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.',                      img:BASE+'TarotCyberPunkDark/images/PENTACLES_12.PNG',     deck:'website-3' },
        { name:'Queen of Pentacles',description:'The Queen of Pentacles represents nurturing, practicality, and financial security.',                    img:BASE+'TarotCyberPunkDark/images/PENTACLES_13.PNG',     deck:'website-3' },
        { name:'King of Pentacles', description:'The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.',             img:BASE+'TarotCyberPunkDark/images/PENTACLES_14.PNG',     deck:'website-3' },

        // ── WEBSITE 4: OG TRADITIONAL ──
        // Major Arcana
        { name:'The Fool',          description:'The Fool is a card of new beginnings, opportunities, and adventures.',                                  img:BASE+'TarotOG/images/Fool.jpeg',              deck:'website-4' },
        { name:'The Magician',      description:'The Magician represents power, skill, and creativity.',                                                 img:BASE+'TarotOG/images/Magician.jpeg',          deck:'website-4' },
        { name:'The High Priestess',description:'The High Priestess symbolizes intuition, mystery, and inner knowledge.',                               img:BASE+'TarotOG/images/High_Priestess.jpeg',    deck:'website-4' },
        { name:'The Empress',       description:'The Empress represents femininity, beauty, nature, and abundance.',                                     img:BASE+'TarotOG/images/Empress.jpeg',           deck:'website-4' },
        { name:'The Emperor',       description:'The Emperor symbolizes authority, structure, and control.',                                             img:BASE+'TarotOG/images/Emperor.jpeg',           deck:'website-4' },
        { name:'The Hierophant',    description:'The Hierophant stands for tradition, conformity, and spiritual wisdom.',                                img:BASE+'TarotOG/images/Hierophant.jpeg',        deck:'website-4' },
        { name:'The Lovers',        description:'The Lovers card represents love, harmony, and relationships.',                                          img:BASE+'TarotOG/images/Lovers.jpeg',            deck:'website-4' },
        { name:'The Chariot',       description:'The Chariot symbolizes willpower, determination, and success through control.',                         img:BASE+'TarotOG/images/Chariot.jpeg',           deck:'website-4' },
        { name:'Strength',          description:'Strength represents courage, persuasion, and influence.',                                               img:BASE+'TarotOG/images/Strength.jpeg',          deck:'website-4' },
        { name:'The Hermit',        description:'The Hermit symbolizes introspection, solitude, and inner guidance.',                                   img:BASE+'TarotOG/images/Hermit.jpeg',            deck:'website-4' },
        { name:'Wheel of Fortune',  description:'The Wheel of Fortune represents cycles, change, and destiny.',                                          img:BASE+'TarotOG/images/Wheel_of_Fortune.jpeg',  deck:'website-4' },
        { name:'Justice',           description:'Justice stands for fairness, truth, and the law.',                                                      img:BASE+'TarotOG/images/Justice.jpeg',           deck:'website-4' },
        { name:'The Hanged Man',    description:'The Hanged Man represents suspension, letting go, and new perspectives.',                               img:BASE+'TarotOG/images/Hanged_Man.jpeg',        deck:'website-4' },
        { name:'Death',             description:'Death symbolizes transformation, endings, and new beginnings.',                                         img:BASE+'TarotOG/images/Death.jpeg',             deck:'website-4' },
        { name:'Temperance',        description:'Temperance stands for balance, moderation, and patience.',                                              img:BASE+'TarotOG/images/Temperance.jpeg',        deck:'website-4' },
        { name:'The Devil',         description:'The Devil represents bondage, addiction, and materialism.',                                             img:BASE+'TarotOG/images/Devil.jpeg',             deck:'website-4' },
        { name:'The Tower',         description:'The Tower symbolizes sudden upheaval, chaos, and revelation.',                                          img:BASE+'TarotOG/images/Tower.jpeg',             deck:'website-4' },
        { name:'The Star',          description:'The Star represents hope, inspiration, and serenity.',                                                  img:BASE+'TarotOG/images/Star.jpeg',              deck:'website-4' },
        { name:'The Moon',          description:'The Moon symbolizes illusion, fear, and the subconscious mind.',                                        img:BASE+'TarotOG/images/Moon.jpeg',              deck:'website-4' },
        { name:'The Sun',           description:'The Sun stands for positivity, vitality, and success.',                                                 img:BASE+'TarotOG/images/Sun.jpeg',               deck:'website-4' },
        { name:'Judgement',         description:'Judgement represents reflection, reckoning, and awakening.',                                            img:BASE+'TarotOG/images/Judgement.jpeg',         deck:'website-4' },
        { name:'The World',         description:'The World symbolizes completion, achievement, and wholeness.',                                           img:BASE+'TarotOG/images/World.jpeg',             deck:'website-4' },
        // Wands
        { name:'Ace of Wands',      description:'The Ace of Wands represents inspiration, new opportunities, growth, and potential.',                    img:BASE+'TarotOG/images/Ace_of_Wands.jpeg',      deck:'website-4' },
        { name:'2 of Wands',        description:'The 2 of Wands symbolizes future planning, progress, and discovery.',                                   img:BASE+'TarotOG/images/2_of_Wands.jpeg',        deck:'website-4' },
        { name:'3 of Wands',        description:'The 3 of Wands represents expansion, foresight, and long-term plans.',                                  img:BASE+'TarotOG/images/3_of_Wands.jpeg',        deck:'website-4' },
        { name:'4 of Wands',        description:'The 4 of Wands signifies celebration, harmony, and homecoming.',                                        img:BASE+'TarotOG/images/4_of_Wands.jpeg',        deck:'website-4' },
        { name:'5 of Wands',        description:'The 5 of Wands represents conflict, competition, and tension.',                                         img:BASE+'TarotOG/images/5_of_Wands.jpeg',        deck:'website-4' },
        { name:'6 of Wands',        description:'The 6 of Wands symbolizes victory, success, and public recognition.',                                   img:BASE+'TarotOG/images/6_of_Wands.jpeg',        deck:'website-4' },
        { name:'7 of Wands',        description:'The 7 of Wands represents challenge, competition, and perseverance.',                                   img:BASE+'TarotOG/images/7_of_Wands.jpeg',        deck:'website-4' },
        { name:'8 of Wands',        description:'The 8 of Wands signifies speed, action, and swift change.',                                             img:BASE+'TarotOG/images/8_of_Wands.jpeg',        deck:'website-4' },
        { name:'9 of Wands',        description:'The 9 of Wands represents resilience, courage, and persistence.',                                       img:BASE+'TarotOG/images/9_of_Wands.jpeg',        deck:'website-4' },
        { name:'10 of Wands',       description:'The 10 of Wands symbolizes burden, responsibility, and hard work.',                                     img:BASE+'TarotOG/images/10_of_Wands.jpeg',       deck:'website-4' },
        { name:'Page of Wands',     description:'The Page of Wands represents enthusiasm, exploration, and free spirit.',                                img:BASE+'TarotOG/images/Page_of_Wands.jpeg',     deck:'website-4' },
        { name:'Knight of Wands',   description:'The Knight of Wands symbolizes action, adventure, and impulsiveness.',                                  img:BASE+'TarotOG/images/Knight_of_Wands.jpeg',   deck:'website-4' },
        { name:'Queen of Wands',    description:'The Queen of Wands represents confidence, determination, and charisma.',                                img:BASE+'TarotOG/images/Queen_of_Wands.jpeg',    deck:'website-4' },
        { name:'King of Wands',     description:'The King of Wands symbolizes leadership, vision, and entrepreneurship.',                                img:BASE+'TarotOG/images/King_of_Wands.jpeg',     deck:'website-4' },
        // Cups
        { name:'Ace of Cups',       description:'The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.',             img:BASE+'TarotOG/images/Ace_of_Cups.jpeg',       deck:'website-4' },
        { name:'2 of Cups',         description:'The 2 of Cups symbolizes partnership, unity, and mutual attraction.',                                   img:BASE+'TarotOG/images/2_of_Cups.jpeg',         deck:'website-4' },
        { name:'3 of Cups',         description:'The 3 of Cups represents celebration, friendship, and social gatherings.',                              img:BASE+'TarotOG/images/3_of_Cups.jpeg',         deck:'website-4' },
        { name:'4 of Cups',         description:'The 4 of Cups signifies contemplation, reevaluation, and apathy.',                                      img:BASE+'TarotOG/images/4_of_Cups.jpeg',         deck:'website-4' },
        { name:'5 of Cups',         description:'The 5 of Cups represents loss, regret, and focusing on the negative.',                                  img:BASE+'TarotOG/images/5_of_Cups.jpeg',         deck:'website-4' },
        { name:'6 of Cups',         description:'The 6 of Cups symbolizes nostalgia, childhood memories, and innocence.',                                img:BASE+'TarotOG/images/6_of_Cups.jpeg',         deck:'website-4' },
        { name:'7 of Cups',         description:'The 7 of Cups represents choices, illusions, and wishful thinking.',                                    img:BASE+'TarotOG/images/7_of_Cups.jpeg',         deck:'website-4' },
        { name:'8 of Cups',         description:'The 8 of Cups signifies walking away, abandonment, and seeking deeper meaning.',                        img:BASE+'TarotOG/images/8_of_Cups.jpeg',         deck:'website-4' },
        { name:'9 of Cups',         description:'The 9 of Cups symbolizes contentment, satisfaction, and emotional fulfillment.',                        img:BASE+'TarotOG/images/9_of_Cups.jpeg',         deck:'website-4' },
        { name:'10 of Cups',        description:'The 10 of Cups represents happiness, family harmony, and lasting love.',                                img:BASE+'TarotOG/images/10_of_Cups.jpeg',        deck:'website-4' },
        { name:'Page of Cups',      description:'The Page of Cups symbolizes creativity, new emotions, and intuitive insights.',                         img:BASE+'TarotOG/images/Page_of_Cups.jpeg',      deck:'website-4' },
        { name:'Knight of Cups',    description:'The Knight of Cups represents romance, charm, and pursuing the heart\'s desires.',                      img:BASE+'TarotOG/images/Knight_of_Cups.jpeg',    deck:'website-4' },
        { name:'Queen of Cups',     description:'The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.',                    img:BASE+'TarotOG/images/Queen_of_Cups.jpeg',     deck:'website-4' },
        { name:'King of Cups',      description:'The King of Cups represents emotional balance, leadership, and control over one\'s feelings.',          img:BASE+'TarotOG/images/King_of_Cups.jpeg',      deck:'website-4' },
        // Swords
        { name:'Ace of Swords',     description:'The Ace of Swords represents clarity, truth, and a breakthrough.',                                      img:BASE+'TarotOG/images/Ace_of_Swords.jpeg',     deck:'website-4' },
        { name:'2 of Swords',       description:'The 2 of Swords symbolizes difficult decisions, stalemate, and balance.',                               img:BASE+'TarotOG/images/2_of_Swords.jpeg',       deck:'website-4' },
        { name:'3 of Swords',       description:'The 3 of Swords represents heartbreak, sorrow, and emotional pain.',                                    img:BASE+'TarotOG/images/3_of_Swords.jpeg',       deck:'website-4' },
        { name:'4 of Swords',       description:'The 4 of Swords signifies rest, recuperation, and contemplation.',                                      img:BASE+'TarotOG/images/4_of_Swords.jpeg',       deck:'website-4' },
        { name:'5 of Swords',       description:'The 5 of Swords represents conflict, defeat, and tension.',                                             img:BASE+'TarotOG/images/5_of_Swords.jpeg',       deck:'website-4' },
        { name:'6 of Swords',       description:'The 6 of Swords symbolizes transition, change, and moving on.',                                         img:BASE+'TarotOG/images/6_of_Swords.jpeg',       deck:'website-4' },
        { name:'7 of Swords',       description:'The 7 of Swords represents deception, trickery, and strategy.',                                        img:BASE+'TarotOG/images/7_of_Swords.jpeg',       deck:'website-4' },
        { name:'8 of Swords',       description:'The 8 of Swords signifies restriction, fear, and feeling trapped.',                                     img:BASE+'TarotOG/images/8_of_Swords.jpeg',       deck:'website-4' },
        { name:'9 of Swords',       description:'The 9 of Swords represents anxiety, worry, and nightmares.',                                            img:BASE+'TarotOG/images/9_of_Swords.jpeg',       deck:'website-4' },
        { name:'10 of Swords',      description:'The 10 of Swords symbolizes betrayal, defeat, and painful endings.',                                    img:BASE+'TarotOG/images/10_of_Swords.jpeg',      deck:'website-4' },
        { name:'Page of Swords',    description:'The Page of Swords represents curiosity, communication, and vigilance.',                                img:BASE+'TarotOG/images/Page_of_Swords.jpeg',    deck:'website-4' },
        { name:'Knight of Swords',  description:'The Knight of Swords symbolizes action, ambition, and impulsiveness.',                                  img:BASE+'TarotOG/images/Knight_of_Swords.jpeg',  deck:'website-4' },
        { name:'Queen of Swords',   description:'The Queen of Swords represents independence, perceptiveness, and clear thinking.',                      img:BASE+'TarotOG/images/Queen_of_Swords.jpeg',   deck:'website-4' },
        { name:'King of Swords',    description:'The King of Swords symbolizes intellect, authority, and truth.',                                        img:BASE+'TarotOG/images/King_of_Swords.jpeg',    deck:'website-4' },
        // Pentacles
        { name:'Ace of Pentacles',  description:'The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.', img:BASE+'TarotOG/images/Ace_of_Pentacles.jpeg',  deck:'website-4' },
        { name:'2 of Pentacles',    description:'The 2 of Pentacles symbolizes balance, adaptability, and time management.',                             img:BASE+'TarotOG/images/2_of_Pentacles.jpeg',    deck:'website-4' },
        { name:'3 of Pentacles',    description:'The 3 of Pentacles represents teamwork, collaboration, and building something together.',               img:BASE+'TarotOG/images/3_of_Pentacles.jpeg',    deck:'website-4' },
        { name:'4 of Pentacles',    description:'The 4 of Pentacles signifies control, stability, and material security.',                               img:BASE+'TarotOG/images/4_of_Pentacles.jpeg',    deck:'website-4' },
        { name:'5 of Pentacles',    description:'The 5 of Pentacles represents financial loss, poverty, and feeling isolated.',                          img:BASE+'TarotOG/images/5_of_Pentacles.jpeg',    deck:'website-4' },
        { name:'6 of Pentacles',    description:'The 6 of Pentacles symbolizes generosity, sharing wealth, and helping others.',                         img:BASE+'TarotOG/images/6_of_Pentacles.jpeg',    deck:'website-4' },
        { name:'7 of Pentacles',    description:'The 7 of Pentacles represents long-term investment, patience, and reward for hard work.',               img:BASE+'TarotOG/images/7_of_Pentacles.jpeg',    deck:'website-4' },
        { name:'8 of Pentacles',    description:'The 8 of Pentacles signifies diligence, skill development, and craftsmanship.',                         img:BASE+'TarotOG/images/8_of_Pentacles.jpeg',    deck:'website-4' },
        { name:'9 of Pentacles',    description:'The 9 of Pentacles represents luxury, self-sufficiency, and financial independence.',                   img:BASE+'TarotOG/images/9_of_Pentacles.jpeg',    deck:'website-4' },
        { name:'10 of Pentacles',   description:'The 10 of Pentacles symbolizes wealth, legacy, and family traditions.',                                 img:BASE+'TarotOG/images/10_of_Pentacles.jpeg',   deck:'website-4' },
        { name:'Page of Pentacles', description:'The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.',    img:BASE+'TarotOG/images/Page_of_Pentacles.jpeg', deck:'website-4' },
        { name:'Knight of Pentacles',description:'The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.',                      img:BASE+'TarotOG/images/Knight_of_Pentacles.jpeg',deck:'website-4' },
        { name:'Queen of Pentacles',description:'The Queen of Pentacles represents nurturing, practicality, and financial security.',                    img:BASE+'TarotOG/images/Queen_of_Pentacles.jpeg',deck:'website-4' },
        { name:'King of Pentacles', description:'The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.',             img:BASE+'TarotOG/images/King_of_Pentacles.jpeg', deck:'website-4' }
    ];

    /* =============================================
       ANIMATIONS LIST (100+ entries)
       ============================================= */
    var animations = [
        BASE+'DeepRings/index.html',
        BASE+'Artabillies4ThothAnimate/AnarchyAnimation.html',
        BASE+'Artabillies4ThothAnimate/CircledSquareAnimationSVG.html',
        BASE+'Felix/index.html',
        BASE+'Artabillies4ThothAnimate/Artabillliesbumjug.html',
        BASE+'dragon-curve/index.html',
        BASE+'Artabillies4ThothAnimate/logoAnimationCollection.html',
        BASE+'draggable-3d-layered-cube-vanilla-css-js/index.html',
        BASE+'dragon-soaring-through-the-sky-in-pure-css/index.html',
        BASE+'colour-mix/index.html',
        BASE+'crystal-parallax/index.html',
        BASE+'Iching/ichingAnimeLoop.html',
        BASE+'css-only-3d-image-carousel/index.html',
        BASE+'FractalTrees/3TreesAtOnceFractal.html',
        BASE+'FractalTrees/BOTHDIRECTIONSTREES.html',
        BASE+'FractalTrees/BOTHDIRECTIONSTREES2.html',
        BASE+'FractalTrees/BOTHDIRECTIONSTREES2EXTRA.html',
        BASE+'FractalTrees/FORESTFRACTALcolorandTrails.html',
        BASE+'FractalTrees/fractalforest3.html',
        BASE+'FractalTrees/fractaltreemess.html',
        BASE+'FractalTrees/newtreesupdown.html',
        BASE+'FractalTrees/NoTrailsTreeGrowth.html',
        BASE+'Artabillies4ThothAnimate/MobileAnimateSquared.html',
        BASE+'Artabillies4ThothAnimate/PeaceAnimation.html',
        BASE+'FractalTrees/rainbowtreez4.html',
        BASE+'FractalTrees/rainbowtreez2.1.html',
        BASE+'FractalTrees/rainbowtreez5.html',
        BASE+'FractalTrees/rainbowtreez6.html',
        BASE+'FractalTrees/rainbowtreez7.html',
        BASE+'FractalTrees/rainbowtreez8.html',
        BASE+'FractalTrees/rainbowtreez9.html',
        BASE+'FractalTrees/rainbowtreez2.html',
        BASE+'behind-the-fold/index.html',
        BASE+'css-animation-effects/index.html',
        BASE+'css-heartbeat-animation/index.html',
        BASE+'pen-export-xxBBmRr/index.html',
        BASE+'skating-bunny/index.html',
        BASE+'snowflake/index.html',
        BASE+'unity/index.html',
        BASE+'neuro-noise-glsl-shader/index.html',
        BASE+'flower/index.html',
        BASE+'Rainbows4Thoth/index.html',
        BASE+'Rainbows4Thoth/index2.html',
        BASE+'Rainbows4Thoth/index3.html',
        BASE+'Rainbows4Thoth/index4.html',
        BASE+'Rainbows4Thoth/index5.html',
        BASE+'Rainbows4Thoth/index6.html',
        BASE+'Rainbows4Thoth/index7.html',
        BASE+'Rainbows4Thoth/index8.html',
        BASE+'Rainbows4Thoth/index10.html',
        BASE+'Rainbows4Thoth/index11.html',
        BASE+'Rainbows4Thoth/index12.html',
        BASE+'Rainbows4Thoth/index13.html',
        BASE+'Rainbows4Thoth/index14.html',
        BASE+'Rainbows4Thoth/index15.html',
        BASE+'Rainbows4Thoth/index16.html',
        BASE+'Rainbows4Thoth/index17.html',
        BASE+'Rainbows4Thoth/index18.html',
        BASE+'Rainbows4Thoth/index19.html',
        BASE+'Rainbows4Thoth/index20.html',
        BASE+'Rainbows4Thoth/index21.html',
        BASE+'Rainbows4Thoth/index22.html',
        BASE+'Rainbows4Thoth/index23.html',
        BASE+'Rainbows4Thoth/index24.html',
        BASE+'claw-machine/index.html',
        BASE+'spiral/index.html',
        BASE+'RainbowFracGenerator/index.html',
        BASE+'RainbowGenerator/index.html',
        BASE+'psychedelic-waves/index.html',
        BASE+'MajixTarotAll/indexAll.html',
        BASE+'MajixTarotAll/indexMajor.html',
        BASE+'MajixTarotAll/indexCups.html',
        BASE+'MajixTarotAll/indexWands.html',
        BASE+'MajixTarotAll/indexSwords.html',
        BASE+'MajixTarotAll/indexPentacles.html',
        BASE+'Walking/index.html',
        BASE+'Walking/Transparent.html',
        BASE+'webgl-fluid-simulation/index.html',
        BASE+'Mescalito/index.html',
        BASE+'Mescalito/index2.html',
        BASE+'Mescalito/index3.html',
        BASE+'Mescalito/index4.html',
        BASE+'Mescalito/index5.html',
        BASE+'Mescalito/index6.html',
        BASE+'Mescalito/index7.html',
        BASE+'Mescalito/index8.html',
        BASE+'Mescalito/index10.html',
        BASE+'isometric-cubes-css-animation/index.html',
        BASE+'GifTubes/indexConfetti.html',
        BASE+'GifTubes/indexDance.html',
        BASE+'GifTubes/indexFractal.html',
        BASE+'GifTubes/indexMusic.html',
        BASE+'GifTubes/indexWinner.html',
        BASE+'GifLoops/FractalGifLoop.html',
        BASE+'GifLoops/GifLoop1.html',
        BASE+'GifLoops/GifLoop2.html',
        BASE+'GifLoops/GifLoop3.html',
        BASE+'GifLoops/GifLoop4.html',
        BASE+'GifLoops/KillYourTv.html',
        BASE+'GifLoops/KillYourTv2.html',
        BASE+'GifLoops/KillYourTv3.html',
        BASE+'Artabillies4ThothAnimate/POPF4T1.html',
        BASE+'Artabillies4ThothAnimate/POPF4T2.html',
        BASE+'Artabillies4ThothAnimate/POPF4T3.html',
        BASE+'Artabillies4ThothAnimate/POPF4T4.html',
        BASE+'Artabillies4ThothAnimate/POPF4T5.html',
        BASE+'Artabillies4ThothAnimate/POPF4T6.html',
        BASE+'Artabillies4ThothAnimate/POPF4T7.html',
        BASE+'claw-machineAnimate/AllAtOnce.html',
        BASE+'claw-machineAnimate/AnimateIndividualy.html',
        BASE+'claw-machineAnimate/ConfettiLoop.html',
        BASE+'claw-machineAnimate/ConfettiLoopClear.html',
        BASE+'claw-machineAnimate/DanceAnimateOne.html',
        BASE+'Artabillies4ThothAnimate/Moon.html',
        BASE+'Artabillies4ThothAnimate/ARTABILLIESTEXTWRITEOUT.html',
        BASE+'Artabillies4ThothAnimate/Food4ThothTEXTWRITE.html',
        BASE+'Artabillies4ThothAnimate/F4TLOGO4.html',
        BASE+'Artabillies4ThothAnimate/F4TLOGO7.html',
        BASE+'Artabillies4ThothAnimate/F4TLOGO6.html',
        BASE+'Artabillies4ThothAnimate/F4TLOGO5.html',
        BASE+'Artabillies4ThothAnimate/F4T2.html',
        BASE+'not-hopalong/index.html'
    ];

    /* =============================================
       RANDOM WEBSITES LIST (143 entries)
       ============================================= */
    var randomSites = [
        { name:'Food4Thoth',                        url: BASE },
        { name:'Black Business Eugene',             url: BASE+'BlackBuisnessEugene/index.html' },
        { name:'Community Gardens (ALL LIST)',       url: BASE+'CommunityGardensLists/index.html' },
        { name:'Community Gardens (Mobile Landing)',url: BASE+'CommunityGardenLand/index.html' },
        { name:'Community Gardens Map (Eugene)',    url: BASE+'CommunityGardensMaps/indexEugeneMap.html' },
        { name:'Community Gardens Map (Portland)',  url: BASE+'CommunityGardensMaps/indexPortlandMap.html' },
        { name:'Community Gardens (Info)',          url: BASE+'CommunityGardensInfo/index.html' },
        { name:'Community Gardens (List Eugene)',   url: BASE+'CommunityGardensLists/indexEugene.html' },
        { name:'Community Gardens (List Portland)', url: BASE+'CommunityGardensLists/indexPortland.html' },
        { name:'Vocal Visualizer',                  url: BASE+'SoundActivatedVisualizor/index.html' },
        { name:'Sound Visualizer (w/media input)',  url: BASE+'SoundActivatedVisualizor/index.html' },
        { name:'ARP App (No Visual - HighFi)',      url: BASE+'ArpAppNoVisualHighFi/index.html' },
        { name:'ARP App (No Visual - LoFi)',        url: BASE+'ArpAppNoVisualLoFi/index.html' },
        { name:'ARP App (With Visual)',             url: BASE+'ArpAppWithVisual/index.html' },
        { name:'New School Game (Kid Sprite)',      url: BASE+'NewSchoolGameKid/index.html' },
        { name:'New School Game (Wizard Sprite)',   url: BASE+'NewSchoolGameWizard/index.html' },
        { name:'Old School Game (Desktop)',         url: BASE+'OldSchoolGameDesktop/index.html' },
        { name:'Old School Game (Mobile)',          url: BASE+'OldSchoolGameMobile/index.html' },
        { name:'Terminal Transition Game',          url: BASE+'TerminalGameTransition/index.html' },
        { name:'Glo-Calculato Landing',             url: BASE+'GloCalculatoLanding/index.html' },
        { name:'Glo-Calculato Full Sized',          url: BASE+'GloCalculato/index.html' },
        { name:'Donations',                         url: BASE+'Donations/index.html' },
        { name:'Tarot Gallery (4 Decks)',           url: BASE+'TarotTogetherNoAge4Decks/index.html' },
        { name:'Anarchy Collective Contact',        url: BASE+'HakimBey/joinTheMovement.html' },
        { name:'Tarot Gallery (3 Decks)',           url: BASE+'TarotTogetherNoAge/index.html' },
        { name:'Tarot (Sacred Geometry)',           url: BASE+'TarotSacredGeometry/index.html' },
        { name:'Tarot (CyberPunk Dark)',            url: BASE+'TarotCyberPunkDark/index.html' },
        { name:'Tarot (CyberPunk Melo)',            url: BASE+'TarotCyberPunkMelo/index.html' },
        { name:'Tarot (OG w/Voice Commands)',       url: BASE+'TarotOG/index.html' },
        { name:'Tarot Description List',            url: BASE+'TarotTextList/index.html' },
        { name:'I Ching',                           url: BASE+'Iching/index.html' },
        { name:'Hashisheen (All Reviews)',          url: BASE+'EndOfLawHASHISHEEN/AllHashineenReviews.html' },
        { name:'Hashisheen (Full Album Review)',    url: BASE+'EndOfLawHASHISHEEN/FullAlbumReview.html' },
        { name:'Hashisheen (Track 1)',              url: BASE+'EndOfLawHASHISHEEN/index1.html' },
        { name:'Hashisheen (Track 2)',              url: BASE+'EndOfLawHASHISHEEN/index2.html' },
        { name:'Hashisheen (Track 3)',              url: BASE+'EndOfLawHASHISHEEN/index3.html' },
        { name:'Hashisheen (Track 4)',              url: BASE+'EndOfLawHASHISHEEN/index4.html' },
        { name:'Hashisheen (Track 5)',              url: BASE+'EndOfLawHASHISHEEN/index5.html' },
        { name:'Hashisheen (Track 6)',              url: BASE+'EndOfLawHASHISHEEN/index6.html' },
        { name:'Hashisheen (Track 7)',              url: BASE+'EndOfLawHASHISHEEN/index7.html' },
        { name:'Hashisheen (Track 8)',              url: BASE+'EndOfLawHASHISHEEN/index8.html' },
        { name:'Hashisheen (Track 9)',              url: BASE+'EndOfLawHASHISHEEN/index9.html' },
        { name:'Hashisheen (Track 10)',             url: BASE+'EndOfLawHASHISHEEN/index10.html' },
        { name:'Hashisheen (Track 11)',             url: BASE+'EndOfLawHASHISHEEN/index11.html' },
        { name:'Hashisheen (Track 12)',             url: BASE+'EndOfLawHASHISHEEN/index12.html' },
        { name:'Hashisheen (Track 13)',             url: BASE+'EndOfLawHASHISHEEN/index13.html' },
        { name:'Hashisheen (Track 14)',             url: BASE+'EndOfLawHASHISHEEN/index14.html' },
        { name:'Hashisheen (Track 15)',             url: BASE+'EndOfLawHASHISHEEN/index15.html' },
        { name:'Hashisheen (Track 16)',             url: BASE+'EndOfLawHASHISHEEN/index16.html' },
        { name:'Hashisheen (Track 17)',             url: BASE+'EndOfLawHASHISHEEN/index17.html' },
        { name:'Hashisheen (Track 18)',             url: BASE+'EndOfLawHASHISHEEN/index18.html' },
        { name:'Hashisheen (Track 19)',             url: BASE+'EndOfLawHASHISHEEN/index19.html' },
        { name:'Hashisheen (Track 20)',             url: BASE+'EndOfLawHASHISHEEN/index20.html' },
        { name:'Hashisheen (Track 21)',             url: BASE+'EndOfLawHASHISHEEN/index21.html' },
        { name:'Hashisheen (Track 22)',             url: BASE+'EndOfLawHASHISHEEN/index22.html' },
        { name:'Akashic Records',                   url: BASE+'css-only-3d-image-carousel/index.html' },
        { name:'Akashic Asclepius (Deep)',          url: BASE+'AkashicAsclepiusDeep/index.html' },
        { name:'Akashic Asclepius (Lite)',          url: BASE+'AkashicAsclepiusLite/index.html' },
        { name:'Akashic Emerald (As Above)',        url: BASE+'AkashicEmeraldAsAbove/index.html' },
        { name:'Akashic Emerald (Deep)',            url: BASE+'AkashicEmeraldDeep/index.html' },
        { name:'Akashic Emerald (Lite)',            url: BASE+'AkashicEmeraldLite/index.html' },
        { name:'Akashic Hermiticum',                url: BASE+'AkashicHermiticum/index.html' },
        { name:'Akashic Hymn (Lite)',               url: BASE+'AkashicHymnLite/index.html' },
        { name:'Akashic Nag',                       url: BASE+'AkashicNag/index.html' },
        { name:'Akashic Nag (13 Codex)',            url: BASE+'AkashicNag13Codex/index.html' },
        { name:'Akashic Nag (Treaties)',            url: BASE+'AkashicNagTreaties/index.html' },
        { name:'Akashic Thoth (Deep)',              url: BASE+'AkashicThothDeep/index.html' },
        { name:'Akashic Thoth (Lite)',              url: BASE+'AkashicThothLite/index.html' },
        { name:'Anarchy Comic (Break Free)',        url: BASE+'AnarchyComicBreakFree/index.html' },
        { name:'Anarchy Comic (Cocoon)',            url: BASE+'AnarchyComicCocoon/index.html' },
        { name:'Anarchy Depth',                     url: BASE+'AnarchyDepth/index.html' },
        { name:'Anarchy is Always Mobile',          url: BASE+'AnarchyIsAlwaysMobile/index.html' },
        { name:'Anarchy Poetics',                   url: BASE+'AnarchyPoetics/index.html' },
        { name:'Anarchy TAZ',                       url: BASE+'AnarchyTAZ/index.html' },
        { name:'Eye Spy (1st Edition)',             url: BASE+'EyeSPY1/index.html' },
        { name:'Tide Walk (Oregon)',                url: BASE+'TideApp/indexOregon.html' },
        { name:'Tide Walk (Boston)',                url: BASE+'TideApp/indexBoston.html' },
        { name:'Trent of the Day',                  url: BASE+'TrentOfTheDay/index.html' },
        { name:'Trent Storybook',                   url: BASE+'TrentStorybook1stMobile/index.html' },
        { name:'Choose Your Own Adventure',         url: BASE+'ChooseYourOwnAdventure/prologue.html' },
        { name:'Rstory (Artabillies)',              url: BASE+'RstoryArtabillies/index.html' },
        { name:'Collective Summary',                url: BASE+'CollectiveSummary/index.html' },
        { name:'Food4Thoth (External)',             url: 'https://www.food4thoth.com/' },
        { name:'Artabillies (External)',            url: 'https://www.artabillies.com/' },
        { name:'Tide Walk (USA)',                   url: BASE+'TideApp/index.html' },
        { name:'Artabillies Info',                  url: BASE+'Artabillies/index.html' },
        { name:'INPROGRESSION',                     url: BASE+'Inprogression/index.html' },
        { name:'NoWhere Man Looper',                url: BASE+'Bboy/index.html' },
        { name:'BJungle Looper',                    url: BASE+'BJungle/index.html' },
        { name:'LoFi Looper',                       url: BASE+'LoopStation/index.html' },
        { name:'HiFi Looper',                       url: BASE+'LoopStationHiFi/index.html' },
        { name:'EyeSpy Game 2',                     url: BASE+'EyeSPY2/index.html' },
        { name:'EyeSpy Game 3',                     url: BASE+'EyeSPY3/index.html' },
        { name:'Prayer',                            url: BASE+'PrayerForLove/index.html' },
        { name:'Prayer Thanks',                     url: BASE+'PrayerThanks/index.html' },
        { name:'Prayer Childrens Still',            url: BASE+'PrayerChildrensStill/index.html' },
        { name:'Prayer Childrens Fade',             url: BASE+'PrayerChildrensFade/index.html' },
        { name:'Prayer Childrens Flip',             url: BASE+'PrayerChildrensFlip/index.html' },
        { name:'Mescalito',                         url: BASE+'Mescalito/Reveal1.html' },
        { name:'Mescalito2',                        url: BASE+'Mescalito/Reveal2.html' },
        { name:'Mescalito List',                    url: BASE+'Mescalito/ListReveal.html' },
        { name:'Tarot Orientation Landing',         url: BASE+'TarotLanding/index.html' },
        { name:'How To: Tarot',                     url: BASE+'TarotLanding/HowTo.html' },
        { name:'Quick Reference Flip Gallery',      url: BASE+'TarotFlipCardGallery/index.html' },
        { name:'Celtic Cross Reading',              url: BASE+'CelticCrossTarot/index.html' },
        { name:'Three-Card Tarot w/ Gallery',       url: BASE+'ThreeCardTarot/index.html' },
        { name:'Three-Card Tarot Reading',          url: BASE+'ThreeCardTarotByItself/index.html' },
        { name:'Custom Egyptian Major Arcana',      url: BASE+'EgyptianTarot/index.html' },
        { name:'Custom Sacred Geometry (1-78)',     url: BASE+'EgyptianTarotFull/index.html' },
        { name:'Jungian Thoth Tarot Spread',        url: BASE+'TarotJungian/index.html' },
        { name:'All Spreads',                       url: BASE+'DrawTarot/index.html' },
        { name:'Majix Galleries Landing',           url: BASE+'MajixLanding/index.html' },
        { name:'Majix Major Arcana',                url: BASE+'MajixTarotMajor/index.html' },
        { name:'Majix Wands',                       url: BASE+'MajixTarotWands/index.html' },
        { name:'Majix Cups',                        url: BASE+'MajixTarotCups/index.html' },
        { name:'Majix Swords',                      url: BASE+'MajixTarotSwords/index.html' },
        { name:'Majix Pentacles',                   url: BASE+'MajixTarotPentacles/index.html' },
        { name:'Majix All Cards',                   url: BASE+'MajixTarotAll/index.html' },
        { name:'Explore All Galleries',             url: BASE+'TarotGalleries/index.html' },
        { name:'All Resources',                     url: BASE+'TarotAllResources/index.html' },
        { name:'Hakim Bey',                         url: BASE+'HakimBey/index2.html' },
        { name:'Claw Machine',                      url: BASE+'claw-machine/index.html' },
        { name:'Claw Machine Enhanced',             url: BASE+'claw-machineGame/index.html' },
        { name:'Draw w/Fractals',                   url: BASE+'DrawingFractals/index.html' },
        { name:'I Ching Fractal',                   url: BASE+'IchingFractal/index.html' },
        { name:'I Ching Photo',                     url: BASE+'IchingPhoto/index.html' },
        { name:'MindMelt',                          url: BASE+'MindMelt/index.html' },
        { name:'Rainbow Fractal Generator',         url: BASE+'RainbowFracGenerator/index.html' },
        { name:'3D Rainbow Generator',              url: BASE+'RainbowGenerator/index.html' },
        { name:'Rainbow Recordings',                url: BASE+'RainbowGathering/index.html' },
        { name:'Rainbow Reveal1',                   url: BASE+'Rainbows4Thoth/Reveal1.html' },
        { name:'Rainbow Reveal2',                   url: BASE+'Rainbows4Thoth/Reveal2.html' },
        { name:'Rainbow Reveal List',               url: BASE+'Rainbows4Thoth/ListReveal.html' },
        { name:'Thanks Giving',                     url: BASE+'Haudenosaunee/index.html' },
        { name:'Bergs of Life',                     url: BASE+'bergs-of-life/index.html' },
        { name:'DeJahns Music',                     url: BASE+'DeJahn/index.html' },
        { name:'Ground Cherry',                     url: BASE+'GroundCherry/index.html' },
        { name:'Peruvian Melt',                     url: BASE+'PeruvianMelt/index.html' },
        { name:'Seeker and the Star',               url: BASE+'SeekerStar/index.html' }
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
       BUTTON 1: PULL A CARD
       ============================================= */
    var btnCard = $('#btn-pull-card');
    if (btnCard) {
        btnCard.addEventListener('click', function () {
            var card = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
            var deck = deckInfo[card.deck] || { name: 'Tarot', url: BASE + 'TarotLanding/' };

            var popup = document.getElementById('cardPopup');
            if (!popup) return;

            popup.querySelector('.popup-content').innerHTML =
                '<button class="close-btn" aria-label="Close">&times;</button>' +
                '<div class="tarot-card-display">' +
                    '<img src="' + card.img + '" alt="' + card.name + '" class="tarot-card-image" ' +
                        'onerror="this.style.display=\'none\'" />' +
                    '<div class="tarot-card-inner">' +
                        '<div class="tarot-card-name">' + card.name + '</div>' +
                        '<div class="tarot-card-divider"></div>' +
                        '<div class="tarot-card-meaning">' + card.description + '</div>' +
                    '</div>' +
                    '<div style="text-align:center;margin-top:16px;display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">' +
                        '<a href="' + deck.url + '" target="_blank" rel="noopener" class="neumorphic-button" style="padding:8px 20px;font-size:0.9rem;">Visit ' + deck.name + '</a>' +
                        '<a href="' + BASE + 'TarotLanding/" target="_blank" rel="noopener" class="neumorphic-button" style="padding:8px 20px;font-size:0.9rem;">All Tarot Tools</a>' +
                    '</div>' +
                '</div>';

            var newClose = popup.querySelector('.close-btn');
            if (newClose) newClose.addEventListener('click', closeAllPopups);

            openPopup('cardPopup');
        });
    }

    /* =============================================
       BUTTON 2: ANIMATE — random animation in iframe popup
       ============================================= */
    var btnAnimate = $('#btn-animate');
    if (btnAnimate) {
        btnAnimate.addEventListener('click', function () {
            var url    = animations[Math.floor(Math.random() * animations.length)];
            var popup  = document.getElementById('animationPopup');
            var iframe = document.getElementById('animationIframe');
            if (!popup || !iframe) {
                window.open(url, '_blank', 'noopener,noreferrer');
                return;
            }

            iframe.removeAttribute('loading');
            iframe.src = url;

            var extLink = popup.querySelector('.popup-ext-link');
            if (extLink) extLink.href = url;

            openPopup('animationPopup');
        });
    }

    /* =============================================
       BUTTON 3: RANDOM — random site in iframe popup
       ============================================= */
    var btnRandom = $('#btn-random');
    if (btnRandom) {
        btnRandom.addEventListener('click', function () {
            var idx    = Math.floor(Math.random() * randomSites.length);
            var site   = randomSites[idx];
            var popup  = document.getElementById('randomPopup');
            var iframe = document.getElementById('randomIframe');
            if (!popup || !iframe) {
                window.open(site.url, '_blank', 'noopener,noreferrer');
                return;
            }

            iframe.removeAttribute('loading');
            iframe.src = site.url;

            var extLink = popup.querySelector('.popup-ext-link');
            if (extLink) {
                extLink.href = site.url;
                extLink.textContent = 'Explore ' + site.name + ' ↗';
            }

            openPopup('randomPopup');
        });
    }

})();
