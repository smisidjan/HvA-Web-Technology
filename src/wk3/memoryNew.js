const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let player1Beurt = true;
let player2Beurt = false;
let player1Score = 0;
let player2Score = 0;
let clickedCards = [];


function flipCard() {
    // if (lockBoard) return;
    // if (this === firstCard) return;

    // this.classList.add('flip');

    if (!hasFlippedCard) {
        //eerste klik
        hasFlippedCard = true;
        firstCard = this;
        clickedCards.push(firstCard.dataset.name)

        flipCards(firstCard);
    }
    //tweede klik
    secondCard = this;
    clickedCards.push(secondCard.dataset.name)

    checksMatch();
}

function checksMatch() {
    //matchen de kaarten?
    //kijken of 'data-name' hetzelfde is
    let sameCard = firstCard.dataset.name === secondCard.dataset.name;

    console.log({sameCard})

    sameCard && unflippedCards();
}

function flipCards(click) {
    //het is een match
    //je kunt niet meer klikken
    click.classList.add('flip');


    resetBoard();
}

function unflippedCards() {
    //geen match
    //remove flip
    firstCard.classList.remove('flip');
    // clickedCard !== null && clickedCards.filter(item => item === clickedCard)


    // setTimeout(() => {
    //     firstCard.classList.remove('flip');
    //     secondCard.classList.remove('flip');
    //
    //     resetBoard();
    // }, 1500);
}

// filmpje kijken voor uitleg
function resetBoard() {
    [hasFlippedCard] = [false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    //elke kaart een random order nummer geven voor de positie
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 18);
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));