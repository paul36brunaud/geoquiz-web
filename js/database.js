/* =========================
   DATABASE GEOQUIZ CLEAN
========================= */

(function(){

  const DATABASE = {

    geo: {

      Europe: [
        { question: "Quelle est la capitale de la France ?", options: ["Paris","Madrid","Rome","Berlin"], answer: 0, difficulty: "easy" },
        { question: "Quelle est la capitale de l'Italie ?", options: ["Lisbonne","Rome","Athènes","Vienne"], answer: 1, difficulty: "easy" },
        { question: "Quel fleuve traverse Budapest ?", options: ["Danube","Rhin","Volga","Seine"], answer: 0, difficulty: "medium" },
        { question: "Quel pays possède la ville de Dubrovnik ?", options: ["Grèce","Croatie","Bulgarie","Roumanie"], answer: 1, difficulty: "medium" },
        { question: "Quelle est la plus haute montagne d'Europe ?", options: ["Mont Blanc","Elbrouz","Cervin","Grossglockner"], answer: 1, difficulty: "hard" },
        { question: "Quel micro-État est enclavé dans l’Italie ?", options: ["Andorre","Monaco","Saint-Marin","Liechtenstein"], answer: 2, difficulty: "hard" }
      ],

      Asie: [
        { question: "Quelle est la capitale du Japon ?", options: ["Tokyo","Séoul","Pékin","Bangkok"], answer: 0, difficulty: "easy" },
        { question: "Quel désert se trouve en Mongolie et en Chine ?", options: ["Gobi","Sahara","Karakoum","Taklamakan"], answer: 0, difficulty: "medium" },
        { question: "Quel est le plus long fleuve d'Asie ?", options: ["Yangtsé","Mékong","Indus","Gange"], answer: 0, difficulty: "hard" }
      ],

      Afrique: [
        { question: "Quelle est la capitale du Maroc ?", options: ["Casablanca","Rabat","Marrakech","Tanger"], answer: 1, difficulty: "easy" },
        { question: "Quel est le plus grand désert du monde ?", options: ["Sahara","Kalahari","Namib","Atacama"], answer: 0, difficulty: "medium" },
        { question: "Quel lac est le plus grand d'Afrique ?", options: ["Victoria","Tanganyika","Malawi","Tchad"], answer: 0, difficulty: "hard" }
      ]

    },

    histo: {

      Antiquité: [
        { question: "Qui était le premier empereur romain ?", options: ["Jules César","Auguste","Néron","Trajan"], answer: 1, difficulty: "easy" },
        { question: "Quelle civilisation a construit les pyramides ?", options: ["Romains","Grecs","Égyptiens","Mayas"], answer: 2, difficulty: "easy" },
        { question: "En quelle année débute la République romaine ?", options: ["509 av. J.-C.","44 av. J.-C.","27 av. J.-C.","476"], answer: 0, difficulty: "hard" }
      ],

      MoyenAge: [
        { question: "En quelle année a eu lieu la bataille d’Hastings ?", options: ["1066","1215","1492","732"], answer: 0, difficulty: "medium" },
        { question: "Qui était Charlemagne ?", options: ["Un roi franc","Un empereur romain","Un pape","Un viking"], answer: 0, difficulty: "easy" }
      ],

      Moderne: [
        { question: "En quelle année débute la Révolution française ?", options: ["1789","1776","1815","1799"], answer: 0, difficulty: "easy" },
        { question: "Qui était Napoléon Bonaparte ?", options: ["Un roi d'Angleterre","Un empereur français","Un président américain","Un tsar russe"], answer: 1, difficulty: "easy" },
        { question: "Quel traité met fin à la Première Guerre mondiale ?", options: ["Traité de Versailles","Traité de Rome","Traité de Vienne","Traité de Paris"], answer: 0, difficulty: "medium" }
      ]

    }

  };

  /* 🔒 FREEZE PROFOND */
  Object.values(DATABASE).forEach(mode=>{
    Object.values(mode).forEach(category=>{
      Object.freeze(category);
    });
    Object.freeze(mode);
  });

  Object.freeze(DATABASE);

  window.DATABASE = DATABASE;

})();