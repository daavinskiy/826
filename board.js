import { createCardElement, flipCardVisual, hideCardVisual } from './card.js';

const allCards = [
    '🍎','🍐','🍒','🍉','🍇','🍓','🍌','🍍',
    '🥝','🥥','🍑','🍈','🍋','🍊','🍏','🍅'
];

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function createBoard(cardCount) {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    const selectedCards = allCards.slice(0, cardCount / 2);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);

    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement._handler = () => handleCardFlip(cardElement);
        cardElement.addEventListener('click', cardElement._handler);
        gameBoard.appendChild(cardElement);
    });
}

function handleCardFlip(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    flipCardVisual(cardElement);

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    lockBoard = true;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', firstCard._handler);
    secondCard.removeEventListener('click', secondCard._handler);
    matchedPairs++;
    resetBoard();

    if (matchedPairs === (gameBoard.children.length / 2)) {
        setTimeout(() => {
            alert("Onneksi olkoon! Löysit kaikki parit!");
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
