const icons = [
  { path: './images/koala.png', alt: 'koala' },
  { path: './images/lion.png', alt: 'lion' },
  { path: './images/cow.png', alt: 'cow' },
  { path: './images/whale.png', alt: 'whale' },
  { path: './images/fox.png', alt: 'fox' },
  { path: './images/elephant.png', alt: 'elephant' },
  { path: './images/koala.png', alt: 'koala' },
  { path: './images/lion.png', alt: 'lion' },
  { path: './images/cow.png', alt: 'cow' },
  { path: './images/whale.png', alt: 'whale' },
  { path: './images/fox.png', alt: 'fox' },
  { path: './images/elephant.png', alt: 'elephant' },
];

const flipCards = new Set();
const gameResult = document.querySelector('.game-result');
const cardContainer = document.querySelector('.card-container');
const pTries = document.querySelector('.tries');
let winCounter = 0;
let tries = 6;

// Add click listener for cards
cardContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('front')) return;
  flipCard(e.target.parentElement, 180);
  storeCardInSet(e.target.parentElement);
  checkForTwoFlipCards();
});

// Add click listener to restart button
gameResult.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  restartGame();
});

// Randomize the icons array every time we start a new game
const randomizeIcons = () => icons.sort(() => Math.random() - 0.5);

// Shows the cards template
const generateCardsTemplate = () => {
  let html = '';
  icons.forEach((icon) => {
    html += `
      <div class="flip">
        <div class="card">
          <div class="front"></div>
          <div class="back">
            <img src=${icon.path}  alt=${icon.alt}/>
          </div>
        </div>
      </div>
    `;
  });
  cardContainer.innerHTML = html;
};

const flipCard = (card, deg) => {
  card.style.transform = `rotateY(${deg}deg)`;
};

// Setting the card element in the set
// We store only 2 card elements each time
const storeCardInSet = (card) =>
  flipCards.add(card.lastElementChild.lastElementChild);

const checkForTwoFlipCards = () => {
  if (flipCards.size !== 2) return;
  checkCards();
  checkForWin();
  removeCardsFromSet();
};

// Checking the two cards if are the same or different
const checkCards = () => {
  const iterator = flipCards.values();
  const card1 = iterator.next().value;
  const card2 = iterator.next().value;
  if (card1.src === card2.src) {
    winCounter++;
    return;
  }
  setCardsFront(card1, card2);
  pTries.innerText = `Tries: ${--tries}`;
  checkForLoose();
};

const checkForLoose = () => {
  if (tries > 0) return;
  setTimeout(hideCards, 1000);
  setTimeout(showLooseMessage, 1200);
};

const checkForWin = () => {
  if (winCounter !== icons.length / 2) return;
  setTimeout(hideCards, 1000);
  setTimeout(showWinMessage, 1200);
};

// Removes the card element from the set
// This happens because every time we check 2 cards
const removeCardsFromSet = () => flipCards.clear();

// Setting cards back to "front" face if the cards are different
const setCardsFront = (card1, card2) => {
  setTimeout(() => {
    flipCard(card1.parentElement.parentElement, 360);
    flipCard(card2.parentElement.parentElement, 360);
  }, 1000);
};

// Shows win template
const showWinMessage = () => {
  gameResult.innerHTML = `
  <img src='./images/giphy.gif' />
  <p class="success">Congratulations, You won!</p>
  <button class="btn">Restart Game!</button>`;
};

// Shows loose template
const showLooseMessage = () => {
  gameResult.innerHTML = `
  <img src='./images/game-over.gif' />
  <p class="loose">Game Over, You lost!</p>
  <button class="btn">Restart Game!</button>`;
};

// Hiding cards when we have a winner
const hideCards = () => {
  cardContainer.style.display = 'none';
};

const restartGame = () => {
  winCounter = 0;
  tries = 6;
  pTries.innerText = `Tries: ${tries}`;
  gameResult.innerHTML = '';
  cardContainer.style.display = 'grid';
  cardContainer.innerHTML = '';
  randomizeIcons();
  generateCardsTemplate();
};

randomizeIcons();
generateCardsTemplate();
