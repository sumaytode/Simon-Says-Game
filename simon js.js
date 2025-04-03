let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;

let h2 = document.querySelector("h3");
let overlay = document.getElementById("gameOverEffect");

// Start game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

// Function to make a button flash
function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

// Level up function
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
            let randbtn = document.querySelector(`.${gameSeq[i]}`);
            gameflash(randbtn);
            i++;
            setTimeout(flashNext, 1000);
        }
    }
    flashNext();
}

function checkans(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score: <b>${level}</b><br>Press any key to restart.`;
        showGameOverEffect();
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

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", btnpress);
});

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Press any key to start";
}

// Game Over Animation Effect
function showGameOverEffect() {
    let count = 0;
    let interval = setInterval(() => {
        overlay.style.opacity = count % 2 === 0 ? "0.7" : "0";
        count++;
        if (count > 5) {
            clearInterval(interval);
            overlay.style.opacity = "0";
        }
    }, 300);
}
