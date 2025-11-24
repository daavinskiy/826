export function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;
    cardElement.textContent = '';
    return cardElement;
}

export function flipCardVisual(cardElement) {
    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.card;
}

export function hideCardVisual(cardElement) {
    cardElement.classList.remove('flipped');
    cardElement.textContent = '';
}
