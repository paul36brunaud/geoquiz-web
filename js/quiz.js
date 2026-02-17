/* =========================
   QUIZ ENGINE PREMIUM
========================= */

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

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
    window.location.href = "category.html";
    return;
  }

  // Affichage joueur
  const usernameDisplay = document.getElementById("usernameDisplay");
  if (usernameDisplay) {
    usernameDisplay.innerText = username;
  }

  if (typeof updateLevelUI === "function") {
    updateLevelUI();
  }

  questions = DATABASE[category][theme];
  currentIndex = 0;
  score = 0;

  const total = document.getElementById("totalQuestions");
  if (total) total.innerText = questions.length;

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

  if (!questionText || !answersContainer) return;

  questionText.innerText = questionData.question;
  answersContainer.innerHTML = "";

  if (questionNumber) {
    questionNumber.innerText = currentIndex + 1;
  }

  questionData.options.forEach((option, index) => {

    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.innerText = option;

    btn.addEventListener("click", () => {
      if (!answered) {
        checkAnswer(index);
      }
    });

    answersContainer.appendChild(btn);
  });

  if (typeof startTimer === "function") {
    startTimer(15, () => {
      if (!answered) {
        checkAnswer(-1); // Temps écoulé
      }
    });
  }
}

/* =========================
   VERIFICATION REPONSE
========================= */

function checkAnswer(selectedIndex) {

  answered = true;

  if (typeof stopTimer === "function") {
    stopTimer();
  }

  const correctIndex = questions[currentIndex].answer;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, index) => {

    btn.disabled = true;

    if (index === correctIndex) {
      btn.classList.add("correct");
    }

    if (index === selectedIndex && selectedIndex !== correctIndex) {
      btn.classList.add("wrong");
    }

  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  setTimeout(() => {
    nextQuestion();
  }, 1000);
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
  if (!main) return;

  const earnedXP = score * 20;

  if (typeof addXP === "function") {
    addXP(earnedXP);
  }

  if (typeof saveGameResult === "function") {
    saveGameResult(score);
  }

  main.innerHTML = `
    <h2>Quiz terminé 🎉</h2>
    <p>Score : ${score} / ${questions.length}</p>
    <p>+ ${earnedXP} XP gagnés</p>
    <button class="main-btn" onclick="navigate('category.html')">
      Revenir aux catégories
    </button>
  `;
}
