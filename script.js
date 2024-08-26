const wordList = ["grape"];
const answer = wordList[Math.floor(Math.random() * wordList.length)];

let currentGuess = "";
let attempts = 0;

const board = document.getElementById("board");
const message = document.getElementById("message");

const row1 = "qwertyuiop".split("");
const row2 = "asdfghjkl".split("");
const row3 = ["Enter"].concat("zxcvbnm".split(""), ["Backspace"]);

const keyboardRows = {
    row1: document.getElementById("row1"),
    row2: document.getElementById("row2"),
    row3: document.getElementById("row3"),
};

// 게임 보드 생성
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("id", `tile-${i}-${j}`);
        board.appendChild(tile);
    }
}

// 가상 키보드 생성
[row1, row2, row3].forEach((row, index) => {
    row.forEach(key => {
        const button = document.createElement("button");
        button.textContent = key;
        button.classList.add("key");
        button.addEventListener("click", () => handleKeyClick(key));
        keyboardRows[`row${index + 1}`].appendChild(button);
    });
});

// 키 입력 처리
function handleKeyClick(key) {
    if (key === "Enter") {
        submitGuess();
    } else if (key === "Backspace") {
        deleteLetter();
    } else if (currentGuess.length < 5) {
        addLetter(key);
    }
}

function addLetter(letter) {
    const row = document.getElementById(`tile-${attempts}-${currentGuess.length}`);
    row.textContent = letter;
    currentGuess += letter;
}

function deleteLetter() {
    if (currentGuess.length > 0) {
        const row = document.getElementById(`tile-${attempts}-${currentGuess.length - 1}`);
        row.textContent = "";
        currentGuess = currentGuess.slice(0, -1);
    }
}

function submitGuess() {
    if (currentGuess.length !== 5) {
        showMessage("You need to complete the word!");
        return;
    }

    const currentWord = currentGuess;
    currentGuess = "";

    let exactMatches = 0;

    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${attempts}-${i}`);
        const letter = currentWord[i];

        if (letter === answer[i]) {
            tile.style.backgroundColor = "#6aaa64"; // 초록색
            exactMatches++;
        } else if (answer.includes(letter)) {
            tile.style.backgroundColor = "#c9b458"; // 노란색
        } else {
            tile.style.backgroundColor = "#787c7e"; // 회색
        }

        updateKeyboard(letter, answer.includes(letter), letter === answer[i]);
    }

    attempts++;

    if (exactMatches === 5) {
        showMessage("Congratulations! You've guessed the word!");
    } else if (attempts === 6) {
        showMessage(`Game over! The word was "${answer}".`);
    }
}

function updateKeyboard(letter, isPresent, isCorrect) {
    const key = [...document.querySelectorAll('.key')].find((btn) => btn.textContent === letter);
    
    if (isCorrect) {
        key.classList.add("correct");
    } else if (isPresent) {
        key.classList.add("present");
    } else {
        key.classList.add("absent");
    }
}

function showMessage(msg) {
    message.textContent = msg;
}
