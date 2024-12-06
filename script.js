const cardsArray = [
    { id: 1, img: 'felizes.jpg' },
    { id: 2, img: 'Emma.jpg' },
    { id: 3, img: 'Isabella.jpg' },
    { id: 4, img: 'Norman.jpg' },
    { id: 5, img: 'Phill.jpg' },
    { id: 6, img: 'Ray.jpg' },
    { id: 1, img: 'felizes.jpg' },
    { id: 2, img: 'Emma.jpg' },
    { id: 3, img: 'Isabella.jpg' },
    { id: 4, img: 'Norman.jpg' },
    { id: 5, img: 'Phill.jpg' },
    { id: 6, img: 'Ray.jpg' }
];

let flippedCards = [];
let matchedCards = [];
let score = 0;
let attempts = 3;

function shuffleCards() {
    cardsArray.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;

        const cardImage = document.createElement('img');
        cardImage.src = card.img;
        cardElement.appendChild(cardImage);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && attempts > 0) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
        matchedCards.push(card1, card2);
        score += 3;
        updateScore();
        flippedCards = [];

        if (matchedCards.length === cardsArray.length) {
            alert('Você venceu! Todos os pares foram encontrados.');
        }
    } else {
        attempts--;
        score -= 2;
        updateScore();

        if (attempts === 0) {
            alert('Game Over! Você perdeu todas as tentativas.');
        }

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function updateScore() {
    if (score < 0) {
        score = 0;
    }
    document.getElementById('score').textContent = `Pontuação: ${score}`;
    document.getElementById('attempts').textContent = `Tentativas restantes: ${attempts}`;
}

function restartGame() {
    score = 0;
    attempts = 3;
    flippedCards = [];
    matchedCards = [];
    shuffleCards();
    createBoard();
    updateScore();
}

shuffleCards();
createBoard();

document.getElementById('restart-btn').addEventListener('click', restartGame);
