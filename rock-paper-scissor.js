let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

// if (!score) {
//     score = {
//         wins: 0,
//         losses: 0,
//         ties: 0
//     }
// }

let isAutoPlaying = false;
let intervalID;

document.querySelector(".autoplay-btn").addEventListener("click", () => {
  autoPlay();
});
function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".autoplay-btn").textContent = "Stop Playing";
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
    document.querySelector(".autoplay-btn").textContent = "Auto Play";
  }
}

document.querySelector(".rock-btn").addEventListener("click", () => {
  playGame("Rock");
});
document.querySelector(".paper-btn").addEventListener("click", () => {
  playGame("Paper");
});
document.querySelector(".scissor-btn").addEventListener("click", () => {
  playGame("Scissor");
});
document.querySelector(".reset-btn").addEventListener("click", () => {
  resetGameScore();
});

document.body.addEventListener("keydown", (event) => {
  //console.log(event.key)

  if (event.key === "r" || event.key === "R") {
    playGame("Rock");
  } else if (event.key === "p" || event.key === "P") {
    playGame("Paper");
  } else if (event.key === "s" || event.key === "S") {
    playGame("Scissor");
  } else if (event.key === "a" || event.key === "A") {
    autoPlay();
  } else if (event.key === "Backspace") {
    resetGameScore();
  }
});

function playGame(playerMove) {
  const ComputerMove = pickComputerMove();
  let Result = "";

  if (playerMove === "Scissor") {
    if (ComputerMove === "Rock") {
      Result = "You Lose! 😞";
    } else if (ComputerMove === "Paper") {
      Result = "You Win! 🎉";
    } else if (ComputerMove === "Scissor") {
      Result = "Tie! ⚔️";
    }
  } else if (playerMove === "Paper") {
    if (ComputerMove === "Rock") {
      Result = "You Win! 🎉";
    } else if (ComputerMove === "Paper") {
      Result = "Tie! ⚔️";
    } else if (ComputerMove === "Scissor") {
      Result = "You Lose! 😞";
    }
  } else if (playerMove === "Rock") {
    if (ComputerMove === "Rock") {
      Result = "Tie! ⚔️";
    } else if (ComputerMove === "Paper") {
      Result = "You Lose! 😞";
    } else if (ComputerMove === "Scissor") {
      Result = "You Win! 🎉";
    }
  }

  if (Result === "You Win! 🎉") {
    score.wins += 1;
  } else if (Result === "You Lose! 😞") {
    score.losses += 1;
  } else if (Result === "Tie! ⚔️") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
  document.querySelector(".rps-result").innerHTML = Result;
  document.querySelector(
    ".rps-move"
  ).innerHTML = `You : <img src="images/${playerMove}-emoji.png">  Computer : <img src="images/${ComputerMove}-emoji.png">`;

  //alert(`You picked ${playerMove}. Computer picked ${ComputerMove}. ${Result}\nWins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`)
}

function updateScoreElement() {
  document.querySelector(
    ".rps_score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetGameScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

function pickComputerMove() {
  let Random = Math.random();
  let ComputerMove = "";

  if (Random >= 0 && Random < 1 / 3) {
    ComputerMove = "Rock";
  } else if (Random >= 1 / 3 && Random < 2 / 3) {
    ComputerMove = "Paper";
  } else if (Random >= 2 / 3 && Random < 1) {
    ComputerMove = "Scissor";
  }
  return ComputerMove;
}
