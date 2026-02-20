/* ===============================
   THEMES PAGE PRO
================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* 🔐 Protection utilisateur */
  const username = localStorage.getItem("username");
  if (!username) {
    window.location.replace("index.html");
    return;
  }

  /* 👤 Affichage joueur */
  const usernameDisplay = document.getElementById("usernameDisplay");
  if (usernameDisplay) {
    usernameDisplay.textContent = username;
  }

  if (typeof updateLevelUI === "function") {
    updateLevelUI();
  }

  /* 📂 Récupération catégorie & mode */
  const selectedMode = localStorage.getItem("selectedMode"); // geo ou histo
  const category = localStorage.getItem("selectedCategory");

  const themeList = document.getElementById("themeList");
  const themeTitle = document.getElementById("themeTitle");

  if (!selectedMode || !category || !themeList) return;

  /* 🏷️ Titre dynamique */
  if (themeTitle) {
    themeTitle.textContent =
      "Thèmes - " + category.charAt(0).toUpperCase() + category.slice(1);
  }

  /* 📚 Vérifie DATABASE */
  if (typeof DATABASE === "undefined") {
    console.error("DATABASE non chargé");
    return;
  }

  const modeData = DATABASE[selectedMode];

  if (!modeData || !modeData[category]) {
    themeList.innerHTML = "<p>Aucun thème disponible.</p>";
    return;
  }

  const themes = modeData[category];

  /* 🧹 Nettoyage */
  themeList.innerHTML = "";

  /* 🎨 Génération des cartes */
  Object.keys(themes).forEach(theme => {

    const card = document.createElement("div");
    card.className = "card theme-card";
    card.textContent = theme;

    card.addEventListener("click", () => {
      localStorage.setItem("selectedTheme", theme);
      window.location.href = "quiz.html";
    });

    themeList.appendChild(card);

  });

});