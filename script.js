let scoreA = 0;
let scoreB = 0;
let setsToWin = 0;
let pointsPerSet = 0;
let setsWonA = 0;
let setsWonB = 0;
let lastPoint = null;

function startGame() {
    const teamAName = document.getElementById("teamA").value.trim();
    const teamBName = document.getElementById("teamB").value.trim();
    setsToWin = parseInt(document.getElementById("sets").value);
    pointsPerSet = parseInt(document.getElementById("points").value);

    if (!teamAName || !teamBName || isNaN(setsToWin) || isNaN(pointsPerSet)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    document.querySelector(".configuration").style.display = "none";
    document.querySelector(".during-game").style.display = "block";

    document.querySelectorAll(".scoreboard h3")[0].textContent = teamAName;
    document.querySelectorAll(".scoreboard h3")[1].textContent = teamBName;

    // Inicialização
    scoreA = 0;
    scoreB = 0;
    setsWonA = 0;
    setsWonB = 0;
    lastPoint = null;
    updateScoreDisplay();
    updateSetMessage("");
}

function addPoint(team) {
    if (team === 'A') {
        scoreA++;
        lastPoint = 'A';
    } else if (team === 'B') {
        scoreB++;
        lastPoint = 'B';
    }

    updateScoreDisplay();
    checkSetEnd();
}

function updateScoreDisplay() {
    document.getElementById("scoreA").textContent = scoreA;
    document.getElementById("scoreB").textContent = scoreB;
}

function resetGame() {
    if (lastPoint === 'A' && scoreA > 0) scoreA--;
    else if (lastPoint === 'B' && scoreB > 0) scoreB--;
    lastPoint = null;
    updateScoreDisplay();
}

function checkSetEnd() {
    if (scoreA >= pointsPerSet || scoreB >= pointsPerSet) {
        let winner = scoreA > scoreB ? 'A' : 'B';

        if (winner === 'A') setsWonA++;
        else setsWonB++;

        updateSetMessage(`Set vencido pelo Time ${winner}`);

        const maxSetsToWin = Math.ceil(setsToWin / 2);
        if (setsWonA === maxSetsToWin || setsWonB === maxSetsToWin) {
            updateSetMessage(`🏆 Time ${winner} venceu a partida!`);
            showNextSetButton(false); // Esconde botão
            disableScoreButtons();
        } else {
            showNextSetButton(true);
            disableScoreButtons();
        }
    }
}

function nextSet() {
    scoreA = 0;
    scoreB = 0;
    lastPoint = null;
    updateScoreDisplay();
    updateSetMessage("");
    showNextSetButton(false);
    enableScoreButtons();
}

function updateSetMessage(message) {
    let msgBox = document.getElementById("setMessage");
    if (!msgBox) {
        msgBox = document.createElement("div");
        msgBox.id = "setMessage";
        msgBox.style.textAlign = "center";
        msgBox.style.fontSize = "20px";
        msgBox.style.marginTop = "20px";
        msgBox.style.fontWeight = "bold";
        document.querySelector(".during-game").appendChild(msgBox);
    }
    msgBox.innerText = message;
}

function showNextSetButton(show) {
    let nextBtn = document.getElementById("nextSetButton");
    if (!nextBtn && show) {
        nextBtn = document.createElement("button");
        nextBtn.id = "nextSetButton";
        nextBtn.innerText = "Ir para o próximo set";
        nextBtn.style.marginTop = "20px";
        nextBtn.onclick = nextSet;
        document.querySelector(".during-game").appendChild(nextBtn);
    }
    if (nextBtn) {
        nextBtn.style.display = show ? "block" : "none";
    }
}

function disableScoreButtons() {
    document.querySelectorAll(".actions button").forEach(btn => {
        if (btn.innerText.includes("+ PONTO")) btn.disabled = true;
    });
}

function enableScoreButtons() {
    document.querySelectorAll(".actions button").forEach(btn => {
        if (btn.innerText.includes("+ PONTO")) btn.disabled = false;
    });
}
