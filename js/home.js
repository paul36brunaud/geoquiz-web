document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ÉLÉMENTS DOM
  ========================= */

  const username = localStorage.getItem("username");

  const usernameDisplay = document.getElementById("usernameDisplay");
  const userSection = document.getElementById("userSection");
  const startBtn = document.getElementById("startBtn");
  const saveBtn = document.getElementById("saveBtn");
  const input = document.getElementById("usernameInput");

  /* =========================
     INITIALISATION XP & UI
  ========================= */

  if (typeof updateLevelUI === "function") {
    updateLevelUI();
  }

  /* =========================
     SI UTILISATEUR EXISTE
  ========================= */

  if (username && usernameDisplay && userSection && startBtn) {
    usernameDisplay.innerText = username;
    userSection.style.display = "none";
    startBtn.style.display = "inline-block";
  }

  /* =========================
     SAUVEGARDE UTILISATEUR
  ========================= */

  if (saveBtn && input) {

    saveBtn.addEventListener("click", () => {

      const value = input.value.trim();

      if (value.length < 3) {
        alert("Le pseudo doit contenir au moins 3 caractères");
        return;
      }

      localStorage.setItem("username", value);

      // Initialise XP si inexistant
      if (!localStorage.getItem("xp")) {
        localStorage.setItem("xp", 0);
      }

      if (usernameDisplay) {
        usernameDisplay.innerText = value;
      }

      if (userSection && startBtn) {
        userSection.style.display = "none";
        startBtn.style.display = "inline-block";
      }

      if (typeof updateLevelUI === "function") {
        updateLevelUI();
      }

    });

  }

  /* =========================
     BOUTON START
  ========================= */

  if (startBtn) {
    startBtn.addEventListener("click", () => {

      if (typeof navigate === "function") {
        navigate("category.html");
      } else {
        window.location.href = "category.html";
      }

    });
  }

});
