const descriptions = [
       // Major Arcana (previous entries)
    { id: 1, name: "Fool", fileName: "1_0TheFoolMajorArcana.txt" },
    { id: 2, name: "Magician", fileName: "2_1TheMagicianMajorArcana.txt" },
    { id: 3, name: "High Priestess", fileName: "3_2TheHighPriestessMajorArcana.txt" },
    { id: 4, name: "Empress", fileName: "4_3TheEmperessMajorArcana.txt" },
    { id: 5, name: "Emperor", fileName: "5_4TheEmperorMajorArcana.txt" },
    { id: 6, name: "Hierophant", fileName: "6_5TheHierophantMajorArcana.txt" },
    { id: 7, name: "Lovers", fileName: "7_6TheLoversMajorArcana.txt" },
    { id: 8, name: "Chariot", fileName: "8_7TheChariotMajorArcana.txt" },
    { id: 9, name: "Strength", fileName: "9_8StrengthMajorArcana.txt" },
    { id: 10, name: "Hermit", fileName: "10_9TheHermitMajorArcana.txt" },
    { id: 11, name: "Wheel of Fortune", fileName: "11_10WheelOfFortuneMajorArcana.txt" },
    { id: 12, name: "Justice", fileName: "12_11JusticeMajorArcana.txt" },
    { id: 13, name: "Hanged Man", fileName: "13_12TheHangedManMajorArcana.txt" },
    { id: 14, name: "Death", fileName: "14_13DeathMajorArcana.txt" },
    { id: 15, name: "Temperance", fileName: "15_14TemperanceMajorArcana.txt" },
    { id: 16, name: "Devil", fileName: "16_15TheDevilMajorArcana.txt" },
    { id: 17, name: "Tower", fileName: "17_16TheTowerMajorArcana.txt" },
    { id: 18, name: "Star", fileName: "18_17TheStarMajorArcana.txt" },
    { id: 19, name: "Moon", fileName: "19_18TheMoonMajorArcana.txt" },
    { id: 20, name: "Sun", fileName: "20_19TheSunMajorArcana.txt" },
    { id: 21, name: "Judgement", fileName: "21_20JudgementMajorArcana.txt" },
    { id: 22, name: "World", fileName: "22_21TheWorldMajorArcana.txt" },

    // Wands cards (previous entries)
    { id: 23, name: "Ace of Wands", fileName: "23_1AceofWandsMinorArcana.txt" },
    { id: 24, name: "2 of Wands", fileName: "24_2ofWandsMinorArcana.txt" },
    { id: 25, name: "3 of Wands", fileName: "25_3ofWandsMinorArcana.txt" },
    { id: 26, name: "4 of Wands", fileName: "26_4ofWandsMinorArcana.txt" },
    { id: 27, name: "5 of Wands", fileName: "27_5ofWandsMinorArcana.txt" },
    { id: 28, name: "6 of Wands", fileName: "28_6ofWandsMinorArcana.txt" },
    { id: 29, name: "7 of Wands", fileName: "29_7ofWandsMinorArcana.txt" },
    { id: 30, name: "8 of Wands", fileName: "30_8ofWandsMinorArcana.txt" },
    { id: 31, name: "9 of Wands", fileName: "31_9ofWandsMinorArcana.txt" },
    { id: 32, name: "10 of Wands", fileName: "32_10ofWandsMinorArcana.txt" },
    { id: 33, name: "Page of Wands", fileName: "33_11PageofWandsMinorArcana.txt" },
    { id: 34, name: "Knight of Wands", fileName: "34_12KnightofWandsMinorArcana.txt" },
    { id: 35, name: "Queen of Wands", fileName: "35_13QueenofWandsMinorArcana.txt" },
    { id: 36, name: "King of Wands", fileName: "36_14KingofWandsMinorArcana.txt" },

    // Cups cards
    { id: 37, name: "Ace of Cups", fileName: "37_1AceofCupsMinorArcana.txt" },
    { id: 38, name: "2 of Cups", fileName: "38_2ofCupsMinorArcana.txt" },
    { id: 39, name: "3 of Cups", fileName: "39_3ofCupsMinorArcana.txt" },
    { id: 40, name: "4 of Cups", fileName: "40_4ofCupsMinorArcana.txt" },
    { id: 41, name: "5 of Cups", fileName: "41_5ofCupsMinorArcana.txt" },
    { id: 42, name: "6 of Cups", fileName: "42_6ofCupsMinorArcana.txt" },
    { id: 43, name: "7 of Cups", fileName: "43_7ofCupsMinorArcana.txt" },
    { id: 44, name: "8 of Cups", fileName: "44_8ofCupsMinorArcana.txt" },
    { id: 45, name: "9 of Cups", fileName: "45_9ofCupsMinorArcana.txt" },
    { id: 46, name: "10 of Cups", fileName: "46_10ofCupsMinorArcana.txt" },
    { id: 47, name: "Page of Cups", fileName: "47_11PageofCupsMinorArcana.txt" },
    { id: 48, name: "Knight of Cups", fileName: "48_12KnightofCupsMinorArcana.txt" },
    { id: 49, name: "Queen of Cups", fileName: "49_13QueenofCupsMinorArcana.txt" },
    { id: 50, name: "King of Cups", fileName: "50_14KingofCupsMinorArcana.txt" },

    // Swords cards
    { id: 51, name: "Ace of Swords", fileName: "51_1AceofSwordsMinorArcana.txt" },
    { id: 52, name: "2 of Swords", fileName: "52_2ofSwordsMinorArcana.txt" },
    { id: 53, name: "3 of Swords", fileName: "53_3ofSwordsMinorArcana.txt" },
    { id: 54, name: "4 of Swords", fileName: "54_4ofSwordsMinorArcana.txt" },
    { id: 55, name: "5 of Swords", fileName: "55_5ofSwordsMinorArcana.txt" },
    { id: 56, name: "6 of Swords", fileName: "56_6ofSwordsMinorArcana.txt" },
    { id: 57, name: "7 of Swords", fileName: "57_7ofSwordsMinorArcana.txt" },
    { id: 58, name: "8 of Swords", fileName: "58_8ofSwordsMinorArcana.txt" },
    { id: 59, name: "9 of Swords", fileName: "59_9ofSwordsMinorArcana.txt" },
    { id: 60, name: "10 of Swords", fileName: "60_10ofSwordsMinorArcana.txt" },
    { id: 61, name: "Page of Swords", fileName: "61_11PageofSwordsMinorArcana.txt" },
    { id: 62, name: "Knight of Swords", fileName: "62_12KnightofSwordsMinorArcana.txt" },
    { id: 63, name: "Queen of Swords", fileName: "63_13QueenofSwordsMinorArcana.txt" },
    { id: 64, name: "King of Swords", fileName: "64_14KingofSwordsMinorArcana.txt" },

    // Pentacles cards
    { id: 65, name: "Ace of Pentacles", fileName: "65_1AceofPentaclesMinorArcana.txt" },
    { id: 66, name: "2 of Pentacles", fileName: "66_2ofPentaclesMinorArcana.txt" },
    { id: 67, name: "3 of Pentacles", fileName: "67_3ofPentaclesMinorArcana.txt" },
    { id: 68, name: "4 of Pentacles", fileName: "68_4ofPentaclesMinorArcana.txt" },
    { id: 69, name: "5 of Pentacles", fileName: "69_5ofPentaclesMinorArcana.txt" },
    { id: 70, name: "6 of Pentacles", fileName: "70_6ofPentaclesMinorArcana.txt" },
    { id: 71, name: "7 of Pentacles", fileName: "71_7ofPentaclesMinorArcana.txt" },
    { id: 72, name: "8 of Pentacles", fileName: "72_8ofPentaclesMinorArcana.txt" },
    { id: 73, name: "9 of Pentacles", fileName: "73_9ofPentaclesMinorArcana.txt" },
    { id: 74, name: "10 of Pentacles", fileName: "74_10ofPentaclesMinorArcana.txt" },
    { id: 75, name: "Page of Pentacles", fileName: "75_11PageofPentaclesMinorArcana.txt" },
    { id: 76, name: "Knight of Pentacles", fileName: "76_12KnightofPentaclesMinorArcana.txt" },
    { id: 77, name: "Queen of Pentacles", fileName: "77_13QueenofPentaclesMinorArcana.txt" },
    { id: 78, name: "King of Pentacles", fileName: "78_14KingofPentaclesMinorArcana.txt" }
];
    const itemButtons = document.getElementById('item-buttons');
    const popup = document.querySelector('.popup');
    const closeBtn = popup.querySelector('.close');
    const cardTitle = popup.querySelector('h3');
    const descriptionContainer = popup.querySelector('p');

    descriptions.forEach(card => {
        const button = document.createElement('button');
        button.textContent = card.name;
        button.classList.add('neumorphic-button');
        button.addEventListener('click', () => {
            cardTitle.textContent = card.name;
            fetch(`descriptions/${card.fileName}`)
                .then(response => {
                    if (!response.ok) throw new Error("Description not found.");
                    return response.text();
                })
                .then(text => {
                    descriptionContainer.textContent = text;
                    popup.classList.add('show');
                })
                .catch(err => {
                    descriptionContainer.textContent = err.message;
                    popup.classList.add('show');
                });
        });
        itemButtons.appendChild(button);
    });

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
    });