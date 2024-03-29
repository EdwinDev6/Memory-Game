const emojis = [
    "🍎", "🍊", "🍇", "🍉", "🍌", "🍍", "🥝", "🥭", "🍑", "🍒", "🍓", "🍅", "🥑", "🥥", "🍆", "🥔", "🥕", "🌽", "🌶️", "🥒", "🥬", "🥦"
];

let clickCount = 0;
let selectedCards = [];
let emojiClasses, sec, moves, wrongMoves, correctMoves, difficulty, difficultyClass, setTimer;

function shuffle(array) {
    var m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}

function checkDifficulty() {
    [].forEach.call(difficulties, function (input) {
        input.nextElementSibling.classList.remove("checked");

        if (input.value === "easy" && input.checked === true) {
            difficulty = 4;
            difficultyClass = "easy";
            input.nextElementSibling.classList.add("checked");
        } else if (input.value === "normal" && input.checked === true) {
            difficulty = 16;
            difficultyClass = "normal";
            input.nextElementSibling.classList.add("checked");
        } else if (input.value === "hard" && input.checked === true) {
            difficulty = 36;
            difficultyClass = "hard";
            input.nextElementSibling.classList.add("checked");
        }
    });
}

function populate(num) {
    emojiClasses = [];
    clickCount = 0;
    board.innerHTML = "";
    shuffle(emojis);
    let boardEmojis = emojis.slice(0, num / 2);
    boardEmojis = boardEmojis.concat(boardEmojis);
    shuffle(boardEmojis);
    const fragment = document.createDocumentFragment();
    for (let x = 0; x < num; x++) {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container", difficultyClass);
        const front = document.createElement("div");
        const back = document.createElement("div");
        front.classList.add("card", "front");
        back.classList.add("card", "back");
        const emoji = document.createElement("span");
        emoji.classList.add("emoji");
        emoji.textContent = boardEmojis[x];
        back.appendChild(emoji);
        cardContainer.appendChild(front);
        cardContainer.appendChild(back);
        cardContainer.setAttribute("id", "card-" + x);
        fragment.appendChild(cardContainer);
    }
    board.appendChild(fragment);
}

function stopwatch() {
    sec += 1;
    if (sec < 60) {
        timer.innerText = sec;
    } else if (sec < 3600) {
        let minutes = Math.floor(sec / 60);
        let seconds = sec % 60;
        timer.innerText = minutes + ":" + seconds;
    }
}

function rating(num) {
    switch (difficultyClass) {
        case "easy":
            if (num === 2) {
                ratingPerfect.classList.add("hide");
            } else if (num === 3) {
                ratingAverage.classList.add("hide");
            }
            break;
        case "normal":
            if (num === 8) {
                ratingPerfect.classList.add("hide");
            } else if (num === 12) {
                ratingAverage.classList.add("hide");
            }
            break;
        case "hard":
            if (num === 18) {
                ratingPerfect.classList.add("hide");
            } else if (num === 27) {
                ratingAverage.classList.add("hide");
            }
            break;
    }
}

function checkwin(num) {
    let won;
    switch (difficultyClass) {
        case "easy":
            if (num === 2) {
                won = true;
            }
            break;
        case "normal":
            if (num === 8) {
                won = true;
            }
            break;
        case "hard":
            if (num === 18) {
                won = true;
            }
            break;
    }
    if (won === true) {
        setTimeout(function () {
            document.getElementById("final-time").innerText = timer.innerText;
            document.getElementById("final-moves").innerText = moves;
            document.getElementById("final-rating").innerHTML =
                document.getElementById("stars").innerHTML;
            modal.classList.remove("hide");
            clearInterval(setTimer);
        }, 1000);
    }
}

function startGame() {
    sec = 0;
    moves = 0;
    wrongMoves = 0;
    correctMoves = 0;
    timer.innerText = "0";
    document.getElementById("moves").innerHTML = "0";
    modal.classList.add("hide");
    ratingPerfect.classList.remove("hide");
    ratingAverage.classList.remove("hide");
    clearInterval(setTimer);
    checkDifficulty();
    populate(difficulty);
    shuffleCards();
    flipCardsFaceDown();
}
