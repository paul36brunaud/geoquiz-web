/* =========================
   NAVIGATION SYSTEM PRO
========================= */

(function(){

  const STORAGE = {
    MODE: "selectedMode",
    CATEGORY: "selectedCategory",
    THEME: "selectedTheme"
  };

  /* =========================
     REDIRECTION SÉCURISÉE
  ========================= */

  function safeRedirect(page){

    if(typeof page !== "string" || page.trim() === ""){
      return;
    }

    if(typeof navigate === "function"){
      navigate(page);
    }else{
      window.location.href = page;
    }
  }

  /* =========================
     NAVIGATION
  ========================= */

  function goToCategory(){
    safeRedirect("categorie.html"); // ✅ corrigé
  }

  function chooseMode(mode){

    if(typeof mode !== "string" || mode.trim() === ""){
      return;
    }

    localStorage.setItem(STORAGE.MODE, mode);
    localStorage.removeItem(STORAGE.CATEGORY);
    localStorage.removeItem(STORAGE.THEME);

    safeRedirect("categorie.html");
  }

  function chooseCategory(category){

    if(typeof category !== "string" || category.trim() === ""){
      return;
    }

    localStorage.setItem(STORAGE.CATEGORY, category);
    localStorage.removeItem(STORAGE.THEME);

    safeRedirect("themes.html");
  }

  function chooseTheme(theme){

    if(typeof theme !== "string" || theme.trim() === ""){
      return;
    }

    localStorage.setItem(STORAGE.THEME, theme);

    safeRedirect("quiz.html");
  }

  /* =========================
     EXPORT GLOBAL
  ========================= */

  window.goToCategory = goToCategory;
  window.chooseMode = chooseMode;
  window.chooseCategory = chooseCategory;
  window.chooseTheme = chooseTheme;

})();

function chooseDifficulty(level){

  if(!level) return;

  localStorage.setItem("selectedDifficulty", level);

  safeRedirect("quiz.html");
}

window.chooseDifficulty = chooseDifficulty;