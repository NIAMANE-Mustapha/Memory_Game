const gameBoard = document.querySelector('.game-board');
const turnsDisplay = document.querySelector('.turns');
const resetButton = document.querySelector('.reset-button');

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let turns = 0;

const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const doubledCardValues = [...cardValues, ...cardValues];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const createBoard = () => {
    shuffleArray(doubledCardValues);
    doubledCardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = value;
        card.style.color = 'transparent';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
};

const flipCard = (e) => {
    if (lockBoard) return;
    const card = e.target;
    if (card === firstCard) return;
    card.classList.add('flip');
    card.style.color = '#1e90ff';

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = card;
        return;
    }

    secondCard = card;
    checkForMatch();
};

const checkForMatch = () => {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    isMatch ? disableCards() : unflipCards();
};

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
};

const unflipCards = () => {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        firstCard.style.color = 'transparent';
        secondCard.style.color = 'transparent';
        resetBoard();
    }, 1500);
};

const resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    turns++;
    turnsDisplay.textContent = turns;
};

const resetGame = () => {
    cards.forEach(card => {
        card.remove();
    });
    cards = [];
    turns = 0;
    turnsDisplay.textContent = turns;
    createBoard();
};

resetButton.addEventListener('click', resetGame);

createBoard();
