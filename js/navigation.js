/* =========================
   NAVIGATION SYSTEM
========================= */

(function(){

  const STORAGE = {
    CATEGORY: "selectedCategory",
    THEME: "selectedTheme"
  };

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

  function goToCategory(){
    safeRedirect("category.html");
  }

  function chooseCategory(type){

    if(typeof type !== "string" || type.trim() === ""){
      return;
    }

    localStorage.setItem(STORAGE.CATEGORY, type);
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
  window.chooseCategory = chooseCategory;
  window.chooseTheme = chooseTheme;

})();
