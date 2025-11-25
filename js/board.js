import { createCardElement, flipCardVisual, hideCardVisual, playMatchSound, playWinSound } from './card.js';

const allCards = [
    'images/cat1.png','images/cat2.png','images/cat3.png','images/cat4.png',
    'images/cat5.png','images/cat6.png','images/cat7.png','images/cat8.png',
    'images/cat9.png','images/cat10.png','images/cat11.png','images/cat12.png',
    'images/cat13.png','images/cat14.png','images/cat15.png','images/cat16.png',
    'images/cat17.png','images/cat18.png','images/cat19.png','images/cat20.png',
    'images/cat21.png','images/cat22.png','images/cat23.png','images/cat24.png'
];

const gameBoard = document.getElementById('gameBoard');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let attempts = 0;
let canClick = false;
let startTime = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomCards(count) {
    const copy = [...allCards];
    shuffle(copy);
    return copy.slice(0, count);
}

export function createBoard(cardCount) {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    attempts = 0;
    lockBoard = false;
    canClick = false;
    startTime = Date.now();

    const pairCount = cardCount / 2;
    const selectedCards = getRandomCards(pairCount);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);

    cards.forEach((card, index) => {
        const cardElement = createCardElement(card);
        cardElement.style.animationDelay = `${index * 0.1}s`;
        cardElement._handler = () => handleCardFlip(cardElement);
        cardElement.addEventListener('click', cardElement._handler);
        gameBoard.appendChild(cardElement);
    });

    const maxDelay = cards.length * 0.1 * 1000 + 500;
    setTimeout(() => {
        canClick = true;
    }, maxDelay);
}

function handleCardFlip(cardElement) {
    if (!canClick) return;
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    flipCardVisual(cardElement);

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    lockBoard = true;
    attempts++;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', firstCard._handler);
    secondCard.removeEventListener('click', secondCard._handler);
    playMatchSound();
    matchedPairs++;
    resetBoard();

    if (matchedPairs === (gameBoard.children.length / 2)) {
        canClick = false;
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        setTimeout(() => {
            playWinSound();
            alert(`Onneksi olkoon! Löysit kaikki parit.\nYrityksiä: ${attempts}\nAika: ${timeSpent} sekuntia`);
        }, 500);
    }
}

function unflipCards() {
    setTimeout(() => {
        hideCardVisual(firstCard);
        hideCardVisual(secondCard);
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
