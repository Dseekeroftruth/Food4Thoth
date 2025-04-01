

const tarotCards = [
    // Website 1
    { id: 1, name: "The Fool", description: "The Fool is a card of new beginnings, opportunities, and adventures.", imagePath: "../TarotSacredGeometry/images/FOOL.PNG", fileName: "./full_descriptions/1_0TheFoolMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 2, name: "The Magician", description: "The Magician represents power, skill, and creativity.", imagePath: "../TarotSacredGeometry/images/MAGICIAN.PNG", fileName: "./full_descriptions/2_1TheMagicianMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 3, name: "The High Priestess", description: "The High Priestess symbolizes intuition, mystery, and inner knowledge.", imagePath: "../TarotSacredGeometry/images/HIGHPRIESTESS.PNG", fileName: "./full_descriptions/3_2TheHighPriestessMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 4, name: "The Empress", description: "The Empress represents femininity, beauty, nature, and abundance.", imagePath: "../TarotSacredGeometry/images/EMPRESS.PNG", fileName: "./full_descriptions/4_3TheEmperessMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 5, name: "The Emperor", description: "The Emperor symbolizes authority, structure, and control.", imagePath: "../TarotSacredGeometry/images/EMPEROR.PNG", fileName: "./full_descriptions/5_4TheEmperorMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 6, name: "The Hierophant", description: "The Hierophant stands for tradition, conformity, and spiritual wisdom.", imagePath: "../TarotSacredGeometry/images/HIEROPHANT.PNG", fileName: "./full_descriptions/6_5TheHierophantMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 7, name: "The Lovers", description: "The Lovers card represents love, harmony, and relationships.", imagePath: "../TarotSacredGeometry/images/LOVERS.PNG", fileName: "./full_descriptions/7_6TheLoversMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 8, name: "The Chariot", description: "The Chariot symbolizes willpower, determination, and success through control.", imagePath: "../TarotSacredGeometry/images/CHARIOT.PNG", fileName: "./full_descriptions/8_7TheChariotMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 9, name: "Strength", description: "Strength represents courage, persuasion, and influence.", imagePath: "../TarotSacredGeometry/images/STRENGTH.PNG", fileName: "./full_descriptions/9_8StrengthMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 10, name: "The Hermit", description: "The Hermit symbolizes introspection, solitude, and inner guidance.", imagePath: "../TarotSacredGeometry/images/HERMIT.PNG", fileName: "./full_descriptions/10_9TheHermitMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 11, name: "Wheel of Fortune", description: "The Wheel of Fortune represents cycles, change, and destiny.", imagePath: "../TarotSacredGeometry/images/WHEEL_OF_FORTUNE.PNG", fileName: "./full_descriptions/11_10TheWheelofFortuneMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 12, name: "Justice", description: "Justice stands for fairness, truth, and the law.", imagePath: "../TarotSacredGeometry/images/JUSTICE.PNG", fileName: "./full_descriptions/12_11JusticeMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 13, name: "The Hanged Man", description: "The Hanged Man represents suspension, letting go, and new perspectives.", imagePath: "../TarotSacredGeometry/images/HANGEDMAN.PNG", fileName: "./full_descriptions/13_12TheHangedManMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 14, name: "Death", description: "Death symbolizes transformation, endings, and new beginnings.", imagePath: "../TarotSacredGeometry/images/DEATH.PNG", fileName: "./full_descriptions/14_13DeathMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 15, name: "Temperance", description: "Temperance stands for balance, moderation, and patience.", imagePath: "../TarotSacredGeometry/images/TEMPERANCE.PNG", fileName: "./full_descriptions/15_14TemperanceMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 16, name: "The Devil", description: "The Devil represents bondage, addiction, and materialism.", imagePath: "../TarotSacredGeometry/images/DEVIL.PNG", fileName: "./full_descriptions/16_15TheDevilMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 17, name: "The Tower", description: "The Tower symbolizes sudden upheaval, chaos, and revelation.", imagePath: "../TarotSacredGeometry/images/TOWER.PNG", fileName: "./full_descriptions/17_16TheTowerMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 18, name: "The Star", description: "The Star represents hope, inspiration, and serenity.", imagePath: "../TarotSacredGeometry/images/STAR.PNG", fileName: "./full_descriptions/18_17TheStarMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 19, name: "The Moon", description: "The Moon symbolizes illusion, fear, and the subconscious mind.", imagePath: "../TarotSacredGeometry/images/MOON.PNG", fileName: "./full_descriptions/19_18TheMoonMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 20, name: "The Sun", description: "The Sun stands for positivity, vitality, and success.", imagePath: "../TarotSacredGeometry/images/SUN.PNG", fileName: "./full_descriptions/20_19TheSunMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 21, name: "Judgement", description: "Judgement represents reflection, reckoning, and awakening.", imagePath: "../TarotSacredGeometry/images/JUDGEMENT.PNG", fileName: "./full_descriptions/21_20JudgementMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 22, name: "The World", description: "The World symbolizes completion, achievement, and wholeness.", imagePath: "../TarotSacredGeometry/images/WORLD.PNG", fileName: "./full_descriptions/22_21TheWorldMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },

    // Wands cards
    { id: 23, name: "Ace of Wands", description: "The Ace of Wands represents inspiration, new opportunities, growth, and potential.", imagePath: "../TarotSacredGeometry/images/ACEWANDS.PNG", fileName: "./full_descriptions/23_1AceofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 24, name: "2 of Wands", description: "The 2 (Two) of Wands symbolizes future planning, progress, and discovery.", imagePath: "../TarotSacredGeometry/images/2WANDS.PNG", fileName: "./full_descriptions/24_2ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 25, name: "3 of Wands", description: "The 3 (Three) of Wands represents expansion, foresight, and long-term plans.", imagePath: "../TarotSacredGeometry/images/3WANDS.PNG", fileName: "./full_descriptions/25_3ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 26, name: "4 of Wands", description: "The 4 (Four) of Wands signifies celebration, harmony, and homecoming.", imagePath: "../TarotSacredGeometry/images/4WANDS.PNG", fileName: "./full_descriptions/26_4ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 27, name: "5 of Wands", description: "The 5 (Five) of Wands represents conflict, competition, and tension.", imagePath: "../TarotSacredGeometry/images/5WANDS.PNG", fileName: ".full_descriptions/27_5ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 28, name: "6 of Wands", description: "The 6 (Six) of Wands symbolizes victory, success, and public recognition.", imagePath: "../TarotSacredGeometry/images/6WANDS.PNG", fileName: "./full_descriptions/28_6ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 29, name: "7 of Wands", description: "The 7 (Seven) of Wands represents challenge, competition, and perseverance.", imagePath: "../TarotSacredGeometry/images/7WANDS.PNG", fileName: "./full_descriptions/29_7ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 30, name: "8 of Wands", description: "The 8 (Eight) of Wands signifies speed, action, and swift change.", imagePath: "../TarotSacredGeometry/images/8WANDS.PNG", fileName: "./full_descriptions/30_8ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 31, name: "9 of Wands", description: "The 9 (Nine) of Wands represents resilience, courage, and persistence.", imagePath: "../TarotSacredGeometry/images/9WANDS.PNG", fileName: "./full_descriptions/31_9ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 32, name: "10 of Wands", description: "The 10 (Ten) of Wands symbolizes burden, responsibility, and hard work.", imagePath: "../TarotSacredGeometry/images/10WANDS.PNG", fileName: "./full_descriptions/32_10ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 33, name: "Page of Wands", description: "The Page of Wands represents enthusiasm, exploration, and free spirit.", imagePath: "../TarotSacredGeometry/images/PAGEWANDS.PNG", fileName: "./full_descriptions/33_11PageofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 34, name: "Knight of Wands", description: "The Knight of Wands symbolizes action, adventure, and impulsiveness.", imagePath: "../TarotSacredGeometry/images/KNIGHTWANDS.PNG", fileName: "./full_descriptions/34_12KnightofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 35, name: "Queen of Wands", description: "The Queen of Wands represents confidence, determination, and charisma.", imagePath: "../TarotSacredGeometry/images/QUEENWANDS.PNG", fileName: "./full_descriptions/35_13QueenofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 36, name: "King of Wands", description: "The King of Wands symbolizes leadership, vision, and entrepreneurship.", imagePath: "../TarotSacredGeometry/images/KINGWANDS.PNG", fileName: "./full_descriptions/36_14KingofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },

    // Cups cards
    { id: 37, name: "Ace of Cups", description: "The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.", imagePath: "../TarotSacredGeometry/images/ACECUPS.PNG", fileName: "./full_descriptions/37_1AceofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 38, name: "2 of Cups", description: "The 2 (Two) of Cups symbolizes partnership, unity, and mutual attraction.", imagePath: "../TarotSacredGeometry/images/2CUPS.PNG", fileName: "./full_descriptions/38_2ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 39, name: "3 of Cups", description: "The 3 (Three) of Cups represents celebration, friendship, and social gatherings.", imagePath: "../TarotSacredGeometry/images/3CUPS.PNG", fileName: "./full_descriptions/39_3ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 40, name: "4 of Cups", description: "The 4 (Four) of Cups signifies contemplation, reevaluation, and apathy.", imagePath: "../TarotSacredGeometry/images/4CUPS.PNG", fileName: "./full_descriptions/40_4ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 41, name: "5 of Cups", description: "The 5 (Five) of Cups represents loss, regret, and focusing on the negative.", imagePath: "../TarotSacredGeometry/images/5CUPS.PNG", fileName: "./full_descriptions/41_5ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 42, name: "6 of Cups", description: "The 6 (Six) of Cups symbolizes nostalgia, childhood memories, and innocence.", imagePath: "../TarotSacredGeometry/images/6CUPS.PNG", fileName: "./full_descriptions/42_6ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 43, name: "7 of Cups", description: "The 7 (Seven) of Cups represents choices, illusions, and wishful thinking.", imagePath: "../TarotSacredGeometry/images/7CUPS.PNG", fileName: "./full_descriptions/43_7ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 44, name: "8 of Cups", description: "The 8 (Eight) of Cups signifies walking away, abandonment, and seeking deeper meaning.", imagePath: "../TarotSacredGeometry/images/8CUPS.PNG", fileName: "./full_descriptions/44_8ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 45, name: "9 of Cups", description: "The 9 (Nine) of Cups symbolizes contentment, satisfaction, and emotional fulfillment.", imagePath: "../TarotSacredGeometry/images/9CUPS.PNG", fileName: "./full_descriptions/45_9ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 46, name: "10 of Cups", description: "The 10 (Ten) of Cups represents happiness, family harmony, and lasting love.", imagePath: "../TarotSacredGeometry/images/10CUPS.PNG", fileName: "./full_descriptions/46_10ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 47, name: "Page of Cups", description: "The Page of Cups symbolizes creativity, new emotions, and intuitive insights.", imagePath: "../TarotSacredGeometry/images/PAGECUPS.PNG", fileName: "./full_descriptions/47_11PageofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 48, name: "Knight of Cups", description: "The Knight of Cups represents romance, charm, and pursuing the heart's desires.", imagePath: "../TarotSacredGeometry/images/KNIGHTCUPS.PNG", fileName: "./full_descriptions/48_12KnightofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 49, name: "Queen of Cups", description: "The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.", imagePath: "../TarotSacredGeometry/images/QUEENCUPS.PNG", fileName: "./full_descriptions/49_13QueenofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 50, name: "King of Cups", description: "The King of Cups represents emotional balance, leadership, and control over one's feelings.", imagePath: "../TarotSacredGeometry/images/KINGCUPS.PNG", fileName: "./full_descriptions/50_14KingofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },

    // Swords cards
    { id: 51, name: "Ace of Swords", description: "The Ace of Swords represents clarity, truth, and a breakthrough.", imagePath: "../TarotSacredGeometry/images/ACESWORDS.PNG", fileName: "./full_descriptions/51_1AceofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 52, name: "2 of Swords", description: "The 2 (Two) of Swords symbolizes difficult decisions, stalemate, and balance.", imagePath: "../TarotSacredGeometry/images/2SWORDS.PNG", fileName: "./full_descriptions/52_2ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 53, name: "3 of Swords", description: "The 3 (Three) of Swords represents heartbreak, sorrow, and emotional pain.", imagePath: "../TarotSacredGeometry/images/3SWORDS.PNG", fileName: "./full_descriptions/53_3ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 54, name: "4 of Swords", description: "The 4 (Four) of Swords signifies rest, recuperation, and contemplation.", imagePath: "../TarotSacredGeometry/images/4SWORDS.PNG", fileName: "./full_descriptions/54_4ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 55, name: "5 of Swords", description: "The 5 (Five) of Swords represents conflict, defeat, and tension.", imagePath: "../TarotSacredGeometry/images/5SWORDS.PNG", fileName: "./full_descriptions/55_5ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 56, name: "6 of Swords", description: "The 6 (Six) of Swords symbolizes transition, change, and moving on.", imagePath: "../TarotSacredGeometry/images/6SWORDS.PNG", fileName: "./full_descriptions/56_6ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 57, name: "7 of Swords", description: "The 7 (Seven) of Swords represents deception, trickery, and strategy.", imagePath: "../TarotSacredGeometry/images/7SWORDS.PNG", fileName: "./full_descriptions/57_7ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 58, name: "8 of Swords", description: "The 8 (Eight) of Swords signifies restriction, fear, and feeling trapped.", imagePath: "../TarotSacredGeometry/images/8SWORDS.PNG", fileName: "./full_descriptions/58_8ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 59, name: "9 of Swords", description: "The 9 (Nine) of Swords represents anxiety, worry, and nightmares.", imagePath: "../TarotSacredGeometry/images/9SWORDS.PNG", fileName: "./full_descriptions/59_9ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 60, name: "10 of Swords", description: "The 10 (Ten) of Swords symbolizes betrayal, defeat, and painful endings.", imagePath: "../TarotSacredGeometry/images/10SWORDS.PNG", fileName: "./full_descriptions/60_10ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 61, name: "Page of Swords", description: "The Page of Swords represents curiosity, communication, and vigilance.", imagePath: "../TarotSacredGeometry/images/PAGESWORDS.PNG", fileName: "./full_descriptions/61_11PageofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 62, name: "Knight of Swords", description: "The Knight of Swords symbolizes action, ambition, and impulsiveness.", imagePath: "../TarotSacredGeometry/images/KNIGHTSWORDS.PNG", fileName: "./full_descriptions/62_12KnightofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 63, name: "Queen of Swords", description: "The Queen of Swords represents independence, perceptiveness, and clear thinking.", imagePath: "../TarotSacredGeometry/images/QUEENSWORDS.PNG", fileName: "./full_descriptions/63_13QueenofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 64, name: "King of Swords", description: "The King of Swords symbolizes intellect, authority, and truth.", imagePath: "../TarotSacredGeometry/images/KINGSWORDS.PNG", fileName: "./full_descriptions/64_14KingofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },

    // Pentacles cards
    { id: 65, name: "Ace of Pentacles", description: "The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.", imagePath: "../TarotSacredGeometry/images/ACEPENTACLES.PNG", fileName: "./full_descriptions/65_1AceofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 66, name: "2 of Pentacles", description: "The 2 (Two) of Pentacles symbolizes balance, adaptability, and time management.", imagePath: "../TarotSacredGeometry/images/2PENTACLES.PNG", fileName: "./full_descriptions/66_2ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 67, name: "3 of Pentacles", description: "The 3 (Three) of Pentacles represents teamwork, collaboration, and building something together.", imagePath: "../TarotSacredGeometry/images/3PENTACLES.PNG", fileName: "./full_descriptions/67_3ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 68, name: "4 of Pentacles", description: "The 4 (Four) of Pentacles signifies control, stability, and material security.", imagePath: "../TarotSacredGeometry/images/4PENTACLES.PNG", fileName: "./full_descriptions/68_4ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 69, name: "5 of Pentacles", description: "The 5 (Five) of Pentacles represents financial loss, poverty, and feeling isolated.", imagePath: "../TarotSacredGeometry/images/5PENTACLES.PNG", fileName: "./full_descriptions/69_5ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 70, name: "6 of Pentacles", description: "The 6 (Six) of Pentacles symbolizes generosity, sharing wealth, and helping others.", imagePath: "../TarotSacredGeometry/images/6PENTACLES.PNG", fileName: "./full_descriptions/70_6ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 71, name: "7 of Pentacles", description: "The 7 (Seven) of Pentacles represents long-term investment, patience, and reward for hard work.", imagePath: "../TarotSacredGeometry/images/7PENTACLES.PNG", fileName: "./full_descriptions/71_7ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 72, name: "8 of Pentacles", description: "The 8 (Eight) of Pentacles signifies diligence, skill development, and craftsmanship.", imagePath: "../TarotSacredGeometry/images/8PENTACLES.PNG", fileName: "./full_descriptions/72_8ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 73, name: "9 of Pentacles", description: "The 9 (Nine) of Pentacles represents luxury, self-sufficiency, and financial independence.", imagePath: "../TarotSacredGeometry/images/9PENTACLES.PNG", fileName: "./full_descriptions/73_9ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 74, name: "10 of Pentacles", description: "The 10 (Ten) of Pentacles symbolizes wealth, legacy, and family traditions.", imagePath: "../TarotSacredGeometry/images/10PENTACLES.PNG", fileName: "./full_descriptions/74_10ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 75, name: "Page of Pentacles", description: "The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.", imagePath: "../TarotSacredGeometry/images/PAGEPENTACLES.PNG", fileName: "./full_descriptions/75_11PageofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 76, name: "Knight of Pentacles", description: "The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.", imagePath: "../TarotSacredGeometry/images/KNIGHTPENTACLES.PNG", fileName: "./full_descriptions/76_12KnightofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 77, name: "Queen of Pentacles", description: "The Queen of Pentacles represents nurturing, practicality, and financial security.", imagePath: "../TarotSacredGeometry/images/QUEENPENTACLES.PNG", fileName: "./full_descriptions/77_13QueenofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 78, name: "King of Pentacles", description: "The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.", imagePath: "../TarotSacredGeometry/images/KINGPENTACLES.PNG", fileName: "./full_descriptions/78_14KingofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
				
		 // Website 2
		{ id: 1, name: "The Fool", description: "The Fool is a card of new beginnings, opportunities, and adventures.", imagePath: "../TarotCyberPunkMelo/images/00_FOOL.PNG", fileName: "./full_descriptions/1_0TheFoolMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 2, name: "The Magician", description: "The Magician represents power, skill, and creativity.", imagePath: "../TarotCyberPunkMelo/images/01_MAGICIAN.PNG", fileName: "./full_descriptions/2_1TheMagicianMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 3, name: "The High Priestess", description: "The High Priestess symbolizes intuition, mystery, and inner knowledge.", imagePath: "../TarotCyberPunkMelo/images/02_HIGHPRIESTESS.PNG", fileName: "./full_descriptions/3_2TheHighPriestessMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 4, name: "The Empress", description: "The Empress represents femininity, beauty, nature, and abundance.", imagePath: "../TarotCyberPunkMelo/images/03_EMPRESS.PNG", fileName: "./full_descriptions/4_3TheEmpressMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 5, name: "The Emperor", description: "The Emperor symbolizes authority, structure, and control.", imagePath: "../TarotCyberPunkMelo/images/04_EMPEROR.PNG", fileName: "./full_descriptions/5_4TheEmperorMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 6, name: "The Hierophant", description: "The Hierophant stands for tradition, conformity, and spiritual wisdom.", imagePath: "../TarotCyberPunkMelo/images/05_HIEROPHANT.PNG", fileName: "./full_descriptions/6_5TheHierophantMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 7, name: "The Lovers", description: "The Lovers card represents love, harmony, and relationships.", imagePath: "../TarotCyberPunkMelo/images/06_LOVERS.PNG", fileName: "./full_descriptions/7_6TheLoversMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 8, name: "The Chariot", description: "The Chariot symbolizes willpower, determination, and success through control.", imagePath: "../TarotCyberPunkMelo/images/07_CHARIOT.PNG", fileName: "./full_descriptions/8_7TheChariotMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 9, name: "Strength", description: "Strength represents courage, persuasion, and influence.", imagePath: "../TarotCyberPunkMelo/images/08_STRENGTH.PNG", fileName: "./full_descriptions/9_8StrengthMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 10, name: "The Hermit", description: "The Hermit symbolizes introspection, solitude, and inner guidance.", imagePath: "../TarotCyberPunkMelo/images/09_HERMIT.PNG", fileName: "./full_descriptions/10_9TheHermitMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 11, name: "Wheel of Fortune", description: "The Wheel of Fortune represents cycles, change, and destiny.", imagePath: "../TarotCyberPunkMelo/images/10_WHEEL_OF_FORTUNE.PNG", fileName: "./full_descriptions/11_10TheWheelOfFortuneMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 12, name: "Justice", description: "Justice stands for fairness, truth, and the law.", imagePath: "../TarotCyberPunkMelo/images/11_JUSTICE.PNG", fileName: "./full_descriptions/12_11JusticeMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 13, name: "The Hanged Man", description: "The Hanged Man represents suspension, letting go, and new perspectives.", imagePath: "../TarotCyberPunkMelo/images/12_HANGEDMAN.PNG", fileName: "./full_descriptions/13_12TheHangedManMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 14, name: "Death", description: "Death symbolizes transformation, endings, and new beginnings.", imagePath: "../TarotCyberPunkMelo/images/13_DEATH.PNG", fileName: "./full_descriptions/14_13DeathMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 15, name: "Temperance", description: "Temperance stands for balance, moderation, and patience.", imagePath: "../TarotCyberPunkMelo/images/14_TEMPERANCE.PNG", fileName: "./full_descriptions/15_14TemperanceMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 16, name: "The Devil", description: "The Devil represents bondage, addiction, and materialism.", imagePath: "../TarotCyberPunkMelo/images/15_DEVIL.PNG", fileName: "./full_descriptions/16_15TheDevilMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 17, name: "The Tower", description: "The Tower symbolizes sudden upheaval, chaos, and revelation.", imagePath: "../TarotCyberPunkMelo/images/16_TOWER.PNG", fileName: "./full_descriptions/17_16TheTowerMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 18, name: "The Star", description: "The Star represents hope, inspiration, and serenity.", imagePath: "../TarotCyberPunkMelo/images/17_STAR.PNG", fileName: "./full_descriptions/18_17TheStarMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 19, name: "The Moon", description: "The Moon symbolizes illusion, fear, and the subconscious mind.", imagePath: "../TarotCyberPunkMelo/images/18_MOON.PNG", fileName: "./full_descriptions/19_18TheMoonMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 20, name: "The Sun", description: "The Sun stands for positivity, vitality, and success.", imagePath: "../TarotCyberPunkMelo/images/19_SUN.PNG", fileName: "./full_descriptions/20_19TheSunMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 21, name: "Judgement", description: "Judgement represents reflection, reckoning, and awakening.", imagePath: "../TarotCyberPunkMelo/images/20_JUDGEMENT.PNG", fileName: "./full_descriptions/21_20JudgementMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 22, name: "The World", description: "The World symbolizes completion, achievement, and wholeness.", imagePath: "../TarotCyberPunkMelo/images/21_WORLD.PNG", fileName: "./full_descriptions/22_21TheWorldMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },

    // Wands cards
    { id: 23, name: "Ace of Wands", description: "The Ace of Wands represents inspiration, new opportunities, growth, and potential.", imagePath: "../TarotCyberPunkMelo/images/WANDS_01.PNG", fileName: "./full_descriptions/23_1AceofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 24, name: "2 of Wands", description: "The 2 (Two) of Wands symbolizes future planning, progress, and discovery.", imagePath: "../TarotCyberPunkMelo/images/WANDS_02.PNG", fileName: "./full_descriptions/24_2ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 25, name: "3 of Wands", description: "The 3 (Three) of Wands represents expansion, foresight, and long-term plans.", imagePath: "../TarotCyberPunkMelo/images/WANDS_03.PNG", fileName: "./full_descriptions/25_3ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 26, name: "4 of Wands", description: "The 4 (Four) of Wands signifies celebration, harmony, and homecoming.", imagePath: "../TarotCyberPunkMelo/images/WANDS_04.PNG", fileName: "./full_descriptions/26_4ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 27, name: "5 of Wands", description: "The 5 (Five) of Wands represents conflict, competition, and tension.", imagePath: "../TarotCyberPunkMelo/images/WANDS_05.PNG", fileName: "./full_descriptions/27_5ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 28, name: "6 of Wands", description: "The 6 (Six) of Wands symbolizes victory, success, and public recognition.", imagePath: "../TarotCyberPunkMelo/images/WANDS_06.PNG", fileName: "./full_descriptions/28_6ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 29, name: "7 of Wands", description: "The 7 (Seven) of Wands represents challenge, competition, and perseverance.", imagePath: "../TarotCyberPunkMelo/images/WANDS_07.PNG", fileName: "./full_descriptions/29_7ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 30, name: "8 of Wands", description: "The 8 (Eight) of Wands signifies speed, action, and swift change.", imagePath: "../TarotCyberPunkMelo/images/WANDS_08.PNG", fileName: "./full_descriptions/30_8ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 31, name: "9 of Wands", description: "The 9 (Nine) of Wands represents resilience, courage, and persistence.", imagePath: "../TarotCyberPunkMelo/images/WANDS_09.PNG", fileName: "./full_descriptions/31_9ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 32, name: "10 of Wands", description: "The 10 (Ten) of Wands symbolizes burden, responsibility, and hard work.", imagePath: "../TarotCyberPunkMelo/images/WANDS_10.PNG", fileName: "./full_descriptions/32_10ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 33, name: "Page of Wands", description: "The Page of Wands represents enthusiasm, exploration, and free spirit.", imagePath: "../TarotCyberPunkMelo/images/WANDS_11.PNG", fileName: "./full_descriptions/33_11PageofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 34, name: "Knight of Wands", description: "The Knight of Wands symbolizes action, adventure, and impulsiveness.", imagePath: "../TarotCyberPunkMelo/images/WANDS_12.PNG", fileName: "./full_descriptions/34_12KnightofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 35, name: "Queen of Wands", description: "The Queen of Wands represents confidence, determination, and charisma.", imagePath: "../TarotCyberPunkMelo/images/WANDS_13.PNG", fileName: "./full_descriptions/35_13QueenofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 36, name: "King of Wands", description: "The King of Wands symbolizes leadership, vision, and entrepreneurship.", imagePath: "../TarotCyberPunkMelo/images/WANDS_14.PNG", fileName: "./full_descriptions/36_14KingofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },

    // Cups cards
    { id: 37, name: "Ace of Cups", description: "The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.", imagePath: "../TarotCyberPunkMelo/images/CUPS_01.PNG", fileName: "./full_descriptions/37_1AceofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 38, name: "2 of Cups", description: "The 2 (Two) of Cups symbolizes partnership, unity, and mutual attraction.", imagePath: "../TarotCyberPunkMelo/images/CUPS_02.PNG", fileName: "./full_descriptions/38_2ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 39, name: "3 of Cups", description: "The 3 (Three) of Cups represents celebration, friendship, and social gatherings.", imagePath: "../TarotCyberPunkMelo/images/CUPS_03.PNG", fileName: "./full_descriptions/39_3ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 40, name: "4 of Cups", description: "The 4 (Four) of Cups signifies contemplation, reevaluation, and apathy.", imagePath: "../TarotCyberPunkMelo/images/CUPS_04.PNG", fileName: "./full_descriptions/40_4ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 41, name: "5 of Cups", description: "The 5 (Five) of Cups represents loss, regret, and focusing on the negative.", imagePath: "../TarotCyberPunkMelo/images/CUPS_05.PNG", fileName: "./full_descriptions/41_5ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 42, name: "6 of Cups", description: "The 6 (Six) of Cups symbolizes nostalgia, childhood memories, and innocence.", imagePath: "../TarotCyberPunkMelo/images/CUPS_06.PNG", fileName: "./full_descriptions/42_6ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 43, name: "7 of Cups", description: "The 7 (Seven) of Cups represents choices, illusions, and wishful thinking.", imagePath: "../TarotCyberPunkMelo/images/CUPS_07.PNG", fileName: "./full_descriptions/43_7ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 44, name: "8 of Cups", description: "The 8 (Eight) of Cups signifies walking away, abandonment, and seeking deeper meaning.", imagePath: "../TarotCyberPunkMelo/images/CUPS_08.PNG", fileName: "./full_descriptions/44_8ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 45, name: "9 of Cups", description: "The 9 (Nine) of Cups symbolizes contentment, satisfaction, and emotional fulfillment.", imagePath: "../TarotCyberPunkMelo/images/CUPS_09.PNG", fileName: "./full_descriptions/45_9ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 46, name: "10 of Cups", description: "The 10 (Ten) of Cups represents happiness, family harmony, and lasting love.", imagePath: "../TarotCyberPunkMelo/images/CUPS_10.PNG", fileName: "./full_descriptions/46_10ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 47, name: "Page of Cups", description: "The Page of Cups symbolizes creativity, new emotions, and intuitive insights.", imagePath: "../TarotCyberPunkMelo/images/CUPS_11.PNG", fileName: "./full_descriptions/47_11PageofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 48, name: "Knight of Cups", description: "The Knight of Cups represents romance, charm, and pursuing the heart's desires.", imagePath: "../TarotCyberPunkMelo/images/CUPS_12.PNG", fileName: "./full_descriptions/48_12KnightofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 49, name: "Queen of Cups", description: "The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.", imagePath: "../TarotCyberPunkMelo/images/CUPS_13.PNG", fileName: "./full_descriptions/49_13QueenofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 50, name: "King of Cups", description: "The King of Cups represents emotional balance, leadership, and control over one's feelings.", imagePath: "../TarotCyberPunkMelo/images/CUPS_14.PNG", fileName: "./full_descriptions/50_14KingofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },

    // Swords cards
    { id: 51, name: "Ace of Swords", description: "The Ace of Swords represents clarity, truth, and a breakthrough.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_01.PNG", fileName: "./full_descriptions/51_1AceofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 52, name: "2 of Swords", description: "The 2 (Two) of Swords symbolizes difficult decisions, stalemate, and balance.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_02.PNG", fileName: "./full_descriptions/52_2ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 53, name: "3 of Swords", description: "The 3 (Three) of Swords represents heartbreak, sorrow, and emotional pain.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_03.PNG", fileName: "./full_descriptions/53_3ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 54, name: "4 of Swords", description: "The 4 (Four) of Swords signifies rest, recuperation, and contemplation.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_04.PNG", fileName: "./full_descriptions/54_4ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 55, name: "5 of Swords", description: "The 5 (Five) of Swords represents conflict, defeat, and tension.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_05.PNG", fileName: "./full_descriptions/55_5ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 56, name: "6 of Swords", description: "The 6 (Six) of Swords symbolizes transition, change, and moving on.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_06.PNG", fileName: "./full_descriptions/56_6ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 57, name: "7 of Swords", description: "The 7 (Seven) of Swords represents deception, trickery, and strategy.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_07.PNG", fileName: "./full_descriptions/57_7ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 58, name: "8 of Swords", description: "The 8 (Eight) of Swords signifies restriction, fear, and feeling trapped.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_08.PNG", fileName: "./full_descriptions/58_8ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 59, name: "9 of Swords", description: "The 9 (Nine) of Swords represents anxiety, worry, and nightmares.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_09.PNG", fileName: "./full_descriptions/59_9ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 60, name: "10 of Swords", description: "The 10 (Ten) of Swords symbolizes betrayal, defeat, and painful endings.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_10.PNG", fileName: "./full_descriptions/60_10ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 61, name: "Page of Swords", description: "The Page of Swords represents curiosity, communication, and vigilance.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_11.PNG", fileName: "./full_descriptions/61_11PageofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 62, name: "Knight of Swords", description: "The Knight of Swords symbolizes action, ambition, and impulsiveness.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_12.PNG", fileName: "./full_descriptions/62_12KnightofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 63, name: "Queen of Swords", description: "The Queen of Swords represents independence, perceptiveness, and clear thinking.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_13.PNG", fileName: "./full_descriptions/63_13QueenofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 64, name: "King of Swords", description: "The King of Swords symbolizes intellect, authority, and truth.", imagePath: "../TarotCyberPunkMelo/images/SWORDS_14.PNG", fileName: "./full_descriptions/64_14KingofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },

    // Pentacles cards
    { id: 65, name: "Ace of Pentacles", description: "The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_01.PNG", fileName: "./full_descriptions/65_1AceofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 66, name: "2 of Pentacles", description: "The 2 (Two) of Pentacles symbolizes balance, adaptability, and time management.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_02.PNG", fileName: "./full_descriptions/66_2ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 67, name: "3 of Pentacles", description: "The 3 (Three) of Pentacles represents teamwork, collaboration, and building something together.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_03.PNG", fileName: "./full_descriptions/67_3ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 68, name: "4 of Pentacles", description: "The 4 (Four) of Pentacles signifies control, stability, and material security.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_04.PNG", fileName: "./full_descriptions/68_4ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 69, name: "5 of Pentacles", description: "The 5 (Five) of Pentacles represents financial loss, poverty, and feeling isolated.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_05.PNG", fileName: "./full_descriptions/69_5ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 70, name: "6 of Pentacles", description: "The 6 (Six) of Pentacles symbolizes generosity, sharing wealth, and helping others.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_06.PNG", fileName: "./full_descriptions/70_6ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 71, name: "7 of Pentacles", description: "The 7 (Seven) of Pentacles represents long-term investment, patience, and reward for hard work.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_07.PNG", fileName: "./full_descriptions/71_7ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 72, name: "8 of Pentacles", description: "The 8 (Eight) of Pentacles signifies diligence, skill development, and craftsmanship.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_08.PNG", fileName: "./full_descriptions/72_8ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 73, name: "9 of Pentacles", description: "The 9 (Nine) of Pentacles represents luxury, self-sufficiency, and financial independence.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_09.PNG", fileName: "./full_descriptions/73_9ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 74, name: "10 of Pentacles", description: "The 10 (Ten) of Pentacles symbolizes wealth, legacy, and family traditions.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_10.PNG", fileName: "./full_descriptions/74_10ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 75, name: "Page of Pentacles", description: "The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_11.PNG", fileName: "./full_descriptions/75_11PageofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 76, name: "Knight of Pentacles", description: "The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_12.PNG", fileName: "./full_descriptions/76_12KnightofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 77, name: "Queen of Pentacles", description: "The Queen of Pentacles represents nurturing, practicality, and financial security.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_13.PNG", fileName: "./full_descriptions/77_13QueenofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 78, name: "King of Pentacles", description: "The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.", imagePath: "../TarotCyberPunkMelo/images/PENTACLES_14.PNG", fileName: "./full_descriptions/78_14KingofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
				
				// Website 3
		
		{ id: 1, name: "The Fool", description: "The Fool is a card of new beginnings, opportunities, and adventures.", imagePath: "../TarotCyberPunkDark/images/00_FOOL.PNG", fileName: "./full_descriptions/1_0TheFoolMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 2, name: "The Magician", description: "The Magician represents power, skill, and creativity.", imagePath: "../TarotCyberPunkDark/images/01_MAGICIAN.PNG", fileName: "./full_descriptions/2_1TheMagicianMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 3, name: "The High Priestess", description: "The High Priestess symbolizes intuition, mystery, and inner knowledge.", imagePath: "../TarotCyberPunkDark/images/02_HIGHPRIESTESS.PNG", fileName: "./full_descriptions/3_2TheHighPriestessMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 4, name: "The Empress", description: "The Empress represents femininity, beauty, nature, and abundance.", imagePath: "../TarotCyberPunkDark/images/03_EMPRESS.PNG", fileName: "./full_descriptions/4_3TheEmpressMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 5, name: "The Emperor", description: "The Emperor symbolizes authority, structure, and control.", imagePath: "../TarotCyberPunkDark/images/04_EMPEROR.PNG", fileName: "./full_descriptions/5_4TheEmperorMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 6, name: "The Hierophant", description: "The Hierophant stands for tradition, conformity, and spiritual wisdom.", imagePath: "../TarotCyberPunkDark/images/05_HIEROPHANT.PNG", fileName: "./full_descriptions/6_5TheHierophantMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 7, name: "The Lovers", description: "The Lovers card represents love, harmony, and relationships.", imagePath: "../TarotCyberPunkDark/images/06_LOVERS.PNG", fileName: "./full_descriptions/7_6TheLoversMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 8, name: "The Chariot", description: "The Chariot symbolizes willpower, determination, and success through control.", imagePath: "../TarotCyberPunkDark/images/07_CHARIOT.PNG", fileName: "./full_descriptions/8_7TheChariotMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 9, name: "Strength", description: "Strength represents courage, persuasion, and influence.", imagePath: "../TarotCyberPunkDark/images/08_STRENGTH.PNG", fileName: "./full_descriptions/9_8StrengthMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 10, name: "The Hermit", description: "The Hermit symbolizes introspection, solitude, and inner guidance.", imagePath: "../TarotCyberPunkDark/images/09_HERMIT.PNG", fileName: "./full_descriptions/10_9TheHermitMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 11, name: "Wheel of Fortune", description: "The Wheel of Fortune represents cycles, change, and destiny.", imagePath: "../TarotCyberPunkDark/images/10_WHEEL_OF_FORTUNE.PNG", fileName: "./full_descriptions/11_10TheWheelOfFortuneMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 12, name: "Justice", description: "Justice stands for fairness, truth, and the law.", imagePath: "../TarotCyberPunkDark/images/11_JUSTICE.PNG", fileName: "./full_descriptions/12_11JusticeMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 13, name: "The Hanged Man", description: "The Hanged Man represents suspension, letting go, and new perspectives.", imagePath: "../TarotCyberPunkDark/images/12_HANGEDMAN.PNG", fileName: "./full_descriptions/13_12TheHangedManMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 14, name: "Death", description: "Death symbolizes transformation, endings, and new beginnings.", imagePath: "../TarotCyberPunkDark/images/13_DEATH.PNG", fileName: "./full_descriptions/14_13DeathMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 15, name: "Temperance", description: "Temperance stands for balance, moderation, and patience.", imagePath: "../TarotCyberPunkDark/images/14_TEMPERANCE.PNG", fileName: "./full_descriptions/15_14TemperanceMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 16, name: "The Devil", description: "The Devil represents bondage, addiction, and materialism.", imagePath: "../TarotCyberPunkDark/images/15_DEVIL.PNG", fileName: "./full_descriptions/16_15TheDevilMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 17, name: "The Tower", description: "The Tower symbolizes sudden upheaval, chaos, and revelation.", imagePath: "../TarotCyberPunkDark/images/16_TOWER.PNG", fileName: "./full_descriptions/17_16TheTowerMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 18, name: "The Star", description: "The Star represents hope, inspiration, and serenity.", imagePath: "../TarotCyberPunkDark/images/17_STAR.PNG", fileName: "./full_descriptions/18_17TheStarMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 19, name: "The Moon", description: "The Moon symbolizes illusion, fear, and the subconscious mind.", imagePath: "../TarotCyberPunkDark/images/18_MOON.PNG", fileName: "./full_descriptions/19_18TheMoonMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 20, name: "The Sun", description: "The Sun stands for positivity, vitality, and success.", imagePath: "../TarotCyberPunkDark/images/19_SUN.PNG", fileName: "./full_descriptions/20_19TheSunMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 21, name: "Judgement", description: "Judgement represents reflection, reckoning, and awakening.", imagePath: "../TarotCyberPunkDark/images/20_JUDGEMENT.PNG", fileName: "./full_descriptions/21_20JudgementMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },
    { id: 22, name: "The World", description: "The World symbolizes completion, achievement, and wholeness.", imagePath: "../TarotCyberPunkDark/images/21_WORLD.PNG", fileName: "./full_descriptions/22_21TheWorldMajorArcana.txt", 
        website: "website-3", 
        category: "major-arcana" },

    // Wands cards
    { id: 23, name: "Ace of Wands", description: "The Ace of Wands represents inspiration, new opportunities, growth, and potential.", imagePath: "../TarotCyberPunkDark/images/WANDS_01.PNG", fileName: "./full_descriptions/23_1AceofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 24, name: "2 of Wands", description: "The 2 (Two) of Wands symbolizes future planning, progress, and discovery.", imagePath: "../TarotCyberPunkDark/images/WANDS_02.PNG", fileName: "./full_descriptions/24_2ofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 25, name: "3 of Wands", description: "The 3 (Three) of Wands represents expansion, foresight, and long-term plans.", imagePath: "../TarotCyberPunkDark/images/WANDS_03.PNG", fileName: "./full_descriptions/25_3ofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 26, name: "4 of Wands", description: "The 4 (Four) of Wands signifies celebration, harmony, and homecoming.", imagePath: "../TarotCyberPunkDark/images/WANDS_04.PNG", fileName: "./full_descriptions/26_4ofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 27, name: "5 of Wands", description: "The 5 (Five) of Wands represents conflict, competition, and tension.", imagePath: "../TarotCyberPunkDark/images/WANDS_05.PNG", fileName: "./full_descriptions/27_5ofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 28, name: "6 of Wands", description: "The 6 (Six) of Wands symbolizes victory, success, and public recognition.", imagePath: "../TarotCyberPunkDark/images/WANDS_06.PNG", fileName: "./full_descriptions/28_6ofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 29, name: "7 of Wands", description: "The 7 (Seven) of Wands represents challenge, competition, and perseverance.", imagePath: "../TarotCyberPunkDark/images/WANDS_07.PNG", fileName: "./full_descriptions/29_7ofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 30, name: "8 of Wands", description: "The 8 (Eight) of Wands signifies speed, action, and swift change.", imagePath: "../TarotCyberPunkDark/images/WANDS_08.PNG", fileName: "./full_descriptions/30_8ofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 31, name: "9 of Wands", description: "The 9 (Nine) of Wands represents resilience, courage, and persistence.", imagePath: "../TarotCyberPunkDark/images/WANDS_09.PNG", fileName: "./full_descriptions/31_9ofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 32, name: "10 of Wands", description: "The 10 (Ten) of Wands symbolizes burden, responsibility, and hard work.", imagePath: "../TarotCyberPunkDark/images/WANDS_10.PNG", fileName: "./full_descriptions/32_10ofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 33, name: "Page of Wands", description: "The Page of Wands represents enthusiasm, exploration, and free spirit.", imagePath: "../TarotCyberPunkDark/images/WANDS_11.PNG", fileName: "./full_descriptions/33_11PageofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 34, name: "Knight of Wands", description: "The Knight of Wands symbolizes action, adventure, and impulsiveness.", imagePath: "../TarotCyberPunkDark/images/WANDS_12.PNG", fileName: "./full_descriptions/34_12KnightofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 35, name: "Queen of Wands", description: "The Queen of Wands represents confidence, determination, and charisma.", imagePath: "../TarotCyberPunkDark/images/WANDS_13.PNG", fileName: "./full_descriptions/35_13QueenofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },
    { id: 36, name: "King of Wands", description: "The King of Wands symbolizes leadership, vision, and entrepreneurship.", imagePath: "../TarotCyberPunkDark/images/WANDS_14.PNG", fileName: "./full_descriptions/36_14KingofWandsMinorArcana.txt", 
        website: "website-3", 
        category: "wands" },

    // Cups cards
    { id: 37, name: "Ace of Cups", description: "The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.", imagePath: "../TarotCyberPunkDark/images/CUPS_01.PNG", fileName: "./full_descriptions/37_1AceofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 38, name: "2 of Cups", description: "The 2 (Two) of Cups symbolizes partnership, unity, and mutual attraction.", imagePath: "../TarotCyberPunkDark/images/CUPS_02.PNG", fileName: "./full_descriptions/38_2ofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 39, name: "3 of Cups", description: "The 3 (Three) of Cups represents celebration, friendship, and social gatherings.", imagePath: "../TarotCyberPunkDark/images/CUPS_03.PNG", fileName: "./full_descriptions/39_3ofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 40, name: "4 of Cups", description: "The 4 (Four) of Cups signifies contemplation, reevaluation, and apathy.", imagePath: "../TarotCyberPunkDark/images/CUPS_04.PNG", fileName: "./full_descriptions/40_4ofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 41, name: "5 of Cups", description: "The 5 (Five) of Cups represents loss, regret, and focusing on the negative.", imagePath: "../TarotCyberPunkDark/images/CUPS_05.PNG", fileName: "./full_descriptions/41_5ofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 42, name: "6 of Cups", description: "The 6 (Six) of Cups symbolizes nostalgia, childhood memories, and innocence.", imagePath: "../TarotCyberPunkDark/images/CUPS_06.PNG", fileName: "./full_descriptions/42_6ofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 43, name: "7 of Cups", description: "The 7 (Seven) of Cups represents choices, illusions, and wishful thinking.", imagePath: "../TarotCyberPunkDark/images/CUPS_07.PNG", fileName: "./full_descriptions/43_7ofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 44, name: "8 of Cups", description: "The 8 (Eight) of Cups signifies walking away, abandonment, and seeking deeper meaning.", imagePath: "../TarotCyberPunkDark/images/CUPS_08.PNG", fileName: "./full_descriptions/44_8ofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 45, name: "9 of Cups", description: "The 9 (Nine) of Cups symbolizes contentment, satisfaction, and emotional fulfillment.", imagePath: "../TarotCyberPunkDark/images/CUPS_09.PNG", fileName: "./full_descriptions/45_9ofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 46, name: "10 of Cups", description: "The 10 (Ten) of Cups represents happiness, family harmony, and lasting love.", imagePath: "../TarotCyberPunkDark/images/CUPS_10.PNG", fileName: "./full_descriptions/46_10ofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 47, name: "Page of Cups", description: "The Page of Cups symbolizes creativity, new emotions, and intuitive insights.", imagePath: "../TarotCyberPunkDark/images/CUPS_11.PNG", fileName: "./full_descriptions/47_11PageofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 48, name: "Knight of Cups", description: "The Knight of Cups represents romance, charm, and pursuing the heart's desires.", imagePath: "../TarotCyberPunkDark/images/CUPS_12.PNG", fileName: "./full_descriptions/48_12KnightofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 49, name: "Queen of Cups", description: "The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.", imagePath: "../TarotCyberPunkDark/images/CUPS_13.PNG", fileName: "./full_descriptions/49_13QueenofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },
    { id: 50, name: "King of Cups", description: "The King of Cups represents emotional balance, leadership, and control over one's feelings.", imagePath: "../TarotCyberPunkDark/images/CUPS_14.PNG", fileName: "./full_descriptions/50_14KingofCupsMinorArcana.txt", 
        website: "website-3", 
        category: "cups" },

    // Swords cards
    { id: 51, name: "Ace of Swords", description: "The Ace of Swords represents clarity, truth, and a breakthrough.", imagePath: "../TarotCyberPunkDark/images/SWORDS_01.PNG", fileName: "./full_descriptions/51_1AceofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 52, name: "2 of Swords", description: "The 2 (Two) of Swords symbolizes difficult decisions, stalemate, and balance.", imagePath: "../TarotCyberPunkDark/images/SWORDS_02.PNG", fileName: "./full_descriptions/52_2ofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 53, name: "3 of Swords", description: "The 3 (Three) of Swords represents heartbreak, sorrow, and emotional pain.", imagePath: "../TarotCyberPunkDark/images/SWORDS_03.PNG", fileName: "./full_descriptions/53_3ofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 54, name: "4 of Swords", description: "The 4 (Four) of Swords signifies rest, recuperation, and contemplation.", imagePath: "../TarotCyberPunkDark/images/SWORDS_04.PNG", fileName: "./full_descriptions/54_4ofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 55, name: "5 of Swords", description: "The 5 (Five) of Swords represents conflict, defeat, and tension.", imagePath: "../TarotCyberPunkDark/images/SWORDS_05.PNG", fileName: "./full_descriptions/55_5ofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 56, name: "6 of Swords", description: "The 6 (Six) of Swords symbolizes transition, change, and moving on.", imagePath: "../TarotCyberPunkDark/images/SWORDS_06.PNG", fileName: "./full_descriptions/56_6ofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 57, name: "7 of Swords", description: "The 7 (Seven) of Swords represents deception, trickery, and strategy.", imagePath: "../TarotCyberPunkDark/images/SWORDS_07.PNG", fileName: "./full_descriptions/57_7ofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 58, name: "8 of Swords", description: "The 8 (Eight) of Swords signifies restriction, fear, and feeling trapped.", imagePath: "../TarotCyberPunkDark/images/SWORDS_08.PNG", fileName: "./full_descriptions/58_8ofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 59, name: "9 of Swords", description: "The 9 (Nine) of Swords represents anxiety, worry, and nightmares.", imagePath: "../TarotCyberPunkDark/images/SWORDS_09.PNG", fileName: "./full_descriptions/59_9ofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 60, name: "10 of Swords", description: "The 10 (Ten) of Swords symbolizes betrayal, defeat, and painful endings.", imagePath: "../TarotCyberPunkDark/images/SWORDS_10.PNG", fileName: "./full_descriptions/60_10ofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 61, name: "Page of Swords", description: "The Page of Swords represents curiosity, communication, and vigilance.", imagePath: "../TarotCyberPunkDark/images/SWORDS_11.PNG", fileName: "./full_descriptions/61_11PageofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 62, name: "Knight of Swords", description: "The Knight of Swords symbolizes action, ambition, and impulsiveness.", imagePath: "../TarotCyberPunkDark/images/SWORDS_12.PNG", fileName: "./full_descriptions/62_12KnightofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 63, name: "Queen of Swords", description: "The Queen of Swords represents independence, perceptiveness, and clear thinking.", imagePath: "../TarotCyberPunkDark/images/SWORDS_13.PNG", fileName: "./full_descriptions/63_13QueenofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },
    { id: 64, name: "King of Swords", description: "The King of Swords symbolizes intellect, authority, and truth.", imagePath: "../TarotCyberPunkDark/images/SWORDS_14.PNG", fileName: "./full_descriptions/64_14KingofSwordsMinorArcana.txt", 
        website: "website-3", 
        category: "swords" },

    // Pentacles cards
    { id: 65, name: "Ace of Pentacles", description: "The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_01.PNG", fileName: "./full_descriptions/65_1AceofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 66, name: "2 of Pentacles", description: "The 2 (Two) of Pentacles symbolizes balance, adaptability, and time management.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_02.PNG", fileName: "./full_descriptions/66_2ofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 67, name: "3 of Pentacles", description: "The 3 (Three) of Pentacles represents teamwork, collaboration, and building something together.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_03.PNG", fileName: "./full_descriptions/67_3ofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 68, name: "4 of Pentacles", description: "The 4 (Four) of Pentacles signifies control, stability, and material security.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_04.PNG", fileName: "./full_descriptions/68_4ofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 69, name: "5 of Pentacles", description: "The 5 (Five) of Pentacles represents financial loss, poverty, and feeling isolated.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_05.PNG", fileName: "./full_descriptions/69_5ofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 70, name: "6 of Pentacles", description: "The 6 (Six) of Pentacles symbolizes generosity, sharing wealth, and helping others.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_06.PNG", fileName: "./full_descriptions/70_6ofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 71, name: "7 of Pentacles", description: "The 7 (Seven) of Pentacles represents long-term investment, patience, and reward for hard work.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_07.PNG", fileName: "./full_descriptions/71_7ofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 72, name: "8 of Pentacles", description: "The 8 (Eight) of Pentacles signifies diligence, skill development, and craftsmanship.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_08.PNG", fileName: "./full_descriptions/72_8ofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 73, name: "9 of Pentacles", description: "The 9 (Nine) of Pentacles represents luxury, self-sufficiency, and financial independence.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_09.PNG", fileName: "./full_descriptions/73_9ofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 74, name: "10 of Pentacles", description: "The 10 (Ten) of Pentacles symbolizes wealth, legacy, and family traditions.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_10.PNG", fileName: "./full_descriptions/74_10ofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 75, name: "Page of Pentacles", description: "The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_11.PNG", fileName: "./full_descriptions/75_11PageofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 76, name: "Knight of Pentacles", description: "The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_12.PNG", fileName: "./full_descriptions/76_12KnightofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 77, name: "Queen of Pentacles", description: "The Queen of Pentacles represents nurturing, practicality, and financial security.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_13.PNG", fileName: "./full_descriptions/77_13QueenofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" },
    { id: 78, name: "King of Pentacles", description: "The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.", imagePath: "../TarotCyberPunkDark/images/PENTACLES_14.PNG", fileName: "./full_descriptions/78_14KingofPentaclesMinorArcana.txt", 
        website: "website-3", 
        category: "pentacles" }
];


const websiteNames = {
    "website-1": "SACRED GEOMETRY",
    "website-2": "CYBER-MELO",
		"website-3": "CYBER-DARK"
};
		
		const websites = {
    "website-1": {
        name: "SACRED GEOMETRY",
        iframeUrl: "../TarotSacredGeometry/index.html"
    },
    "website-2": {
        name: "CYBER-MELO",
        iframeUrl: "../TarotCyberPunkMelo/index.html"
			},
			
			"website-3": {
        name: "CYBER-DARK",
        iframeUrl: "../TarotCyberPunkDark/index.html"
    }
			
};

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Get the "all-websites" button and its corresponding content
    const defaultTab = document.querySelector('.tab-button[data-tab="all-websites"]');

    // Function to show all tab contents
    function showAllContents() {
        tabContents.forEach(content => content.style.display = 'block');
    }

    // Function to hide all tab contents
    function hideAllContents() {
        tabContents.forEach(content => content.style.display = 'none');
    }

    // Set "all-websites" as active on page load and show all contents
    if (defaultTab) {
        defaultTab.classList.add('active');
        showAllContents();
    }

    // Event listener for tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-tab');

            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Hide all tab contents initially
            hideAllContents();

            // Add active class to clicked button
            button.classList.add('active');

            // Show the correct tab content
            if (target === "all-websites") {
                showAllContents(); // Show all tab contents if "all-websites" is selected
            } else {
                document.querySelector(`.tab-content[data-content="${target}"]`).style.display = 'block';
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    // Extract all unique image paths from tarotCards array
    const imagePaths = tarotCards.map(card => card.imagePath);

    // Preload images
    imagePaths.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });

    console.log("All tarot card images preloaded inside the iframe.");
});

// Variables to keep track of active website and category
    let activeWebsite = "all-websites";
    let activeCategory = "all-cards";

	


    // Event listeners for website tabs
    const websiteTabs = document.querySelectorAll("nav.tabs .tab-button[data-tab]");
    websiteTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const website = tab.getAttribute("data-tab");
            switchWebsite(website);

            // Update active tab styling
            websiteTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Event listeners for category tabs
    const categoryTabs = document.querySelectorAll("#image-gallery-section nav.tabs .tab-button[data-category]");
    categoryTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const category = tab.getAttribute("data-category");
            switchCategory(category);
						
						

            // Update active tab styling
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    function switchWebsite(website) {
    activeWebsite = website;
    activeCategory = "all-cards"; // Reset category to default

    // Grab the shared iframe elements
    const iframeContainer = document.getElementById("shared-iframe-container");
    const iframe = document.getElementById("shared-iframe");
    const websiteTitle = document.getElementById("website-title");

    if (website === "all-websites") {
        // Hide the iframe container and title
        iframeContainer.style.display = "none";
        websiteTitle.textContent = "";
    } else {
        const websiteData = websites[website];
        if (websiteData && websiteData.iframeUrl) {
            // Show the iframe container
            iframeContainer.style.display = "block";
            // Set the iframe source
            iframe.src = websiteData.iframeUrl;
            // Update the title with the website’s name
            websiteTitle.textContent = websiteData.name;
        } else {
            // Fallback if no data
            iframeContainer.style.display = "none";
            websiteTitle.textContent = "";
        }
    }

    // (Optional) your existing logic to show/hide content sections
    const websiteSections = document.querySelectorAll("#websites-section .tab-content");
    websiteSections.forEach(section => {
        if (website === "all-websites" || section.getAttribute("data-content") === website) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });

    // Re-render the gallery (if you still have that in your code)
    renderGallery();
}
    function switchCategory(category) {
        activeCategory = category;

        // Update active category tabs
        const categoryTabs = document.querySelectorAll("#image-gallery-section nav.tabs .tab-button[data-category]");
        categoryTabs.forEach(t => {
            if (t.getAttribute("data-category") === category) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        // Update gallery
        renderGallery();
    }

    function renderGallery() {
    const galleryContainer = document.getElementById("gallery-container");
    galleryContainer.innerHTML = ""; // Clear existing content

    const filteredCards = tarotCards.filter(card => {
        const websiteMatch = activeWebsite === "all-websites" || card.website === activeWebsite;
        const categoryMatch = activeCategory === "all-cards" || card.category === activeCategory;
        return websiteMatch && categoryMatch;
    });

    const websites = [...new Set(filteredCards.map(card => card.website))];

    websites.forEach(website => {
        const websiteGallery = document.createElement("div");
        websiteGallery.classList.add("website-gallery");
        websiteGallery.setAttribute("data-website", website);
        websiteGallery.style.display = activeWebsite === "all-websites" || activeWebsite === website ? "block" : "none";

        const galleryContent = document.createElement("div");
        galleryContent.classList.add("gallery-content");
        galleryContent.setAttribute("data-category", activeCategory);
        galleryContent.style.display = "block";

        const h2 = document.createElement("h2");
        h2.textContent = `${activeCategory.replace('-', ' ').toUpperCase()} - ${websiteNames[website] || website.toUpperCase()}`;
        galleryContent.appendChild(h2);

        const imageGallery = document.createElement("div");
        imageGallery.classList.add("image-gallery");

        const websiteCards = filteredCards.filter(card => card.website === website);

        websiteCards.forEach(card => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");

            const img = document.createElement("img");
            img.src = card.imagePath;
            img.alt = card.name;

            const nameP = document.createElement("p");
            nameP.textContent = `Name: ${card.name}`;

            const descP = document.createElement("p");
            descP.textContent = `Description: ${card.description}`;

            const categoryP = document.createElement("p");
            categoryP.textContent = `Category: ${card.category}`;

            const websiteP = document.createElement("p");
            websiteP.textContent = `Website: ${websiteNames[card.website] || card.website}`;

            const fullDescDiv = document.createElement("div");
            fullDescDiv.classList.add("full-description");
            fullDescDiv.style.display = "none";

            const fullDescP = document.createElement("p");
            fullDescDiv.appendChild(fullDescP);

            const toggleButton = document.createElement("button");
            toggleButton.textContent = "Show Full Description";
            toggleButton.addEventListener("click", () => {
                if (fullDescDiv.style.display === "none") {
                    fetch(card.fileName)
                        .then(response => {
                            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                            return response.text();
                        })
                        .then(text => {
                            fullDescP.textContent = text;
                            fullDescDiv.style.display = "block";
                            toggleButton.textContent = "Hide Full Description";
                        })
                        .catch(error => {
                            console.error('Error fetching full description:', error);
                            fullDescP.textContent = "Full description not available.";
                            fullDescDiv.style.display = "block";
                            toggleButton.textContent = "Hide Full Description";
                        });
                } else {
                    fullDescDiv.style.display = "none";
                    toggleButton.textContent = "Show Full Description";
                }
            });

            cardDiv.appendChild(img);
            cardDiv.appendChild(nameP);
            cardDiv.appendChild(descP);
            cardDiv.appendChild(categoryP);
            cardDiv.appendChild(websiteP);
            cardDiv.appendChild(toggleButton);
            cardDiv.appendChild(fullDescDiv);

            imageGallery.appendChild(cardDiv);
        });

        galleryContent.appendChild(imageGallery);
        websiteGallery.appendChild(galleryContent);
        galleryContainer.appendChild(websiteGallery);
    });
}

    // Initialize default state
    switchWebsite("all-websites");


