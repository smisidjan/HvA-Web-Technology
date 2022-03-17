const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstClick, secondClick;
let clickedCards = [];
let clear = false;
var playFlip = document.getElementById("playFlip");
var playUnFlip = document.getElementById("playUnFlip");

function flipCard() {
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstClick = this;

        if (clickedCards.length < 1) {
            clickedCards.push(firstClick.dataset.name)
            clear = true;
        } else {
            checkCards(firstClick);
        }

        flipCards(firstClick)
        return;
    }

    secondClick = this;
    clickedCards.push(secondClick.dataset.name)
    firstClick?.dataset.name !== secondClick?.dataset.name && flipCards(secondClick, true) && ( clear && resetBoard() && (clear = false));
    firstClick?.dataset.name === secondClick?.dataset.name && unFlipCards(true);
}

function flipCards(click, second = false) {
    click?.classList.add('flip');
    click.classList.contains("flip") && playFlip.play();

    second && (hasFlippedCard = false)
}

function checkCards(click) {
    for (let i = 0; i < clickedCards.length; i++) {
        click.dataset.name === clickedCards[i] && unFlipCards(true);
    }
}

function unFlipCards(hasFlippedCard = false, random = true) {
    if (hasFlippedCard) {
        firstClick.classList.remove('flip')
        !firstClick.classList.contains("flip") && playUnFlip.play();

        var myIndex = clickedCards.indexOf(firstClick.dataset.name);
        if (myIndex !== -1) {
            clickedCards.splice(myIndex, 1);
        }
    }

    if (random) {
        let randomNumber = Math.floor(Math.random() * 18);
        cards[randomNumber].classList.add('flip');
        clickedCards.push(cards[randomNumber].dataset.name)
    }

    !random ? resetBoard(shuffle) : resetBoard()
}

function shuffle() {
    //elke kaart een random order nummer geven voor de positie
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 18);
    });
}

function resetBoard() {
    [hasFlippedCard] = [false];
    [firstClick, secondClick] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));
