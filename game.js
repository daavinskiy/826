import { createBoard } from './board.js';

function startGame() {
    const cardCount = parseInt(prompt("Syötä korttien määrä (parillinen luku):"), 10);
    if (cardCount % 2 !== 0) {
        alert("Korttien määrän täytyy olla parillinen luku.");
        return;
    }
    createBoard(cardCount);
}

document.addEventListener('DOMContentLoaded', () => {
    startGame();

    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', () => {
        startGame();
    });
});
