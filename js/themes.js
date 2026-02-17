/* ===============================
   THEMES PAGE
================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* 🔐 Protection utilisateur */
  const username = localStorage.getItem("username");
  if (!username) {
    window.location.href = "index.html";
    return;
  }

  /* 👤 Affichage joueur */
  const usernameDisplay = document.getElementById("usernameDisplay");
  if (usernameDisplay) {
    usernameDisplay.innerText = username;
  }

  if (typeof updateLevelUI === "function") {
    updateLevelUI();
  }

  /* 📂 Récupération catégorie */
  const category = localStorage.getItem("selectedCategory");
  const themeList = document.getElementById("themeList");
  const themeTitle = document.getElementById("themeTitle");

  if (!category || !themeList) return;

  if (themeTitle) {
    themeTitle.innerText = "Thèmes - " + category.toUpperCase();
  }

  /* 📚 Vérifie database */
  if (typeof database === "undefined") {
    console.error("database.js non chargé");
    return;
  }

  const themes = database[category];

  if (!themes) {
    themeList.innerHTML = "<p>Aucun thème disponible.</p>";
    return;
  }

  /* 🎨 Génération des cartes */
  Object.keys(themes).forEach(theme => {

    const card = document.createElement("div");
    card.className = "card";
    card.innerText = theme;

    card.addEventListener("click", () => {
      if (typeof chooseTheme === "function") {
        chooseTheme(theme);
      } else {
        localStorage.setItem("selectedTheme", theme);
        window.location.href = "quiz.html";
      }
    });

    themeList.appendChild(card);

  });

});
