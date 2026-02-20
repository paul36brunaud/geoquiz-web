/* =========================
   XP & LEVEL SYSTEM PREMIUM
========================= */

(function(){

  const XP_PER_LEVEL = 100;
  const MAX_HISTORY = 50;

  /* =========================
     UTILITAIRES SÉCURISÉS
  ========================= */

  function safeNumber(value){
    const n = parseInt(value);
    return isNaN(n) ? 0 : n;
  }

  function getXP(){
    return safeNumber(localStorage.getItem("xp"));
  }

  function setXP(value){
    const safeXP = Math.max(0, safeNumber(value));
    localStorage.setItem("xp", safeXP);
  }

  function getLevel(){
    return Math.floor(getXP() / XP_PER_LEVEL) + 1;
  }

  function getXPProgress(){
    return getXP() % XP_PER_LEVEL;
  }

  function getXPPercent(){
    return (getXPProgress() / XP_PER_LEVEL) * 100;
  }

  /* =========================
     RANG GLOBAL
  ========================= */

  function getRank(){

    const level = getLevel();

    if(level >= 30) return { name: "💎 Diamant", color: "#00e0ff" };
    if(level >= 20) return { name: "🥇 Or", color: "#ffd700" };
    if(level >= 10) return { name: "🥈 Argent", color: "#c0c0c0" };
    if(level >= 5)  return { name: "🥉 Bronze", color: "#cd7f32" };

    return { name: "🎓 Débutant", color: "#ffffff" };
  }

  /* =========================
     AJOUT XP
  ========================= */

  function addXP(amount){

    if(typeof amount !== "number" || amount <= 0) return;

    const oldLevel = getLevel();
    const newXP = getXP() + amount;

    setXP(newXP);

    const newLevel = getLevel();

    updateAllUI();

    if(newLevel > oldLevel){
      levelUpAnimation(newLevel);
    }
  }

  /* =========================
     GAME STATISTICS
  ========================= */

  function saveGameResult(score){

    if(typeof score !== "number") return;

    let games;

    try{
      games = JSON.parse(localStorage.getItem("games")) || [];
    }catch{
      games = [];
    }

    games.push(score);

    if(games.length > MAX_HISTORY){
      games.shift();
    }

    localStorage.setItem("games", JSON.stringify(games));
  }

  function getStats(){

    let games;

    try{
      games = JSON.parse(localStorage.getItem("games")) || [];
    }catch{
      games = [];
    }

    const total = games.length;
    const best = total ? Math.max(...games) : 0;

    const average = total
      ? Number((games.reduce((a,b)=>a+b,0)/total).toFixed(1))
      : 0;

    return { total, best, average };
  }

  /* =========================
     UI UPDATE CENTRALISÉ
  ========================= */

  function updateLevelUI(){

    const levelElement = document.getElementById("level");
    const xpFill = document.getElementById("xpFill");
    const rankElement = document.getElementById("rank");

    if(levelElement){
      levelElement.innerText = getLevel();
    }

    if(xpFill){
      xpFill.style.width = getXPPercent() + "%";
    }

    if(rankElement){
      const rank = getRank();
      rankElement.textContent = rank.name;
      rankElement.style.color = rank.color;
    }
  }

  function updateXPBadge(){

    const xpValue = document.getElementById("xpValue");

    if(xpValue){
      xpValue.textContent = getXP();
    }
  }

  function updateAllUI(){
    updateLevelUI();
    updateXPBadge();
  }

  /* =========================
     LEVEL UP ANIMATION
  ========================= */

  function levelUpAnimation(level){

    const levelElement = document.getElementById("level");
    if(!levelElement) return;

    levelElement.style.transition = "0.3s ease";
    levelElement.style.transform = "scale(1.6)";
    levelElement.style.color = "#00f2fe";

    if(navigator.vibrate){
      navigator.vibrate([200,100,200]);
    }

    setTimeout(()=>{
      levelElement.style.transform = "scale(1)";
      levelElement.style.color = "";
    },600);
  }

  /* =========================
     INIT AUTO
  ========================= */

  document.addEventListener("DOMContentLoaded", () => {
    updateAllUI();
  });

  /* =========================
     EXPORT GLOBAL
  ========================= */

  window.getXP = getXP;
  window.addXP = addXP;
  window.getLevel = getLevel;
  window.getRank = getRank;
  window.getStats = getStats;
  window.saveGameResult = saveGameResult;
  window.updateLevelUI = updateLevelUI;
  window.updateXPBadge = updateXPBadge;

})();