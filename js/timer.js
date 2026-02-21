/* =========================
   TIMER PRO CIRCULAIRE CLEAN
========================= */

let timerInterval = null;
let totalTime = 15;
let remainingTime = 15;

const FULL_DASH_ARRAY = 314; // 2πr pour r=50

/* =========================
   DEMARRER TIMER
   startTimer(duration, onTick, onComplete)
========================= */

function startTimer(duration, onTick, onComplete) {

  stopTimer();

  totalTime = duration;
  remainingTime = duration;

  const timerText = document.getElementById("timerText");
  const progressCircle = document.getElementById("progressCircle");

  if (!timerText || !progressCircle) return;

  /* Reset visuel propre */
  timerText.textContent = remainingTime;
  timerText.style.color = "";
  progressCircle.style.stroke = "#00f2fe";
  progressCircle.style.strokeDasharray = FULL_DASH_ARRAY;
  progressCircle.style.strokeDashoffset = 0;

  timerInterval = setInterval(() => {

    remainingTime = Math.max(0, remainingTime - 1);

    /* Mise à jour texte */
    timerText.textContent = remainingTime;

    /* Animation cercle */
    const offset =
      FULL_DASH_ARRAY - (remainingTime / totalTime) * FULL_DASH_ARRAY;

    progressCircle.style.strokeDashoffset = offset;

    /* Devient rouge à 5 sec */
    if (remainingTime <= 5) {
      progressCircle.style.stroke = "#ff3b3b";
      timerText.style.color = "#ff3b3b";
    }

    /* Callback tick */
    if (typeof onTick === "function") {
      onTick(remainingTime);
    }

    /* Fin du temps */
    if (remainingTime === 0) {

      stopTimer();

      if (typeof onComplete === "function") {
        onComplete();
      }
    }

  }, 1000);
}


/* =========================
   STOP TIMER
========================= */

function stopTimer() {

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

}