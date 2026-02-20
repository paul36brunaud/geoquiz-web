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

  if (!localStorage.getItem("xp")) {
    localStorage.setItem("xp", 0);
  }

  if (typeof updateLevelUI === "function") {
    updateLevelUI();
  }

  /* =========================
     SI UTILISATEUR EXISTE
  ========================= */

  if (username && usernameDisplay && userSection && startBtn) {
    usernameDisplay.textContent = username;
    userSection.style.display = "none";
    startBtn.style.display = "inline-block";
  }

  /* =========================
     FONCTION SAUVEGARDE
  ========================= */

  function saveUsername() {

    if (!input) return;

    const value = input.value.trim();

    if (value.length < 3) {
      alert("Le pseudo doit contenir au moins 3 caractères.");
      return;
    }

    localStorage.setItem("username", value);

    if (!localStorage.getItem("xp")) {
      localStorage.setItem("xp", 0);
    }

    if (usernameDisplay) {
      usernameDisplay.textContent = value;
    }

    if (userSection && startBtn) {
      userSection.style.display = "none";
      startBtn.style.display = "inline-block";
    }

    if (typeof updateLevelUI === "function") {
      updateLevelUI();
    }
  }

  /* =========================
     BOUTON SAUVEGARDE
  ========================= */

  if (saveBtn) {
    saveBtn.addEventListener("click", saveUsername);
  }

  /* =========================
     VALIDATION AVEC ENTRÉE
  ========================= */

  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveUsername();
      }
    });
  }

  /* =========================
     BOUTON START
  ========================= */

  if (startBtn) {
    startBtn.addEventListener("click", () => {

      if (!localStorage.getItem("username")) {
        alert("Veuillez entrer un pseudo.");
        return;
      }

      /* 🔥 Reset mode sélectionné */
      localStorage.removeItem("selectedMode");
      localStorage.removeItem("selectedCategory");
      localStorage.removeItem("selectedTheme");

      if (typeof navigate === "function") {
        navigate("categorie.html"); // ✅ corrigé
      } else {
        window.location.href = "categorie.html";
      }

    });
  }

});