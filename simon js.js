let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game started");
        started = true;
        levelup();
    }
});

// Function to make a button flash
function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Level up function
function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    console.log(gameSeq);

    flashSequence();
}

function flashSequence() {
    let i = 0;
    function flashNext() {
        if (i < gameSeq.length) {
            let randbtn = document.querySelector(`.${gameSeq[i]}`);
            gameflash(randbtn);
            i++;
            setTimeout(flashNext, 1000);
        }
    }
    flashNext();
}

function checkans(idx) {
    console.log("curr level:", level);
    if (userSeq[idx] === gameSeq[idx]) {
        console.log("same value");
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to restart.`;
        blinkRed(); // Call the blink function
        reset();
    }
}

function btnpress() {
    let btn = this;
    gameflash(btn);
    console.log("btn was pressed");
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Press any key to start";
}

// Function to blink red background when game is over
function blinkRed() {
    let body = document.querySelector("body");
    let count = 0;
    let interval = setInterval(() => {
        body.style.backgroundColor = count % 2 === 0 ? "red" : "white";
        count++;
        if (count > 5) {
            clearInterval(interval);
            body.style.backgroundColor = ""; // Reset to default
        }
    }, 300); // Change color every 300ms
}
