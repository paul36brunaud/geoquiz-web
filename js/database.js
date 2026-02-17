/* =========================
   DATABASE GEOQUIZ
========================= */

(function(){

  const DATABASE = {

    geo: {

      Europe: [
        {
          question: "Quelle est la capitale de la France ?",
          options: ["Paris", "Madrid", "Rome", "Berlin"],
          answer: 0,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale de l'Italie ?",
          options: ["Lisbonne", "Rome", "Athènes", "Vienne"],
          answer: 1,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale de l'Allemagne ?",
          options: ["Berlin", "Zurich", "Prague", "Bruxelles"],
          answer: 0,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale de l'Espagne ?",
          options: ["Barcelone", "Madrid", "Séville", "Valence"],
          answer: 1,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale du Portugal ?",
          options: ["Lisbonne", "Porto", "Madrid", "Rome"],
          answer: 0,
          difficulty: "easy"
        }
      ],

      Asie: [
        {
          question: "Quelle est la capitale du Japon ?",
          options: ["Tokyo", "Séoul", "Pékin", "Bangkok"],
          answer: 0,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale de la Chine ?",
          options: ["Shanghai", "Pékin", "Hong Kong", "Taipei"],
          answer: 1,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale de la Corée du Sud ?",
          options: ["Busan", "Séoul", "Pyongyang", "Osaka"],
          answer: 1,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale de la Thaïlande ?",
          options: ["Phuket", "Bangkok", "Hanoï", "Manille"],
          answer: 1,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale de l'Inde ?",
          options: ["Mumbai", "New Delhi", "Chennai", "Goa"],
          answer: 1,
          difficulty: "easy"
        }
      ],

      Afrique: [
        {
          question: "Quelle est la capitale du Maroc ?",
          options: ["Casablanca", "Rabat", "Marrakech", "Tanger"],
          answer: 1,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale de l'Égypte ?",
          options: ["Alexandrie", "Le Caire", "Gizeh", "Louxor"],
          answer: 1,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale du Sénégal ?",
          options: ["Dakar", "Abidjan", "Bamako", "Conakry"],
          answer: 0,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale du Kenya ?",
          options: ["Mombasa", "Nairobi", "Kampala", "Addis-Abeba"],
          answer: 1,
          difficulty: "easy"
        },
        {
          question: "Quelle est la capitale du Nigeria ?",
          options: ["Lagos", "Abuja", "Accra", "Yaoundé"],
          answer: 1,
          difficulty: "easy"
        }
      ]

    }

  };

  // 🔒 Empêche modification accidentelle
  Object.freeze(DATABASE);

  // 🌍 Rend accessible globalement
  window.DATABASE = DATABASE;

})();
