/* ===============================
   THEME SYSTEM
================================= */

(function(){

  const STORAGE_KEY = "mode";
  const DEFAULT_MODE = "dark";

  function getSavedMode(){
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_MODE;
  }

  function applyTheme(mode, updateSwitch = false){

    const isLight = mode === "light";
    const newValue = isLight ? "light" : "dark";

    document.documentElement.classList.toggle("light", isLight);

    if (localStorage.getItem(STORAGE_KEY) !== newValue) {
      localStorage.setItem(STORAGE_KEY, newValue);
    }

    if(updateSwitch){
      const switchBtn = document.getElementById("themeSwitch");
      if(switchBtn){
        switchBtn.checked = isLight;
      }
    }
  }

  // Anti-flash
  applyTheme(getSavedMode());

  document.addEventListener("DOMContentLoaded", () => {

    const switchBtn = document.getElementById("themeSwitch");

    applyTheme(getSavedMode(), true);

    if(switchBtn){
      switchBtn.addEventListener("change", () => {
        applyTheme(switchBtn.checked ? "light" : "dark");
      });
    }

  });

  window.applyTheme = applyTheme;

})();
