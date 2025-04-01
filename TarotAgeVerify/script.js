const tarotCards = [
    // Website 1
    { id: 1, name: "The Fool", description: "The Fool is a card of new beginnings, opportunities, and adventures.", imagePath: "../TarotCrystalQueens/images/FOOL.PNG", fileName: "./full_descriptions/1_0TheFoolMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 2, name: "The Magician", description: "The Magician represents power, skill, and creativity.", imagePath: "../TarotCrystalQueens/images/MAGICIAN.PNG", fileName: "./full_descriptions/2_1TheMagicianMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 3, name: "The High Priestess", description: "The High Priestess symbolizes intuition, mystery, and inner knowledge.", imagePath: "../TarotCrystalQueens/images/HIGHPRIESTESS.PNG", fileName: "./full_descriptions/3_2TheHighPriestessMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 4, name: "The Empress", description: "The Empress represents femininity, beauty, nature, and abundance.", imagePath: "../TarotCrystalQueens/images/EMPRESS.PNG", fileName: "./full_descriptions/4_3TheEmperessMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 5, name: "The Emperor", description: "The Emperor symbolizes authority, structure, and control.", imagePath: "../TarotCrystalQueens/images/EMPEROR.PNG", fileName: "./full_descriptions/5_4TheEmperorMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 6, name: "The Hierophant", description: "The Hierophant stands for tradition, conformity, and spiritual wisdom.", imagePath: "../TarotCrystalQueens/images/HIEROPHANT.PNG", fileName: "./full_descriptions/6_5TheHierophantMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 7, name: "The Lovers", description: "The Lovers card represents love, harmony, and relationships.", imagePath: "../TarotCrystalQueens/images/LOVERS.PNG", fileName: "./full_descriptions/7_6TheLoversMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 8, name: "The Chariot", description: "The Chariot symbolizes willpower, determination, and success through control.", imagePath: "../TarotCrystalQueens/images/CHARIOT.PNG", fileName: "./full_descriptions/8_7TheChariotMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 9, name: "Strength", description: "Strength represents courage, persuasion, and influence.", imagePath: "../TarotCrystalQueens/images/STRENGTH.PNG", fileName: "./full_descriptions/9_8StrengthMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 10, name: "The Hermit", description: "The Hermit symbolizes introspection, solitude, and inner guidance.", imagePath: "../TarotCrystalQueens/images/HERMIT.PNG", fileName: "./full_descriptions/10_9TheHermitMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 11, name: "Wheel of Fortune", description: "The Wheel of Fortune represents cycles, change, and destiny.", imagePath: "../TarotCrystalQueens/images/WHEEL_OF_FORTUNE.PNG", fileName: "./full_descriptions/11_10TheWheelofFortuneMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 12, name: "Justice", description: "Justice stands for fairness, truth, and the law.", imagePath: "../TarotCrystalQueens/images/JUSTICE.PNG", fileName: "./full_descriptions/12_11JusticeMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 13, name: "The Hanged Man", description: "The Hanged Man represents suspension, letting go, and new perspectives.", imagePath: "../TarotCrystalQueens/images/HANGEDMAN.PNG", fileName: "./full_descriptions/13_12TheHangedManMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 14, name: "Death", description: "Death symbolizes transformation, endings, and new beginnings.", imagePath: "../TarotCrystalQueens/images/DEATH.PNG", fileName: "./full_descriptions/14_13DeathMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 15, name: "Temperance", description: "Temperance stands for balance, moderation, and patience.", imagePath: "../TarotCrystalQueens/images/TEMPERANCE.PNG", fileName: "./full_descriptions/15_14TemperanceMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 16, name: "The Devil", description: "The Devil represents bondage, addiction, and materialism.", imagePath: "../TarotCrystalQueens/images/DEVIL.PNG", fileName: "./full_descriptions/16_15TheDevilMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 17, name: "The Tower", description: "The Tower symbolizes sudden upheaval, chaos, and revelation.", imagePath: "../TarotCrystalQueens/images/TOWER.PNG", fileName: "./full_descriptions/17_16TheTowerMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 18, name: "The Star", description: "The Star represents hope, inspiration, and serenity.", imagePath: "../TarotCrystalQueens/images/STAR.PNG", fileName: "./full_descriptions/18_17TheStarMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 19, name: "The Moon", description: "The Moon symbolizes illusion, fear, and the subconscious mind.", imagePath: "../TarotCrystalQueens/images/MOON.PNG", fileName: "./full_descriptions/19_18TheMoonMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 20, name: "The Sun", description: "The Sun stands for positivity, vitality, and success.", imagePath: "../TarotCrystalQueens/images/SUN.PNG", fileName: "./full_descriptions/20_19TheSunMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 21, name: "Judgement", description: "Judgement represents reflection, reckoning, and awakening.", imagePath: "../TarotCrystalQueens/images/JUDGEMENT.PNG", fileName: "./full_descriptions/21_20JudgementMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },
    { id: 22, name: "The World", description: "The World symbolizes completion, achievement, and wholeness.", imagePath: "../TarotCrystalQueens/images/WORLD.PNG", fileName: "./full_descriptions/22_21TheWorldMajorArcana.txt", 
        website: "website-1", 
        category: "major-arcana" },

    // Wands cards
    { id: 23, name: "Ace of Wands", description: "The Ace of Wands represents inspiration, new opportunities, growth, and potential.", imagePath: "../TarotCrystalQueens/images/ACEWANDS.PNG", fileName: "./full_descriptions/23_1AceofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 24, name: "2 of Wands", description: "The 2 (Two) of Wands symbolizes future planning, progress, and discovery.", imagePath: "../TarotCrystalQueens/images/2WANDS.PNG", fileName: "./full_descriptions/24_2ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 25, name: "3 of Wands", description: "The 3 (Three) of Wands represents expansion, foresight, and long-term plans.", imagePath: "../TarotCrystalQueens/images/3WANDS.PNG", fileName: "./full_descriptions/25_3ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 26, name: "4 of Wands", description: "The 4 (Four) of Wands signifies celebration, harmony, and homecoming.", imagePath: "../TarotCrystalQueens/images/4WANDS.PNG", fileName: "./full_descriptions/26_4ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 27, name: "5 of Wands", description: "The 5 (Five) of Wands represents conflict, competition, and tension.", imagePath: "../TarotCrystalQueens/images/5WANDS.PNG", fileName: ".full_descriptions/27_5ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 28, name: "6 of Wands", description: "The 6 (Six) of Wands symbolizes victory, success, and public recognition.", imagePath: "../TarotCrystalQueens/images/6WANDS.PNG", fileName: "./full_descriptions/28_6ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 29, name: "7 of Wands", description: "The 7 (Seven) of Wands represents challenge, competition, and perseverance.", imagePath: "../TarotCrystalQueens/images/7WANDS.PNG", fileName: "./full_descriptions/29_7ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 30, name: "8 of Wands", description: "The 8 (Eight) of Wands signifies speed, action, and swift change.", imagePath: "../TarotCrystalQueens/images/8WANDS.PNG", fileName: "./full_descriptions/30_8ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 31, name: "9 of Wands", description: "The 9 (Nine) of Wands represents resilience, courage, and persistence.", imagePath: "../TarotCrystalQueens/images/9WANDS.PNG", fileName: "./full_descriptions/31_9ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 32, name: "10 of Wands", description: "The 10 (Ten) of Wands symbolizes burden, responsibility, and hard work.", imagePath: "../TarotCrystalQueens/images/10WANDS.PNG", fileName: "./full_descriptions/32_10ofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 33, name: "Page of Wands", description: "The Page of Wands represents enthusiasm, exploration, and free spirit.", imagePath: "../TarotCrystalQueens/images/PAGEWANDS.PNG", fileName: "./full_descriptions/33_11PageofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 34, name: "Knight of Wands", description: "The Knight of Wands symbolizes action, adventure, and impulsiveness.", imagePath: "../TarotCrystalQueens/images/KNIGHTWANDS.PNG", fileName: "./full_descriptions/34_12KnightofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 35, name: "Queen of Wands", description: "The Queen of Wands represents confidence, determination, and charisma.", imagePath: "../TarotCrystalQueens/images/QUEENWANDS.PNG", fileName: "./full_descriptions/35_13QueenofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },
    { id: 36, name: "King of Wands", description: "The King of Wands symbolizes leadership, vision, and entrepreneurship.", imagePath: "../TarotCrystalQueens/images/KINGWANDS.PNG", fileName: "./full_descriptions/36_14KingofWandsMinorArcana.txt", 
        website: "website-1", 
        category: "wands" },

    // Cups cards
    { id: 37, name: "Ace of Cups", description: "The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.", imagePath: "../TarotCrystalQueens/images/ACECUPS.PNG", fileName: "./full_descriptions/37_1AceofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 38, name: "2 of Cups", description: "The 2 (Two) of Cups symbolizes partnership, unity, and mutual attraction.", imagePath: "../TarotCrystalQueens/images/2CUPS.PNG", fileName: "./full_descriptions/38_2ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 39, name: "3 of Cups", description: "The 3 (Three) of Cups represents celebration, friendship, and social gatherings.", imagePath: "../TarotCrystalQueens/images/3CUPS.PNG", fileName: "./full_descriptions/39_3ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 40, name: "4 of Cups", description: "The 4 (Four) of Cups signifies contemplation, reevaluation, and apathy.", imagePath: "../TarotCrystalQueens/images/4CUPS.PNG", fileName: "./full_descriptions/40_4ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 41, name: "5 of Cups", description: "The 5 (Five) of Cups represents loss, regret, and focusing on the negative.", imagePath: "../TarotCrystalQueens/images/5CUPS.PNG", fileName: "./full_descriptions/41_5ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 42, name: "6 of Cups", description: "The 6 (Six) of Cups symbolizes nostalgia, childhood memories, and innocence.", imagePath: "../TarotCrystalQueens/images/6CUPS.PNG", fileName: "./full_descriptions/42_6ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 43, name: "7 of Cups", description: "The 7 (Seven) of Cups represents choices, illusions, and wishful thinking.", imagePath: "../TarotCrystalQueens/images/7CUPS.PNG", fileName: "./full_descriptions/43_7ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 44, name: "8 of Cups", description: "The 8 (Eight) of Cups signifies walking away, abandonment, and seeking deeper meaning.", imagePath: "../TarotCrystalQueens/images/8CUPS.PNG", fileName: "./full_descriptions/44_8ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 45, name: "9 of Cups", description: "The 9 (Nine) of Cups symbolizes contentment, satisfaction, and emotional fulfillment.", imagePath: "../TarotCrystalQueens/images/9CUPS.PNG", fileName: "./full_descriptions/45_9ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 46, name: "10 of Cups", description: "The 10 (Ten) of Cups represents happiness, family harmony, and lasting love.", imagePath: "../TarotCrystalQueens/images/10CUPS.PNG", fileName: "./full_descriptions/46_10ofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 47, name: "Page of Cups", description: "The Page of Cups symbolizes creativity, new emotions, and intuitive insights.", imagePath: "../TarotCrystalQueens/images/PAGECUPS.PNG", fileName: "./full_descriptions/47_11PageofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 48, name: "Knight of Cups", description: "The Knight of Cups represents romance, charm, and pursuing the heart's desires.", imagePath: "../TarotCrystalQueens/images/KNIGHTCUPS.PNG", fileName: "./full_descriptions/48_12KnightofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 49, name: "Queen of Cups", description: "The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.", imagePath: "../TarotCrystalQueens/images/QUEENCUPS.PNG", fileName: "./full_descriptions/49_13QueenofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },
    { id: 50, name: "King of Cups", description: "The King of Cups represents emotional balance, leadership, and control over one's feelings.", imagePath: "../TarotCrystalQueens/images/KINGCUPS.PNG", fileName: "./full_descriptions/50_14KingofCupsMinorArcana.txt", 
        website: "website-1", 
        category: "cups" },

    // Swords cards
    { id: 51, name: "Ace of Swords", description: "The Ace of Swords represents clarity, truth, and a breakthrough.", imagePath: "../TarotCrystalQueens/images/ACESWORDS.PNG", fileName: "./full_descriptions/51_1AceofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 52, name: "2 of Swords", description: "The 2 (Two) of Swords symbolizes difficult decisions, stalemate, and balance.", imagePath: "../TarotCrystalQueens/images/2SWORDS.PNG", fileName: "./full_descriptions/52_2ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 53, name: "3 of Swords", description: "The 3 (Three) of Swords represents heartbreak, sorrow, and emotional pain.", imagePath: "../TarotCrystalQueens/images/3SWORDS.PNG", fileName: "./full_descriptions/53_3ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 54, name: "4 of Swords", description: "The 4 (Four) of Swords signifies rest, recuperation, and contemplation.", imagePath: "../TarotCrystalQueens/images/4SWORDS.PNG", fileName: "./full_descriptions/54_4ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 55, name: "5 of Swords", description: "The 5 (Five) of Swords represents conflict, defeat, and tension.", imagePath: "../TarotCrystalQueens/images/5SWORDS.PNG", fileName: "./full_descriptions/55_5ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 56, name: "6 of Swords", description: "The 6 (Six) of Swords symbolizes transition, change, and moving on.", imagePath: "../TarotCrystalQueens/images/6SWORDS.PNG", fileName: "./full_descriptions/56_6ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 57, name: "7 of Swords", description: "The 7 (Seven) of Swords represents deception, trickery, and strategy.", imagePath: "../TarotCrystalQueens/images/7SWORDS.PNG", fileName: "./full_descriptions/57_7ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 58, name: "8 of Swords", description: "The 8 (Eight) of Swords signifies restriction, fear, and feeling trapped.", imagePath: "../TarotCrystalQueens/images/8SWORDS.PNG", fileName: "./full_descriptions/58_8ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 59, name: "9 of Swords", description: "The 9 (Nine) of Swords represents anxiety, worry, and nightmares.", imagePath: "../TarotCrystalQueens/images/9SWORDS.PNG", fileName: "./full_descriptions/59_9ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 60, name: "10 of Swords", description: "The 10 (Ten) of Swords symbolizes betrayal, defeat, and painful endings.", imagePath: "../TarotCrystalQueens/images/10SWORDS.PNG", fileName: "./full_descriptions/60_10ofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 61, name: "Page of Swords", description: "The Page of Swords represents curiosity, communication, and vigilance.", imagePath: "../TarotCrystalQueens/images/PAGESWORDS.PNG", fileName: "./full_descriptions/61_11PageofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 62, name: "Knight of Swords", description: "The Knight of Swords symbolizes action, ambition, and impulsiveness.", imagePath: "../TarotCrystalQueens/images/KNIGHTSWORDS.PNG", fileName: "./full_descriptions/62_12KnightofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 63, name: "Queen of Swords", description: "The Queen of Swords represents independence, perceptiveness, and clear thinking.", imagePath: "../TarotCrystalQueens/images/QUEENSWORDS.PNG", fileName: "./full_descriptions/63_13QueenofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },
    { id: 64, name: "King of Swords", description: "The King of Swords symbolizes intellect, authority, and truth.", imagePath: "../TarotCrystalQueens/images/KINGSWORDS.PNG", fileName: "./full_descriptions/64_14KingofSwordsMinorArcana.txt", 
        website: "website-1", 
        category: "swords" },

    // Pentacles cards
    { id: 65, name: "Ace of Pentacles", description: "The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.", imagePath: "../TarotCrystalQueens/images/ACEPENTACLES.PNG", fileName: "./full_descriptions/65_1AceofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 66, name: "2 of Pentacles", description: "The 2 (Two) of Pentacles symbolizes balance, adaptability, and time management.", imagePath: "../TarotCrystalQueens/images/2PENTACLES.PNG", fileName: "./full_descriptions/66_2ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 67, name: "3 of Pentacles", description: "The 3 (Three) of Pentacles represents teamwork, collaboration, and building something together.", imagePath: "../TarotCrystalQueens/images/3PENTACLES.PNG", fileName: "./full_descriptions/67_3ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 68, name: "4 of Pentacles", description: "The 4 (Four) of Pentacles signifies control, stability, and material security.", imagePath: "../TarotCrystalQueens/images/4PENTACLES.PNG", fileName: "./full_descriptions/68_4ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 69, name: "5 of Pentacles", description: "The 5 (Five) of Pentacles represents financial loss, poverty, and feeling isolated.", imagePath: "../TarotCrystalQueens/images/5PENTACLES.PNG", fileName: "./full_descriptions/69_5ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 70, name: "6 of Pentacles", description: "The 6 (Six) of Pentacles symbolizes generosity, sharing wealth, and helping others.", imagePath: "../TarotCrystalQueens/images/6PENTACLES.PNG", fileName: "./full_descriptions/70_6ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 71, name: "7 of Pentacles", description: "The 7 (Seven) of Pentacles represents long-term investment, patience, and reward for hard work.", imagePath: "../TarotCrystalQueens/images/7PENTACLES.PNG", fileName: "./full_descriptions/71_7ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 72, name: "8 of Pentacles", description: "The 8 (Eight) of Pentacles signifies diligence, skill development, and craftsmanship.", imagePath: "../TarotCrystalQueens/images/8PENTACLES.PNG", fileName: "./full_descriptions/72_8ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 73, name: "9 of Pentacles", description: "The 9 (Nine) of Pentacles represents luxury, self-sufficiency, and financial independence.", imagePath: "../TarotCrystalQueens/images/9PENTACLES.PNG", fileName: "./full_descriptions/73_9ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 74, name: "10 of Pentacles", description: "The 10 (Ten) of Pentacles symbolizes wealth, legacy, and family traditions.", imagePath: "../TarotCrystalQueens/images/10PENTACLES.PNG", fileName: "./full_descriptions/74_10ofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 75, name: "Page of Pentacles", description: "The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.", imagePath: "../TarotCrystalQueens/images/PAGEPENTACLES.PNG", fileName: "./full_descriptions/75_11PageofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 76, name: "Knight of Pentacles", description: "The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.", imagePath: "../TarotCrystalQueens/images/KNIGHTPENTACLES.PNG", fileName: "./full_descriptions/76_12KnightofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 77, name: "Queen of Pentacles", description: "The Queen of Pentacles represents nurturing, practicality, and financial security.", imagePath: "../TarotCrystalQueens/images/QUEENPENTACLES.PNG", fileName: "./full_descriptions/77_13QueenofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
    { id: 78, name: "King of Pentacles", description: "The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.", imagePath: "../TarotCrystalQueens/images/KINGPENTACLES.PNG", fileName: "./full_descriptions/78_14KingofPentaclesMinorArcana.txt", 
        website: "website-1", 
        category: "pentacles" },
				
		 // Website 2
		{ id: 1, name: "The Fool", description: "The Fool is a card of new beginnings, opportunities, and adventures.", imagePath: "../TarotCyberPunkX/images/FOOL.PNG", fileName: "./full_descriptions/1_0TheFoolMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 2, name: "The Magician", description: "The Magician represents power, skill, and creativity.", imagePath: "../TarotCyberPunkX/images/MAGICIAN.PNG", fileName: "./full_descriptions/2_1TheMagicianMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 3, name: "The High Priestess", description: "The High Priestess symbolizes intuition, mystery, and inner knowledge.", imagePath: "../TarotCyberPunkX/images/HIGHPRIESTESS.PNG", fileName: "./full_descriptions/3_2TheHighPriestessMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 4, name: "The Empress", description: "The Empress represents femininity, beauty, nature, and abundance.", imagePath: "../TarotCyberPunkX/images/EMPRESS.PNG", fileName: "./full_descriptions/4_3TheEmpressMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 5, name: "The Emperor", description: "The Emperor symbolizes authority, structure, and control.", imagePath: "../TarotCyberPunkX/images/EMPEROR.PNG", fileName: "./full_descriptions/5_4TheEmperorMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 6, name: "The Hierophant", description: "The Hierophant stands for tradition, conformity, and spiritual wisdom.", imagePath: "../TarotCyberPunkX/images/HIEROPHANT.PNG", fileName: "./full_descriptions/6_5TheHierophantMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 7, name: "The Lovers", description: "The Lovers card represents love, harmony, and relationships.", imagePath: "../TarotCyberPunkX/images/LOVERS.PNG", fileName: "./full_descriptions/7_6TheLoversMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 8, name: "The Chariot", description: "The Chariot symbolizes willpower, determination, and success through control.", imagePath: "../TarotCyberPunkX/images/CHARIOT.PNG", fileName: "./full_descriptions/8_7TheChariotMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 9, name: "Strength", description: "Strength represents courage, persuasion, and influence.", imagePath: "../TarotCyberPunkX/images/STRENGTH.PNG", fileName: "./full_descriptions/9_8StrengthMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 10, name: "The Hermit", description: "The Hermit symbolizes introspection, solitude, and inner guidance.", imagePath: "../TarotCyberPunkX/images/HERMIT.PNG", fileName: "./full_descriptions/10_9TheHermitMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 11, name: "Wheel of Fortune", description: "The Wheel of Fortune represents cycles, change, and destiny.", imagePath: "../TarotCyberPunkX/images/WHEEL_OF_FORTUNE.PNG", fileName: "./full_descriptions/11_10TheWheelOfFortuneMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 12, name: "Justice", description: "Justice stands for fairness, truth, and the law.", imagePath: "../TarotCyberPunkX/images/JUSTICE.PNG", fileName: "./full_descriptions/12_11JusticeMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 13, name: "The Hanged Man", description: "The Hanged Man represents suspension, letting go, and new perspectives.", imagePath: "../TarotCyberPunkX/images/HANGEDMAN.PNG", fileName: "./full_descriptions/13_12TheHangedManMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 14, name: "Death", description: "Death symbolizes transformation, endings, and new beginnings.", imagePath: "../TarotCyberPunkX/images/DEATH.PNG", fileName: "./full_descriptions/14_13DeathMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 15, name: "Temperance", description: "Temperance stands for balance, moderation, and patience.", imagePath: "../TarotCyberPunkX/images/TEMPERANCE.PNG", fileName: "./full_descriptions/15_14TemperanceMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 16, name: "The Devil", description: "The Devil represents bondage, addiction, and materialism.", imagePath: "../TarotCyberPunkX/images/DEVIL.PNG", fileName: "./full_descriptions/16_15TheDevilMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 17, name: "The Tower", description: "The Tower symbolizes sudden upheaval, chaos, and revelation.", imagePath: "../TarotCyberPunkX/images/TOWER.PNG", fileName: "./full_descriptions/17_16TheTowerMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 18, name: "The Star", description: "The Star represents hope, inspiration, and serenity.", imagePath: "../TarotCyberPunkX/images/STAR.PNG", fileName: "./full_descriptions/18_17TheStarMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 19, name: "The Moon", description: "The Moon symbolizes illusion, fear, and the subconscious mind.", imagePath: "../TarotCyberPunkX/images/MOON.PNG", fileName: "./full_descriptions/19_18TheMoonMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 20, name: "The Sun", description: "The Sun stands for positivity, vitality, and success.", imagePath: "../TarotCyberPunkX/images/SUN.PNG", fileName: "./full_descriptions/20_19TheSunMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 21, name: "Judgement", description: "Judgement represents reflection, reckoning, and awakening.", imagePath: "../TarotCyberPunkX/images/JUDGEMENT.PNG", fileName: "./full_descriptions/21_20JudgementMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },
    { id: 22, name: "The World", description: "The World symbolizes completion, achievement, and wholeness.", imagePath: "../TarotCyberPunkX/images/WORLD.PNG", fileName: "./full_descriptions/22_21TheWorldMajorArcana.txt", 
        website: "website-2", 
        category: "major-arcana" },

    // Wands cards
    { id: 23, name: "Ace of Wands", description: "The Ace of Wands represents inspiration, new opportunities, growth, and potential.", imagePath: "../TarotCyberPunkX/images/ACEWANDS.PNG", fileName: "./full_descriptions/23_1AceofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 24, name: "2 of Wands", description: "The 2 (Two) of Wands symbolizes future planning, progress, and discovery.", imagePath: "../TarotCyberPunkX/images/2WANDS.PNG", fileName: "./full_descriptions/24_2ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 25, name: "3 of Wands", description: "The 3 (Three) of Wands represents expansion, foresight, and long-term plans.", imagePath: "../TarotCyberPunkX/images/3WANDS.PNG", fileName: "./full_descriptions/25_3ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 26, name: "4 of Wands", description: "The 4 (Four) of Wands signifies celebration, harmony, and homecoming.", imagePath: "../TarotCyberPunkX/images/4WANDS.PNG", fileName: "./full_descriptions/26_4ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 27, name: "5 of Wands", description: "The 5 (Five) of Wands represents conflict, competition, and tension.", imagePath: "../TarotCyberPunkX/images/5WANDS.PNG", fileName: "./full_descriptions/27_5ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 28, name: "6 of Wands", description: "The 6 (Six) of Wands symbolizes victory, success, and public recognition.", imagePath: "../TarotCyberPunkX/images/6WANDS.PNG", fileName: "./full_descriptions/28_6ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 29, name: "7 of Wands", description: "The 7 (Seven) of Wands represents challenge, competition, and perseverance.", imagePath: "../TarotCyberPunkX/images/7WANDS.PNG", fileName: "./full_descriptions/29_7ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 30, name: "8 of Wands", description: "The 8 (Eight) of Wands signifies speed, action, and swift change.", imagePath: "../TarotCyberPunkX/images/8WANDS.PNG", fileName: "./full_descriptions/30_8ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 31, name: "9 of Wands", description: "The 9 (Nine) of Wands represents resilience, courage, and persistence.", imagePath: "../TarotCyberPunkX/images/9WANDS.PNG", fileName: "./full_descriptions/31_9ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 32, name: "10 of Wands", description: "The 10 (Ten) of Wands symbolizes burden, responsibility, and hard work.", imagePath: "../TarotCyberPunkX/images/10WANDS.PNG", fileName: "./full_descriptions/32_10ofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 33, name: "Page of Wands", description: "The Page of Wands represents enthusiasm, exploration, and free spirit.", imagePath: "../TarotCyberPunkX/images/PAGEWANDS.PNG", fileName: "./full_descriptions/33_11PageofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 34, name: "Knight of Wands", description: "The Knight of Wands symbolizes action, adventure, and impulsiveness.", imagePath: "../TarotCyberPunkX/images/KNIGHTWANDS.PNG", fileName: "./full_descriptions/34_12KnightofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 35, name: "Queen of Wands", description: "The Queen of Wands represents confidence, determination, and charisma.", imagePath: "../TarotCyberPunkX/images/QUEENWANDS.PNG", fileName: "./full_descriptions/35_13QueenofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },
    { id: 36, name: "King of Wands", description: "The King of Wands symbolizes leadership, vision, and entrepreneurship.", imagePath: "../TarotCyberPunkX/images/KINGWANDS.PNG", fileName: "./full_descriptions/36_14KingofWandsMinorArcana.txt", 
        website: "website-2", 
        category: "wands" },

    // Cups cards
    { id: 37, name: "Ace of Cups", description: "The Ace of Cups represents new beginnings in love, compassion, and emotional fulfillment.", imagePath: "../TarotCyberPunkX/images/ACECUPS.PNG", fileName: "./full_descriptions/37_1AceofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 38, name: "2 of Cups", description: "The 2 (Two) of Cups symbolizes partnership, unity, and mutual attraction.", imagePath: "../TarotCyberPunkX/images/2CUPS.PNG", fileName: "./full_descriptions/38_2ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 39, name: "3 of Cups", description: "The 3 (Three) of Cups represents celebration, friendship, and social gatherings.", imagePath: "../TarotCyberPunkX/images/3CUPS.PNG", fileName: "./full_descriptions/39_3ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 40, name: "4 of Cups", description: "The 4 (Four) of Cups signifies contemplation, reevaluation, and apathy.", imagePath: "../TarotCyberPunkX/images/4CUPS.PNG", fileName: "./full_descriptions/40_4ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 41, name: "5 of Cups", description: "The 5 (Five) of Cups represents loss, regret, and focusing on the negative.", imagePath: "../TarotCyberPunkX/images/5CUPS.PNG", fileName: "./full_descriptions/41_5ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 42, name: "6 of Cups", description: "The 6 (Six) of Cups symbolizes nostalgia, childhood memories, and innocence.", imagePath: "../TarotCyberPunkX/images/6CUPS.PNG", fileName: "./full_descriptions/42_6ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 43, name: "7 of Cups", description: "The 7 (Seven) of Cups represents choices, illusions, and wishful thinking.", imagePath: "../TarotCyberPunkX/images/7CUPS.PNG", fileName: "./full_descriptions/43_7ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 44, name: "8 of Cups", description: "The 8 (Eight) of Cups signifies walking away, abandonment, and seeking deeper meaning.", imagePath: "../TarotCyberPunkX/images/8CUPS.PNG", fileName: "./full_descriptions/44_8ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 45, name: "9 of Cups", description: "The 9 (Nine) of Cups symbolizes contentment, satisfaction, and emotional fulfillment.", imagePath: "../TarotCyberPunkX/images/9CUPS.PNG", fileName: "./full_descriptions/45_9ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 46, name: "10 of Cups", description: "The 10 (Ten) of Cups represents happiness, family harmony, and lasting love.", imagePath: "../TarotCyberPunkX/images/10CUPS.PNG", fileName: "./full_descriptions/46_10ofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 47, name: "Page of Cups", description: "The Page of Cups symbolizes creativity, new emotions, and intuitive insights.", imagePath: "../TarotCyberPunkX/images/PAGECUPS.PNG", fileName: "./full_descriptions/47_11PageofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 48, name: "Knight of Cups", description: "The Knight of Cups represents romance, charm, and pursuing the heart's desires.", imagePath: "../TarotCyberPunkX/images/KNIGHTCUPS.PNG", fileName: "./full_descriptions/48_12KnightofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 49, name: "Queen of Cups", description: "The Queen of Cups symbolizes compassion, emotional security, and intuitive wisdom.", imagePath: "../TarotCyberPunkX/images/QUEENCUPS.PNG", fileName: "./full_descriptions/49_13QueenofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },
    { id: 50, name: "King of Cups", description: "The King of Cups represents emotional balance, leadership, and control over one's feelings.", imagePath: "../TarotCyberPunkX/images/KINGCUPS.PNG", fileName: "./full_descriptions/50_14KingofCupsMinorArcana.txt", 
        website: "website-2", 
        category: "cups" },

    // Swords cards
    { id: 51, name: "Ace of Swords", description: "The Ace of Swords represents clarity, truth, and a breakthrough.", imagePath: "../TarotCyberPunkX/images/ACESWORDS.PNG", fileName: "./full_descriptions/51_1AceofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 52, name: "2 of Swords", description: "The 2 (Two) of Swords symbolizes difficult decisions, stalemate, and balance.", imagePath: "../TarotCyberPunkX/images/2SWORDS.PNG", fileName: "./full_descriptions/52_2ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 53, name: "3 of Swords", description: "The 3 (Three) of Swords represents heartbreak, sorrow, and emotional pain.", imagePath: "../TarotCyberPunkX/images/3SWORDS.PNG", fileName: "./full_descriptions/53_3ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 54, name: "4 of Swords", description: "The 4 (Four) of Swords signifies rest, recuperation, and contemplation.", imagePath: "../TarotCyberPunkX/images/4SWORDS.PNG", fileName: "./full_descriptions/54_4ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 55, name: "5 of Swords", description: "The 5 (Five) of Swords represents conflict, defeat, and tension.", imagePath: "../TarotCyberPunkX/images/5SWORDS.PNG", fileName: "./full_descriptions/55_5ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 56, name: "6 of Swords", description: "The 6 (Six) of Swords symbolizes transition, change, and moving on.", imagePath: "../TarotCyberPunkX/images/6SWORDS.PNG", fileName: "./full_descriptions/56_6ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 57, name: "7 of Swords", description: "The 7 (Seven) of Swords represents deception, trickery, and strategy.", imagePath: "../TarotCyberPunkX/images/7SWORDS.PNG", fileName: "./full_descriptions/57_7ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 58, name: "8 of Swords", description: "The 8 (Eight) of Swords signifies restriction, fear, and feeling trapped.", imagePath: "../TarotCyberPunkX/images/8SWORDS.PNG", fileName: "./full_descriptions/58_8ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 59, name: "9 of Swords", description: "The 9 (Nine) of Swords represents anxiety, worry, and nightmares.", imagePath: "../TarotCyberPunkX/images/9SWORDS.PNG", fileName: "./full_descriptions/59_9ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 60, name: "10 of Swords", description: "The 10 (Ten) of Swords symbolizes betrayal, defeat, and painful endings.", imagePath: "../TarotCyberPunkX/images/10SWORDS.PNG", fileName: "./full_descriptions/60_10ofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 61, name: "Page of Swords", description: "The Page of Swords represents curiosity, communication, and vigilance.", imagePath: "../TarotCyberPunkX/images/PAGESWORDS.PNG", fileName: "./full_descriptions/61_11PageofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 62, name: "Knight of Swords", description: "The Knight of Swords symbolizes action, ambition, and impulsiveness.", imagePath: "../TarotCyberPunkX/images/KNIGHTSWORDS.PNG", fileName: "./full_descriptions/62_12KnightofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 63, name: "Queen of Swords", description: "The Queen of Swords represents independence, perceptiveness, and clear thinking.", imagePath: "../TarotCyberPunkX/images/QUEENSWORDS.PNG", fileName: "./full_descriptions/63_13QueenofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },
    { id: 64, name: "King of Swords", description: "The King of Swords symbolizes intellect, authority, and truth.", imagePath: "../TarotCyberPunkX/images/KINGSWORDS.PNG", fileName: "./full_descriptions/64_14KingofSwordsMinorArcana.txt", 
        website: "website-2", 
        category: "swords" },

    // Pentacles cards
    { id: 65, name: "Ace of Pentacles", description: "The Ace of Pentacles represents new financial or career opportunities, prosperity, and manifestation.", imagePath: "../TarotCyberPunkX/images/ACEPENTACLES.PNG", fileName: "./full_descriptions/65_1AceofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 66, name: "2 of Pentacles", description: "The 2 (Two) of Pentacles symbolizes balance, adaptability, and time management.", imagePath: "../TarotCyberPunkX/images/2PENTACLES.PNG", fileName: "./full_descriptions/66_2ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 67, name: "3 of Pentacles", description: "The 3 (Three) of Pentacles represents teamwork, collaboration, and building something together.", imagePath: "../TarotCyberPunkX/images/3PENTACLES.PNG", fileName: "./full_descriptions/67_3ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 68, name: "4 of Pentacles", description: "The 4 (Four) of Pentacles signifies control, stability, and material security.", imagePath: "../TarotCyberPunkX/images/4PENTACLES.PNG", fileName: "./full_descriptions/68_4ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 69, name: "5 of Pentacles", description: "The 5 (Five) of Pentacles represents financial loss, poverty, and feeling isolated.", imagePath: "../TarotCyberPunkX/images/5PENTACLES.PNG", fileName: "./full_descriptions/69_5ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 70, name: "6 of Pentacles", description: "The 6 (Six) of Pentacles symbolizes generosity, sharing wealth, and helping others.", imagePath: "../TarotCyberPunkX/images/6PENTACLES.PNG", fileName: "./full_descriptions/70_6ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 71, name: "7 of Pentacles", description: "The 7 (Seven) of Pentacles represents long-term investment, patience, and reward for hard work.", imagePath: "../TarotCyberPunkX/images/7PENTACLES.PNG", fileName: "./full_descriptions/71_7ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 72, name: "8 of Pentacles", description: "The 8 (Eight) of Pentacles signifies diligence, skill development, and craftsmanship.", imagePath: "../TarotCyberPunkX/images/8PENTACLES.PNG", fileName: "./full_descriptions/72_8ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 73, name: "9 of Pentacles", description: "The 9 (Nine) of Pentacles represents luxury, self-sufficiency, and financial independence.", imagePath: "../TarotCyberPunkX/images/9PENTACLES.PNG", fileName: "./full_descriptions/73_9ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 74, name: "10 of Pentacles", description: "The 10 (Ten) of Pentacles symbolizes wealth, legacy, and family traditions.", imagePath: "../TarotCyberPunkX/images/10PENTACLES.PNG", fileName: "./full_descriptions/74_10ofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 75, name: "Page of Pentacles", description: "The Page of Pentacles represents ambition, diligence, and a new opportunity in the material world.", imagePath: "../TarotCyberPunkX/images/PAGEPENTACLES.PNG", fileName: "./full_descriptions/75_11PageofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 76, name: "Knight of Pentacles", description: "The Knight of Pentacles symbolizes hard work, responsibility, and perseverance.", imagePath: "../TarotCyberPunkX/images/KNIGHTPENTACLES.PNG", fileName: "./full_descriptions/76_12KnightofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 77, name: "Queen of Pentacles", description: "The Queen of Pentacles represents nurturing, practicality, and financial security.", imagePath: "../TarotCyberPunkX/images/QUEENPENTACLES.PNG", fileName: "./full_descriptions/77_13QueenofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" },
    { id: 78, name: "King of Pentacles", description: "The King of Pentacles symbolizes wealth, leadership, and mastery over the material realm.", imagePath: "../TarotCyberPunkX/images/KINGPENTACLES.PNG", fileName: "./full_descriptions/78_14KingofPentaclesMinorArcana.txt", 
        website: "website-2", 
        category: "pentacles" }
];

const websiteNames = {
    "website-1": "CRYSTAL QUEENS",
    "website-2": "CYBER-X"
};

const websites = {
    "website-1": {
        name: "CRYSTAL QUEENS",
        iframeUrl: "../TarotCrystalQueens/index.html"
    },
    "website-2": {
        name: "CYBER-X",
        iframeUrl: "../TarotCyberPunkX/index.html"
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

document.addEventListener("DOMContentLoaded", () => {
    // Age Verification Logic
    document.getElementById("enter").addEventListener("click", function () {
        document.getElementById("age-verification").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    });

    document.getElementById("exit").addEventListener("click", function () {
        window.location.href = "https://www.google.com";
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

});
