const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let player1Beurt = true;
let player2Beurt = false;
let player1Score = 0;
let player2Score = 0;
var playFlip = document.getElementById("playFlip");
var playUnFlip = document.getElementById("playUnFlip");

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    this.classList.contains("flip") && playFlip.play();

    if (!hasFlippedCard) {
        //eerste klik
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    //tweede klik
    secondCard = this;
    secondCard.classList.contains("flip") && playFlip.play();

    aanDeBeurt();
    checksMatch();
    winnendeSpeler();
}

function aanDeBeurt() {
    setTimeout(() => {
        if (secondCard) {
            if (player1Beurt) {
                document.getElementById("player2").style.border = "5px solid blue";
                document.getElementById("player1").style.border = "5px solid black";
                document.getElementById("aandebeurt").innerHTML = "Aan de beurt: Speler 2";
                player1Beurt = false;
                player2Beurt = true;
            } else {
                document.getElementById("player1").style.border = "5px solid red";
                document.getElementById("player2").style.border = "5px solid black";
                document.getElementById("aandebeurt").innerHTML = "Aan de beurt: Speler 1";
                player1Beurt = true;
                player2Beurt = false;
            }
        }
    }, 1500);
}

function checksMatch() {
    //matchen de kaarten?
    //kijken of 'data-name' hetzelfde is
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflippedCards();

    //puntentelling
    if (isMatch) {
        if (player1Beurt) {
            player1Score += 1;
            document.getElementById("player1").innerHTML = "Speler 1: " + player1Score;
            document.getElementById("aandebeurt").innerHTML = "Aan de beurt: Speler 1";
        } else {
            player2Score += 1;
            document.getElementById("player2").innerHTML = "Speler 2: " + player2Score;
            document.getElementById("aandebeurt").innerHTML = "Aan de beurt: Speler 2";
        }
        aanDeBeurt();
    }
}

function winnendeSpeler() {
    if ( player1Score + player2Score === 9) {
        if (player1Score > player2Score) {
            document.getElementById("gewonnen").textContent = "Speler 1 heeft het spel gewonnen!!";
            document.getElementById("gewonnen").style.border = "5px solid red";
            document.getElementById("player1").style.border = "5px solid red";
            document.getElementById("aandebeurt").style.border = "5px solid red";
            document.getElementById("player2").style.border = "5px solid red";
        } else {
            document.getElementById("gewonnen").textContent = "Speler 2 heeft het spel gewonnen!!";
            document.getElementById("gewonnen").style.border = "5px solid blue";
            document.getElementById("player1").style.border = "5px solid blue";
            document.getElementById("aandebeurt").style.border = "5px solid blue";
            document.getElementById("player2").style.border = "5px solid blue";
        }
        document.getElementById("gewonnen").style.visibility = "unset";
    }
}

function disableCards() {
    //het is een match
    //je kunt niet meer klikken
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('invisible');
    secondCard.classList.add('invisible');

    resetBoard();
}

function unflippedCards() {
    //andere kaarten locken
    lockBoard = true;

    //geen match
    //remove flip
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        !firstCard.classList.contains("flip") && playUnFlip.play();
        !secondCard.classList.contains("flip") && playUnFlip.play();

        resetBoard();
    }, 1500);
}

// filmpje kijken voor uitleg
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    //elke kaart een random order nummer geven voor de positie
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 18);
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));