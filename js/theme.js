/* ===============================
   THEME SYSTEM PRO
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
    return localStorage.getItem(STORAGE_KEY) || getSystemPreference() || DEFAULT_MODE;
  }

  /* =========================
     APPLIQUER THÈME
  ========================= */

  function applyTheme(mode, updateSwitch = false){

    const isLight = mode === "light";
    const newValue = isLight ? "light" : "dark";

    document.documentElement.classList.toggle("light", isLight);

    if(localStorage.getItem(STORAGE_KEY) !== newValue){
      localStorage.setItem(STORAGE_KEY, newValue);
    }

    if(updateSwitch){
      const switchBtn = document.getElementById("themeSwitch");
      if(switchBtn){
        switchBtn.checked = isLight;
      }
    }
  }

  /* =========================
     ANTI FLASH (AVANT DOM)
  ========================= */

  applyTheme(getSavedMode());

  /* =========================
     DOM READY
  ========================= */

  document.addEventListener("DOMContentLoaded", () => {

    const switchBtn = document.getElementById("themeSwitch");

    applyTheme(getSavedMode(), true);

    if(switchBtn){
      switchBtn.addEventListener("change", () => {
        applyTheme(switchBtn.checked ? "light" : "dark");
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

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");

  if(toggle){
    toggle.addEventListener("click", () => {
      const current = localStorage.getItem("mode") || "dark";
      const newMode = current === "dark" ? "light" : "dark";
      applyTheme(newMode, true);
    });
  }
});