/* =========================
   TRANSITION SYSTEM PRO
========================= */

(function(){

  let isNavigating = false;
  const TRANSITION_DURATION = 400;

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================
     Animation au chargement
  ========================= */

  document.addEventListener("DOMContentLoaded", () => {

    if(!document.body) return;

    document.body.classList.remove("fade-out");

    if(!prefersReducedMotion){
      document.body.classList.add("fade-in");
    }

    window.scrollTo(0, 0);
  });

  /* =========================
     Navigation animée
  ========================= */

  function navigate(page){

    if(isNavigating) return;
    if(typeof page !== "string" || page.trim() === "") return;

    if(!document.body || prefersReducedMotion){
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
      link.hostname !== window.location.hostname ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
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
    document.body.classList.remove("fade-out");
  });

  /* =========================
     EXPORT GLOBAL
  ========================= */

  window.navigate = navigate;

})();