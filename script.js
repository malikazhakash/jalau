/*
const questions = [
  {
    flag: "https://flagcdn.com/w320/kh.png",
    options: ["Peru", "Sudan", "Cambodia", "Brunei"],
    answer: "Cambodia"
  },
  {
    flag: "https://flagcdn.com/w320/br.png",
    options: ["Brazil", "Mexico", "Portugal", "Italy"],
    answer: "Brazil"
  },
  {
    flag: "https://flagcdn.com/w320/ca.png",
    options: ["Switzerland", "Canada", "Austria", "Denmark"],
    answer: "Canada"
  },
  {
    flag: "https://flagcdn.com/w320/jp.png",
    options: ["South Korea", "China", "Japan", "Vietnam"],
    answer: "Japan"
  },
  {
    flag: "https://flagcdn.com/w320/ng.png",
    options: ["Nigeria", "Ghana", "Ivory Coast", "Kenya"],
    answer: "Nigeria"
  }
];
*/
let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 5;
const totalTime = 5;
let timerInterval;

// Load questions from PHP file
fetch("questions.php")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(err => {
    console.error("Failed to load questions:", err);
    document.querySelector(".quiz-container").innerHTML = `<p>Failed to load questions. Please try again later.</p>`;
  });

const flagImg = document.getElementById("flag-image");
const options = document.querySelectorAll(".option");
const questionNum = document.getElementById("question-number");
const scoreDisplay = document.getElementById("score");
const timer = document.getElementById("timer");
const circle = document.getElementById("ring-progress");

const radius = 26;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

const nextBtn = document.createElement("button");
nextBtn.id = "next-button";

nextBtn.textContent = "Next";
nextBtn.style.marginTop = "20px";
nextBtn.style.display = "none";
document.querySelector(".quiz-container").appendChild(nextBtn);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("endModal").style.display = "none";
});


function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

function loadQuestion() {
  const q = questions[currentQuestion];
  flagImg.src = q.flag;
  questionNum.textContent = `${currentQuestion + 1} of ${questions.length}`;
  q.options.forEach((opt, index) => {
    options[index].textContent = opt;
    options[index].disabled = false;
    options[index].style.backgroundColor = "#fff";
  });

  timeLeft = totalTime;
  timer.textContent = timeLeft;
  setProgress(0);
  nextBtn.style.display = "none";

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer.textContent = timeLeft;

    const progress = ((totalTime - timeLeft) / totalTime) * 100;
    setProgress(progress);

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);

      const correct = questions[currentQuestion].answer;

      options.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
          btn.style.backgroundColor = "#c8f7c5"; // green
        } else {
          btn.style.backgroundColor = "#f8d7da"; // red
        }
      });

      nextBtn.style.display = "block";
    }
  }, 1000);
}
/*
function endQuiz() {
  clearInterval(timerInterval);
  document.querySelector(".quiz-container").innerHTML = `
    <h1>Quiz Complete!</h1>
    <p>Your final score is <strong>${score} / ${questions.length}</strong>.</p>
    <button onclick="location.reload()">Play Again</button>
  `;
}
*/


function celebrate(score, total) {
  if (score === total) {
    // Perfect score - Repeating burst
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 70,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 70,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } else {
    // Regular single burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 }
    });
  }
}



function endQuiz() {
  clearInterval(timerInterval);

 // 🎉 Call celebration
  celebrate(score, questions.length);

  const modal = document.getElementById("endModal");
  const finalScoreText = document.getElementById("final-score");

  finalScoreText.textContent = `Your score: ${score} / ${questions.length}`;
  modal.style.display = "flex";
}


options.forEach(button => {
  button.addEventListener("click", () => {
    clearInterval(timerInterval);
    const selected = button.textContent;
    const correct = questions[currentQuestion].answer;

    if (selected === correct) {
      score++;
      scoreDisplay.textContent = score;
      button.style.backgroundColor = "#c8f7c5"; // green
    } else {
      button.style.backgroundColor = "#f8d7da"; // red
      options.forEach(optBtn => {
        if (optBtn.textContent === correct) {
          optBtn.style.backgroundColor = "#c8f7c5";
        }
      });
    }

    options.forEach(btn => btn.disabled = true);
    nextBtn.style.display = "block";
  });
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

loadQuestion();
