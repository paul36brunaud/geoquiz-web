/* =========================
   USER MANAGEMENT
========================= */

(function(){

  function createUser(name){

    if(typeof name !== "string" || name.trim().length < 3){
      return false;
    }

    const cleanName = name.trim();

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

  /* =========================
     DOM INITIALISATION
  ========================= */

  document.addEventListener("DOMContentLoaded", () => {

    const username = getUser();

    /* DOM Elements */

    const usernameDisplay = document.getElementById("usernameDisplay");
    const userSection = document.getElementById("userSection");
    const startBtn = document.getElementById("startBtn");
    const saveBtn = document.getElementById("saveBtn");
    const input = document.getElementById("usernameInput");

    /* Mise à jour UI via stats.js */

    if(typeof updateLevelUI === "function"){
      updateLevelUI();
    }

    /* Si utilisateur existe */

    if(username && usernameDisplay && userSection && startBtn){

      usernameDisplay.innerText = username;
      userSection.style.display = "none";
      startBtn.style.display = "inline-block";

    }

    /* Sauvegarde utilisateur */

    if(saveBtn && input){

      saveBtn.addEventListener("click", () => {

        const name = input.value.trim();

        if(name.length < 3){
          alert("⚠ Le pseudo doit contenir au moins 3 caractères.");
          return;
        }

        const created = createUser(name);

        if(!created) return;

        if(usernameDisplay){
          usernameDisplay.innerText = name;
        }

        if(userSection && startBtn){
          userSection.style.display = "none";
          startBtn.style.display = "inline-block";
        }

      });

    }

    /* Bouton start */

    if(startBtn){
      startBtn.addEventListener("click", () => {

        if(typeof navigate === "function"){
          navigate("category.html");
        }else{
          window.location.href = "category.html";
        }

      });
    }

  });

  /* =========================
     EXPORT GLOBAL
  ========================= */

  window.createUser = createUser;
  window.getUser = getUser;

})();
