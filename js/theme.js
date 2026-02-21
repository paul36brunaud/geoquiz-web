/* ===============================
   THEME SYSTEM CLEAN
================================= */

(function(){

  const STORAGE_KEY = "mode";
  const DEFAULT_MODE = "dark";

  /* =========================
     RÉCUPÉRER MODE
  ========================= */

  function getSystemPreference(){
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function getSavedMode(){
    return localStorage.getItem(STORAGE_KEY) 
      || getSystemPreference() 
      || DEFAULT_MODE;
  }

  /* =========================
     APPLIQUER THÈME
  ========================= */

  function applyTheme(mode, updateUI = false){

    const isLight = mode === "light";
    const finalMode = isLight ? "light" : "dark";

    document.documentElement.classList.toggle("light", isLight);

    localStorage.setItem(STORAGE_KEY, finalMode);

    if(updateUI){
      const switchInput = document.getElementById("themeSwitch");
      if(switchInput){
        switchInput.checked = isLight;
      }
    }
  }

  /* =========================
     ANTI FLASH (avant DOM)
  ========================= */

  applyTheme(getSavedMode());

  /* =========================
     DOM READY
  ========================= */

  document.addEventListener("DOMContentLoaded", () => {

    const switchInput = document.getElementById("themeSwitch");
    const toggleBtn = document.getElementById("themeToggle");

    /* Sync état UI */
    applyTheme(getSavedMode(), true);

    /* Checkbox switch */
    if(switchInput){
      switchInput.addEventListener("change", () => {
        applyTheme(switchInput.checked ? "light" : "dark", true);
      });
    }

    /* Bouton simple */
    if(toggleBtn){
      toggleBtn.addEventListener("click", () => {
        const current = getSavedMode();
        const newMode = current === "dark" ? "light" : "dark";
        applyTheme(newMode, true);
      });
    }

    /* Sync multi-onglets */
    window.addEventListener("storage", (e) => {
      if(e.key === STORAGE_KEY){
        applyTheme(e.newValue, true);
      }
    });

  });

  /* =========================
     EXPORT
  ========================= */

  window.applyTheme = applyTheme;

})();