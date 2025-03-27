let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;

let h2 = document.getElementById("level-title");
let startBtn = document.getElementById("checkbox");

startBtn.addEventListener("change", function () {
    if (this.checked && !started) {
        startGame();
    }
});

function startGame() {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = "Level 1";
    levelup();
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);

    flashSequence();
}

function flashSequence() {
    let i = 0;
    function flashNext() {
        if (i < gameSeq.length) {
            let btn = document.getElementById(gameSeq[i]);
            gameflash(btn);
            i++;
            setTimeout(flashNext, 1000);
        }
    }
    flashNext();
}

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function checkans(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Click "Start" to try again.`;
        blinkRed();
        reset();
    }
}

function btnpress() {
    let btn = this;
    gameflash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkans(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach(btn => btn.addEventListener("click", btnpress));

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startBtn.checked = false;
}

function blinkRed() {
    let body = document.body;
    let count = 0;
    let interval = setInterval(() => {
        body.style.backgroundColor = count % 2 === 0 ? "red" : "white";
        count++;
        if (count > 5) {
            clearInterval(interval);
            body.style.backgroundColor = "";
        }
    }, 300);
}
