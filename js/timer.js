/* =========================
   TIMER PRO CIRCULAIRE
========================= */

let timerInterval = null;
let totalTime = 15;
let remainingTime = 15;

const FULL_DASH_ARRAY = 314; // cercle SVG (2πr ≈ 314)

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

  timerText.textContent = remainingTime;
  progressCircle.style.stroke = "#00f2fe";

  timerInterval = setInterval(() => {

    remainingTime--;

    /* 🔥 Mise à jour texte */
    timerText.textContent = remainingTime;

    /* 🔥 Animation cercle */
    const offset =
      FULL_DASH_ARRAY - (remainingTime / totalTime) * FULL_DASH_ARRAY;

    progressCircle.style.strokeDashoffset = offset;

    /* 🔥 Devient rouge à 5 sec */
    if (remainingTime <= 5) {
      progressCircle.style.stroke = "#ff3b3b";
      timerText.style.color = "#ff3b3b";
    }

    /* 🔔 Callback tick */
    if (typeof onTick === "function") {
      onTick(remainingTime);
    }

    /* ⏰ Fin du temps */
    if (remainingTime <= 0) {

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