/* =========================
   USER MANAGEMENT PRO
========================= */

(function(){

  /* =========================
     CREATE USER
  ========================= */

  function createUser(name){

    if(typeof name !== "string") return false;

    const cleanName = name.trim();

    if(cleanName.length < 3) return false;

    localStorage.setItem("username", cleanName);

    if(!localStorage.getItem("xp")){
      localStorage.setItem("xp", 0);
    }

    if(!localStorage.getItem("games")){
      localStorage.setItem("games", JSON.stringify([]));
    }

    return true;
  }

  function getUser(){
    return localStorage.getItem("username");
  }

  function resetUser(){
    localStorage.removeItem("username");
    localStorage.removeItem("xp");
    localStorage.removeItem("games");
    localStorage.removeItem("selectedMode");
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("selectedTheme");
  }

  /* =========================
     DOM INITIALISATION
  ========================= */

  document.addEventListener("DOMContentLoaded", () => {

    const username = getUser();

    const usernameDisplay = document.getElementById("usernameDisplay");
    const userSection = document.getElementById("userSection");
    const startBtn = document.getElementById("startBtn");
    const saveBtn = document.getElementById("saveBtn");
    const input = document.getElementById("usernameInput");

    /* Update XP UI */

    if(typeof updateLevelUI === "function"){
      updateLevelUI();
    }

    /* Si utilisateur existe */

    if(username && usernameDisplay && userSection && startBtn){
      usernameDisplay.textContent = username;
      userSection.style.display = "none";
      startBtn.style.display = "inline-block";
    }

    /* =========================
       SAUVEGARDE UTILISATEUR
    ========================= */

    function handleSave(){

      if(!input) return;

      const name = input.value.trim();

      if(name.length < 3){
        alert("⚠ Le pseudo doit contenir au moins 3 caractères.");
        return;
      }

      const created = createUser(name);
      if(!created) return;

      if(usernameDisplay){
        usernameDisplay.textContent = name;
      }

      if(userSection && startBtn){
        userSection.style.display = "none";
        startBtn.style.display = "inline-block";
      }

      if(typeof updateLevelUI === "function"){
        updateLevelUI();
      }
    }

    if(saveBtn){
      saveBtn.addEventListener("click", handleSave);
    }

    /* Validation touche Entrée */

    if(input){
      input.addEventListener("keypress", (e)=>{
        if(e.key === "Enter"){
          handleSave();
        }
      });
    }

    /* =========================
       BOUTON START
    ========================= */

    if(startBtn){
      startBtn.addEventListener("click", () => {

        if(!getUser()){
          alert("Veuillez entrer un pseudo.");
          return;
        }

        /* Reset ancien parcours */

        localStorage.removeItem("selectedMode");
        localStorage.removeItem("selectedCategory");
        localStorage.removeItem("selectedTheme");

        if(typeof navigate === "function"){
          navigate("categorie.html"); // ✅ corrigé
        }else{
          window.location.href = "categorie.html";
        }

      });
    }

  });

  /* =========================
     EXPORT GLOBAL
  ========================= */

  window.createUser = createUser;
  window.getUser = getUser;
  window.resetUser = resetUser;

})();