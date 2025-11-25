const flipSound = new Audio('sounds/flip.mp3');
const matchSound = new Audio('sounds/match.mp3');
const winSound = new Audio('sounds/win.mp3');

export function createCardElement(cardPath) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = cardPath;
    return cardElement;
}

export function flipCardVisual(cardElement) {
    cardElement.classList.add('flipped');
    cardElement.style.backgroundImage = `url("${cardElement.dataset.card}")`;
    flipSound.currentTime = 0;
    flipSound.play();
}

export function hideCardVisual(cardElement) {
    cardElement.classList.remove('flipped');
    cardElement.style.backgroundImage = '';
}

export function playMatchSound() {
    matchSound.currentTime = 0;
    matchSound.play();
}

export function playWinSound() {
    winSound.currentTime = 0;
    winSound.play();
}
