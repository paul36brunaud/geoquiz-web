/* =========================
   TRANSITION SYSTEM
========================= */

(function(){

  let isNavigating = false;
  const TRANSITION_DURATION = 400;

  /* =========================
     Animation au chargement
  ========================= */

  document.addEventListener("DOMContentLoaded", () => {

    if(!document.body) return;

    document.body.classList.remove("fade-out");
    document.body.classList.add("fade-in");

  });

  /* =========================
     Navigation animée
  ========================= */

  function navigate(page){

    if(isNavigating) return;
    if(typeof page !== "string" || page.trim() === "") return;

    if(!document.body){
      window.location.href = page;
      return;
    }

    isNavigating = true;

    document.body.classList.remove("fade-in");
    document.body.classList.add("fade-out");

    setTimeout(()=>{
      window.location.href = page;
    }, TRANSITION_DURATION);

  }

  /* =========================
     Interception liens internes
  ========================= */

  document.addEventListener("click", function(e){

    const link = e.target.closest("a");
    if(!link) return;

    const href = link.getAttribute("href");
    if(!href) return;

    if(
      link.target === "_blank" ||
      href.startsWith("#") ||
      link.hostname !== window.location.hostname
    ){
      return;
    }

    e.preventDefault();
    navigate(href);

  });

  /* =========================
     Reset navigation (retour navigateur)
  ========================= */

  window.addEventListener("pageshow", () => {
    isNavigating = false;
  });

  /* =========================
     EXPORT GLOBAL
  ========================= */

  window.navigate = navigate;

})();
