/* =========================
   QUIZ ENGINE CLEAN
========================= */

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let timeLeft = 15;

/* =========================
   INITIALISATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const username = localStorage.getItem("username");
  const selectedMode = localStorage.getItem("selectedMode");
  const selectedCategory = localStorage.getItem("selectedCategory");
  const selectedTheme = localStorage.getItem("selectedTheme");

  if (
    !username ||
    !selectedMode ||
    !selectedCategory ||
    !selectedTheme ||
    typeof DATABASE === "undefined" ||
    !DATABASE[selectedMode] ||
    !DATABASE[selectedMode][selectedCategory] ||
    !DATABASE[selectedMode][selectedCategory][selectedTheme]
  ) {
    window.location.replace("category.html");
    return;
  }

  document.getElementById("usernameDisplay").textContent = username;

  if (typeof updateLevelUI === "function") {
    updateLevelUI();
  }

  questions =
    shuffleArray(
      [...DATABASE[selectedMode][selectedCategory][selectedTheme]]
    );

  if (questions.length === 0) {
    alert("Aucune question disponible.");
    window.location.replace("category.html");
    return;
  }

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

  const progressPercent =
    ((currentIndex + 1) / questions.length) * 100;

  if (progressFill) {
    progressFill.style.width = progressPercent + "%";
  }

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
    const originalIndex =
      questions[currentIndex].options.indexOf(optionText);

    if (originalIndex === correctIndex) {
      btn.classList.add("correct");
    }

    if (
      originalIndex === selectedIndex &&
      selectedIndex !== correctIndex
    ) {
      btn.classList.add("wrong");
    }
  });

  /* SCORE */

  if (selectedIndex === correctIndex) {

    score++;

    const timeBonus = Math.max(0, timeLeft);
    score += timeBonus * 0.1;

    if (navigator.vibrate) navigator.vibrate(100);

  } else {

    if (navigator.vibrate) navigator.vibrate([200,100,200]);
  }

  setTimeout(nextQuestion, 1200);
}

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
  const percentage =
    Math.round((finalScore / questions.length) * 100);

  /* XP basé sur difficulté (selectedTheme) */

  const theme = localStorage.getItem("selectedTheme");

  let xpMultiplier = 20;
  if (theme === "moyen") xpMultiplier = 30;
  if (theme === "difficile") xpMultiplier = 50;

  const earnedXP = finalScore * xpMultiplier;

  let mention = "";
  let stars = "";
  let badge = "";

  if (percentage >= 90) {
    mention = "Excellent";
    stars = "⭐⭐⭐";
    badge = "gold-badge";
  }
  else if (percentage >= 60) {
    mention = "Bien joué";
    stars = "⭐⭐";
    badge = "silver-badge";
  }
  else {
    mention = "À améliorer";
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
      <h2>Quiz terminé</h2>
      <div class="stars">${stars}</div>
      <p>Score : ${finalScore} / ${questions.length}</p>
      <p>${percentage}%</p>
      <h3 class="${badge}">${mention}</h3>
      <p>+ ${earnedXP} XP gagnés</p>
      <button class="main-btn"
        onclick="window.location.href='category.html'">
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