 /***********************************************
     * 1) CARD OF THE DAY
     ***********************************************/
    // 1. Find today's day of year (1-365, or 366 in leap years).
    var today = new Date();
    // Start of this year (Jan 1)
    var startOfYear = new Date(today.getFullYear(), 0, 1);
    // Time difference in ms
    var diffInMs = today - startOfYear;
    // Convert ms to full days (integer)
    var dayOfYear = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 1;

    // 2. Pick a card index from 0 to 77 using modulo
    //    dayOfYear % 78 cycles 1->1, 2->2, ... 78->0, 79->1, etc.
    var pick = dayOfYear % 78;

    // 3. Show only that one card
    //    (Assumes each card's container is ".tarot { display: none }" in CSS)
    $('#card' + pick).show();

    /***********************************************
     * 2) HOROSCOPE DATA & SELECT
     ***********************************************/
    var horoscopes = {
  "aries":"Much of your focus today will be on personal possessions and material goods in general, Aries. Think about what you can do to improve your home. Make your physical surroundings comfortable and inviting. Spend time alone in your sanctuary where you can center and concentrate on the big picture. Physical comfort and beauty will translate into emotional security.", 
  
  "aquarius":"Today is a very expansive day for you, Aquarius. Long-term projects are coming into focus. There's a huge windfall coming your way. Your ego should experience an extra boost and your relationships should go extremely well. This would be a great time to attend to your financial investments and think about putting money into real estate or remodeling your home.", 
  
  "cancer":"This is a great day to go to thrift stores, Cancer. Your eye for beauty is keen and your radar for good deals is sharp. Lady Luck is with you and you may score some terrific buys. Concentrate on beautiful objects for your home that adorn your life. One person's trash is another's treasure. See how creative you can be with making old items into treasures.",
  
  "capricorn": "If you plan on arguing for a cause today, make sure you have solid facts to back up your statements, Capricorn. People aren't likely to fall for things too easily. It will take a great deal to change someone's mind about something. It's a great day for you to take a walk through the woods. Get back to the Earth. Try to bring some greenery into your living space.",
  
  "gemini": "Be gentle and reserved in your approach, Gemini. There's a great deal of tenderness in the air that you should tune into and enjoy. Do things to improve your home. Make amends with the people you live with and clear the air so that relations will be calm in the future. You have a great deal of yourself invested in making your home a sanctuary, so respect and nourish it.",
  
  "leo": "Things that have been building for a long time suddenly come to a head today, Leo. Strong, slow-moving trends rear their ugly heads. There's a great deal of opposition now making itself known in your life. Try not to lose yourself in the situation. See this as an opportunity to gain perspective and bring balance to the roller coaster that is your emotional life.",
  
  "libra": "Check your stocks today, Libra. Read the latest investment news and assess your finances. Figure out the best place to put your hard-earned money. Do some serious long-term planning to make sure your home and family are secure. Take a reserved, stable approach in all your dealings with others, and spend a comfortable evening at home with someone you love.",
  
  
  "pisces": "Connect with people on a deep level, Pisces. Much of your focus is on emotional security. Make sure your home is a sanctuary where you feel comfortable being exactly who you are. Demonstrate patience and understanding through your words and actions. The more solid and steady you are, the more you will do and the more you will connect with the people around you.",
  
  "sagittarius": "Put some roots down today, Sagittarius. Concentrate on a creative project that you've had in your head for a while. It's time to follow through. Ideas are great, but implementation is the key to making them work. Consolidate your resources and take the time to make a plan. The more patient you are in plotting your actions today, the more successful you will be in seeing them through to completion.",
  
  "scorpio": "There may be something or someone trying to slow you down today, Scorpio. Maybe this is a sign that it's what you need to do. Don't fight the urge to sit on the couch and do nothing. Take this day to soak in a hot bath and recharge your spirit. Your personal possessions and security are of great importance now. Indulge in the good things that life has to offer.",
  
  "taurus": "Dependability and stability are key aspects of today, Taurus. Take action that will prove to others that these parts of your nature are fully functional. Other people may be stubborn and not easily moved. You will have to fight to get your viewpoint across. You may need to get out the bulldozer. Maintain tenderness in all your relations with others.",
  
  "virgo": "It may be difficult to get moving today, Virgo. You may want to just stay in bed. Don't feel guilty about it. Take an afternoon nap and enjoy the tender company of a partner. Stick close to home and enjoy good music and a fine meal with someone you love. Don't rock the boat. Simply relax and enjoy the pleasures life has to offer.",
};

    $('#pick-horoscope').on("change", function() {
      var selectedSign = $(this).val();
      $('.horodesc').html(horoscopes[selectedSign]);
    });

    /***********************************************
     * 3) REPLACE CARD TEXT/IMAGES FROM cardData
     ***********************************************/
     const cardData = [
      { id: 0, name: "The Fool", description: "The Fool is a card of new beginnings, opportunities, and adventures.", imagePath: "./images/FOOL.PNG", fileName: "./full_descriptions/1_0TheFoolMajorArcana.txt" },
    { id: 1, name: "The Magician", description: "The Magician represents power, skill, and creativity.", imagePath: "./images/MAGICIAN.PNG", fileName: "./full_descriptions/2_1TheMagicianMajorArcana.txt" },
    { id: 2, name: "The High Priestess", description: "The High Priestess symbolizes intuition, mystery, and inner knowledge.", imagePath: "./images/HIGHPRIESTESS.PNG", fileName: "./full_descriptions/3_2TheHighPriestessMajorArcana.txt" },
    { id: 3, name: "The Empress", description: "The Empress represents femininity, beauty, nature, and abundance.", imagePath: "./images/EMPRESS.PNG", fileName: "./full_descriptions/4_3TheEmpressMajorArcana.txt" },
    { id: 4, name: "The Emperor", description: "The Emperor symbolizes authority, structure, and control.", imagePath: "./images/EMPEROR.PNG", fileName: "./full_descriptions/5_4TheEmperorMajorArcana.txt" },
    { id: 5, name: "The Hierophant", description: "The Hierophant stands for tradition, conformity, and spiritual wisdom.", imagePath: "./images/HIEROPHANT.PNG", fileName: "./full_descriptions/6_5TheHierophantMajorArcana.txt" },
    { id: 6, name: "The Lovers", description: "The Lovers card represents love, harmony, and relationships.", imagePath: "./images/LOVERS.PNG", fileName: "./full_descriptions/7_6TheLoversMajorArcana.txt" },
    { id: 7, name: "The Chariot", description: "The Chariot symbolizes willpower, determination, and success through control.", imagePath: "./images/CHARIOT.PNG", fileName: "./full_descriptions/8_7TheChariotMajorArcana.txt" },
    { id: 8, name: "Strength", description: "Strength represents courage, persuasion, and influence.", imagePath: "./images/STRENGTH.PNG", fileName: "./full_descriptions/9_8StrengthMajorArcana.txt" },
    { id: 9, name: "The Hermit", description: "The Hermit symbolizes introspection, solitude, and inner guidance.", imagePath: "./images/HERMIT.PNG", fileName: "./full_descriptions/10_9TheHermitMajorArcana.txt" },
    { id: 10, name: "Wheel of Fortune", description: "The Wheel of Fortune represents cycles, change, and destiny.", imagePath: "./images/WHEEL_OF_FORTUNE.PNG", fileName: "./full_descriptions/11_10TheWheelofFortuneMajorArcana.txt" },
    { id: 11, name: "Justice", description: "Justice stands for fairness, truth, and the law.", imagePath: "./images/JUSTICE.PNG", fileName: "./full_descriptions/12_11JusticeMajorArcana.txt" },
    { id: 12, name: "The Hanged Man", description: "The Hanged Man represents suspension, letting go, and new perspectives.", imagePath: "./images/HANGEDMAN.PNG", fileName: "./full_descriptions/13_12TheHangedManMajorArcana.txt" },
    { id: 13, name: "Death", description: "Death symbolizes transformation, endings, and new beginnings.", imagePath: "./images/DEATH.PNG", fileName: "./full_descriptions/14_13DeathMajorArcana.txt" },
    { id: 14, name: "Temperance", description: "Temperance stands for balance, moderation, and patience.", imagePath: "./images/TEMPERANCE.PNG", fileName: "./full_descriptions/15_14TemperanceMajorArcana.txt" },
    { id: 15, name: "The Devil", description: "The Devil represents bondage, addiction, and materialism.", imagePath: "./images/DEVIL.PNG", fileName: "./full_descriptions/16_15TheDevilMajorArcana.txt" },
    { id: 16, name: "The Tower", description: "The Tower symbolizes sudden upheaval, chaos, and revelation.", imagePath: "./images/TOWER.PNG", fileName: "./full_descriptions/17_16TheTowerMajorArcana.txt" },
    { id: 17, name: "The Star", description: "The Star represents hope, inspiration, and serenity.", imagePath: "./images/STAR.PNG", fileName: "./full_descriptions/18_17TheStarMajorArcana.txt" },
    { id: 18, name: "The Moon", description: "The Moon symbolizes illusion, fear, and the subconscious mind.", imagePath: "./images/MOON.PNG", fileName: "./full_descriptions/19_18TheMoonMajorArcana.txt" },
    { id: 19, name: "The Sun", description: "The Sun stands for positivity, vitality, and success.", imagePath: "./images/SUN.PNG", fileName: "./full_descriptions/20_19TheSunMajorArcana.txt" },
    { id: 20, name: "Judgement", description: "Judgement represents reflection, reckoning, and awakening.", imagePath: "./images/JUDGEMENT.PNG", fileName: "./full_descriptions/21_20JudgementMajorArcana.txt" },
    { id: 21, name: "The World", description: "The World symbolizes completion, achievement, and wholeness.", imagePath: "./images/WORLD.PNG", fileName: "./full_descriptions/22_21TheWorldMajorArcana.txt" },

    // Wands cards
    { id: 22, name: "Ace of Wands", description: "The Ace of Wands represents inspiration, new opportunities, growth, and potential.", imagePath: "./images/ACEWANDS.PNG", fileName: "./full_descriptions/23_1AceofWandsMinorArcana.txt" },
    { id: 23, name: "2 of Wands", description: "The 2 (Two) of Wands symbolizes future planning, progress, and discovery.", imagePath: "./images/2WANDS.PNG", fileName: "./full_descriptions/24_2ofWandsMinorArcana.txt" },
    { id: 24, name: "3 of Wands", description: "The 3 (Three) of Wands represents expansion, foresight, and long-term plans.", imagePath: "./images/3WANDS.PNG", fileName: "./full_descriptions/25_3ofWandsMinorArcana.txt" },
    { id: 25, name: "4 of Wands", description: "The 4 (Four) of Wands signifies celebration, harmony, and homecoming.", imagePath: "./images/4WANDS.PNG", fileName: "./full_descriptions/26_4ofWandsMinorArcana.txt" },
    { id: 26, name: "5 of Wands", description: "The 5 (Five) of Wands represents conflict, competition, and tension.", imagePath: "./images/5WANDS.PNG", fileName: "./full_descriptions/27_5ofWandsMinorArcana.txt" },
    { id: 27, name: "6 of Wands", description: "The 6 (Six) of Wands symbolizes victory, success, and public recognition.", imagePath: "./images/6WANDS.PNG", fileName: "./full_descriptions/28_6ofWandsMinorArcana.txt" },
    { id: 28, name: "7 of Wands", description: "The 7 (Seven) of Wands represents challenge, competition, and perseverance.", imagePath: "./images/7WANDS.PNG", fileName: "./full_descriptions/29_7ofWandsMinorArcana.txt" },
    { id: 29, name: "8 of Wands", description: "The 8 (Eight) of Wands signifies speed, action, and swift change.", imagePath: "./images/8WANDS.PNG", fileName: "./full_descriptions/30_8ofWandsMinorArcana.txt" },
    { id: 30, name: "9 of Wands", description: "The 9 (Nine) of Wands represents resilience, courage, and persistence.", imagePath: "./images/9WANDS.PNG", fileName: "./full_descriptions/31_9ofWandsMinorArcana.txt" },
    { id: 31, name: "10 of Wands", description: "The 10 (Ten) of Wands symbolizes burden, responsibility, and hard work.", imagePath: "./images/10WANDS.PNG", fileName: "./full_descriptions/32_10ofWandsMinorArcana.txt" },
    { id: 32, name: "Page of Wands", description: "The Page of Wands represents enthusiasm, exploration, and free spirit.", imagePath: "./images/PAGEWANDS.PNG", fileName: "./full_descriptions/33_11PageofWandsMinorArcana.txt" },
    { id: 33, name: "Knight of Wands", description: "The Knight of Wands symbolizes action, adventure, and impulsiveness.", imagePath: "./images/KNIGHTWANDS.PNG", fileName: "./full_descriptions/34_12KnightofWandsMinorArcana.txt" },
    { id: 34, name: "Queen of Wands", description: "The Queen of Wands represents confidence, determination, and charisma.", imagePath: "./images/QUEENWANDS.PNG", fileName: "./full_descriptions/35_13QueenofWandsMinorArcana.txt" },
    { id: 35, name: "King of Wands", description: "The King of Wands symbolizes leadership, vision, and entrepreneurship.", imagePath: "./images/KINGWANDS.PNG", fileName: "./full_descriptions/36_14KingofWandsMinorArcana.txt" },

    // Cups cards
    { id: 36, name: "Ace of Cups", description: "The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.", imagePath: "./images/ACECUPS.PNG", fileName: "./full_descriptions/37_1AceofCupsMinorArcana.txt" },
    { id: 37, name: "2 of Cups", description: "The 2 (Two) of Cups symbolizes partnership, unity, and mutual attraction.", imagePath: "./images/2CUPS.PNG", fileName: "./full_descriptions/38_2ofCupsMinorArcana.txt" },
    { id: 38, name: "3 of Cups", description: "The 3 (Three) of Cups represents celebration, friendship, and social gatherings.", imagePath: "./images/3CUPS.PNG", fileName: "./full_descriptions/39_3ofCupsMinorArcana.txt" },
    { id: 39, name: "4 of Cups", description: "The 4 (Four) of Cups signifies contemplation, reevaluation, and apathy.", imagePath: "./images/4CUPS.PNG", fileName: "./full_descriptions/40_4ofCupsMinorArcana.txt" },
    { id: 40, name: "5 of Cups", description: "The 5 (Five) of Cups represents loss, regret, and focusing on the negative.", imagePath: "./images/5CUPS.PNG", fileName: "./full_descriptions/41_5ofCupsMinorArcana.txt" },
    { id: 41, name: "6 of Cups", description: "The 6 (Six) of Cups symbolizes nostalgia, childhood memories, and innocence.", imagePath: "./images/6CUPS.PNG", fileName: "./full_descriptions/42_6ofCupsMinorArcana.txt" },
    { id: 42, name: "7 of Cups", description: "The 7 (Seven) of Cups represents choices, illusions, and wishful thinking.", imagePath: "./images/7CUPS.PNG", fileName: "./full_descriptions/43_7ofCupsMinorArcana.txt" },
    { id: 43, name: "8 of Cups", description: "The 8 (Eight) of Cups signifies walking away, abandonment, and seeking deeper meaning.", imagePath: "./images/8CUPS.PNG", fileName: "./full_descriptions/44_8ofCupsMinorArcana.txt" },
    { id: 44, name: "9 of Cups", description: "The 9 (Nine) of Cups symbolizes contentment, satisfaction, and emotional fulfillment.", imagePath: "./images/9CUPS.PNG", fileName: "./full_descriptions/45_9ofCupsMinorArcana.txt" },
    { id: 45, name: "10 of Cups", description: "The 10 (Ten) of Cups represents happiness, family harmony, and lasting love.", imagePath: "./images/10CUPS.PNG", fileName: "./full_descriptions/46_10ofCupsMinorArcana.txt" },
    { id: 46, name: "Page of Cups", description: "The Page of Cups symbolizes creativity, new emotions, and intuitive insights.", imagePath: "./images/PAGECUPS.PNG", fileName: "./full_descriptions/47_11PageofCupsMinorArcana.txt" },
    { id: 47, name: "Knight of Cups", description: "The Knight of Cups represents romance, charm, and pursuing the heart's desires.", imagePath: "./images/KNIGHTCUPS.PNG", fileName: "./full_descriptions/48_12KnightofCupsMinorArcana.txt" },
    { id: 48, name: "Queen of Cups", description: "The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.", imagePath: "./images/QUEENCUPS.PNG", fileName: "./full_descriptions/49_13QueenofCupsMinorArcana.txt" },
    { id: 49, name: "King of Cups", description: "The King of Cups represents emotional balance, leadership, and control over one's feelings.", imagePath: "./images/KINGCUPS.PNG", fileName: "./full_descriptions/50_14KingofCupsMinorArcana.txt" },

    // Swords cards
    { id: 50, name: "Ace of Swords", description: "The Ace of Swords represents clarity, truth, and a breakthrough.", imagePath: "./images/ACESWORDS.PNG", fileName: "./full_descriptions/51_1AceofSwordsMinorArcana.txt" },
    { id: 51, name: "2 of Swords", description: "The 2 (Two) of Swords symbolizes difficult decisions, stalemate, and balance.", imagePath: "./images/2SWORDS.PNG", fileName: "./full_descriptions/52_2ofSwordsMinorArcana.txt" },
    { id: 52, name: "3 of Swords", description: "The 3 (Three) of Swords represents heartbreak, sorrow, and emotional pain.", imagePath: "./images/3SWORDS.PNG", fileName: "./full_descriptions/53_3ofSwordsMinorArcana.txt" },
    { id: 53, name: "4 of Swords", description: "The 4 (Four) of Swords signifies rest, recuperation, and contemplation.", imagePath: "./images/4SWORDS.PNG", fileName: "./full_descriptions/54_4ofSwordsMinorArcana.txt" },
    { id: 54, name: "5 of Swords", description: "The 5 (Five) of Swords represents conflict, defeat, and tension.", imagePath: "./images/5SWORDS.PNG", fileName: "./full_descriptions/55_5ofSwordsMinorArcana.txt" },
    { id: 55, name: "6 of Swords", description: "The 6 (Six) of Swords symbolizes transition, change, and moving on.", imagePath: "./images/6SWORDS.PNG", fileName: "./full_descriptions/56_6ofSwordsMinorArcana.txt" },
    { id: 56, name: "7 of Swords", description: "The 7 (Seven) of Swords represents deception, trickery, and strategy.", imagePath: "./images/7SWORDS.PNG", fileName: "./full_descriptions/57_7ofSwordsMinorArcana.txt" },
    { id: 57, name: "8 of Swords", description: "The 8 (Eight) of Swords signifies restriction, fear, and feeling trapped.", imagePath: "./images/8SWORDS.PNG", fileName: "./full_descriptions/58_8ofSwordsMinorArcana.txt" },
    { id: 58, name: "9 of Swords", description: "The 9 (Nine) of Swords represents anxiety, worry, and nightmares.", imagePath: "./images/9SWORDS.PNG", fileName: "./full_descriptions/59_9ofSwordsMinorArcana.txt" },
    { id: 59, name: "10 of Swords", description: "The 10 (Ten) of Swords symbolizes betrayal, defeat, and painful endings.", imagePath: "./images/10SWORDS.PNG", fileName: "./full_descriptions/60_10ofSwordsMinorArcana.txt" },
    { id: 60, name: "Page of Swords", description: "The Page of Swords represents curiosity, communication, and vigilance.", imagePath: "./images/PAGESWORDS.PNG", fileName: "./full_descriptions/61_11PageofSwordsMinorArcana.txt" },
    { id: 61, name: "Knight of Swords", description: "The Knight of Swords symbolizes action, ambition, and impulsiveness.", imagePath: "./images/KNIGHTSWORDS.PNG", fileName: "./full_descriptions/62_12KnightofSwordsMinorArcana.txt" },
    { id: 62, name: "Queen of Swords", description: "The Queen of Swords represents independence, perceptiveness, and clear thinking.", imagePath: "./images/QUEENSWORDS.PNG", fileName: "./full_descriptions/63_13QueenofSwordsMinorArcana.txt" },
    { id: 63, name: "King of Swords", description: "The King of Swords symbolizes intellect, authority, and truth.", imagePath: "./images/KINGSWORDS.PNG", fileName: "./full_descriptions/64_14KingofSwordsMinorArcana.txt" },

    // Pentacles cards
    { id: 64, name: "Ace of Pentacles", description: "The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.", imagePath: "./images/ACEPENTACLES.PNG", fileName: "./full_descriptions/65_1AceofPentaclesMinorArcana.txt" },
    { id: 65, name: "2 of Pentacles", description: "The 2 (Two) of Pentacles symbolizes balance, adaptability, and time management.", imagePath: "./images/2PENTACLES.PNG", fileName: "./full_descriptions/66_2ofPentaclesMinorArcana.txt" },
    { id: 66, name: "3 of Pentacles", description: "The 3 (Three) of Pentacles represents teamwork, collaboration, and building something together.", imagePath: "./images/3PENTACLES.PNG", fileName: "./full_descriptions/67_3ofPentaclesMinorArcana.txt" },
    { id: 67, name: "4 of Pentacles", description: "The 4 (Four) of Pentacles signifies control, stability, and material security.", imagePath: "./images/4PENTACLES.PNG", fileName: "./full_descriptions/68_4ofPentaclesMinorArcana.txt" },
    { id: 68, name: "5 of Pentacles", description: "The 5 (Five) of Pentacles represents financial loss, poverty, and feeling isolated.", imagePath: "./images/5PENTACLES.PNG", fileName: "./full_descriptions/69_5ofPentaclesMinorArcana.txt" },
    { id: 69, name: "6 of Pentacles", description: "The 6 (Six) of Pentacles symbolizes generosity, sharing wealth, and helping others.", imagePath: "./images/6PENTACLES.PNG", fileName: "./full_descriptions/70_6ofPentaclesMinorArcana.txt" },
    { id: 70, name: "7 of Pentacles", description: "The 7 (Seven) of Pentacles represents long-term investment, patience, and reward for hard work.", imagePath: "./images/7PENTACLES.PNG", fileName: "./full_descriptions/71_7ofPentaclesMinorArcana.txt" },
    { id: 71, name: "8 of Pentacles", description: "The 8 (Eight) of Pentacles signifies diligence, skill development, and craftsmanship.", imagePath: "./images/8PENTACLES.PNG", fileName: "./full_descriptions/72_8ofPentaclesMinorArcana.txt" },
    { id: 72, name: "9 of Pentacles", description: "The 9 (Nine) of Pentacles represents luxury, self-sufficiency, and financial independence.", imagePath: "./images/9PENTACLES.PNG", fileName: "./full_descriptions/73_9ofPentaclesMinorArcana.txt" },
    { id: 73, name: "10 of Pentacles", description: "The 10 (Ten) of Pentacles symbolizes wealth, legacy, and family traditions.", imagePath: "./images/10PENTACLES.PNG", fileName: "./full_descriptions/74_10ofPentaclesMinorArcana.txt" },
    { id: 74, name: "Page of Pentacles", description: "The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.", imagePath: "./images/PAGEPENTACLES.PNG", fileName: "./full_descriptions/75_11PageofPentaclesMinorArcana.txt" },
    { id: 75, name: "Knight of Pentacles", description: "The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.", imagePath: "./images/KNIGHTPENTACLES.PNG", fileName: "./full_descriptions/76_12KnightofPentaclesMinorArcana.txt" },
    { id: 76, name: "Queen of Pentacles", description: "The Queen of Pentacles represents nurturing, practicality, and financial security.", imagePath: "./images/QUEENPENTACLES.PNG", fileName: "./full_descriptions/77_13QueenofPentaclesMinorArcana.txt" },
    { id: 77, name: "King of Pentacles", description: "The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.", imagePath: "./images/KINGPENTACLES.PNG", fileName: "./full_descriptions/78_14KingofPentaclesMinorArcana.txt" }
  // Continue filling the rest of the card data here...
];

    // Loop through .tarot divs and replace text/images
    const tarotCards = document.querySelectorAll('.tarot');
    tarotCards.forEach((cardElement, index) => {
      // 'index' = 0..21 for the first 22 divs
      const card = cardData[index]; // If you have enough data
      if (card) {
        const imgElement = cardElement.querySelector('.codimg');
        const nameElement = cardElement.querySelector('.codname');
        const descElement = cardElement.querySelector('.coddesc ul');

        imgElement.src = card.imagePath;
        imgElement.alt = `Card ${card.id} - ${card.name}`;
        nameElement.textContent = `Card ${card.id} - ${card.name}`;
        descElement.innerHTML = `<li>${card.description}</li>`;
      }
    });
  