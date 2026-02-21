/* =========================
   NAVIGATION SYSTEM CLEAN
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

    window.location.href = page;
  }

  /* =========================
     NAVIGATION
  ========================= */

  function goToCategory(){
    safeRedirect("category.html");
  }

  function chooseMode(mode){

    if(!mode) return;

    localStorage.setItem(STORAGE.MODE, mode);
    localStorage.removeItem(STORAGE.CATEGORY);
    localStorage.removeItem(STORAGE.THEME);

    safeRedirect("category.html");
  }

  function chooseCategory(category){

    if(!category) return;

    localStorage.setItem(STORAGE.CATEGORY, category);
    localStorage.removeItem(STORAGE.THEME);

    safeRedirect("difficulty.html");
  }

  function chooseTheme(theme){

    if(!theme) return;

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