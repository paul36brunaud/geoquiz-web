/* =========================
   QUIZ ENGINE PRO
========================= */

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let timeLeft = 15;

/* =========================
   SONS
========================= */

const correctSound = new Audio("assets/sounds/correct.mp3");
const wrongSound = new Audio("assets/sounds/wrong.mp3");

/* =========================
   INITIALISATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("username");
  const category = localStorage.getItem("selectedCategory");
  const theme = localStorage.getItem("selectedTheme");

  if (
    !username ||
    !category ||
    !theme ||
    typeof DATABASE === "undefined" ||
    !DATABASE[category] ||
    !DATABASE[category][theme]
  ) {
    window.location.replace("categorie.html"); // 🔥 corrigé
    return;
  }

  document.getElementById("usernameDisplay").textContent = username;

  if (typeof updateLevelUI === "function") {
    updateLevelUI();
  }

  questions = shuffleArray([...DATABASE[category][theme]]);
  currentIndex = 0;
  score = 0;

  document.getElementById("totalQuestions").textContent = questions.length;

  loadQuestion();
});

/* =========================
   CHARGEMENT QUESTION
========================= */

function loadQuestion() {

  if (currentIndex >= questions.length) {
    endQuiz();
    return;
  }

  answered = false;

  const questionData = questions[currentIndex];
  const questionText = document.getElementById("questionText");
  const answersContainer = document.getElementById("answersContainer");
  const questionNumber = document.getElementById("questionNumber");
  const progressFill = document.getElementById("progressFill");

  questionText.textContent = questionData.question;
  answersContainer.innerHTML = "";
  questionNumber.textContent = currentIndex + 1;

  /* 🔥 Barre progression */
  const progressPercent = ((currentIndex) / questions.length) * 100;
  if (progressFill) progressFill.style.width = progressPercent + "%";

  /* 🔀 Mélange réponses */
  const shuffledOptions = shuffleArray(
    questionData.options.map((option, index) => ({
      text: option,
      originalIndex: index
    }))
  );

  shuffledOptions.forEach(optionData => {

    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = optionData.text;

    btn.addEventListener("click", () => {
      if (!answered) {
        checkAnswer(optionData.originalIndex);
      }
    });

    answersContainer.appendChild(btn);
  });

  /* ⏱ TIMER */
  if (typeof startTimer === "function") {
    startTimer(15, (remaining) => {
      timeLeft = remaining;
    }, () => {
      if (!answered) {
        checkAnswer(-1);
      }
    });
  }
}

/* =========================
   VERIFICATION REPONSE
========================= */

function checkAnswer(selectedIndex) {

  if (answered) return;
  answered = true;

  if (typeof stopTimer === "function") {
    stopTimer();
  }

  const correctIndex = questions[currentIndex].answer;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach(btn => {

    btn.disabled = true;

    const optionText = btn.textContent;
    const originalIndex = questions[currentIndex].options.indexOf(optionText);

    if (originalIndex === correctIndex) {
      btn.classList.add("correct");
    }

    if (originalIndex === selectedIndex && selectedIndex !== correctIndex) {
      btn.classList.add("wrong");
    }
  });

  /* 🎯 SCORE + BONUS TEMPS */
  if (selectedIndex === correctIndex) {

    score++;

    const timeBonus = Math.max(0, timeLeft);
    score += timeBonus * 0.1; // bonus léger rapidité

    correctSound.currentTime = 0;
    correctSound.play();

    if (navigator.vibrate) navigator.vibrate(100);

  } else {

    wrongSound.currentTime = 0;
    wrongSound.play();

    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  }

  setTimeout(nextQuestion, 1200);
}

/* =========================
   QUESTION SUIVANTE
========================= */

function nextQuestion() {
  currentIndex++;
  loadQuestion();
}

/* =========================
   FIN DU QUIZ
========================= */

function endQuiz() {

  const main = document.querySelector("main");

  const finalScore = Math.round(score);
  const percentage = Math.round((finalScore / questions.length) * 100);

  const theme = localStorage.getItem("selectedTheme");

  /* 🔥 XP selon difficulté */
  let xpMultiplier = 20;
  if (theme === "moyen") xpMultiplier = 30;
  if (theme === "difficile") xpMultiplier = 40;

  const earnedXP = finalScore * xpMultiplier;

  let mention = "";
  let stars = "";
  let badge = "";

  if (percentage >= 90) {
    mention = "🏆 Excellent !";
    stars = "⭐⭐⭐";
    badge = "gold-badge";
  } 
  else if (percentage >= 60) {
    mention = "🥈 Bien joué !";
    stars = "⭐⭐";
    badge = "silver-badge";
  } 
  else {
    mention = "🥉 À améliorer";
    stars = "⭐";
    badge = "bronze-badge";
  }

  if (typeof addXP === "function") {
    addXP(earnedXP);
  }

  if (typeof saveGameResult === "function") {
    saveGameResult(finalScore);
  }

  main.innerHTML = `
    <div class="result-screen fade-in">
      <h2>Quiz terminé 🎉</h2>
      <div class="stars">${stars}</div>
      <p>Score : ${finalScore} / ${questions.length}</p>
      <p>${percentage}%</p>
      <h3 class="${badge}">${mention}</h3>
      <p>+ ${earnedXP} XP gagnés</p>
      <button class="main-btn" onclick="window.location.href='categorie.html'">
        Revenir aux catégories
      </button>
    </div>
  `;
}

/* =========================
   UTILITAIRE
========================= */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const difficulty = localStorage.getItem("selectedDifficulty") || "easy";

let questions = DATABASE[selectedMode][selectedCategory][selectedTheme];

questions = questions.filter(q => q.difficulty === difficulty);