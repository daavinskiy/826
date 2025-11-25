import { createBoard } from './board.js';

function startGame() {
    const cardSelect = document.getElementById('cardCount');
    const cardCount = parseInt(cardSelect.value, 10);
    createBoard(cardCount);
}

document.addEventListener('DOMContentLoaded', () => {
    startGame();

    const restartButton = document.getElementById('newGameButton');
    restartButton.addEventListener('click', () => {
        startGame();
    });

    const cardSelect = document.getElementById('cardCount');
    cardSelect.addEventListener('change', () => {
        startGame();
    });
});
