	

document.addEventListener("DOMContentLoaded", () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'; // Prevents browser from restoring the scroll position
    }

    getRandomContent(); // Load an image immediately

    preloadImages(images); // Preload other images in the background
});

// **Preload function** - Loads images into cache
function preloadImages(imgArray) {
    imgArray.forEach(path => {
        const img = new Image();
        img.src = path;
    });
}

// **Fetch and display a random image & quote immediately**
function getRandomContent() {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);

    const imgElement = document.getElementById("randomImage");

    // Display image instantly by setting src
    imgElement.src = images[randomImageIndex];
    imgElement.style.display = "block"; // Ensure visibility

    document.getElementById("randomQuote").textContent = quotes[randomQuoteIndex];

    console.log(`Chosen Image: ${images[randomImageIndex]}`);
}

// **Ensure the first image is shown immediately after a reload**
function reloadPage() {
    window.scrollTo(0, 0);
    getRandomContent(); // Load a new random image instantly
}


        const images = [
            // Original list
  "images/IMG_7855.JPG",
  "images/IMG_7856.JPG",
  "images/IMG_7857.JPG",
  "images/IMG_7858.JPG",
  "images/IMG_7859.JPG",
  "images/IMG_7860.JPG",
  "images/IMG_7861.JPG",
  "images/IMG_7862.JPG",
  "images/IMG_7863.JPG",
  "images/IMG_7864.JPG",
  "images/IMG_7865.JPG",
  "images/IMG_7866.JPG",
  "images/IMG_7867.JPG",
  "images/IMG_7868.JPG",
  "images/IMG_7869.JPG",
  "images/IMG_7871.JPG",
  "images/IMG_7872.JPG",
  "images/IMG_7873.JPG",
  "images/IMG_7874.JPG",
  "images/IMG_7875.JPG",
  "images/IMG_7876.JPG",
  "images/IMG_7877.JPG",
  "images/IMG_7878.JPG",
  "images/IMG_7879.JPG",
  "images/IMG_7880.JPG",
  "images/IMG_7881.JPG",
  "images/IMG_7882.JPG",
  "images/IMG_7883.JPG",
  "images/IMG_7884.JPG",
  "images/IMG_7885.JPG",
  "images/IMG_7886.JPG",
  "images/IMG_7887.JPG",
  "images/IMG_7888.JPG",
  "images/IMG_7889.JPG",
  "images/IMG_7890.JPG",
  "images/IMG_7891.JPG",
  "images/IMG_7892.JPG",
  "images/IMG_7893.JPG",
  "images/IMG_7894.JPG",
  "images/IMG_7895.JPG",
  "images/IMG_7896.JPG",
  "images/IMG_7897.JPG",
  "images/IMG_7898.JPG",
  "images/IMG_7899.JPG",
  "images/IMG_7900.JPG",
  "images/IMG_7901.JPG",
  "images/IMG_7902.JPG",
  "images/IMG_7904.JPG",
  "images/IMG_7905.JPG",
  "images/IMG_7906.JPG",
  "images/IMG_7907.JPG",
  "images/IMG_7908.JPG",
  "images/IMG_7909.JPG",
  "images/IMG_7910.JPG",
  "images/IMG_7911.JPG",
  "images/IMG_7912.JPG",
  "images/IMG_7913.JPG",
  "images/IMG_7914.JPG",
  "images/IMG_7915.JPG",
  "images/IMG_7916.JPG",
  "images/IMG_7917.JPG",
  "images/IMG_7918.JPG",
  "images/IMG_7919.JPG",
  "images/IMG_7920.JPG",
  "images/IMG_7921.JPG",
  "images/IMG_7922.JPG",
  "images/IMG_7923.JPG",
  "images/IMG_7924.JPG",
  "images/IMG_7925.JPG",
  "images/IMG_7926.JPG",
  "images/IMG_7927.JPG",
  "images/IMG_7928.JPG",
  "images/IMG_7929.JPG",
  "images/IMG_7930.JPG",
  "images/IMG_7931.JPG",
  "images/IMG_7932.JPG",
  "images/IMG_7933.JPG",
  "images/IMG_7934.JPG",
  "images/IMG_7935.JPG",
  "images/IMG_7936.JPG",
  "images/IMG_7937.JPG",
  "images/IMG_7938.JPG",
  "images/IMG_7939.JPG",
  "images/IMG_7940.JPG",
  "images/IMG_7941.JPG",
  "images/IMG_7942.JPG",
  "images/IMG_7943.JPG",
  "images/IMG_7944.JPG",
  "images/IMG_7945.JPG",
  "images/IMG_7946.JPG",
  "images/IMG_7947.JPG",
  "images/IMG_7948.JPG",
  "images/IMG_7949.JPG",

  // New additions
  "images/2014_1.jpg",
  "images/2014_2.jpg",
  "images/2014_3.jpg",
  "images/2014_4.jpg",
  "images/2014_5.jpg",
  "images/2014_6.jpg",
  "images/2014_7.jpg",
  "images/FullSizeRender_4.jpg",
  "images/FullSizeRender_5.jpg",
  "images/FullSizeRender_7_2.jpg",
  "images/FullSizeRender_7.jpg",
  "images/FullSizeRender_12.jpg",
  "images/FullSizeRender_13.jpg",
  "images/FullSizeRender_16.jpg",
  "images/FullSizeRender_18.jpg",
  "images/FullSizeRender_136.jpg",
  "images/FullSizeRender_137.jpg",
  "images/FullSizeRender_138.jpg",
  "images/FullSizeRender_139.jpg",
  "images/FullSizeRender_141.jpg",
  "images/FullSizeRender_145.jpg",
  "images/FullSizeRender_146.jpg",
  "images/FullSizeRender_149.jpg",
  "images/FullSizeRender_150.jpg",
  "images/FullSizeRender_151.jpg",
  "images/FullSizeRender_152.jpg",
  "images/FullSizeRender_153.jpg",
  "images/FullSizeRender_160.jpg",
  "images/FullSizeRender_162.jpg",
  "images/FullSizeRender_167.jpg",
  "images/FullSizeRender_169.jpg",
  "images/FullSizeRender_181.jpg",
  "images/FullSizeRender_182.jpg",
  "images/FullSizeRender_188.jpg",
  "images/FullSizeRender_191.jpg",
  "images/FullSizeRender_194.jpg",
  "images/FullSizeRender_195.jpg",
  "images/FullSizeRender_199.jpg",
  "images/FullSizeRender_200.jpg",
  "images/FullSizeRender_201.jpg",
  "images/FullSizeRender_208.jpg",
  "images/FullSizeRender_211.jpg",
  "images/FullSizeRender_213.jpg",
  "images/FullSizeRender.jpg",
  "images/IMG_0101.jpg",
  "images/IMG_0104.jpg",
  "images/IMG_0105.jpg",
  "images/IMG_0106.jpg",
  "images/IMG_0107.jpg",
  "images/IMG_0219.jpg",
  "images/IMG_1027.JPG",
  "images/IMG_1028.JPG",
  "images/IMG_1030.JPG",
  "images/IMG_1040.JPG",
  "images/IMG_1043.JPG",
  "images/IMG_1046.JPG",
  "images/IMG_1047.JPG",
  "images/IMG_1048.JPG",
  "images/IMG_1054.JPG",
  "images/IMG_1056.JPG",
  "images/IMG_1057.JPG",
  "images/IMG_1066.JPG",
  "images/IMG_1067.JPG",
  "images/IMG_1068.JPG",
  "images/IMG_1069.JPG",
  "images/IMG_1964.jpg",
  "images/IMG_1966.jpg",
  "images/IMG_1968.jpg",
  "images/IMG_1972.jpg",
  "images/IMG_1974.jpg",
  "images/IMG_1976.jpg",
  "images/IMG_1978.jpg",
  "images/IMG_3828.JPG",
  "images/IMG_4112.JPG",
  "images/IMG_4565.JPG",
  "images/IMG_4566.JPG",
  "images/IMG_4569.JPG",
  "images/IMG_4571.JPG",
  "images/IMG_4572.JPG",
  "images/IMG_5556.JPG",
  "images/IMG_5559.JPG",
  "images/IMG_5560.JPG",
  "images/IMG_5587.JPG",
  "images/IMG_5589.JPG",
  "images/IMG_5590.JPG",
  "images/IMG_6084.JPG",
  "images/IMG_6085.JPG",
  "images/IMG_6306.JPG",
  "images/IMG_6307.JPG",
  "images/IMG_6308.JPG",
  "images/IMG_6506_2.JPG",
  "images/IMG_6683.JPG",
  "images/IMG_6684.JPG",
  "images/IMG_6685.JPG",
  "images/IMG_6751.JPG",
  "images/IMG_6938.JPG",
  "images/IMG_7015.JPG",
  "images/IMG_7016.JPG",
  "images/IMG_7017.JPG",
  "images/IMG_7018.JPG",
  "images/IMG_7673.JPG",
  "images/IMG_7674.JPG",
  "images/IMG_7676.JPG",
  "images/IMG_7677.JPG",
  "images/IMG_7678.JPG",
  "images/IMG_7679.JPG",
  "images/IMG_7680.JPG",
  "images/IMG_7681.JPG",
  "images/IMG_7682.JPG",
  "images/IMG_7819.JPG",
  "images/IMG_7820.JPG",
  "images/IMG_7821.JPG",
  "images/IMG_7933.JPG",
  "images/IMG_8875.JPG",
  "images/IMG_9559.JPG",
  "images/IMG_9611.JPG",
  "images/IMG_9626.JPG",
  "images/P1010167.jpg",
  "images/thanks_for_visiting_laura_dejahn_and_trent.JPG",
  "images/trent_2.JPG",
  "images/trent_and_laura.JPG",
  "images/trent_and_pot_plants.JPG",
  "images/trent_and_us.JPG",
  "images/trent_and_uther.JPG",
  "images/trent_cozin_with.JPG",
  "images/trent_eyes.JPG",
  "images/trent_in_the_packed car.JPG",
  "images/trent_is_the_best.JPG",
  "images/trent_laura_sunset.JPG",
  "images/trent_on_a_stool_at_rolands.JPG",
  "images/trent_on_bed.JPG",
  "images/trent_on_the_beach.JPG",
  "images/trent_prarie_dog.JPG",
  "images/trent_rainbow.JPG",
  "images/trent_says_hello.JPG",
  "images/trent_snuggle.JPG",
  "images/trent_spencers_butte.JPG",
  "images/trent_tie_dye_2.JPG",
  "images/trent_tie_dye.JPG",
  "images/trent_welcomes_us_home_sweet_home.JPG",
  "images/trent.jpg",
  "images/trent1_2.JPG",
  "images/trent1.jpg",
  "images/trents_and_lauras_underbite_fight.JPG"
        ];
				
        const quotes = [
    "I'm not lazy, I'm just conserving energy for my next adventure!",
    "Beach runs are the best runs.",
    "Life is better with a bow tie and a nap.",
    "If there's no couch, I'm not interested.",
    "Happiness is a belly rub away.",
    "Why walk when you can roll in the grass?",
    "Sunsets at the beach make everything better.",
    "Adventure is fun, but naps are divine.",
    "There's no such thing as too much sleep.",
    "A nap a day keeps the boredom away.",
    "I live for love, naps, and snacks.",
    "I wasn't made for fetching; I was made for chilling.",
    "It’s not a lazy day; it’s a Trent day.",
    "I don’t chase balls; I chase dreams.",
    "Sleep is the real adventure.",
    "Bow ties make everything fancy.",
    "I’m not spoiled; I’m just well-loved.",
    "The world is my couch, and I intend to nap on it.",
    "Who needs running when you can stroll in style?",
    "My heart belongs to the beach.",
    "I dream of beach days and belly rubs.",
    "Sometimes, the smallest dog has the biggest spirit.",
    "Every dog has its day—mine just involves more napping.",
    "There’s no shame in being a professional sleeper.",
    "I bark for fun, not for work.",
    "I’m not stubborn; I’m selectively obedient.",
    "The beach is my happy place.",
    "Why be ordinary when you can be an Ewok dog?",
    "I don’t need much, just a comfy spot and a snack.",
    "Lazy? No, I prefer the term 'energy efficient.'",
    "Love me, pet me, and never leave me.",
    "Life’s too short for bad treats.",
    "Follow your heart, especially if it leads to the couch.",
    "Good dogs are loved; great dogs are pampered.",
    "I may be little, but I’m full of love.",
    "There’s nothing better than a nap on a rainy day.",
    "Dogs who nap together, stay together.",
    "The couch isn’t just furniture; it’s a lifestyle.",
    "All you need is love…and a comfy bed.",
    "Why fetch when you can cuddle?",
    "Belly rubs are the key to happiness.",
    "I’m a nap enthusiast and a snack connoisseur.",
    "Every day should be a beach day.",
    "Chasing squirrels? Nah, I’m chasing dreams.",
    "I don’t follow trends; I follow my human.",
    "The beach is my playground, and the couch is my throne.",
    "Life’s too short for boring adventures.",
    "I’d rather be napping than doing just about anything.",
    "Being cute is my full-time job.",
    "Take time to stop and smell the snacks.",
    "Always wear your best bow tie for every occasion.",
    "Couch potatoes unite!",
    "My superpower is making humans smile.",
    "A wagging tail is the best kind of happiness.",
    "I don’t climb mountains, but I do climb on couches.",
    "Live like someone left the treat jar open.",
    "Let the wind ruffle your fur and the sun warm your belly.",
    "Always nap like no one's watching.",
    "The beach is calling, and I must roll in the sand.",
    "True love is sharing your favorite spot on the couch.",
    "Adventures are fun, but so are cozy blankets.",
    "Never underestimate the power of a well-timed nap.",
    "I’m the king of my own comfy kingdom.",
    "Live life unleashed.",
    "The couch is my kingdom, and I am its ruler.",
    "It’s a beautiful day to do absolutely nothing.",
    "I may not be fast, but I’m incredibly cute.",
    "Loyalty looks like following your human everywhere.",
    "The softer the couch, the better the nap.",
    "Nothing beats a lazy day in the sun.",
    "You can take the dog out of the couch, but you can’t take the couch out of the dog.",
    "Cuddles are the best kind of medicine.",
    "I like my naps long and my treats frequent.",
    "Why chase sticks when you can chase snacks?",
    "I believe in taking it easy, one day at a time.",
    "I don’t need much, just love, naps, and snacks.",
    "I’m not antisocial; I’m just saving my energy.",
    "There’s no such thing as too many naps.",
    "Life’s a beach, and I’m here for the naps.",
    "Find a comfy spot and let the world pass by.",
    "I’d rather be snoozing.",
    "Sleep tight, dream big.",
    "I don’t need a leash; I need a nap.",
    "Good things come to those who sleep.",
    "Dreams are made of naps and snacks.",
    "I’m not lazy; I’m a nap enthusiast.",
    "A dog’s life is a good life.",
    "Wherever my human goes, I follow.",
    "I sleep to live and live to sleep.",
    "The best adventures start with a nap.",
    "Why walk when you can ride in style?",
    "Never let anyone disturb your nap.",
    "Life is simple: eat, sleep, and cuddle.",
    "Live, love, and nap often.",
    "A nap is never wasted time.",
    "The best view is from the couch.",
    "Why fetch when you can lounge?",
    "It’s not a lazy day; it’s a relaxed day.",
    "Treat yourself, always.",
    "The comfiest place is where I lay my head.",
    "Sunshine and naps—my perfect day.",
    "I’m always ready for a cuddle.",
    "I may look like an Ewok, but I’m a couch king.",
    "Every dog has its day; mine just involves more napping.",
    "Cuddle first, ask questions later.",
    "I bark, therefore I am.",
    "The softer the bed, the sweeter the dream.",
    "Dogs who nap together stay together.",
    "My motto: sleep in, play later.",
    "I’m not just a dog; I’m an expert lounger.",
    "Why rush when you can take it slow?",
    "I wasn’t built for speed; I was built for comfort.",
    "The couch is calling, and I must go.",
    "I live to love, laugh, and sleep.",
    "The beach is my paradise, and the couch is my throne.",
    "I’ve mastered the art of doing nothing.",
    "Couch time is quality time.",
    "Napping is my cardio.",
    "Live in the moment, nap in the next.",
    "Who needs toys when you have a comfy bed?",
    "Always stay pawsitive.",
    "Nap like you mean it.",
    "I’m not tired; I’m just in rest mode.",
    "Every day should include a nap break.",
    "The beach breeze is my lullaby.",
    "I don’t fetch; I relax.",
    "My spirit animal is a couch potato.",
    "Why bark when you can snuggle?",
    "Dogs make the best pillows.",
    "The world needs more nap enthusiasts.",
    "Wag more, nap often.",
    "Boring days don’t exist when you’re a dog.",
    "The sun is the best blanket.",
    "I’m the nap champion of the world.",
    "No adventure is complete without a nap break.",
    "I’m not spoiled; I’m cherished.",
    "My mission in life: maximize comfort.",
    "I nap hard, I play easy.",
    "Who needs an alarm clock when you have treats?",
    "The couch is my playground.",
    "Never let a comfy spot go to waste.",
    "I don’t need toys; I need naps.",
    "I’m not demanding; I just know what I like.",
    "Sunshine and belly rubs are life’s best treasures.",
    "I’ll follow you anywhere, as long as there’s a treat.",
    "Life’s a breeze when you’re napping in the sun.",
    "I’m not just a dog; I’m a relaxation expert.",
    "I sleep with one eye open, dreaming of treats.",
    "Why stress when you can snooze?",
    "I’ve perfected the art of relaxation.",
    "Let the good times nap.",
    "Why run when you can rest?",
    "I’m not tired; I’m just highly relaxed.",
    "Happiness is a warm bed and a full belly.",
    "I take life one nap at a time.",
    "My life philosophy: sleep, eat, repeat.",
    "Napping is an art form, and I’m the artist.",
    "I live for belly rubs and treats.",
    "I’m not clingy; I’m loyal.",
    "The beach is my playground, and the world is my bed.",
    "I’m the king of comfort.",
    "No adventure is complete without a nap.",
    "Dream big, nap bigger.",
    "Life’s a beach, so make the most of it.",
    "I’m a pro at taking it easy.",
    "The softer the blanket, the happier the dog.",
    "I’m not lazy; I’m an expert lounger.",
    "The couch is my favorite travel destination.",
    "Love me, feed me, never leave me.",
    "I don’t chase; I contemplate.",
    "Comfort is my middle name.",
    "Sleep now, adventure later.",
    "If it’s not comfy, it’s not for me.",
    "My motto: more naps, less stress.",
    "The best things in life are naps.",
    "Cuddles and comfort are life’s essentials.",
    "Why be active when you can be relaxed?",
    "Live like every day is a Sunday.",
    "My spirit is wild, but my body is resting.",
    "I’m a nap expert and a treat enthusiast.",
    "Why settle for one nap when you can have three?",
    "Love is lying on the couch together.",
    "Sleepy dogs are happy dogs.",
    "Comfort is a way of life.",
    "I don’t do mornings.",
    "Dogs make life better, one nap at a time.",
    "I follow my heart and my human.",
    "Why chase your tail when you can chase dreams?",
    "The best days are spent doing nothing.",
    "There’s no wrong time for a nap.",
    "The world is my bed, and I intend to sleep on it.",
    "I’m not shy; I’m just saving my energy.",
    "Lazy days are the best days.",
    "I’m living my best couch life.",
    "The beach is my happy place.",
    "Why run when you can stroll?",
    "I don’t bark; I make statements.",
    "The world needs more napping dogs.",
    "Life is better with a little sand between your paws.",
    "Live for the moments that make you nap.",
    "I’m a dog of leisure and luxury.",
    "My ideal day: beach, treats, and naps.",
    "I’m a master of rest and relaxation.",
    "Love like there’s no tomorrow, nap like there’s no today.",
    "I’m a simple dog: I like treats, naps, and beach days.",
    "Why hurry when you can dawdle?",
    "I’m not sleepy; I’m just deep in thought.",
    "The couch is my throne, and I am its king.",
    "Happiness is a warm spot in the sun.",
    "Sleep well, dream often.",
    "Dogs make the world a cozier place.",
    "The best adventures start with a nap.",
    "My love for naps is unconditional.",
    "A life well-lived includes plenty of sleep.",
    "I don’t bark at strangers; I nap at them.",
    "Let the wind carry your worries away.",
    "I’m not bored; I’m in rest mode.",
    "Comfort is key to a happy life.",
    "Why be serious when you can be cozy?",
    "Live slow, nap often.",
    "A well-deserved nap is the best reward.",
    "I’m not lazy; I’m highly efficient at resting.",
    "Dogs who nap are dogs who love deeply.",
    "A comfy spot is worth its weight in gold.",
    "I’m not just a dog; I’m a professional lounger.",
    "Sleep like there’s no tomorrow.",
    "Let your dreams be big and your naps be long.",
    "The best days are spent by the sea.",
    "I live for the sound of the waves and the warmth of the sun.",
    "There’s always time for one more nap.",
    "Why stress when you can rest?",
    "My mission: find the world’s best napping spots.",
    "I’m not tired; I’m recharging my cute.",
    "The world is my playground, and the couch is my resting place.",
    "Why be active when you can be comfortable?",
    "The best adventures are followed by the best naps.",
    "I’m a nap enthusiast and a comfort expert.",
    "Why be ordinary when you can be napping?",
    "My spirit is wild, but my heart is resting.",
    "Always let the good times nap.",
    "Let the breeze ruffle your fur and the sun warm your belly.",
    "I may be small, but my naps are legendary.",
    "The best days are beach days.",
    "Why run when you can stroll?",
    "Sleep tight, dream bright.",
    "Comfort first, adventures second.",
    "Why hurry when you can dawdle?",
    "Life’s too short to skip a nap.",
    "Live with all your heart and nap with all your might.",
    "The world needs more napping dogs.",
    "There’s no wrong time for a nap.",
    "Comfort is a way of life.",
    "I’m a simple dog: I like treats, naps, and beach days."
];

// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}

// Scroll to the bottom of the page
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight, // Scroll to the full height of the page
        behavior: 'smooth' // Smooth scrolling effect
    });
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

        

        

        document.addEventListener("DOMContentLoaded", () => {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
        });

       // Function to toggle visibility on button clicks
function toggleVisibility(id, buttonId) {
    const element = document.getElementById(id);
    const button = buttonId ? document.getElementById(buttonId) : null;

    const isHidden = element.classList.contains('hidden') || element.style.display === 'none';

    if (isHidden) {
        // Show the container
        element.classList.remove('hidden');
        element.style.display = 'flex';

        if (button) {
            button.innerHTML = id === 'gallery' 
                ? '<strong>Close Gallery</strong>' 
                : id === 'socialLinks' 
                ? '<strong>Close Links</strong>' 
                : id === 'trentMovies' 
                ? '<strong>Close Gifs & Movies</strong>' 
                : button.innerHTML;
        }
    } else {
        // Hide the container
        element.classList.add('hidden');
        element.style.display = 'none';

        if (button) {
            button.innerHTML = id === 'gallery' 
                ? '<strong>Gallery</strong>' 
                : id === 'socialLinks' 
                ? '<strong>Social Links</strong>' 
                : id === 'trentMovies' 
                ? '<strong>Gifs & Movies</strong>' 
                : button.innerHTML;
        }
    }
}

// **For Navigation Clicks Only**
function scrollToSection(id) {
    const element = document.getElementById(id);
    const isHidden = element.classList.contains('hidden') || element.style.display === 'none';

    if (isHidden) {
        toggleVisibility(id, null, true); // Open but don’t close
    }

    setTimeout(() => {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    }, 50);
}

// **For Button Clicks Only (Toggles Without Scrolling)**
function toggleSection(id) {
    const buttonId = id === 'gallery' ? 'galleryButton' 
                 : id === 'socialLinks' ? 'socialLinksButton' 
                 : id === 'trentMovies' ? 'trentMoviesButton' 
                 : null; 

    toggleVisibility(id, buttonId); // Toggle open/close
}