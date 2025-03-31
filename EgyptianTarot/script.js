//Variables globales
let count=0, countt=0, max=22, min=1, mem, meem
let bTn = document.getElementById('btn')
let unc = document.getElementById('userNumCards')
//Eventos
bTn.addEventListener('click', tiradaTarot)
//Lista de nombres cartas
let cards = [
    'TAROT',
    'The Magician (El Mago)',
    'The High Priestess (La Sacerdotisa)',
    'The Empress (La Emperatriz)',
    'The Emperor (El Emperador)',
    'The Hierarch (El Terarca)',
    'Indecision (La Indecisión)',
    'Triumph (El Triunfo)',
    'Justice (La Justicia)',
    'The Hermit (El Eremita)',
    'Retribution (La Retribución)',
    'Persuasion (La Persuasión)',
    'The Apostolate (El Apostolado)',
    'Immortality (La Inmortalidad)',
    'Temperance (La Temperancia)',
    'Passion (La Pasión)',
    'Fragility (La Fragilidad)',
    'Hope (La Esperanza)',
    'Twilight (El Crepúsculo)',
    'Inspiration (La Inspiración)',
    'Resurrection (La Resurrección)',
    'Transmutation (La Transmutación)',
    'The Return (El Regreso)'
];

cardsimages = [
    '',
    './images/1.jpg',
    './images/2.jpg',
    './images/3.jpg',
    './images/4.jpg',
    './images/5.jpg',
    './images/6.jpg',
    './images/7.jpg',
    './images/8.jpg',
    './images/9.jpg',
    './images/10.jpg',
    './images/11.jpg',
    './images/12.jpg',
    './images/13.jpg',
    './images/14.jpg',
    './images/15.jpg',
    './images/16.jpg',
    './images/17.jpg',
    './images/18.jpg',
    './images/19.jpg',
    './images/20.jpg',
    './images/21.jpg',
    './images/22.jpg'
]

let cardsdesctiptions = ["", "ok", "ok","ok", "ok", "ok", "ok","ok", "ok", "ok", "ok", "ok", "ok","ok", "ok", "ok", "ok","ok", "ok", "ok", "ok", "ok", "ok"]



let card = {
  numero:"",
  nombre:"",
  image:"",
  desctiption:"",
  active:false,
}

function tiradaTarot() {
    tiradaT(unc.value)
	//settimeOut(tiradas(3), 1000);
}
var tirada = [], tarotCards = []
function centerScreen() {
    const x = (document.documentElement.scrollWidth - window.innerWidth) / 2;
    const y = (document.documentElement.scrollHeight - window.innerHeight) / 2;
    
    window.scrollTo({ left: x, top: y, behavior: 'smooth' });
}

function tiradaT(numCards) {
    if (numCards > 22) {
        // Blur input to remove focus
        unc.blur();
        
        // Scroll to center of screen (both horizontal and vertical)
        centerScreen();

        // Show the warning popup
        swal({ 
            text: `This Major Tarot Collection has 22 cards. You cannot choose more than 22. I recommend draws of 3, 5, or 10.`,
            icon: "warning",
            button: "OK",
        });

        return;
    }

    document.getElementById('tiradaTres').innerHTML = '';
    tirada = [];
    
    // Create a shuffled deck with all available card numbers
    let availableCards = Array.from({ length: 22 }, (_, i) => i + 1);
    
    // Shuffle the available cards
    availableCards = availableCards.sort(() => Math.random() - 0.5);

    for (let i = 0; i < numCards; i++) {
        let cardNumber = availableCards[i];  // Get the next unique card from the shuffled deck
        let cardName = cards[cardNumber];
        let cardImage = cardsimages[cardNumber];

        tirada.push(cardNumber);

        // Add the card to the UI
        document.getElementById('tiradaTres').innerHTML += `
            <li class="col-xs-4 cardli">
                <img src="${cardImage}" class="img-responsive">
                <p class="card-name">${cardName}</p>
            </li>
        `;
    }

    console.log(`Draw ${count++}, the cards are ${tirada}`);
}

//Arrow Function
const getRandomCard = (max, min) => Math.round(Math.random() * (max - min)) + min
//  function getRandomCard(max, min) {
//      Math.round(Math.random() * (max - min)) + min
//  }



//Mostrar Cartas ForEach
//Ejecuta la función indicada una vez por cada elemento del array.
cards.forEach(function(el) {
	tarotCards.push("")
  if (count < 22) {
	  count++
	  card = new Object()
	  card.numero = count
	  card.nombre = cards[count]
	  card.image = cardsimages[count]
	  card.active = false
	  tarotCards.push(card)
	  cardsList.innerHTML += `<span><img class="card" src="${card.image}" width=90></span>`
	  console.log(card.nombre)	  
  }

})
//for(let i=1; i<22; i++){
//  console.log(cards[i], i)
//  cardsList.innerHTML += `<li>${i}, ${cards[i]}</li>`
//}